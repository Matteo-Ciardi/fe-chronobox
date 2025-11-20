import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultProvider } from "./context/DefaultContext";

import HomePage from "./pages/homepage/HomePage";
import ProductPage from "./pages/productpage/ProductPage";
import DetailPage from "./pages/detailpage/DetailPage";
import DefaultLayout from "./layout/DefaultLayout";

import "./App.css";

function App() {

	return (
		<DefaultProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<DefaultLayout />}>
						<Route index element={<HomePage />} />
						<Route path="/prodotti" element={<ProductPage />} />
						<Route path="/dettagli/:slug" element={<DetailPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</DefaultProvider>
	);
}

export default App;
