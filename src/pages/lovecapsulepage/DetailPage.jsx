import { useState } from "react";
import "./DetailPage.css";

export default function DetailPage({ onSelectPage }) {
	const [rotation, setRotation] = useState({ x: 0, y: 0 });

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
		// {
		// 	id: "rossa",
		// 	name: "Capsula Amore Rossa",
		// 	price: "€189,00",
		// 	image: "/img/capsula-amore-rossa.png",
		// 	accentColor: "#B62218",
		// 	label: "Rossa",
		// },
		// {
		// 	id: "lilla",
		// 	name: "Capsula Amore Lilla",
		// 	price: "€189,00",
		// 	image: "/img/capsula-amore-lilla.png",
		// 	accentColor: "#A688AC",
		// 	label: "Lilla",
		// },
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
						src={selectedVariant.image}
						alt={selectedVariant.name}
						className="amore-image"
						style={imgStyle}
					/>
				</div>

				<div className="amore-info">
					<h1>
						{/* {selectedVariant.name} */}
						Capsula Futuro Me
					</h1>
					<p className="amore-price">
						{/* {selectedVariant.price} */}
						€179,00
					</p>

					<h2 className="amore-section-title">Descrizione</h2>

					<div className="amore-variants">
						{/* {variants.map((variant) => (
								<button
									key={variant.id}
									className={`amore-variant-btn ${
										selectedVariant.id === variant.id
											? "active"
											: ""
									}`}
									onClick={() => setSelectedVariant(variant)}
									style={{
										borderColor: variant.accentColor,
										backgroundColor:
											selectedVariant.id === variant.id
												? variant.accentColor
												: "#fff",
										color:
											selectedVariant.id === variant.id
												? "#fff"
												: "#333",
									}}
								>
									{variant.label}
								</button>
							))} */}
					</div>

					<p className="amore-description">
						Tema centrato su lettere al futuro sé e carte con domande a cui rispondere oggi e rileggere domani. Puoi includere domande tipo “Sono felice?”,
						“Cosa mi preoccupa adesso?”,
						“Cosa spero di aver imparato quando aprirò questa capsula?”
					</p>

					<button
						className="amore-btn"
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

			{/* <h2 className="amore-section-title">Descrizione</h2> */}
			{/* <div className="amore-long-description">
				<p>
					Ogni capsula è realizzata a mano con materiali di altissima
					qualità e sottoposta a rigorosi controlli di qualità.
				</p>
				<p>
					Il design minimalista si integra perfettamente in qualsiasi
					ambiente, mentre la costruzione robusta garantisce
					protezione totale dal tempo e dagli elementi.
				</p>
			</div> */}

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
						// onClick={() => {
						// 	if (product.target && onSelectPage) {
						// 		onSelectPage(product.target);
						// 	} else {
						// 		alert("Pagina non ancora disponibile");
						// 	}
						// }}
						style={{
							cursor: product.target ? "pointer" : "default",
						}}
					>
						<img src={product.image} alt={product.name} />
						<h3>{product.name}</h3>
						<p className="amore-related-price">{product.price}</p>
						<button
							className="btn-related-price"
							// style={{ backgroundColor: selectedVariant.accentColor }}
						>
							Vai alla pagina
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
