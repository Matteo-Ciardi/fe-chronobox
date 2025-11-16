import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";

const DefaultLayout = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>

			<main>
				<Outlet />
			</main>

			<footer>-- CREARE FOOTER --</footer>
		</>
	);
};

export default DefaultLayout;
