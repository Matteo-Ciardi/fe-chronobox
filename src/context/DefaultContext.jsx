import { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";

const DefaultContext = createContext();

const CART_KEY = "cart";

// Legge il carrello da localStorage all'inizio
const getInitialCart = () => {
	if (typeof window === "undefined") return [];
	const stored = localStorage.getItem(CART_KEY);
	if (!stored) return [];
	try {
		return JSON.parse(stored);
	} catch {
		return [];
	}
};

const DefaultProvider = ({ children }) => {
	// const [products, setProducts] = useState([]);
	const [cart, setCart] = useState(getInitialCart);
	const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

	// function fetchProducts() {
	// 	axios
	// 		.get("http://localhost:3000/api/capsules")
	// 		.then((res) => {
	// 			console.log("RESPONSE:", res.data);
	// 			setProducts(res.data);
	// 		})
	// 		.catch((error) => console.error("FETCH ERROR:", error));
	// }

	// useEffect(() => {
	// 	fetchProducts();
	// }, []);

	// Ogni volta che il carrello cambia, lo salvo in localStorage
	useEffect(() => {
		localStorage.setItem(CART_KEY, JSON.stringify(cart));
	}, [cart]);

	// Aggiungi al carrello
	const addToCart = (product, customData = {}) => {
		setCart((prev) => {
			// const existing = prev.find((item) => item.id === product.id);

			const price = product.discounted_price ?? product.price;

			// if (existing) {
			// 	return prev.map((item) =>
			// 		item.id === product.id
			// 			? { ...item, quantity: item.quantity + 1 }
			// 			: item,
			// 	);
			// }

			function getCurrentTime() {
				const now = new Date();

				const hours = now.getHours();
				const minutes = now.getMinutes();
				const seconds = now.getSeconds();

				const currentTime = `${hours}:${minutes}:${seconds}`;

				return currentTime;
			}

			return [
				...prev,
				{
					id: product.id,
					time: getCurrentTime(),
					name: product.name,
					price,
					image: product.img,
					slug: product.slug,
					quantity: 1,
					...customData,
				},
			];
		});
	};

	// Imposta una quantità specifica
	const updateQuantity = (time, quantity) => {
		const safeQty = Math.max(1, quantity);
		setCart((prev) =>
			prev.map((item) =>
				item.time === time ? { ...item, quantity: safeQty } : item,
			),
		);
	};

	// Rimuovi prodotto
	const removeFromCart = (time) => {
		setCart((prev) => prev.filter((item) => item.time !== time));
	};

	const clearCart = () => setCart([]);

	const cartTotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

	const openCartSidebar = () => setIsCartSidebarOpen(true);
	const closeCartSidebar = () => setIsCartSidebarOpen(false);

	return (
		<DefaultContext.Provider
			value={{
				// products,
				cart,
				addToCart,
				updateQuantity,
				removeFromCart,
				clearCart,
				cartTotal,
				cartCount,
				isCartSidebarOpen,
				openCartSidebar,
				closeCartSidebar,
			}}
		>
			{children}
		</DefaultContext.Provider>
	);
};

const useProducts = () => {
	const context = useContext(DefaultContext);
	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { DefaultProvider, useProducts };
