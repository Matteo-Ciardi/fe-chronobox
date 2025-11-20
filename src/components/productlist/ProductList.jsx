import { useProducts } from "../../context/DefaultContext";

import CapsuleCard from "../capsulecard/CapsuleCard";

import "./ProductList.css";

const ProductList = ({ searchTerm = "", order = "" }) => {
	const { products } = useProducts();

	const normalizedSearch = searchTerm.toLowerCase();

	const filteredProducts = products.filter((product) => {
		const productName = product.name || product.title || "";
		return productName.toLowerCase().includes(normalizedSearch);
	});

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		switch (order) {
			case "price-asc":
				// prezzo basso → alto
				return a.price - b.price;
			case "price-desc":
				// prezzo alto → basso
				return b.price - a.price;
			case "name-asc":
				// nome A → Z
				return a.name.localeCompare(b.name);
			case "name-desc":
				// nome Z → A
				return b.name.localeCompare(a.name);
			case "recent-desc":
				// recenti → meno recenti (id più alto per primo)
				return b.id - a.id;
			case "recent-asc":
				// meno recenti → recenti (id più basso per primo)
				return a.id - b.id;
			default:
				// DEFAULT: raggruppa per tema (A-Z), con id come tie-breaker
				if (a.theme === b.theme) {
					return a.id - b.id;
				}
				return a.theme.localeCompare(b.theme);
		}
	});

	return (
		<>
			<div className="product-list-container">
				{sortedProducts.map((product) => (
					<CapsuleCard key={product.id} product={product} />
				))}
			</div>
		</>
	);
};

export default ProductList;
