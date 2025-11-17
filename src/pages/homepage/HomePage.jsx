import CapsuleCard from "../../components/capsulecard/CapsuleCard";

import "./HomePage.css";

const HomePage = () => {
	return (
		<>
			<div className="page-wrapper">
				<section className="hero">
					<div className="hero-image">
						<img alt="Chronobox Time Capsule" />
					</div>

					<div className="hero-content">
						<h1>
							Benvenuto in <br />
							<span>Chronobox</span>
						</h1>

						<p className="subtitle">
							Conserva ciò che conta davvero
						</p>

						<div className="hero-buttons">
							<button>Acquista una capsula</button>
							<button>Scopri come funziona</button>
						</div>

						<div className="features">
							<div className="feature-item">
								<h3>Duratura</h3>
								<p>Materiali premium garantiti per 100+ anni</p>
							</div>

							<div className="feature-item">
								<h3>Protetta</h3>
								<p>
									Design ermetico a prova di acqua e polvere
								</p>
							</div>

							<div className="feature-item">
								<h3>Elegante</h3>
								<p>
									Design minimalista che si adatta a ogni
									ambiente
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="new-arrivals">
					<div className="section-header">
						<h2>Nuovi Arrivi</h2>
						<p>Scopri le nostre ultime capsule del tempo</p>
					</div>

					<div>
						<CapsuleCard />
					</div>
				</section>

				<section className="popular">
					<div className="section-header">
						<h2>Più Popolari</h2>
						<p>Le capsule più amate dai nostri clienti</p>
					</div>

					<div>
						<CapsuleCard />
					</div>
				</section>
			</div>
		</>
	);
};

export default HomePage;
