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

const themeOptions = [
	"Mini", "Tradizioni", "Amore", "Premium", "Cambiamento",
	"Viaggio", "Classic", "Ricordi"
];

const ProductPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [order, setOrder] = useState("");
	const [selectedThemes, setSelectedThemes] = useState([]);
	const [products, setProducts] = useState([]);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(100);

	// Gestione input
	const handleSearchChange = (e) => setSearchTerm(e.target.value);
	const handleOrderChange = (option) => setOrder(option?.value || "");

	const handleThemeChange = (theme) => {
		if (selectedThemes.includes(theme)) {
			setSelectedThemes(selectedThemes.filter(t => t !== theme));
		} else {
			setSelectedThemes([...selectedThemes, theme]);
		}
	};

	// Fetch prodotti filtrati
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/capsules", {
					params: {
						search: searchTerm,
						order,
						theme: selectedThemes.join(","),
						minPrice,
						maxPrice
					},
				});
				setProducts(Array.isArray(response.data) ? response.data : []);
			} catch (error) {
				console.error("Errore nel fetch dei prodotti:", error);
			}
		};
		fetchData();
	}, [searchTerm, order, selectedThemes, minPrice, maxPrice]);

	return (

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
					value={orderOptions.find(opt => opt.value === order) || orderOptions[0]}
					onChange={handleOrderChange}
					options={orderOptions}
					isSearchable={false}
				/>

				<div className="theme-checkboxes">
					{themeOptions.map(theme => (
						<label key={theme}>
							<input
								type="checkbox"
								value={theme}
								checked={selectedThemes.includes(theme)}
								onChange={() => handleThemeChange(theme)}
							/>
							{theme.charAt(0).toUpperCase() + theme.slice(1)}
						</label>
					))}
				</div>

				<div className="price-slider">
					<label>Prezzo Min: €{minPrice}</label>
					<input
						type="range"
						min="0"
						max="100"
						value={minPrice}
						onChange={(e) => setMinPrice(Number(e.target.value))}
					/>

					<label>Prezzo Max: €{maxPrice}</label>
					<input
						type="range"
						min="0"
						max="100"
						value={maxPrice}
						onChange={(e) => setMaxPrice(Number(e.target.value))}

					/>
				</div>

				<p className="product-count">
					{products.length} prodotti trovati
				</p>

			</section>

			<ProductList products={products} />
		</div>
	);
};

export default ProductPage;
