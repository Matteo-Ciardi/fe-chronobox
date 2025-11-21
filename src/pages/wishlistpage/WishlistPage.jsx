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
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default WishlistPage;
