import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultProvider } from "./context/DefaultContext";

import CartPage from "./pages/cartpage/Cart";
import HomePage from "./pages/homepage/HomePage";
import DetailPage from "./pages/detailpage/DetailPage";
import ProductPage from "./pages/productpage/ProductPage";
import DefaultLayout from "./layout/DefaultLayout";

import "./App.css";

function App() {;
	return (
		<DefaultProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<DefaultLayout />}>
						<Route index element={<HomePage />} />
						<Route path="/prodotti" element={<ProductPage />} />
						<Route path="/carrello" element={<CartPage />} />
						<Route path="/dettagli" element={<DetailPage />} />

						{/* Test slug */}
						{/* <Route path="/dettagli/:slug" element={<DetailPage />} /> */}
					</Route>
				</Routes>
			</BrowserRouter>
		</DefaultProvider>
	);
}

export default App;
