import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";

import "./Footer.css";

export default function Footer() {
	return (
		<div className="footer">
			<div className="footer-container">
				<div className="footer-col">
					<h5 className="footer-title">Chronobox</h5>
					<p className="footer-text">
						Conserva ciò che conta davvero. Le nostre capsule del
						tempo sono progettate per preservare i tuoi ricordi più
						preziosi per le generazioni future.
					</p>

					<div className="footer-social">
						<a href="#">
							<FaFacebook size={20} />
						</a>
						<a href="#">
							<SlSocialInstagram size={20} />
						</a>
						<a href="#">
							<SlSocialTwitter size={20} />
						</a>
						<a href="#">
							<MdEmail size={20} />
						</a>
					</div>
				</div>

				<div className="footer-col">
					<h6 className="footer-subtitle">Link Rapidi</h6>
					<ul className="footer-list">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/products">Prodotti</Link>
						</li>
						<li>
							<Link to="/about">Chi Siamo</Link>
						</li>
						<li>
							<Link to="/contact">Contatti</Link>
						</li>
					</ul>
				</div>

				{/* Assistenza */}
				<div className="footer-col">
					<h6 className="footer-subtitle">Assistenza</h6>
					<ul className="footer-list">
						<li>
							<Link to="/faq">FAQ</Link>
						</li>
						<li>
							<Link to="/shipping">Spedizioni</Link>
						</li>
						<li>
							<Link to="/returns">Resi</Link>
						</li>
						<li>
							<Link to="/warranty">Garanzia</Link>
						</li>
					</ul>
				</div>
			</div>

			<hr className="footer-divider" />

			<div className="footer-bottom">
				<p>© 2024 Chronobox. Tutti i diritti riservati.</p>

				<div className="footer-bottom-links">
					<Link to="/privacy">Privacy Policy</Link>
					<Link to="/terms">Termini e Condizioni</Link>
				</div>
			</div>
		</div>
	);
}
