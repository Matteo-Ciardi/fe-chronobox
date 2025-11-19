import CapsuleList from "../capsulecard/CapsuleList";

import "./Popular.css";

const Popular = () => {
	return (
		<>
			<section className="popular">
				<div className="section-header">
					<h2 className="sct-title">Più Popolari</h2>
					<p className="sct-subtitle">
						Le capsule più amate dai nostri clienti
					</p>
				</div>

				<div>
					<CapsuleList />
				</div>
			</section>
		</>
	);
};

export default Popular;
