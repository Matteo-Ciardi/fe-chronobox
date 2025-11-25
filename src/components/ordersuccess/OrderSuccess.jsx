import './OrderSuccess.css'

const OrderSuccessSummary = ({ summary }) => {
	return (
		<main>
			<div className="wrapper">
				<div className='order-complete-card'>
					<section className='section-end'>
						<h1 className='section-title-main'>Ordine completato</h1>
						<p>Ordine avvenuto con successo!</p>
					</section>

					<section className='section-end'>
						<h2 className='section-title'>Dati cliente</h2>
						<p>{summary.customer_name}</p>
						<p>{summary.customer_email}</p>
					</section>

					<section className='section-end'>
						<h2 className='section-title'>Indirizzo di fatturazione</h2>
						<p>
							{summary.billing.address}
						</p>
						<p>
							{summary.billing.zip}
						</p>
						<p>{summary.billing.city}</p>
						<p>{summary.billing.country}</p>
					</section>

					<section className='section-end'>
						<h2 className='section-title'>Dettagli capsula</h2>
						<p>Data di consegna/apertura: {summary.shippingDate}</p>
						<p>Lettera:</p>
						<p>{summary.letterContent}</p>
					</section>

					<section className='product-recap'>
						<h2 className='section-title'>Riepilogo prodotti</h2>
						<div>
							<ul>
								{summary.items.map((item) => (
									<li key={item.id} className='checkout-row'>
										<p>{item.name} × {item.quantity} —{" "}</p>
										<p className='price'>{item.subtotal.toFixed(2)} €</p>
									</li>
								))}
							</ul>
						</div>
						<div className='checkout-row'>
							<p>Totale prodotti: </p>
							<p className='price'>
								{summary.productsTotal.toFixed(2)} €
							</p>
						</div>
						<p className='checkout-row'>
							<p>Spedizione:{" "}</p>
							<p className='price'>{summary.shippingCost > 0
								? `${summary.shippingCost.toFixed(2)} €`
								: "Gratis"}</p>
						</p>

						<p className='checkout-row-total'>
							<p>Totale ordine: </p>
							<p className='price'>{summary.total.toFixed(2)} €</p>
						</p>
					</section>
				</div>
			</div>
		</main>
	);
};

export default OrderSuccessSummary;
