import { useProducts } from "../../context/DefaultContext";
import "./CheckoutSummary.css";
const CheckoutCartSummary = () => {
	const { cart, cartTotal } = useProducts();

	if (cart.length === 0) {
		return null;
	}

	const SHIPPING_THRESHOLD = 170;
	const SHIPPING_FEE = 30;

	const shippingCost = cartTotal < SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
	const finalTotal = cartTotal + shippingCost;

	return (
		<aside className="checkout-summary">
			<h2>Riepilogo ordine</h2>

			<ul className="summary-list">
				{cart.map((item) => (
					<li key={item.time} className="summary-item">
						<div className="item-details">
							<span className="item-name">{item.name}</span>
							<span className="item-quantity">
								× {item.quantity}
							</span>
							{item.letterContent && (
								<div className="summary-item-letter">
									Lettera:{" "}
									{item.letterContent.length > 50
										? `${item.letterContent.substring(0, 50)}...`
										: item.letterContent}
								</div>
							)}
						</div>
						<div className="item-total">
							{(item.price * item.quantity).toFixed(2)} €
						</div>
					</li>
				))}
			</ul>

			<div className="summary-row">
				<span>Subtotale:</span>
				<span>{cartTotal.toFixed(2)} €</span>
			</div>

			<div className="summary-row">
				<span>Costi di spedizione:</span>
				<span>
					{shippingCost > 0
						? `+ ${shippingCost.toFixed(2)} €`
						: "Gratis"}
				</span>
			</div>

			<div className="summary-total">
				<span>Totale ordine:</span>
				<strong>{finalTotal.toFixed(2)} €</strong>
			</div>
		</aside>
	);
};

export default CheckoutCartSummary;
