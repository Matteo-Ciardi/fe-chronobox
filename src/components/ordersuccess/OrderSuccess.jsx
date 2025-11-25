const OrderSuccessSummary = ({ summary }) => {
	return (
		<main>
			<h1>Ordine completato</h1>
			<p>Ordine avvenuto con successo!</p>

			<section>
				<h2>Dati cliente</h2>
				<p>{summary.customer_name}</p>
				<p>{summary.customer_email}</p>
			</section>

			<section>
				<h2>Indirizzo di fatturazione</h2>
				<p>{summary.billing.address}</p>
				<p>
					{summary.billing.zip} {summary.billing.city}
				</p>
				<p>{summary.billing.country}</p>
			</section>

			{/* <section>
				<h2>Indirizzo di spedizione</h2>
				<p>{summary.shipping.address}</p>
				<p>
					{summary.shipping.zip} {summary.shipping.city}
				</p>
				<p>{summary.shipping.country}</p>
			</section> */}

			<section>
				<h2>Dettagli capsula</h2>
				<p>Data di consegna/apertura: {summary.shippingDate}</p>
				<p>Lettera:</p>
				<p>{summary.letterContent}</p>
			</section>

			<section>
				<h2>Riepilogo prodotti</h2>
				<ul>
					{summary.items.map((item) => (
						<li key={item.id}>
							{item.name} × {item.quantity} —{" "}
							{item.subtotal.toFixed(2)} €
						</li>
					))}
				</ul>
				<p>Totale prodotti: {summary.productsTotal.toFixed(2)} €</p>
				<p>
					Spedizione:{" "}
					{summary.shippingCost > 0
						? `${summary.shippingCost.toFixed(2)} €`
						: "Gratis"}
				</p>

				<p>Totale ordine: {summary.total.toFixed(2)} €</p>
			</section>
		</main>
	);
};

export default OrderSuccessSummary;
