import { useState, useEffect } from "react";
import { AiOutlineOrderedList } from "react-icons/ai";
import axios from "axios";

import Select from "react-select";

import ProductList from "../../components/productlist/ProductList";

import "./ProductPage.css";

const orderOptions = [
	{ value: "", label: <span><AiOutlineOrderedList /></span> },
	{ value: "price_desc", label: "Prezzo Alto-Basso" },
	{ value: "price_asc", label: "Prezzo Basso-Alto" },
	{ value: "name_asc", label: "Nome A-Z" },
	{ value: "name_desc", label: "Nome Z-A" },
	{ value: "most_recent", label: "Recenti-Meno Recenti" },
	{ value: "less_recent", label: "Meno Recenti-Recenti" },
];

const ProductPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [order, setOrder] = useState("");
	const [products, setProducts] = useState([]);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleOrderChange = (selectedOption) => {
		setOrder(selectedOption?.value || "");
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/capsules", {
					params: { search: searchTerm, order: order },
				});
				setProducts(Array.isArray(response.data) ? response.data : []);
			} catch (error) {
				console.error("Errore nel fetch dei prodotti:", error);
			}
		};

		fetchData();
	}, [searchTerm, order]);


	return (
		<>
			<div className="product-wrapper">
				<section className="filters">
					<input
						type="text"
						name="searchbar"
						placeholder="Cerca.."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<Select
						className="order-select"
						classNamePrefix="order-select"
						value={orderOptions.find((opt) => opt.value === order) || orderOptions[0]}
						onChange={handleOrderChange}
						options={orderOptions}
						isSearchable={false}
					/>
				</section>
				{/* <ProductList searchTerm={searchTerm} order={order} /> */}
				<ProductList products={products} />
			</div>
		</>
	);
};

export default ProductPage;
