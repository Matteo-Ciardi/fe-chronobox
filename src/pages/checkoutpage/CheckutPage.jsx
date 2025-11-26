import { useState, useEffect, useRef } from "react";
import { useProducts } from "../../context/DefaultContext";

import axios from "axios";
import dropin from "braintree-web-drop-in";

import BillingForm from "../../components/billingform/BillingForm";
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		setFormErrors([]);

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
				billing_address: `${billing.address}, ${billing.zip} ${billing.city}, ${billing.country}`,
				total_amount: finalTotal,
				status: "pending",
				items: cart.map((item) => ({
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

			setOrderSummary({
				...summary,
				orderId: res.data.id 
			});
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
			.replace(/(^\w|[\s'-]\w)/g, (c) => c.toUpperCase()); // rende maiuscole iniziali
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
			// Microsoft
			"outlook.com",
			"hotmail.com",
			"live.com",
			"msn.com",
			"outlook.it",
			"hotmail.it",

			// Google
			"gmail.com",

			// Yahoo / AOL
			"yahoo.com",
			"yahoo.it",
			"ymail.com",
			"rocketmail.com",
			"aol.com",

			// Apple
			"icloud.com",
			"mac.com",
			"me.com",

			// Italiani popolari
			"libero.it",
			"virgilio.it",
			"email.it",
			"tim.it",
			"alice.it",
			"tin.it",
			"inwind.it",
			"poste.it",
			"fastwebnet.it",
			"tiscali.it",

			// Internazionali e privacy
			"gmx.com",
			"gmx.net",
			"protonmail.com",
			"proton.me",
			"zoho.com",
			"yandex.com",
			"mail.com",
			"mail.ru",

			// PEC italiane
			"pec.it",
			"legalmail.it",
			"pec.aruba.it",
			"arubapec.it",
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

		// Email: deve essere valida nella forma
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email)) {
			errors.push("Inserisci un indirizzo email valido.");
		} else {
			const provider = billing.email.split("@")[1];
			const parts = provider.split(".");
			const tld = parts[parts.length - 1]; // ultima parte del dominio (es. "it", "com", "careers")

			// Lista estensioni dominio valide (TLD)
			const validTLDs = [
				"com",
				"it",
				"net",
				"org",
				"edu",
				"gov",
				"io",
				"co",
				"info",
				"biz",
				"me",
				"online",
				"shop",
				"store",
				"tech",
				"design",
				"cloud",
				"dev",
				"app",
				"site",
				"tv",
				"news",
				"live",
				"digital",
				"academy",
				"careers",
			];

			// Se è un provider famoso, tutto ok
			if (!validEmailProviders.includes(provider)) {
				// Se NON è provider famoso → controllo che il TLD sia valido
				if (!validTLDs.includes(tld)) {
					errors.push("Il dominio email non è valido.");
				}
			}
		}

		// Città spedizione: solo lettere
		if (!onlyLetters.test(billing.city)) {
			errors.push("La città di spedizione può contenere solo lettere.");
		}

		// Paese spedizione: solo lettere, minimo 3 caratteri
		if (!onlyLetters.test(billing.country)) {
			errors.push("Il paese di spedizione può contenere solo lettere.");
		} else if (billing.country.trim().length < 3) {
			errors.push(
				"Il paese di spedizione deve contenere almeno 3 lettere.",
			);
		}

		// CAP spedizione: 5 cifre e non negativo
		if (!capRegex.test(billing.zip)) {
			errors.push("Il CAP di spedizione deve contenere 5 cifre.");
		} else if (parseInt(billing.zip) < 0) {
			errors.push("Il CAP di spedizione non può essere negativo.");
		}

		// ------------------------------------------------------
		//  DATA DI SPEDIZIONE (deve essere futura)
		// ------------------------------------------------------

		if (shippingDate.trim()) {
			const [year, month, day] = shippingDate.split("-").map(Number);
			const selected = new Date(year, month - 1, day); // mese 0-based
			const today = new Date();
			today.setHours(0, 0, 0, 0); // mezzanotte

			if (selected <= today) {
				errors.push("La data deve essere futura.");
			}
		} else {
			errors.push("Inserisci una data di spedizione.");
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
