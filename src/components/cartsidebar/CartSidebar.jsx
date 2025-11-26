import { Link } from "react-router-dom";
import { useProducts } from "../../context/DefaultContext";
import ConfirmRemoveAll from "../confirmremoveall/ConfirmRemoveAll";
import "./CartSidebar.css";

const CartSidebar = ({ isOpen, onClose }) => {
	const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } =
		useProducts();

	// Calcola il totale dei prodotti localmente dal cart array
	const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

	const handleInputChange = (time, value) => {
		const qty = Number(value);
		if (Number.isNaN(qty)) return;
		updateQuantity(time, qty);
	};

	const increment = (time, currentQty) => {
		updateQuantity(time, currentQty + 1);
	};

	const decrement = (time, currentQty) => {
		if (currentQty <= 1) return;
		updateQuantity(time, currentQty - 1);
	};

	return (
		<>
			{/* Overlay backdrop */}
			{isOpen && (
				<div className="cart-sidebar-backdrop" onClick={onClose} />
			)}

			{/* Sidebar */}
			<aside className={`cart-sidebar ${isOpen ? "is-open" : ""}`}>
				<div className="cart-sidebar-header">
					<h2>Il tuo carrello</h2>
					{cartItemCount > 0 && (
						<span className="cart-sidebar-count">
							Totale prodotti: {cartItemCount}
						</span>
					)}
					<button
						type="button"
						className="cart-sidebar-close"
						onClick={onClose}
						aria-label="Chiudi carrello"
					>
						✕
					</button>
				</div>

				<div className="cart-sidebar-content">
					{cart.length > 0 && (
						<div className="cart-sidebar-clear-btn-wrapper">
							<ConfirmRemoveAll
								buttonText="Svuota Carrello"
								confirmMessage="Sei sicuro di voler svuotare il carrello?"
								onConfirm={clearCart}
							/>
						</div>
					)}

					{cart.length === 0 ? (
						<p className="cart-sidebar-empty">
							Il carrello è vuoto.
						</p>
					) : (
						<>
							<ul className="cart-sidebar-list">
								{cart.map((item) => (
									<li
										key={item.time}
										className="cart-sidebar-item"
									>
										<div className="cart-sidebar-item-info">
											{item.image && (
												<img
													src={item.image}
													alt={item.name}
													className="cart-sidebar-item-thumb"
												/>
											)}
											<div>
												<h3>{item.name}</h3>
												<p>{item.price.toFixed(2)} €</p>
											</div>
										</div>

										<div className="cart-sidebar-item-qty">
											<button
												type="button"
												onClick={() =>
													decrement(
														item.time,
														item.quantity,
													)
												}
											>
												-
											</button>
											<input
												type="text"
												min="1"
												value={item.quantity}
												onChange={(e) =>
													handleInputChange(
														item.time,
														e.target.value,
													)
												}
											/>
											<button
												type="button"
												onClick={() =>
													increment(
														item.time,
														item.quantity,
													)
												}
											>
												+
											</button>
										</div>

										<div className="cart-sidebar-item-subtotal">
											{(
												item.price * item.quantity
											).toFixed(2)}{" "}
											€
										</div>

										<button
											type="button"
											className="cart-sidebar-item-remove"
											onClick={() =>
												removeFromCart(item.time)
											}
										>
											Rimuovi
										</button>
									</li>
								))}
							</ul>

							<div className="cart-sidebar-total">
								<span>Totale:</span>
								<strong>{cartTotal.toFixed(2)} €</strong>
							</div>

							<Link
								to="/checkout"
								className="cart-sidebar-checkout-btn"
								onClick={onClose}
							>
								Procedi al checkout
							</Link>

							<Link
								to="/carrello"
								className="cart-sidebar-view-btn"
								onClick={onClose}
							>
								Visualizza carrello completo
							</Link>
						</>
					)}
				</div>
			</aside>
		</>
	);
};

export default CartSidebar;
