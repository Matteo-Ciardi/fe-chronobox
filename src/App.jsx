import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultProvider } from "./context/DefaultContext";

import CartPage from "./pages/cartpage/Cart";
import HomePage from "./pages/homepage/HomePage";
import DetailPage from "./pages/detailpage/DetailPage";
import WishlistPage from "./pages/wishlistpage/WishlistPage";
import ProductPage from "./pages/productpage/ProductPage";
import CheckoutPage from "./pages/checkoutpage/CheckutPage";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import DefaultLayout from "./layout/DefaultLayout";

import "./App.css";

function App() {
	return (
		<DefaultProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<DefaultLayout />}>
						<Route index element={<HomePage />} />
						<Route path="/home" element={<HomePage />} />
						<Route path="/prodotti" element={<ProductPage />} />
						<Route path="/dettagli" element={<DetailPage />} />
						<Route path="/wishlist" element={<WishlistPage />} />
						<Route
							path="/dettagli/:slug"
							element={<DetailPage />}
						/>
						<Route path="/carrello" element={<CartPage />} />
						<Route path="/checkout" element={<CheckoutPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</DefaultProvider>
	);
}

export default App;
