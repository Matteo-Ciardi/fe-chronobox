// MostPopularList.jsx
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CapsuleCard from "../capsulecard/CapsuleCard";

import "./MostPopularList.css";

export default function MostPopularList() {
	const [mostPopular, setMostPopular] = useState([]);
	const trackRef = useRef(null);

	// durata di UN ciclo (0 -> -50%), in secondi
	const marqueeDuration = 120;

	// imposta la CSS variable per la durata
	useEffect(() => {
		if (trackRef.current) {
			trackRef.current.style.setProperty(
				"--marquee-duration",
				`${marqueeDuration}s`,
			);
		}
	}, [marqueeDuration]);

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

	// lista duplicata per effetto infinito
	const marqueeItems = [...mostPopular];

	return (
		<div className="marquee-container">
			<div
				className="marquee-track"
				ref={trackRef}
				onMouseEnter={() => {
					const track = trackRef.current;
					if (!track) return;
					track.classList.add("is-paused");
				}}
				onMouseLeave={() => {
					const track = trackRef.current;
					if (!track) return;
					track.classList.remove("is-paused");
				}}
			>
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
