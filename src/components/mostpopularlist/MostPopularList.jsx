import { useProducts } from "../../context/DefaultContext";

import CapsuleCard from "../capsulecard/CapsuleCard";

import "./MostPopularList.css";

export default function MostPopularList() {
	const { products } = useProducts();

	if (!products || products.length === 0) return null;

	const newArrivals = products.slice(0, 6);

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
