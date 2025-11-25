import { Link } from "react-router-dom";
import { useState } from "react";
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
	const [imagePreview, setImagePreview] = useState(null);

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

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => setImagePreview(reader.result);
			reader.readAsDataURL(file);
		}
	};

	const handleAddToCart = () => {
		addToCart(product, {
			letterContent: letterText,
			uploadedImage: imagePreview,
		});
		setShowModal(false);
		setLetterText("");
		setImagePreview(null);
	};

	if (!product) return null;
	return (
		<>
			<div className="container-capsule">
				<div className="container-image">
					<img src={`${product.img}`} alt={product.imgAlt} />
				</div>

				<div className="container-capsule-body">
					<h5 className="capsule-title">{product.name}</h5>
					<p className="capsule-description">{product.description}</p>

					<div className="capsule-footer">
						<span className="capsule-price">
							&euro;{product.price}
						</span>
						<div className="capsule-buttons">
							<button
								className="capsule-button wishlist-btn"
								onClick={toggleWishlist}
							>
								{inWishlist ? <FaHeart /> : <FaRegHeart />}
							</button>
							<button
								className="capsule-button add-to-cart-btn"
								onClick={() => setShowModal(true)}
							>
								Personalizza
							</button>
						</div>
						<Link
							to={`/dettagli/${product.slug}`}
							className="capsule-button"
						>
							Dettagli
						</Link>
					</div>
				</div>
			</div>
			{showModal && (
				<div className="customize-modal-overlay">
					<div className="customize-modal">
						<h3>Personalizza la tua capsula</h3>
						<div className="modal-content">
							<div className="form-group">
								<label>Carica un'immagine:</label>
								<input
									type="file"
									accept="image/*"
									onChange={handleFileChange}
								/>
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Preview"
										className="image-preview"
									/>
								)}
							</div>
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
								Personalizza
							</button>
							<button
								className="modal-cancel-btn"
								onClick={() => {
									setShowModal(false);
									setLetterText("");
									setImagePreview(null);
								}}
							>
								Annulla
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
