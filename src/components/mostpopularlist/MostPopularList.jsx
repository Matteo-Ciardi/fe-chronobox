import { useEffect, useState } from "react";
import axios from "axios";
import CapsuleCard from "../capsulecard/CapsuleCard";

import "./MostPopularList.css";

export default function MostPopularList() {
	const [mostPopular, setMostPopular] = useState([]);

	// Funzione che recupera le capsule più popolari dal backend
	function fetchMostPopular() {
		axios
			.get("http://localhost:3000/api/capsules/most-populars")
			.then((res) => {
				setMostPopular(res.data);
			})
			.catch((error) => {
				console.error("Error most popular:", error);
			});
	}

	// Hook di effetto che chiama la funzione al mounting del componente
	useEffect(() => {
		fetchMostPopular();
	}, []);

	if (!mostPopular || mostPopular.length === 0) return null;

	const marqueeItems = [...mostPopular, ...mostPopular];

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
