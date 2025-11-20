import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<div className="navbar-container">
					<NavLink to="/" className="navbar-brand">
						<h1>Chronobox</h1>
					</NavLink>

					<ul className="navbar-nav">
						<li>
							<NavLink to="/" className="nav-link" end>
								Home
							</NavLink>
						</li>

						<li>
							<NavLink to="/prodotti" className="nav-link">
								Prodotti
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
