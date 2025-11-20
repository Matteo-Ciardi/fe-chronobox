import { useState, useEffect } from "react";
import CapsuleCard from "../../components/capsulecard/CapsuleCard";

import "./WishlistPage.css";

const WishlistPage = () => {
	const [wishlist, setWishlist] = useState([]);

	useEffect(() => {
		const updateWishlist = () => {
			const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
			setWishlist(stored);
		};
		updateWishlist();
		window.addEventListener("wishlistUpdate", updateWishlist);
		return () =>
			window.removeEventListener("wishlistUpdate", updateWishlist);
	}, []);

	const removeFromWishlist = (productId) => {
		const updated = wishlist.filter((item) => item.id !== productId);
		setWishlist(updated);
		localStorage.setItem("wishlist", JSON.stringify(updated));
	};

	return (
		<div className="wishlist-page">
			<h1>La Mia Wishlist</h1>
			{wishlist.length === 0 ? (
				<p>La tua wishlist è vuota.</p>
			) : (
				<div className="wishlist-items">
					{wishlist.map((product) => (
						<div key={product.id} className="wishlist-item">
							<CapsuleCard product={product} />
							<button
								className="remove-btn"
								onClick={() => removeFromWishlist(product.id)}
							>
								Rimuovi
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default WishlistPage;
