import { Link } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useProducts } from "../../context/DefaultContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import "./CapsuleCard.css";

export default function CapsuleCard(props) {
	const { product } = props;
	const { addToCart } = useProducts();
	const [inWishlist, setInWishlist] = useState(() => {
		const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
		return wishlist.some((item) => item.id === product.id);
	});
	const [showModal, setShowModal] = useState(false);
	const [letterText, setLetterText] = useState("");

	const toggleWishlist = () => {
		const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
		let newWishlist;
		if (inWishlist) {
			newWishlist = wishlist.filter((item) => item.id !== product.id);
		} else {
			newWishlist = [...wishlist, product];
		}
		localStorage.setItem("wishlist", JSON.stringify(newWishlist));
		setInWishlist(!inWishlist);
		window.dispatchEvent(new Event("wishlistUpdate"));
	};

	const handleAddToCart = () => {
		addToCart(product, {
			letterContent: letterText,
		});
		setShowModal(false);
		setLetterText("");
	};

	if (!product) return null;

	return (
		<>
			<Link to={`/dettagli/${product.slug}`}>
				<div className="container-capsule">
					<div className="container-image">
						<img src={`${product.img}`} alt={product.imgAlt} />
					</div>

					<div className="container-capsule-body">
						<h5 className="capsule-title">{product.name}</h5>
						<p className="capsule-description">
							{product.description}
						</p>

						<div className="capsule-footer">
							<div className="capsule-price">
								{product.discounted_price ? (
									<>
										<span className="original-price">
											&euro;{product.price.toFixed(2)}
										</span>
										<span className="discounted-price">
											&euro;
											{product.discounted_price.toFixed(
												2,
											)}
										</span>
									</>
								) : (
									<span className="normal-price">
										&euro;{product.price.toFixed(2)}
									</span>
								)}
							</div>
							<div className="capsule-buttons">
								<button
									type="button"
									className="capsule-button wishlist-btn"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										toggleWishlist();
									}}
								>
									{inWishlist ? (
										<FaHeart size="22px" />
									) : (
										<FaRegHeart size="22px" />
									)}
								</button>
								<button
									type="button"
									className="capsule-button customize-btn"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setShowModal(true);
									}}
								>
									Personalizza
								</button>
							</div>
						</div>
					</div>
				</div>
			</Link>

			{showModal &&
				ReactDOM.createPortal(
					<div
						className="customize-modal-overlay"
						onClick={() => {
							setShowModal(false);
							setLetterText("");
						}}
					>
						<div
							className="customize-modal"
							onClick={(e) => e.stopPropagation()}
						>
							<h3>Personalizza la tua capsula</h3>
							<div className="modal-content">
								<div className="form-group">
									<label>Testo della lettera:</label>
									<textarea
										value={letterText}
										onChange={(e) =>
											setLetterText(e.target.value)
										}
										placeholder="Scrivi il tuo messaggio..."
										rows="4"
										maxLength="3000"
									/>
									<div className="char-counter">
										{letterText.length}/3000 caratteri
									</div>
								</div>
							</div>
							<div className="modal-buttons">
								<button
									className="modal-add-btn"
									onClick={handleAddToCart}
									disabled={!letterText.trim()}
								>
									Aggiungi al Carrello
								</button>
								<button
									className="modal-cancel-btn"
									onClick={() => {
										setShowModal(false);
										setLetterText("");
									}}
								>
									Annulla
								</button>
							</div>
						</div>
					</div>,
					document.body,
				)}
		</>
	);
}
