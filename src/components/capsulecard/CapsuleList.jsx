import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CapsuleCard from "./CapsuleCard";

import "./CapsuleList.css";

export default function CapsuleList() {
	const [newArrivals, setNewArrivals] = useState([]);
	const trackRef = useRef(null);
	const marqueeDuration = 80; // seconds (match CSS)

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
			<div
				className="marquee-track"
				ref={trackRef}
				onMouseEnter={() => {
					const track = trackRef.current;
					if (!track) return;
					const style = getComputedStyle(track);
					const matrix = style.transform;
					let currentX = 0;
					if (matrix && matrix !== "none") {
						const values = matrix.match(/matrix\(([-0-9.,\s]+)\)/);
						if (values) {
							const parts = values[1].split(',').map(s => parseFloat(s.trim()));
							currentX = parts[4];
						}
					}
					// stop CSS animation and animate a small deceleration
					track.style.animation = 'none';
					// ensure the track keeps current transform
					track.style.transform = `translateX(${currentX}px)`;
					// allow layout to settle
					requestAnimationFrame(() => {
						const decel = 40; // pixels to continue moving before full stop
						// move a bit more in the same direction (animation moves left => negative)
						const target = currentX - decel;
						track.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1)';
						track.style.transform = `translateX(${target}px)`;
						// after transition ends, clear transition but keep transform fixed
						const onEnd = () => {
							track.removeEventListener('transitionend', onEnd);
							track.style.transition = '';
						};
						track.addEventListener('transitionend', onEnd);
					});
				}}
				onMouseLeave={() => {
					const track = trackRef.current;
					if (!track) return;
					// compute current translateX
					const style = getComputedStyle(track);
					const matrix = style.transform;
					let currentX = 0;
					if (matrix && matrix !== "none") {
						const values = matrix.match(/matrix\(([-0-9.,\s]+)\)/);
						if (values) {
							const parts = values[1].split(',').map(s => parseFloat(s.trim()));
							currentX = parts[4];
						}
					}
					// restore CSS animation but sync its progress to the current transform
					const trackWidth = track.scrollWidth;
					const moveWidth = trackWidth / 2; // because we translate -50%
					// normalize position inside [0, moveWidth)
					let pos = -currentX;
					pos = ((pos % moveWidth) + moveWidth) % moveWidth;
					const progress = pos / moveWidth; // 0..1
					const delay = -progress * marqueeDuration;
					// clear any transition and inline transform, then re-enable animation
					track.style.transition = '';
					track.style.transform = '';
					track.style.animation = `marquee-scroll ${marqueeDuration}s linear infinite`;
					track.style.animationDelay = `${delay}s`;
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
