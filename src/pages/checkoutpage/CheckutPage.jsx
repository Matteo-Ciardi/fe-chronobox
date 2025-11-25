import { useState, useEffect, useRef } from "react";
import { useProducts } from "../../context/DefaultContext";

import axios from "axios";
import dropin from "braintree-web-drop-in";

import BillingForm from "../../components/billingform/BillingForm";
import ShippingForm from "../../components/shippingform/ShippingForm";
import CapsuleDetailsForm from "../../components/capsuledetailform/CapsuleDetailForm";
import CheckoutCartSummary from "../../components/checkoutsummary/CheckoutSummary";
import OrderSuccessSummary from "../../components/ordersuccess/OrderSuccess";
import "./CheckoutPage.css";

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

	const [formErrors, setFormErrors] = useState([]);

	useEffect(() => {
		let instance; // per teardown nel cleanup

		async function setupBraintree() {
			try {
				if (!dropinContainerRef.current) return;

				// 🔹 forza il nodo a essere vuoto prima di creare la Drop-in
				dropinContainerRef.current.innerHTML = "";

				const res = await axios.get(
					"http://localhost:3000/api/braintree/token",
				);
				const { clientToken } = res.data;

				instance = await dropin.create({
					authorization: clientToken,
					container: dropinContainerRef.current,
				});

				setDropinInstance(instance);
			} catch (error) {
				console.error("Errore setup Braintree:", error);
				alert(
					"Impossibile inizializzare il pagamento, riprova più tardi.",
				);
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

		// Chiamata funzione per validazioni
		const errors = validateCheckout();
		if (errors.length > 0) {
			setFormErrors(errors);
			return;
		}

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
					letter_content: item.letterContent || "",
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
					{/* Box che mostra tutti gli errori di validazione del form*/}
					{formErrors.length > 0 && (
						<div className="error-box">
							<ul>
								{formErrors.map((err, i) => (
									<li key={i}>{err}</li>
								))}
							</ul>
						</div>
					)}

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

					<button
						type="submit"
						disabled={submitting || !dropinInstance}
					>
						{submitting
							? "Elaborazione..."
							: "Paga e completa l'ordine"}
					</button>
				</form>

				<CheckoutCartSummary />
			</div>
		</main>
	);

	/****************
		FUNZIONI  
	*****************/

	/* Funzione che formatta correttamente nome e cognome:
	   - rimuove spazi iniziali/finali
	   - sostituisce doppi spazi con uno solo
	   - mette la lettera maiuscola dopo spazi, apostrofi e trattini */
	function normalizeName(str) {
		return str
			.trim()
			.replace(/\s+/g, " ") // sostituisce doppi spazi
			.replace(/(^\w|[\s'\-]\w)/g, (c) => c.toUpperCase()); // rende maiuscole iniziali
	}

	// Funzione che controlla tutti i campi di input
	function validateCheckout() {
		let errors = [];

		// Controlla che il campo contenga solo lettere (anche accentate), spazi, apostrofi o trattini
		const onlyLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

		// Controlla che i CAP ha 5 cifre
		const capRegex = /^\d{5}$/;

		// Lista di provider email considerati validi
		const validEmailProviders = [
			"gmail.com",
			"outlook.com",
			"hotmail.com",
			"live.com",
			"yahoo.com",
			"icloud.com",
			"libero.it",
			"virgilio.it",
			"email.it",
			"pec.it",
		];

		// -----------------------------------------------------------
		// VALIDAZIONE FATTURAZIONE (nome, cognome, email, indirizzi)
		// -----------------------------------------------------------

		// Normalizzo nome e cognome (maiuscole, spazi corretti)
		billing.firstName = normalizeName(billing.firstName);
		billing.lastName = normalizeName(billing.lastName);

		// Nome: solo lettere, almeno 3 lettere, massimo 30, niente spazi iniziali/finali
		if (!onlyLetters.test(billing.firstName)) {
			errors.push("Il nome può contenere solo lettere.");
		} else if (billing.firstName.trim().length < 3) {
			errors.push("Il nome deve contenere almeno 3 lettere.");
		} else if (billing.firstName.trim().length > 30) {
			errors.push("Il nome non può superare i 30 caratteri.");
		} else if (billing.firstName.includes("  ")) {
			errors.push("Il nome non può contenere doppi spazi.");
		}

		// Cognome: solo lettere, almeno 3 lettere, massimo 30, niente spazi iniziali/finali
		if (!onlyLetters.test(billing.lastName)) {
			errors.push("Il cognome può contenere solo lettere.");
		} else if (billing.lastName.trim().length < 3) {
			errors.push("Il cognome deve contenere almeno 3 lettere.");
		} else if (billing.lastName.trim().length > 30) {
			errors.push("Il cognome non può superare i 30 caratteri.");
		} else if (billing.lastName.includes("  ")) {
			errors.push("Il cognome non può contenere doppi spazi.");
		}

		// Email: deve essere valida e con provider riconosciuto
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email)) {
			errors.push("Inserisci un indirizzo email valido.");
		} else {
			// Controllo provider email (parte dopo "@")
			const provider = billing.email.split("@")[1];

			if (!validEmailProviders.includes(provider)) {
				errors.push(
					"Il provider email non è riconosciuto. Usa Gmail, Outlook, iCloud, Libero, Virgilio o Email",
				);
			}
		}

		// Città fatturazione: solo lettere
		if (!onlyLetters.test(billing.city)) {
			errors.push("La città di fatturazione può contenere solo lettere.");
		}

		// Paese fatturazione: solo lettere, minimo 3 caratteri
		if (!onlyLetters.test(billing.country)) {
			errors.push("Il paese di fatturazione può contenere solo lettere.");
		} else if (billing.country.trim().length < 3) {
			errors.push(
				"Il paese di fatturazione deve contenere almeno 3 lettere.",
			);
		}

		// CAP fatturazione: 5 cifre e non negativo
		if (!capRegex.test(billing.zip)) {
			errors.push("Il CAP di fatturazione deve contenere 5 cifre.");
		} else if (parseInt(billing.zip) < 0) {
			errors.push("Il CAP di fatturazione non può essere negativo.");
		}

		// ------------------------------------------------------
		//  VALIDAZIONE SPEDIZIONE (indirizzo, città, CAP e paese)
		// ------------------------------------------------------

		// Città spedizione: solo lettere
		if (!onlyLetters.test(shipping.city)) {
			errors.push("La città di spedizione può contenere solo lettere.");
		}

		// Paese spedizione: solo lettere, minimo 3 caratteri
		if (!onlyLetters.test(shipping.country)) {
			errors.push("Il paese di spedizione può contenere solo lettere.");
		} else if (shipping.country.trim().length < 3) {
			errors.push(
				"Il paese di spedizione deve contenere almeno 3 lettere.",
			);
		}

		// CAP spedizione: 5 cifre e non negativo
		if (isNaN(shipping.zip)) {
			errors.push("Il CAP di spedizione deve contenere solo numeri.");
		} else if (parseInt(shipping.zip) < 0) {
			errors.push("Il CAP di spedizione non può essere negativo.");
		} else if (!capRegex.test(shipping.zip)) {
			errors.push("Il CAP di spedizione deve contenere 5 cifre.");
		}

		// ------------------------------------------------------
		//  DATA DI SPEDIZIONE (deve essere futura)
		// ------------------------------------------------------

		if (!shippingDate.trim()) {
			const selected = new Date(shippingDate);
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			// Controllo che la data sia futura
			if (selected <= today) {
				errors.push("La data deve essere futura.");
			}
		}

		// ------------------------------------------------------
		//  CONTENUTO LETTERA (minimo 10 caratteri)
		// ------------------------------------------------------

		if (letterContent.trim().length < 10) {
			errors.push(
				"Il contenuto della lettera deve contenere almeno 10 caratteri.",
			);
		}

		// ------------------------------------------------------
		// CARRELLO (non deve essere vuoto)
		// ------------------------------------------------------

		if (cart.length === 0) {
			errors.push("Il carrello è vuoto.");
		}

		return errors;
	}
};

export default CheckoutPage;
