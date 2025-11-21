import { Link } from "react-router-dom";
import { useState } from "react";

import "./CapsuleCard.css";

export default function CapsuleCard(props) {
	const { product } = props;
	const [inWishlist, setInWishlist] = useState(() => {
		const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
		return wishlist.some((item) => item.id === product.id);
	});

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
							<Link to="/dettagli" className="capsule-button">
								Dettagli
							</Link>
							<button
								className="capsule-button wishlist-btn"
								onClick={toggleWishlist}
							>
								{inWishlist
									? "Rimuovi da Wishlist"
									: "Aggiungi a Wishlist"}
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
		</>
	);
}
