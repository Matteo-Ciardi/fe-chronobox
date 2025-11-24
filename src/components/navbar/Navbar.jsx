import { NavLink, useLocation } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

import "./Navbar.css";

const Navbar = () => {
	const containerRef = useRef(null);
	const homeRef = useRef(null);
	const prodottiRef = useRef(null);
	const wishlistRef = useRef(null);
	const carrelloRef = useRef(null);
	const indicatorRef = useRef(null);
	const location = useLocation();
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

	return (
		<nav className="navbar">
			<div className="container">
				<div className="navbar-container" ref={containerRef}>
					<ul className="navbar-left">
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
						<h1>Chronobox</h1>
					</NavLink>

					<ul className="navbar-right">
						<li className="nav-icon">
							<NavLink
								to="/wishlist"
								className={({ isActive }) =>
									isActive ? "nav-link active" : "nav-link"
								}
							>
								<span className="nav-label" ref={wishlistRef}>
									<FaRegHeart size="22px" />
								</span>
							</NavLink>
						</li>
						<li className="nav-icon">
							<NavLink
								to="/carrello"
								className={({ isActive }) =>
									isActive ? "nav-link active" : "nav-link"
								}
							>
								<span className="nav-label" ref={carrelloRef}>
									<IoMdCart size="25px" />
								</span>
							</NavLink>
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
