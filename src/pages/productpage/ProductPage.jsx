import { useState, useEffect } from "react";
import { AiOutlineOrderedList } from "react-icons/ai";
import Select from "react-select";
import axios from "axios";

import ProductList from "../../components/productlist/ProductList";
import "./ProductPage.css";

// Select ordinamento
const orderOptions = [
	{ value: "", label: <span><AiOutlineOrderedList /></span> },
	{ value: "price_desc", label: "Prezzo Alto-Basso" },
	{ value: "price_asc", label: "Prezzo Basso-Alto" },
	{ value: "name_asc", label: "Nome A-Z" },
	{ value: "name_desc", label: "Nome Z-A" },
	{ value: "most_recent", label: "Recenti-Meno Recenti" },
	{ value: "less_recent", label: "Meno Recenti-Recenti" },
];

// Select temi fissi
const themeOptions = [
	{ value: "", label: <span><AiOutlineOrderedList /></span> },
	{ value: "classic", label: "Classic" },
	{ value: "premium", label: "Premium" },
	{ value: "eco", label: "Eco" },
	{ value: "limited", label: "Limited" },
	{ value: "flavor", label: "Flavor" },
	{ value: "designer", label: "Designer" },
	{ value: "coffee", label: "Coffee" },
	{ value: "tea", label: "Tea" },
	{ value: "kids", label: "Kids" },
	{ value: "sport", label: "Sport" },
	{ value: "gourmet", label: "Gourmet" },
];

const ProductPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [order, setOrder] = useState("");
	const [selectedTheme, setSelectedTheme] = useState("");
	const [products, setProducts] = useState([]);

	// Gestione input
	const handleSearchChange = (e) => setSearchTerm(e.target.value);
	const handleOrderChange = (option) => setOrder(option?.value || "");
	const handleThemeChange = (option) => setSelectedTheme(option?.value || "");

	// Fetch prodotti filtrati
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/capsules", {
					params: { search: searchTerm, order: order, theme: selectedTheme },
				});
				setProducts(Array.isArray(response.data) ? response.data : []);
			} catch (error) {
				console.error("Errore nel fetch dei prodotti:", error);
			}
		};
		fetchData();
	}, [searchTerm, order, selectedTheme]);

	return (
		<div className="product-wrapper">
			<section className="filters">
				<input
					type="text"
					placeholder="Cerca..."
					value={searchTerm}
					onChange={handleSearchChange}
				/>
				<Select
					className="order-select"
					classNamePrefix="order-select"
					value={orderOptions.find(opt => opt.value === order) || orderOptions[0]}
					onChange={handleOrderChange}
					options={orderOptions}
					isSearchable={false}
				/>
				<Select
					className="theme-select order-select"
					classNamePrefix="theme-select order-select"
					value={themeOptions.find(opt => opt.value === selectedTheme) || themeOptions[0]}
					onChange={handleThemeChange}
					options={themeOptions}
					isSearchable={false}
				/>
			</section>

			<ProductList products={products} />
		</div>
	);
};

export default ProductPage;
