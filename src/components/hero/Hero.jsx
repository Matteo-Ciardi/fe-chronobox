import { GoClock } from "react-icons/go";
import { BsBoxSeam } from "react-icons/bs";
import { IoShieldOutline } from "react-icons/io5";

import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<>
			<section className="hero">
				<div className="hero-image"></div>

				<div className="hero-content">
					<h1 className="hero-title">
						Benvenuto in <br />
						<span>Chronobox</span>
					</h1>

					<p className="subtitle">
						Rivoluzionare i ricordi per un futuro incerto
					</p>

					<div className="hero-buttons">
						<Link to="/prodotti">
							<button className="hero-btn">
								Scegli una capsula
							</button>
						</Link>
					</div>
				</div>

				<div className="features">
					<div className="feature-item">
						<GoClock size={60} />
						<h3 className="features-title">Duratura</h3>
						<p className="features-content">
							Materiali premium garantiti per 100+ anni
						</p>
					</div>

					<div className="feature-item">
						<IoShieldOutline size={60} />
						<h3 className="features-title">Protetta</h3>
						<p className="features-content">
							Design ermetico a prova di acqua e polvere
						</p>
					</div>

					<div className="feature-item">
						<BsBoxSeam size={60} />
						<h3 className="features-title">Elegante</h3>
						<p className="features-content">
							Design minimalista che si adatta a ogni ambiente
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default Hero;
