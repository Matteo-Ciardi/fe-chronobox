import { Link } from "react-router-dom";

import "./CapsuleCard.css";

export default function CapsuleCard() {
	return (
		<>
			<div className="container-cards">
				<div className="container-capsule">
					<div className="container-image">
						<img
							src="./src/assets/img/capsula-amore-verde.png"
							alt="capsule-classic"
						/>
					</div>

					<div className="container-capsule-body">
						<h5 className="capsule-title">Capsula Cupido</h5>
						<p className="capsule-description">
							Capsula da regalare alla persona amata
						</p>

						<div className="capsule-footer">
							<span className="capsule-price">&euro;50,00</span>
							<Link to="/dettagli" className="capsule-button">
								Dettagli
							</Link>
						</div>
					</div>
				</div>

				{/*  */}

				<div className="container-capsule">
					<div className="container-image">
						<img
							src="./src/assets/img/capsule-mini.jpg"
							alt="capsule-mini"
						/>
					</div>

					<div className="container-capsule-body">
						<h5 className="capsule-title">Capsula Amicizia</h5>
						<p className="capsule-description">
							Capsula da regalare ad un amico
						</p>
						<div className="capsule-footer">
							<span className="capsule-price">&euro;30,00</span>
							<Link to="/dettagli" className="capsule-button">
								Dettagli
							</Link>
						</div>
					</div>
				</div>

				{/*  */}

				<div className="container-capsule">
					<div className="container-image">
						<img
							src="./src/assets/img/capsule-premium.jpg"
							alt="capsule-premium"
						/>
					</div>

					<div className="container-capsule-body">
						<h5 className="capsule-title">Capsula Laurea</h5>
						<p className="capsule-description">
							Capsula da regalare per una laurea
						</p>

						<div className="capsule-footer">
							<span className="capsule-price">&euro;45,00</span>
							<Link to="/dettagli" className="capsule-button">
								Dettagli
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
