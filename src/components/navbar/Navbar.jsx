import { NavLink } from "react-router-dom";

import './Navbar.css'

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<div className="navbar-container">
					<NavLink to="/" className="navbar-brand">
						Chronobox
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

						<li>
							<NavLink to="/chi-siamo" className="nav-link">
								Chi Siamo
							</NavLink>
						</li>

						<li>
							<NavLink to="/contatti" className="nav-link">
								Contatti
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
