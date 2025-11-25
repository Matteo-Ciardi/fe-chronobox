import { useState, useEffect } from "react";
import { AiOutlineOrderedList } from "react-icons/ai";
import Select from "react-select";
import axios from "axios";

import ProductList from "../../components/productlist/ProductList";
import RangeSlider from "../../components/rangeslider/RangeSlider";
import "./ProductPage.css";

// Select ordinamento
const orderOptions = [
	{
		value: "",
		label: (
			<span>
				<AiOutlineOrderedList className="select-icon" />
				Ordina per..
			</span>
		),
	},
	{ value: "price_desc", label: "Prezzo Alto-Basso" },
	{ value: "price_asc", label: "Prezzo Basso-Alto" },
	{ value: "name_asc", label: "Nome A-Z" },
	{ value: "name_desc", label: "Nome Z-A" },
	{ value: "most_recent", label: "Recenti-Meno Recenti" },
	{ value: "less_recent", label: "Meno Recenti-Recenti" },
];

const themeOptions = [
	"Mini",
	"Tradizioni",
	"Amore",
	"Premium",
	"Cambiamento",
	"Viaggio",
	"Classic",
	"Ricordi",
];

const ProductPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [order, setOrder] = useState("");
	const [selectedThemes, setSelectedThemes] = useState([]);
	const [onSaleOnly, setOnSaleOnly] = useState(false); // nuova checkbox
	const [products, setProducts] = useState([]);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(100);

	// Gestione input
	const handleSearchChange = (e) => setSearchTerm(e.target.value);
	const handleOrderChange = (option) => setOrder(option?.value || "");

	const handleThemeChange = (theme) => {
		if (selectedThemes.includes(theme)) {
			setSelectedThemes([]);
		} else {
			setSelectedThemes([theme]);
		}
	};

	const handleOnSaleChange = () => {
		setOnSaleOnly(!onSaleOnly);
	};

	// Fetch prodotti filtrati
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/capsules",
					{
						params: {
							search: searchTerm,
							order,
							theme: selectedThemes.join(","),
							minPrice,
							maxPrice,
							onSale: onSaleOnly,
						},
					},
				);
				setProducts(Array.isArray(response.data) ? response.data : []);
			} catch (error) {
				console.error("Errore nel fetch dei prodotti:", error);
			}
		};
		fetchData();
	}, [searchTerm, order, selectedThemes, minPrice, maxPrice, onSaleOnly]);

	return (
		<div className="product-wrapper">
			<section className="filters">
				<div className="searchbar-wrapper">
					<input
						className="searchbar"
						type="text"
						name="searchbar"
						placeholder=" "
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<label className="searchbar-label">Cerca prodotti</label>
				</div>

				<p className="product-count">
					({products.length} prodotti trovati)
				</p>

				<div className="sale-checkbox">
					<label className="checkbox-label">
						<input
							className="checkbox"
							type="checkbox"
							checked={onSaleOnly}
							onChange={handleOnSaleChange}
						/>
						In offerta
					</label>
				</div>

				<div className="theme-checkboxes">
					<label className="filter-label">Filtra per</label>
					{themeOptions.map((theme) => (
						<label key={theme} className="checkbox-label">
							<input
								className="checkbox"
								type="checkbox"
								value={theme}
								checked={selectedThemes.includes(theme)}
								onChange={() => handleThemeChange(theme)}
							/>
							{theme.charAt(0).toUpperCase() + theme.slice(1)}
						</label>
					))}
				</div>

				{/* Checkbox prodotti in promozione */}

				<div className="price-slider">
					<RangeSlider
						minValue={minPrice}
						maxValue={maxPrice}
						onMinChange={setMinPrice}
						onMaxChange={setMaxPrice}
						min={0}
						max={100}
					/>
				</div>

				<Select
					className="order-select"
					classNamePrefix="order-select"
					value={
						orderOptions.find((opt) => opt.value === order) ||
						orderOptions[0]
					}
					onChange={handleOrderChange}
					options={orderOptions}
					isSearchable={false}
				/>
			</section>

			{products.length > 0 ? (
				<ProductList products={products} />
			) : (
				<p className="no-products-message">Nessun prodotto trovato.</p>
			)}
		</div>
	);
};
export default ProductPage;
