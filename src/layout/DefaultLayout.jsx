import { Outlet } from "react-router-dom";
import { useProducts } from "../context/DefaultContext";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import CartSidebar from "../components/cartsidebar/CartSidebar";

import "./DefaultLayout.css";

const DefaultLayout = () => {
	const { isCartSidebarOpen, closeCartSidebar } = useProducts();

	return (
		<>
			<header>
				<Navbar />
			</header>

			<main>
				<Outlet />
			</main>

			<footer>
				<Footer />
			</footer>

			<CartSidebar
				isOpen={isCartSidebarOpen}
				onClose={closeCartSidebar}
			/>
		</>
	);
};

export default DefaultLayout;
