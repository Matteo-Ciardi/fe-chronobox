import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
	const [searchParams, setSearchParams] = useSearchParams();
	const initialSearch = searchParams.get("search") || "";
	const initialOrder = searchParams.get("order") || "";
	const initialThemeParam = searchParams.get("theme") || "";
	const initialSelectedThemes =
		initialThemeParam === "" ? [] : initialThemeParam.split(",");
	const initialOnSale =
		(searchParams.get("onSale") || "") === "true" ||
		(searchParams.get("onSale") || "") === "1";
	const initialMinPrice = Number(searchParams.get("minPrice")) || 0;
	const initialMaxPrice = Number(searchParams.get("maxPrice")) || 100;

	const [searchTerm, setSearchTerm] = useState(() => initialSearch);
	const [order, setOrder] = useState(() => initialOrder);
	const [selectedThemes, setSelectedThemes] = useState(
		() => initialSelectedThemes,
	);
	const [onSaleOnly, setOnSaleOnly] = useState(() => initialOnSale);
	const [products, setProducts] = useState([]);
	const [minPrice, setMinPrice] = useState(() => initialMinPrice);
	const [maxPrice, setMaxPrice] = useState(() => initialMaxPrice);
	const [filtersOpen, setFiltersOpen] = useState(false);

	const toggleFilters = () => setFiltersOpen((prev) => !prev);

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

	useEffect(() => {
		const params = Object.fromEntries([...searchParams.entries()]);

		if (params.search !== undefined) setSearchTerm(params.search);
		if (params.order !== undefined) setOrder(params.order);
		if (params.theme !== undefined)
			setSelectedThemes(
				params.theme === "" ? [] : params.theme.split(","),
			);
		if (params.onSale !== undefined)
			setOnSaleOnly(params.onSale === "true" || params.onSale === "1");
		if (params.minPrice !== undefined)
			setMinPrice(Number(params.minPrice) || 0);
		if (params.maxPrice !== undefined)
			setMaxPrice(Number(params.maxPrice) || 100);
	}, [searchParams]);

	useEffect(() => {
		const params = {};
		if (searchTerm) params.search = searchTerm;
		if (order) params.order = order;
		if (selectedThemes.length > 0) params.theme = selectedThemes.join(",");
		if (onSaleOnly) params.onSale = "true";
		if (minPrice !== undefined && minPrice !== null)
			params.minPrice = String(minPrice);
		if (maxPrice !== undefined && maxPrice !== null)
			params.maxPrice = String(maxPrice);

		setSearchParams(params, { replace: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm, order, selectedThemes, minPrice, maxPrice, onSaleOnly]);

	// Fetch filtered products from backend
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/capsules",
					{
						params: {
							search: searchTerm,
							order: order.startsWith("price_") ? "" : order, // Don't send price orders to backend
							theme: selectedThemes.join(","),
							minPrice,
							maxPrice,
							onSale: onSaleOnly,
						},
					},
				);
				let fetchedProducts = Array.isArray(response.data)
					? response.data
					: [];
				// Sort client-side for price orders using effective price
				if (order === "price_desc") {
					fetchedProducts.sort(
						(a, b) =>
							(b.discounted_price || b.price) -
							(a.discounted_price || a.price),
					);
				} else if (order === "price_asc") {
					fetchedProducts.sort(
						(a, b) =>
							(a.discounted_price || a.price) -
							(b.discounted_price || b.price),
					);
				}
				setProducts(fetchedProducts);
			} catch (error) {
				console.error("Errore nel fetch dei prodotti:", error);
			}
		};
		fetchData();
	}, [searchTerm, order, selectedThemes, minPrice, maxPrice, onSaleOnly]);

	return (
		<div className="product-wrapper">
			{/* Mobile accordion button */}
			<button
				className="filters-accordion-toggle"
				onClick={toggleFilters}
			>
				{filtersOpen ? "▲ Nascondi Filtri" : "▼ Mostra Filtri"}
			</button>

			<section className={`filters ${filtersOpen ? "filters-open" : ""}`}>
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
				<p className="no-products-message">Nessun prodotto trovato</p>
			)}
		</div>
	);
};
export default ProductPage;
