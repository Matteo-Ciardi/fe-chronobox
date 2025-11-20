import { useState } from "react";
import { useProducts } from "../../context/DefaultContext"
import { useLocation, useNavigate } from 'react-router-dom'

import "./DetailPage.css";

// Import test slug
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";

export default function DetailPage({ onSelectPage }) {
	const [rotation, setRotation] = useState({ x: 0, y: 0 });

	const location = useLocation();
	const navigate = useNavigate();
	const { addToCart } = useProducts();

	const product = location.state?.product;

	// Se arrivi a /dettagli senza aver passato state (es. refresh diretto)
	if (!product) {
		return <p>Nessun prodotto selezionato.</p>;
	}

	// ------------------------------------------ test slug -------------------------------------------------------

	// const { slug } = useParams(); // Recupero slug dall' URL della rotta
	// const [product, setProduct] = useState(null); // Hook di stato per salvare i dati dinamici della capsula dal backend
	// const [loading, setLoading] = useState(true); // Hook di stato per salvare lo stato della risposta API

	// Funzione che recupera la capsula cliccata dal backend tramite slug
	// function fetchProduct() {
	// 	setLoading(true); // inizio caricamento per aspettare risp API
	// 	axios.get(`http://localhost:3000/api/capsule/${slug}`)
	// 		.then((res) => {
	// 			console.log("DETAIL RESPONSE:", res.data);
	// 			setProduct(res.data);
	// 		})
	// 		.catch((error) => {
	// 			console.error("DETAIL ERROR:", error);
	// 		})
	// 		.finally(() => {
	// 			setLoading(false); // fine caricamento (sia successo che errore)
	// 		});
	// }

	// Hook di effetto che chiama la funzione fetchProduct ogni volta che cambia lo slug
	// useEffect(() => {
	// 	fetchProduct();
	// }, [slug]);

	// Evito crash se i dati non sono ancora caricati
	// if (loading || !product) return null;

	// ------------------------------------------------------------------------------------------------------------


	// VARIANTI COLORE DELLA CAPSULA AMORE
	const variants = [
		{
			id: "verde",
			name: "Capsula Futuro Me",
			price: "€179,00",
			image: "src/assets/img/futuro_me.png",
			accentColor: "#8FB396",
			label: "Verde",
		},
	];

	const [selectedVariant, setSelectedVariant] = useState(variants[0]);

	function handleMouseMove(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const midX = rect.width / 2;
		const midY = rect.height / 2;

		const rotY = ((x - midX) / midX) * 15;
		const rotX = -((y - midY) / midY) * 15;

		setRotation({ x: rotX, y: rotY });
	}

	function handleMouseLeave() {
		setRotation({ x: 0, y: 0 });
	}

	const imgStyle = {
		transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
	};

	const handleAddToCart = () => {
		addToCart(product);
		navigate("/carrello");
	};

	// PRODOTTI CORRELATI
	const relatedProducts = [
		{
			name: "Capsula Futuro Me Blu",
			price: "€179,00",
			image: "src/assets/img/futuro_me_blu.jpg",
			target: "premium",
		},
		{
			name: "Capsula Futuro Me Blu Bronzo",
			price: "€179,00",
			image: "src/assets/img/futuro_me_bronzo.jpg",
			target: null,
		},
		{
			name: "Capsula Futuro Me Blu Oro",
			price: "€179,00",
			image: "src/assets/img/futuro_me_oro.jpg",
			target: null,
		},
		{
			name: "Capsula Futuro Me Blu Verde",
			price: "€179,00",
			image: "src/assets/img/futuro_me_verde.jpg",
			target: null,
		}
	];

	// COSA PUOI CONSERVARE
	const itemsToStore = [
		{
			title: "Lettere",
			caption: "Messaggi che durano per sempre",
			image: "src/assets/img/lettere.jpeg",
		},
		{
			title: "Foto",
			caption: "Momenti condivisi",
			image: "src/assets/img/foto.jpg",
		},
		{
			title: "Ricordi",
			caption: "Biglietti, oggetti simbolici",
			image: "src/assets/img/oggetti.jpg",
		},
		{
			title: "Promesse",
			caption: "Documenti e dediche speciali",
			image: "src/assets/img/documenti.jpg",
		},
	];

	return (
		<div className="amore-container">
			<div className="amore-content">
				<div
					className="amore-image-box"
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
				>
					<img
						src={product.img}
						alt={product.name}
						className="amore-image"
						style={imgStyle}
					/>
				</div>

				<div className="amore-info">
					<h1>{product.name}</h1>
					<p className="amore-price">
						{(product.discounted_price ?? product.price) + " €"}
					</p>

					<h2 className="amore-section-title">Descrizione</h2>

					<p className="amore-description">
						{product.description}
					</p>

					<button
						className="amore-btn"
						onClick={handleAddToCart}
					>
						Aggiungi al carrello
					</button>

					<div className="amore-feature-box">
						<div className="amore-feature">
							<strong>Dimensioni</strong>
							<span>18cm × 7cm ø</span>
						</div>
						<div className="amore-feature">
							<strong>Materiale</strong>
							<span>Acciaio inox 316</span>
						</div>
						<div className="amore-feature">
							<strong>Peso</strong>
							<span>720g</span>
						</div>
						<div className="amore-feature">
							<strong>Consegna</strong>
							<span>1-5 anni</span>
						</div>
					</div>
				</div>
			</div>

			{/* SPECIFICHE TECNICHE */}
			<h2 className="amore-section-title">Specifiche tecniche</h2>
			<div className="amore-specs">
				<div className="amore-spec-row">
					<span className="amore-spec-label">Peso</span>
					<span className="amore-spec-value">720 g</span>
				</div>
				<div className="amore-spec-row">
					<span className="amore-spec-label">Capacità</span>
					<span className="amore-spec-value">7 litri</span>
				</div>
				<div className="amore-spec-row">
					<span className="amore-spec-label">
						Materiale principale
					</span>
					<span className="amore-spec-value">
						Acciaio inossidabile 316
					</span>
				</div>
				<div className="amore-spec-row">
					<span className="amore-spec-label">Resistenza</span>
					<span className="amore-spec-value">IP68</span>
				</div>
				<div className="amore-spec-row">
					<span className="amore-spec-label">Garanzia</span>
					<span className="amore-spec-value">Vita</span>
				</div>
				<div className="amore-spec-row">
					<span className="amore-spec-label">Contenuto incluso</span>
					<span className="amore-spec-value">Busta protettiva</span>
				</div>
			</div>

			<h2 className="amore-section-title">Cosa puoi conservare</h2>
			<div className="amore-icons-row">
				{itemsToStore.map((item) => (
					<div className="amore-icon-box" key={item.title}>
						<img
							src={item.image}
							alt={item.title}
							className="amore-icon-image"
						/>
						<p className="amore-icon-title">{item.title}</p>
						<p className="amore-icon-caption">{item.caption}</p>
					</div>
				))}
			</div>

			<h2 className="amore-section-title amore-related-title">
				Potrebbe interessarti anche
			</h2>
			<div className="amore-related-row">
				{relatedProducts.map((product) => (
					<div
						className="amore-related-card"
						key={product.name}
					>
						<img src={product.image} alt={product.name} />
						<h3>{product.name}</h3>
						<p className="amore-related-price">{product.price}</p>
						<button
							className="btn-related-price"
						>
							Vai alla pagina
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
