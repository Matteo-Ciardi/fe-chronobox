import { useState } from "react";
import { AiOutlineOrderedList } from "react-icons/ai";

import Select from "react-select";

import ProductList from "../../components/productlist/ProductList";

import "./ProductPage.css";

const orderOptions = [
	{
		value: "",
		label: (
			<span>
				<AiOutlineOrderedList />
			</span>
		),
	},
	{ value: "price-desc", label: "Prezzo Alto-Basso" },
	{ value: "price-asc", label: "Prezzo Basso-Alto" },
	{ value: "name-asc", label: "Nome A-Z" },
	{ value: "name-desc", label: "Nome Z-A" },
	{ value: "recent-desc", label: "Recenti-Meno Recenti" },
	{ value: "recent-asc", label: "Meno Recenti-Recenti" },
];

const ProductPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [order, setOrder] = useState("");

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleOrderChange = (selectedOption) => {
		setOrder(selectedOption?.value || "");
	};

	const selectedOrderOption =
		orderOptions.find((opt) => opt.value === order) || orderOptions[0];

	return (
		<>
			<div className="product-wrapper">
				<section className="filters">
					<label className="searchbar-label">Cerca prodotti</label>
					<input
						className="searchbar"
						type="text"
						name="searchbar"
						placeholder="Cerca.."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<label className="	">Ordina per</label>
					<Select
						className="order-select"
						classNamePrefix="order-select"
						value={selectedOrderOption}
						onChange={handleOrderChange}
						options={orderOptions}
						isSearchable={false}
					/>
				</section>
				<ProductList searchTerm={searchTerm} order={order} />
			</div>
		</>
	);
};

export default ProductPage;
