import { Link } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../../context/DefaultContext";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import "./CapsuleCard.css";

export default function CapsuleCard(props) {
	const { product } = props;
	const { addToCart } = useProducts();
	const [inWishlist, setInWishlist] = useState(() => {
		const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
		return wishlist.some((item) => item.id === product.id);
	});
	const [isAdding, setIsAdding] = useState(false);

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

	if (!product) return null;
	return (
		<>
			<Link
				to={`/dettagli/${product.slug}`}
			// className="capsule-button"
			>
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
									type="button"
									className="capsule-button wishlist-btn"
									onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(); }}
								>
									{inWishlist
										? <FaHeart
											size='22px' />
										: <FaRegHeart
											size='22px' />}
								</button>
								<button
									type="button"
									className="capsule-button add-to-cart-btn"
									onClick={(e) => {
										e.preventDefault(); e.stopPropagation();
										addToCart(product);
										setIsAdding(true);
										setTimeout(() => setIsAdding(false), 1000);
									}}
									disabled={isAdding}
								>
									{isAdding
										? "✓ Aggiunto"
										: "Aggiungi al Carrello"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
}
