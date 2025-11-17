import CapsuleCard from "../../components/capsulecard/CapsuleCard";
import Hero from "../../components/hero/Hero";

import "./HomePage.css";

const HomePage = () => {
	return (
		<>
			<div className="page-wrapper">
				<Hero />
				
			</div>

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
		</>
	);
};

export default HomePage;
