import { Link } from "react-router-dom";

import "./CapsuleCard.css";

export default function CapsuleCard() {
	return (
		<>
			<div className="container-cards">
				<div className="container-capsule">
					<div className="container-image">
						<img
							src="src/assets/img/capsula_di_coppia.png"
							alt="capsule-couple"
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
							src="src/assets/img/ritratto_di_un_anno.png"
							alt="capsule-mini"
						/>
					</div>

					<div className="container-capsule-body">
						<h5 className="capsule-title">Capsula "Il mio anno"</h5>
						<p className="capsule-description">
							Conserva i momenti speciali del tuo anno 
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
							src="src/assets/img/futuro_me.png"
							alt="capsule-premium"
						/>
					</div>

					<div className="container-capsule-body">
						<h5 className="capsule-title">Capsula "Futuro me"</h5>
						<p className="capsule-description">
							Conserva buoni propositi per un futuro te
						</p>

						<div className="capsule-footer">
							<span className="capsule-price">&euro;179,00</span>
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
