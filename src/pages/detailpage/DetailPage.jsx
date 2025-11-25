import { useProducts } from "../../context/DefaultContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import "./DetailPage.css";

import fotoImg from "../../assets/img/foto.jpg";
import ricordiImg from "../../assets/img/oggetti.jpg";
import lettereImg from "../../assets/img/lettere.jpeg";
import documentiImg from "../../assets/img/documenti.jpg";

export default function DetailPage() {
	const [rotation, setRotation] = useState({ x: 0, y: 0 });
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [wishlistStates, setWishlistStates] = useState({});

	const [carouselIndex, setCarouselIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [letterText, setLetterText] = useState("");

	const navigate = useNavigate();
	const { addToCart } = useProducts();

	const { slug } = useParams();
	const [product, setProduct] = useState(null);

	function fetchProduct() {
		setLoading(true);
		axios
			.get(`http://localhost:3000/api/capsules/${slug}`)
			.then((res) => {
				setProduct(res.data);
			})
			.catch((error) => {
				if (error.response?.status === 404) navigate("/404");
			})
			.finally(() => setLoading(false));
	}

	function fetchRelatedProducts() {
		axios
			.get(`http://localhost:3000/api/capsules/${slug}/related`)
			.then((res) => {
				setRelatedProducts(res.data);

				const wishlist = JSON.parse(
					localStorage.getItem("wishlist") || "[]",
				);
				const initialStates = {};
				res.data.forEach((p) => {
					initialStates[p.id] = wishlist.some(
						(item) => item.id === p.id,
					);
				});
				setWishlistStates(initialStates);
			})
			.catch((error) => {
				if (error.response?.status === 404) navigate("/404");
			});
	}

	useEffect(() => {
		fetchProduct();
	}, [slug]);

	useEffect(() => {
		if (product) fetchRelatedProducts();
	}, [product]);

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
		setSelectedProduct(product);
		setShowModal(true);
	};

	const cardsPerView = 4;
	const maxIndex = Math.max(0, relatedProducts.length - cardsPerView);

	const handleCarouselPrev = () =>
		setCarouselIndex((prev) => Math.max(0, prev - 1));
	const handleCarouselNext = () =>
		setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));

	const toggleRelatedWishlist = (productId, productData) => {
		const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
		const exists = wishlist.some((item) => item.id === productId);

		const newWishlist = exists
			? wishlist.filter((item) => item.id !== productId)
			: [...wishlist, productData];

		localStorage.setItem("wishlist", JSON.stringify(newWishlist));

		setWishlistStates((prev) => ({
			...prev,
			[productId]: !exists,
		}));

		window.dispatchEvent(new Event("wishlistUpdate"));
	};

	const handleCustomizeAddToCart = () => {
		addToCart(selectedProduct, {
			letterContent: letterText,
		});
		setShowModal(false);
		setLetterText("");
		setSelectedProduct(null);
	};

	const itemsToStore = [
		{
			title: "Lettere",
			caption: "Messaggi che durano per sempre",
			image: lettereImg,
		},
		{ title: "Foto", caption: "Momenti condivisi", image: fotoImg },
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
			{/* ==== IMMAGINE + INFO PRINCIPALI ==== */}
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
						<span className="big-price">
							&euro;{product.price.toFixed(2)}
						</span>
					)}

					<button className="amore-btn" onClick={handleAddToCart}>
						Personalizza
					</button>

					<p className="amore-description">{product.description}</p>
				</div>
			</div>

			{/* === SPECIFICHE TECNICHE === */}
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
						{product.warrenty} anno/i
					</span>
				</div>
			</div>

			{/* ==== COSA PUOI CONSERVARE ==== */}
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

			{/* ==== PRODOTTI CORRELATI ==== */}
			<h2 className="amore-section-title amore-related-title">
				Potrebbe interessarti anche
			</h2>

			<div className="amore-carousel-container">
				{relatedProducts.length > cardsPerView && (
					<button
						className="amore-carousel-arrow amore-carousel-arrow-left"
						onClick={handleCarouselPrev}
						disabled={carouselIndex === 0}
					>
						❮
					</button>
				)}

				<div className="amore-related-row">
					{relatedProducts.length === 0 && (
						<p>Nessun prodotto correlato disponibile.</p>
					)}

					{relatedProducts
						.slice(carouselIndex, carouselIndex + cardsPerView)
						.map((item) => (
							<div
								className="amore-related-card"
								key={item.slug}
								onClick={() =>
									navigate(`/dettagli/${item.slug}`)
								}
							>
								<div className="detail-image">
									<img src={item.img} alt={item.name} />
								</div>

								<div className="container-capsule-body">
									<h3>{item.name}</h3>
									<p className="capsule-description">
										{item.description}
									</p>

									<div className="capsule-footer">
										<div className="capsule-price">
											{item.discounted_price ? (
												<>
													<span className="original-price">
														&euro;
														{item.price.toFixed(2)}
													</span>
													<span className="discounted-price">
														&euro;
														{item.discounted_price.toFixed(
															2,
														)}
													</span>
												</>
											) : (
												<span className="normal-price">
													&euro;
													{item.price.toFixed(2)}
												</span>
											)}
										</div>

										<button
											type="button"
											className="amore-btn-card"
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

								<div className="amore-related-buttons">
									<button
										type="button"
										className="capsule-button wishlist-btn"
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											toggleRelatedWishlist(
												item.id,
												item,
											);
										}}
									>
										{wishlistStates[item.id] ? (
											<FaHeart size="22px" />
										) : (
											<FaRegHeart size="22px" />
										)}
									</button>
								</div>
							</div>
						))}
				</div>

				{relatedProducts.length > cardsPerView && (
					<button
						className="amore-carousel-arrow amore-carousel-arrow-right"
						onClick={handleCarouselNext}
						disabled={carouselIndex === maxIndex}
					>
						❯
					</button>
				)}
			</div>

			{/* ==== MODALE PERSONALIZZAZIONE ==== */}
			{showModal && selectedProduct && (
				<div
					className="customize-modal-overlay"
					onClick={() => setShowModal(false)}
				>
					<div
						className="customize-modal"
						onClick={(e) => e.stopPropagation()}
					>
						<h3>Personalizza la tua capsula</h3>

						<div className="modal-content">
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
								disabled={!letterText.trim()}
							>
								Aggiungi al Carrello
							</button>
							<button
								className="modal-cancel-btn"
								onClick={() => {
									setShowModal(false);
									setLetterText("");
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
	);
}
