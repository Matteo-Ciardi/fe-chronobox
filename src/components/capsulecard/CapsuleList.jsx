import { useEffect, useState } from "react";
import axios from "axios";
import CapsuleCard from "./CapsuleCard";

import "./CapsuleList.css";

export default function CapsuleList() {
	const [newArrivals, setNewArrivals] = useState([]);

	// Funzione che recupera i nuovi arrivi dal backend
	function fetchNewArrivals() {
		axios
			.get("http://localhost:3000/api/capsules/new-arrivals")
			.then((res) => {
				setNewArrivals(res.data);
			})
			.catch((error) => {
				console.error("Error new arrivals:", error);
			});
	}

	// Hook di effetto che chiama la funzione al mounting del componente
	useEffect(() => {
		fetchNewArrivals();
	}, []);

	if (!newArrivals || newArrivals.length === 0) return null;

	const marqueeItems = [...newArrivals, ...newArrivals];

	return (
		<div className="marquee-container">
			<div className="marquee-track">
				{marqueeItems.map((product, index) => (
					<div
						className="marquee-item"
						key={`${product.id}-${index}`}
					>
						<CapsuleCard product={product} />
					</div>
				))}
			</div>
		</div>
	);
}
