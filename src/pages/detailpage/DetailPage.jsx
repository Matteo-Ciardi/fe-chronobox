import { useState } from "react";
import { useProducts } from "../../context/DefaultContext";
import { /*useLocation ,*/ useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

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
	const [loading, setLoading] = useState(true); // Hook di stato per salvare lo stato della risposta API
	const [wishlistStates, setWishlistStates] = useState({}); // stato wishlist per relatedProducts
	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [letterText, setLetterText] = useState("");
	const [imagePreview, setImagePreview] = useState(null);

	// const location = useLocation();
	const navigate = useNavigate();
	const { addToCart } = useProducts();

	// const products = location.state?.product;

	// ------------------------------------------  slug -------------------------------------------------------
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

				if (error.response?.status === 404) {
					navigate("/404"); // redirect alla pagina NotFoundPage
				}
			})
			.finally(() => {
				setLoading(false); // fine caricamento (sia successo che errore)
			});
	}

	// Funzione che recupera i prodotti correlati dal backend tramite slug
	function fetchRelatedProducts() {
		axios
			.get(`http://localhost:3000/api/capsules/${slug}/related`)
			.then((res) => {
				console.log("RELATED:", res.data);
				setRelatedProducts(res.data);
				// Inizializza gli stati di wishlist per ogni prodotto
				const initialWishlistStates = {};
				res.data.forEach((product) => {
					const wishlist = JSON.parse(
						localStorage.getItem("wishlist") || "[]",
					);
					initialWishlistStates[product.id] = wishlist.some(
						(item) => item.id === product.id,
					);
				});
				setWishlistStates(initialWishlistStates);
			})
			.catch((error) => {
				console.error("RELATED ERROR:", error);

				if (error.response?.status === 404) {
					navigate("/404"); // redirect alla pagina NotFoundPage
				}
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

	// Gestire wishlist per relatedProducts
	const toggleRelatedWishlist = (productId, product) => {
		const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
		let newWishlist;
		const isInWishlist = wishlist.some((item) => item.id === productId);

		if (isInWishlist) {
			newWishlist = wishlist.filter((item) => item.id !== productId);
		} else {
			newWishlist = [...wishlist, product];
		}

		localStorage.setItem("wishlist", JSON.stringify(newWishlist));
		setWishlistStates((prev) => ({
			...prev,
			[productId]: !isInWishlist,
		}));
		window.dispatchEvent(new Event("wishlistUpdate"));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => setImagePreview(reader.result);
			reader.readAsDataURL(file);
		}
	};

	const handleCustomizeAddToCart = () => {
		addToCart(selectedProduct, {
			letterContent: letterText,
			uploadedImage: imagePreview,
		});
		setShowModal(false);
		setLetterText("");
		setImagePreview(null);
		setSelectedProduct(null);
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
		<>
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
						{product.discounted_price ? (
							<>
								<span className="original-price">
									&euro;{product.price.toFixed(2)}
								</span>
								<span className="discounted-price">
									&euro;{product.discounted_price.toFixed(2)}
								</span>
							</>
						) : (
							<span className="normal-price">
								&euro;{product.price.toFixed(2)}
							</span>
						)}

						<h2 className="amore-section-title">Descrizione</h2>

						<p className="amore-description">
							{product.description}
						</p>

						<button
							className="amore-btn"
							onClick={() => {
								setSelectedProduct(product);
								setShowModal(true);
							}}
						>
							Personalizza
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
						<span className="amore-spec-value">
							{product.weight} g
						</span>
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
						<span className="amore-spec-value">
							{product.material}
						</span>
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
							{item.discounted_price ? (
								<>
									<span className="original-price">
										&euro;{item.price.toFixed(2)}
									</span>
									<span className="discounted-price">
										&euro;{item.discounted_price.toFixed(2)}
									</span>
								</>
							) : (
								<span className="normal-price">
									&euro;{item.price.toFixed(2)}
								</span>
							)}

							<div className="amore-related-buttons">
								<button
									type="button"
									className="amore-related-wishlist-btn"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										toggleRelatedWishlist(item.id, item);
									}}
									aria-label="Aggiungi a wishlist"
								>
									{wishlistStates[item.id] ? (
										<FaHeart size="18px" />
									) : (
										<FaRegHeart size="18px" />
									)}
								</button>
								<button
									type="button"
									className="amore-related-customize-btn"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setSelectedProduct(item);
										setShowModal(true);
									}}
								>
									Personalizza
								</button>
							</div>
						</div>
					))}
				</div>

				{showModal && selectedProduct && (
					<div
						className="customize-modal-overlay"
						onClick={() => {
							setShowModal(false);
							setLetterText("");
							setImagePreview(null);
							setSelectedProduct(null);
						}}
					>
						<div
							className="customize-modal"
							onClick={(e) => e.stopPropagation()}
						>
							<h3>Personalizza la tua capsula</h3>
							<div className="modal-content">
								<div className="form-group">
									<label>Carica un'immagine:</label>
									<input
										type="file"
										accept="image/*"
										onChange={handleFileChange}
									/>
									{imagePreview && (
										<img
											src={imagePreview}
											alt="Preview"
											className="image-preview"
										/>
									)}
								</div>
								<div className="form-group">
									<label>Testo della lettera:</label>
									<textarea
										value={letterText}
										onChange={(e) =>
											setLetterText(e.target.value)
										}
										placeholder="Scrivi il tuo messaggio..."
										rows="4"
										maxLength="3000"
									/>
									<div className="char-counter">
										{letterText.length}/3000 caratteri
									</div>
								</div>
							</div>
							<div className="modal-buttons">
								<button
									className="modal-add-btn"
									onClick={handleCustomizeAddToCart}
								>
									Aggiungi al Carrello
								</button>
								<button
									className="modal-cancel-btn"
									onClick={() => {
										setShowModal(false);
										setLetterText("");
										setImagePreview(null);
										setSelectedProduct(null);
									}}
								>
									Annulla
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
