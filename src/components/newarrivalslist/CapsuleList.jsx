// CapsuleList.jsx
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CapsuleCard from "../capsulecard/CapsuleCard";

import "./CapsuleList.css";

export default function CapsuleList() {
	const [newArrivals, setNewArrivals] = useState([]);
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

	// recupera i nuovi arrivi dal backend
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

	useEffect(() => {
		fetchNewArrivals();
	}, []);

	if (!newArrivals || newArrivals.length === 0) return null;

	// lista duplicata per effetto infinito
	const marqueeItems = [...newArrivals];

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
