import { useState } from "react";
import { useProducts } from "../../context/DefaultContext";
import { /*useLocation ,*/ useNavigate } from "react-router-dom";

import "./DetailPage.css";

import lettereImg from "../../assets/img/lettere.jpeg";
import fotoImg from "../../assets/img/foto.jpg";
import ricordiImg from "../../assets/img/oggetti.jpg";
import documentiImg from "../../assets/img/documenti.jpg";

// Import test slug
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function DetailPage() {
	const [rotation, setRotation] = useState({ x: 0, y: 0 });

	const [relatedProducts, setRelatedProducts] = useState([]);
	const [loading, setLoading] = useState(true);// Hook di stato per salvare lo stato della risposta API

	// const location = useLocation();
	const navigate = useNavigate();
	const { addToCart } = useProducts();

	// const products = location.state?.product;

	// ------------------------------------------ test slug -------------------------------------------------------
	const { slug } = useParams(); // Recupero slug dall' URL della rotta
	const [product, setProduct] = useState(null); // Hook di stato per salvare i dati dinamici della capsula dal backend

	// Funzione che recupera la capsula cliccata dal backend tramite slug
	function fetchProduct() {
		setLoading(true); // inizio caricamento per aspettare risp API
		axios
			.get(`http://localhost:3000/api/capsules/${slug}`)
			.then((res) => {
				console.log("DETAIL RESPONSE:", res.data);
				setProduct(res.data);
			})
			.catch((error) => {
				console.error("DETAIL ERROR:", error);
			})
			.finally(() => {
				setLoading(false); // fine caricamento (sia successo che errore)
			});
	}

	// Funzione che recupera i prodotti correlati dal backend tramite slug
	function fetchRelatedProducts() {
		axios.get(`http://localhost:3000/api/capsules/${slug}/related`)
			.then((res) => {
				console.log("RELATED:", res.data);
				setRelatedProducts(res.data);
			})
			.catch((error) => {
				console.error("RELATED ERROR:", error);
			});
	}

	// Hook di effetto che chiama la funzione fetchProduct ogni volta che cambia lo slug
	useEffect(() => {
		fetchProduct();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slug]);

	// Hook di effetto che chiama la funzione fetchRelatedProducts ogni volta che cambia il prodotto
	useEffect(() => {
		if (product) {
			fetchRelatedProducts();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);
	// Evito crash se i dati non sono ancora caricati
	// if (loading || !product) return null;

	// ------------------------------------------------------------------------------------------------------------

	if (loading || !product) return <p>Caricamento...</p>;

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

	// COSA PUOI CONSERVARE
	const itemsToStore = [
		{
			title: "Lettere",
			caption: "Messaggi che durano per sempre",
			image: lettereImg,
		},
		{
			title: "Foto",
			caption: "Momenti condivisi",
			image: fotoImg,
		},
		{
			title: "Ricordi",
			caption: "Biglietti, oggetti simbolici",
			image: ricordiImg,
		},
		{
			title: "Promesse",
			caption: "Documenti e dediche speciali",
			image: documentiImg,
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

					<p className="amore-description">{product.description}</p>

					<button className="amore-btn" onClick={handleAddToCart}>
						Aggiungi al carrello
					</button>

					<div className="amore-feature-box">
						<div className="amore-feature">
							<strong>Dimensioni</strong>
							<span>{product.dimension}</span>
						</div>
						<div className="amore-feature">
							<strong>Materiale</strong>
							<span>{product.material}</span>
						</div>
						<div className="amore-feature">
							<strong>Peso</strong>
							<span>{product.weight} g</span>
						</div>
					</div>
				</div>
			</div>

			{/* SPECIFICHE TECNICHE */}
			<h2 className="amore-section-title">Specifiche tecniche</h2>
			<div className="amore-specs">
				<div className="amore-spec-row">
					<span className="amore-spec-label">Peso</span>
					<span className="amore-spec-value">{product.weight} g</span>
				</div>
				<div className="amore-spec-row">
					<span className="amore-spec-label">Capacità</span>
					<span className="amore-spec-value">
						{product.capacity} litri
					</span>
				</div>
				<div className="amore-spec-row">
					<span className="amore-spec-label">
						Materiale principale
					</span>
					<span className="amore-spec-value">{product.material}</span>
				</div>
				<div className="amore-spec-row">
					<span className="amore-spec-label">Resistenza</span>
					<span className="amore-spec-value">
						{product.resistance}
					</span>
				</div>
				<div className="amore-spec-row">
					<span className="amore-spec-label">Garanzia</span>
					<span className="amore-spec-value">
						{product.warrenty} anno
					</span>
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
				{relatedProducts.length === 0 && (
					<p>Nessun prodotto correlato disponibile.</p>
				)}

				{relatedProducts.map((item) => (
					<div
						className="amore-related-card"
						key={item.slug}
						onClick={() => navigate(`/dettagli/${item.slug}`)}
					>
						<img src={item.img} alt={item.name} />
						<h3>{item.name}</h3>
						<p className="amore-related-price">
							{(item.discounted_price ?? item.price) + " €"}
						</p>
						<button className="btn-related-price">Vai alla pagina</button>
					</div>
				))}
			</div>
		</div>
	);
}
