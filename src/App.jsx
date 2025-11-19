import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultProvider } from "./context/DefaultContext";

import HomePage from "./pages/homepage/HomePage";
import ProductPage from "./pages/productpage/ProductPage";
import DetailPage from "./pages/detailpage/DetailPage";
import DefaultLayout from "./layout/DefaultLayout";

import "./App.css";

function App() {
	const WhoWeArePage = () => <h1>Chi Siamo</h1>;
	const ContactPage = () => <h1>Contatti</h1>;

	return (
		<DefaultProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<DefaultLayout />}>
						<Route index element={<HomePage />} />
						<Route path="/prodotti" element={<ProductPage />} />
						<Route path="/chi-siamo" element={<WhoWeArePage />} />
						<Route path="/contatti" element={<ContactPage />} />
						<Route path="/dettagli" element={<DetailPage />} />
						<Route path="/dettagli-premium" element={<PremiumPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</DefaultProvider>
	);
}

export default App;
