import { useState, useEffect, useRef } from "react";
import { useProducts } from "../../context/DefaultContext";

import axios from "axios";
import dropin from "braintree-web-drop-in";

import BillingForm from "../../components/billingform/BillingForm";
import ShippingForm from "../../components/shippingform/ShippingForm";
import CapsuleDetailsForm from "../../components/capsuledetailform/CapsuleDetailForm";
import CheckoutCartSummary from "../../components/checkoutsummary/CheckoutSummary";
import OrderSuccessSummary from "../../components/ordersuccess/OrderSuccess";

const CheckoutPage = () => {
	const { cart, cartTotal, clearCart } = useProducts();

	const dropinContainerRef = useRef(null);

	const [billing, setBilling] = useState({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		city: "",
		zip: "",
		country: "",
	});

	const [shipping, setShipping] = useState({
		address: "",
		city: "",
		zip: "",
		country: "",
	});

	const [shippingDate, setShippingDate] = useState("");
	const [letterContent, setLetterContent] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [orderSummary, setOrderSummary] = useState(null);
	const [dropinInstance, setDropinInstance] = useState(null);

	useEffect(() => {
		let instance; // per teardown nel cleanup

		async function setupBraintree() {
			try {
				if (!dropinContainerRef.current) return;

				// 🔹 forza il nodo a essere vuoto prima di creare la Drop-in
				dropinContainerRef.current.innerHTML = "";

				const res = await axios.get("http://localhost:3000/api/braintree/token");
				const { clientToken } = res.data;

				instance = await dropin.create({
					authorization: clientToken,
					container: dropinContainerRef.current,
				});

				setDropinInstance(instance);
			} catch (error) {
				console.error("Errore setup Braintree:", error);
				alert("Impossibile inizializzare il pagamento, riprova più tardi.");
			}
		}

		setupBraintree();

		return () => {
			if (instance) {
				instance.teardown().catch((err) => {
					console.error("Errore nel teardown di Braintree:", err);
				});
			}
		};
	}, []);

	const handleBillingChange = (e) => {
		const { name, value } = e.target;
		setBilling((prev) => ({ ...prev, [name]: value }));
	};

	const handleShippingChange = (e) => {
		const { name, value } = e.target;
		setShipping((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (cart.length === 0) return;

		if (!dropinInstance) {
			alert("Il sistema di pagamento non è pronto, ricarica la pagina.");
			return;
		}

		setSubmitting(true);

		try {
			const SHIPPING_THRESHOLD = 170;
			const SHIPPING_FEE = 30;

			const shippingCost =
				cartTotal < SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
			const finalTotal = cartTotal + shippingCost;

			// Snapshot per riepilogo
			const summary = {
				customer_name: `${billing.firstName} ${billing.lastName}`,
				customer_email: billing.email,
				billing: { ...billing },
				shipping: { ...shipping },
				shippingDate,
				letterContent,
				items: cart.map((item) => ({
					id: item.id,
					name: item.name,
					quantity: item.quantity,
					price: item.price,
					subtotal: item.price * item.quantity,
				})),
				productsTotal: cartTotal, // totale solo prodotti
				shippingCost, // costo spedizione calcolato
				total: finalTotal, // prodotti + spedizione
			};

			const { nonce } = await dropinInstance.requestPaymentMethod();

			// Payload per backend (allineato a tabella orders/capsule_order)
			const orderPayload = {
				method_id: 1,
				customer_name: summary.customer_name,
				customer_email: summary.customer_email,
				shipping_address: `${shipping.address}, ${shipping.zip} ${shipping.city}, ${shipping.country}`,
				billing_address: `${billing.address}, ${billing.zip} ${billing.city}, ${billing.country}`,
				total_amount: finalTotal,
				status: "pending",
				items: summary.items.map((item) => ({
					// campi per DB
					capsule_id: item.id,
					quantity: item.quantity,
					unit_price: item.price,
					shipping_period: shippingDate,
					letter_content: letterContent,
					discount_percentage: null,

					// campi extra per EMAIL
					name: item.name,
					price: item.price,
				})),
				paymentNonce: nonce, // usato da orderController.store
			};

			const res = await axios.post(
				"http://localhost:3000/api/checkout/orders",
				orderPayload,
			);
			console.log("ORDER CREATED:", res.data);

			setOrderSummary(summary);
			clearCart();
		} catch (err) {
			console.error("ORDER ERROR:", err);
			alert("Pagamento non riuscito. Controlla i dati e riprova.");
		} finally {
			setSubmitting(false);
		}
	};

	// Nessun riepilogo e carrello vuoto -> niente da mostrare
	if (!orderSummary && cart.length === 0) {
		return <p>Il carrello è vuoto.</p>;
	}

	// Dopo ordine: riepilogo completo + messaggio successo
	if (orderSummary) {
		return <OrderSuccessSummary summary={orderSummary} />;
	}

	// Vista checkout normale: form + riepilogo carrello laterale
	return (
		<main className="checkout-page">
			<h1>Checkout</h1>

			<div className="checkout-layout">
				<form className="checkout-form" onSubmit={handleSubmit}>
					<BillingForm
						billing={billing}
						onChange={handleBillingChange}
					/>
					<ShippingForm
						shipping={shipping}
						onChange={handleShippingChange}
					/>
					<CapsuleDetailsForm
						shippingDate={shippingDate}
						onChangeShippingDate={setShippingDate}
						letterContent={letterContent}
						onChangeLetterContent={setLetterContent}
					/>

					<div ref={dropinContainerRef} id="braintree-dropin" />

					<button type="submit" disabled={submitting || !dropinInstance}>
						{submitting ? "Elaborazione..." : "Paga e completa l'ordine"}
					</button>
				</form>

				<CheckoutCartSummary />
			</div>
		</main>
	);
};

export default CheckoutPage;
