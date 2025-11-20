import { useProducts } from "../../context/DefaultContext";

import CapsuleCard from "./CapsuleCard";

import "./CapsuleList.css";

export default function CapsuleList() {
	const { products } = useProducts();

	if (!products || products.length === 0) return null;

	const newArrivals = products.slice(-6);

	const marqueeItems = [...newArrivals, ...newArrivals];

	return (
		<>
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
		</>
	);
}
