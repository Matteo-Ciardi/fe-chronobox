import { NavLink, useLocation } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { useProducts } from "../../context/DefaultContext";

import "./Navbar.css";

const Navbar = () => {
	const containerRef = useRef(null);
	const homeRef = useRef(null);
	const prodottiRef = useRef(null);
	const wishlistRef = useRef(null);
	const carrelloRef = useRef(null);
	const indicatorRef = useRef(null);
	const location = useLocation();
	const { openCartSidebar, cartCount } = useProducts();
	const [indicatorStyle, setIndicatorStyle] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	});

	const moveIndicatorTo = (el) => {
		if (!el || !containerRef.current) return;
		const containerRect = containerRef.current.getBoundingClientRect();
		const rect = el.getBoundingClientRect();
		const left = rect.left - containerRect.left;
		const width = rect.width;
		// set with a small opacity so it fades in on first mount
		setIndicatorStyle({
			left: Math.round(left),
			width: Math.round(width),
			opacity: 1,
		});
	};

	// update on route change (handles back/forward and programmatic navigation)
	useEffect(() => {
		const path = location.pathname;
		if (path === "/") moveIndicatorTo(homeRef.current);
		else if (path.startsWith("/prodotti"))
			moveIndicatorTo(prodottiRef.current);
		else if (path.startsWith("/wishlist"))
			moveIndicatorTo(wishlistRef.current);
		else if (path.startsWith("/carrello"))
			moveIndicatorTo(carrelloRef.current);
		else moveIndicatorTo(homeRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	// on first mount try to position indicator
	useEffect(() => {
		// small timeout to ensure layout is ready
		const t = setTimeout(() => {
			if (location.pathname === "/") moveIndicatorTo(homeRef.current);
			else if (location.pathname.startsWith("/prodotti"))
				moveIndicatorTo(prodottiRef.current);
			else if (location.pathname.startsWith("/wishlist"))
				moveIndicatorTo(wishlistRef.current);
			else if (location.pathname.startsWith("/carrello"))
				moveIndicatorTo(carrelloRef.current);
		}, 0);
		return () => clearTimeout(t);
	}, []);

	// Stato menu mobile
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
	const closeMobileMenu = () => setMobileMenuOpen(false);

	// Stato wishlist count
	const [wishlistCount, setWishlistCount] = useState(0);

	useEffect(() => {
		const updateWishlistCount = () => {
			const wishlist = JSON.parse(
				localStorage.getItem("wishlist") || "[]",
			);
			setWishlistCount(wishlist.length);
		};
		updateWishlistCount();
		window.addEventListener("wishlistUpdate", updateWishlistCount);
		return () =>
			window.removeEventListener("wishlistUpdate", updateWishlistCount);
	}, []);

	return (
		<nav className="navbar">
			<div className="container">
				<h4 className="shipping-header">
					COSTI DI SPEDIZIONE: €30 📦 GRATIS SOPRA I €170 🚀
				</h4>
				<div className="navbar-container" ref={containerRef}>
					<button
						className={`hamburger ${mobileMenuOpen ? "is-open" : ""}`}
						onClick={toggleMobileMenu}
						aria-label="Menu"
						aria-expanded={mobileMenuOpen}
						type="button"
					>
						<span className="hamburger-box">
							<span className="hamburger-inner"></span>
						</span>
					</button>

					<ul
						className={`navbar-left ${mobileMenuOpen ? "open" : ""}`}
						onClick={closeMobileMenu}
					>
						<li className="nav-links">
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? "nav-link active" : "nav-link"
								}
								end
							>
								<span className="nav-label" ref={homeRef}>
									Home
								</span>
							</NavLink>
						</li>

						<li className="nav-links">
							<NavLink
								to="/prodotti"
								className={({ isActive }) =>
									isActive ? "nav-link active" : "nav-link"
								}
							>
								<span className="nav-label" ref={prodottiRef}>
									Prodotti
								</span>
							</NavLink>
						</li>
					</ul>

					<NavLink to="/" className="navbar-brand">
						<img
							className="logo"
							src="src/assets/img/IMG_3403.png"
							alt="page_logo"
						/>
					</NavLink>

					<ul className="navbar-right">
						<li className="nav-icon">
							<NavLink
								to="/wishlist"
								className={({ isActive }) =>
									isActive ? "nav-link active" : "nav-link"
								}
							>
								<span
									className="nav-label wishlist-label"
									ref={wishlistRef}
								>
									<FaRegHeart size="22px" />
									{wishlistCount > 0 && (
										<span className="wishlist-badge"></span>
									)}
								</span>
							</NavLink>
						</li>
						<li className="nav-icon">
							<button
								type="button"
								className="nav-cart-btn"
								onClick={openCartSidebar}
								aria-label="Apri carrello"
								ref={carrelloRef}
							>
								<IoMdCart size="25px" />
								{cartCount > 0 && (
									<span className="cart-badge">
										{cartCount}
									</span>
								)}
							</button>
						</li>
					</ul>

					<div
						ref={indicatorRef}
						className="nav-indicator"
						style={{
							left: indicatorStyle.left + "px",
							width: indicatorStyle.width + "px",
							opacity: indicatorStyle.opacity,
						}}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
