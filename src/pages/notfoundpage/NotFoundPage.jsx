import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="notfound-container">
			{/* IMMAGINE PRINCIPALE */}
			<img
				src="../../src/assets/img/img-not-found.png"
				alt="Pagina non trovata"
				className="notfound-hero"
			/>

			{/* TITOLO */}
			<h1 className="notfound-title">
				Oops! Questa pagina è andata persa nel tempo!
			</h1>

			{/* DESCRIZIONE */}
			<p className="notfound-text">
				La pagina che cerchi sembra essere stata sigillata in una
				capsula temporale che non abbiamo ancora aperto. 📦
			</p>

			{/* BOTTONE HOME */}
			<div className="notfound-buttons">
				<button
					className="notfound-btn home"
					onClick={() => navigate("/")}
				>
					<span className="home-icon">
						{/* Icona home bianca SVG */}
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="#ffffff"
						>
							<path d="M12 3l9 8h-3v10h-4V14H10v7H6V11H3z" />
						</svg>
					</span>
					Torna alla Home
				</button>
			</div>

			{/* FOOTER TESTO */}
			<p className="notfound-footnote">
				💡 Anche quando qualcosa si perde, le emozioni custodite nelle
				nostre capsule sanno ritrovare la strada giusta.
			</p>
		</div>
	);
}
