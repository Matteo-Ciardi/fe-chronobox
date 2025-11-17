import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const DefaultLayout = () => {
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
		</>
	);
};

export default DefaultLayout;
