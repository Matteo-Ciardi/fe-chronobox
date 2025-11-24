import { useState } from "react";

// se usi axios nel progetto, puoi sostituire fetch con axios
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function CheckoutForm({
	cartItems = [],
	totalAmount = 0,
	methodId = null,
}) {
	const [form, setForm] = useState({
		customer_name: "",
		customer_email: "",
		shipping_address: "",
		billing_address: "",
	});

	const [loading, setLoading] = useState(false);
	const [okMsg, setOkMsg] = useState("");
	const [errMsg, setErrMsg] = useState("");

	function onChange(e) {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	async function onSubmit(e) {
		e.preventDefault();
		setErrMsg("");
		setOkMsg("");

		// validazione base
		if (
			!form.customer_name ||
			!form.customer_email ||
			!form.shipping_address
		) {
			setErrMsg("Compila nome, email e indirizzo di spedizione.");
			return;
		}
		if (!cartItems.length) {
			setErrMsg("Il carrello è vuoto.");
			return;
		}

		const payload = {
			method_id: methodId, // se non ce l’hai lascia null
			customer_name: form.customer_name,
			customer_email: form.customer_email,
			shipping_address: form.shipping_address,
			billing_address: form.billing_address || null,
			total_amount: totalAmount,
			status: "pending",
			items: cartItems.map((i) => ({
				name: i.name,
				price: i.price,
				quantity: i.quantity,
			})),
		};

		try {
			setLoading(true);
			const res = await fetch(`${API_URL}/api/checkout/orders`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Errore durante il checkout");
			}

			setOkMsg(`Ordine creato! ID: ${data.id}`);
			// qui puoi anche svuotare il carrello / redirect
		} catch (err) {
			setErrMsg(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			onSubmit={onSubmit}
			style={{ display: "grid", gap: 12, maxWidth: 520 }}
		>
			<h2>Dati per il pagamento</h2>

			<label>
				Nome e Cognome *
				<input
					name="customer_name"
					value={form.customer_name}
					onChange={onChange}
					placeholder="Mario Rossi"
					required
				/>
			</label>

			<label>
				Email *
				<input
					type="email"
					name="customer_email"
					value={form.customer_email}
					onChange={onChange}
					placeholder="mario@gmail.com"
					required
				/>
			</label>

			<label>
				Indirizzo di spedizione *
				<input
					name="shipping_address"
					value={form.shipping_address}
					onChange={onChange}
					placeholder="Via Roma 1, Milano"
					required
				/>
			</label>

			<label>
				Indirizzo di fatturazione (opzionale)
				<input
					name="billing_address"
					value={form.billing_address}
					onChange={onChange}
					placeholder="se diverso dalla spedizione"
				/>
			</label>

			<div style={{ marginTop: 8 }}>
				<strong>Totale: € {Number(totalAmount).toFixed(2)}</strong>
			</div>

			{errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
			{okMsg && <p style={{ color: "green" }}>{okMsg}</p>}

			<button type="submit" disabled={loading}>
				{loading ? "Invio in corso..." : "Conferma ordine"}
			</button>
		</form>
	);
}
