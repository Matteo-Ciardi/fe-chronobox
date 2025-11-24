// import CapsuleCard from "../capsulecard/CapsuleCard";
import CapsuleList from "../newarrivalslist/CapsuleList";

import "./NewArrivals.css";

const NewArrivals = () => {
	return (
		<>
			<section className="new-arrivals">
				<div className="section-header">
					<h2 className="sct-title">Nuovi Arrivi</h2>
					<p className="sct-subtitle">
						Scopri le nostre ultime capsule del tempo
					</p>
				</div>

				<div>
					<CapsuleList />
				</div>
			</section>
		</>
	);
};

export default NewArrivals;
