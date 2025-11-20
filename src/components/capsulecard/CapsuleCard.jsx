import { Link } from "react-router-dom";

import "./CapsuleCard.css";

export default function CapsuleCard(props) {

	const { product } = props;

	if (!product) return null;
	return (
		<>
			<div className="container-capsule">
				<div className="container-image">
					<img
						src={`${product.img}`}
						alt={product.imgAlt}
					/>
				</div>

				<div className="container-capsule-body">
					<h5 className="capsule-title">{product.name}</h5>
					<p className="capsule-description">
						{product.description}
					</p>

					<div className="capsule-footer">
						<span className="capsule-price">&euro;{product.price}</span>
						<Link to="/dettagli" className="capsule-button">
							Dettagli
						</Link>

						{/* Test slug */}
						{/* <Link to={`/dettagli/${product.slug}`} className="capsule-button">
							Dettagli
						</Link> */}
					</div>
				</div>
			</div>
		</>
	);
}
