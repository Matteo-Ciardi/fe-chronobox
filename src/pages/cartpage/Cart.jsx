import { Link } from "react-router-dom";
import { useProducts } from "../../context/DefaultContext";
import ConfirmRemoveAll from "../../components/confirmremoveall/ConfirmRemoveAll";
import "./Cart.css";

const CartPage = () => {
	const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } =
		useProducts();

	const handleInputChange = (id, value) => {
		const qty = Number(value);
		if (Number.isNaN(qty)) return;
		updateQuantity(id, qty);
	};

	const increment = (id, currentQty) => {
		updateQuantity(id, currentQty + 1);
	};

	const decrement = (id, currentQty) => {
		if (currentQty <= 1) return;
		updateQuantity(id, currentQty - 1);
	};

	return (
		console.log("CART:", cart),
		console.log("TOTAL:", cartTotal),
		(
			<main className="cart-page">
				<h1>Il tuo carrello</h1>
				{cart.length > 0 && (
					<ConfirmRemoveAll
						buttonText="Svuota Carrello"
						confirmMessage="Sei sicuro di voler svuotare il carrello?"
						onConfirm={clearCart}
					/>
				)}

				{cart.length === 0 ? (
					<p>Il carrello è vuoto.</p>
				) : (
					<>
						<ul className="cart-list">
							{cart.map((item) => (
								<li key={item.id} className="cart-item">
									<div className="cart-item-info">
										{item.image && (
											<img
												src={item.image}
												alt={item.name}
												className="cart-item-thumb"
											/>
										)}
										<div>
											<h2>{item.name}</h2>
											<p>{item.price.toFixed(2)} €</p>
										</div>
									</div>

									<div className="cart-item-qty">
										<button
											type="button"
											onClick={() =>
												decrement(
													item.id,
													item.quantity,
												)
											}
										>
											-
										</button>
										<input
											type="number"
											min="1"
											value={item.quantity}
											onChange={(e) =>
												handleInputChange(
													item.id,
													e.target.value,
												)
											}
										/>
										<button
											type="button"
											onClick={() =>
												increment(
													item.id,
													item.quantity,
												)
											}
										>
											+
										</button>
									</div>

									<div className="cart-item-subtotal">
										{(item.price * item.quantity).toFixed(
											2,
										)}{" "}
										€
									</div>

									<button
										type="button"
										className="cart-item-remove"
										onClick={() => removeFromCart(item.id)}
									>
										Rimuovi
									</button>
								</li>
							))}
						</ul>

						<div className="cart-total">
							<span>Totale:</span>
							<strong>{cartTotal.toFixed(2)} €</strong>
						</div>

						<Link to="/checkout" className="cart-checkout-btn">
							Procedi al checkout
						</Link>
					</>
				)}
			</main>
		)
	);
};

export default CartPage;
