import "./OrderSuccess.css";

const OrderSuccessSummary = ({ summary }) => {
	return (
		<main>
			<div className="wrapper">
				<div className="order-complete-card">
					<section className="section-end">
						<h1 className="section-title-main">
							Ordine completato
						</h1>
						<p className="mb">Ordine avvenuto con successo!</p>
						<div className="checkout-row">
							<h2 className="dati-form">ID Ordine</h2>
							<p className="num">{summary.orderId}</p>
						</div>
					</section>

					<section className="section-end">
						<h2 className="section-title">Dati cliente</h2>

						<div className="checkout-row">
							<p className="dati-form">Nome completo:</p>
							<p>{summary.customer_name}</p>
						</div>

						<div className="checkout-row">
							<p className="dati-form">Email:</p>
							<p>{summary.customer_email}</p>
						</div>
					</section>

					<section className="section-end">
						<h2 className="section-title">
							Indirizzo di fatturazione
						</h2>

						<div className="checkout-row">
							<p className="dati-form">Indirizzo di spedizione:</p>
							<p>{summary.billing.address}</p>
						</div>

						<div className="checkout-row">
							<p className="dati-form">CAP:</p>
							<p>{summary.billing.zip}</p>
						</div>

						<div className="checkout-row">
							<p className="dati-form">Città:</p>
							<p>{summary.billing.city}</p>
						</div>

						<div className="checkout-row">
							<p className="dati-form">Stato:</p>
							<p>{summary.billing.country}</p>
						</div>
					</section>

					<section className="section-end">
						<h2 className="section-title">Dettagli capsula</h2>
						<p>Data di consegna/apertura: {summary.shippingDate}</p>
					</section>

					<section className="product-recap">
						<h2 className="section-title">Riepilogo prodotti</h2>
						<div>
							<ul>
								{summary.items.map((item) => (
									<li key={item.id} className="checkout-row">
										<p>
											{item.name} × {item.quantity} —{" "}
										</p>
										<p className="price">
											{item.subtotal.toFixed(2)} €
										</p>
									</li>
								))}
							</ul>
						</div>
						<div className="checkout-row">
							<p>Totale prodotti: </p>
							<p className="price">
								{summary.productsTotal.toFixed(2)} €
							</p>
						</div>
						<div className="checkout-row">
							<p>Spedizione: </p>
							<p className="price">
								{summary.shippingCost > 0
									? `${summary.shippingCost.toFixed(2)} €`
									: "Gratis"}
							</p>
						</div>

						<div className="checkout-row-total">
							<p className="bg-p">Totale ordine: </p>
							<p className="price">
								{summary.total.toFixed(2)} €
							</p>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};

export default OrderSuccessSummary;
