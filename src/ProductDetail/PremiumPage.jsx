import { useState } from "react";
import "./PremiumPage.css";

export default function PremiumPage({ onSelectPage }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

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
      name: "Capsula Amore Verde",
      price: "€179,00",
      image: "/img/capsula-amore-verde.png",
      target: "amore",
    },
    {
      name: "Capsula Mini",
      price: "€89,00",
      image: "/img/capsule-mini.jpg",
      target: null,
    },
  ];

  // COSA PUOI CONSERVARE
  const itemsToStore = [
    {
      title: "Lettere",
      caption: "Messaggi per il futuro",
      image: "/img/lettere.jpeg",
    },
    {
      title: "Foto",
      caption: "Ricordi stampati",
      image: "/img/foto.jpg",
    },
    {
      title: "Documenti",
      caption: "Certificati importanti",
      image: "/img/documenti.jpg",
    },
    {
      title: "Oggetti",
      caption: "Piccoli tesori personali",
      image: "/img/oggetti.jpg",
    },
  ];

  return (
    <div className="premium-container">

      <div className="premium-content">

        <div
          className="premium-image-box"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/img/capsule-premium.jpg"
            alt="Capsula Premium"
            className="premium-image"
            style={imgStyle}
          />
        </div>


        <div className="premium-info">
          <h1>Capsula Premium</h1>
          <p className="price">€249,00</p>

          <p className="description">
            Capsula a tenuta ermetica in acciaio inox, progettata per proteggere i
            tuoi ricordi più importanti nel tempo.
          </p>

          <button className="cart-btn">Aggiungi al carrello</button>

          <div className="feature-box">
            <div className="feature">
              <strong>Dimensioni</strong>
              <span>20cm × 8cm ø</span>
            </div>
            <div className="feature">
              <strong>Materiale</strong>
              <span>Acciaio inox 316</span>
            </div>
            <div className="feature">
              <strong>Peso</strong>
              <span>850g</span>
            </div>
            <div className="feature">
              <strong>Consegna</strong>
              <span>3–5 giorni</span>
            </div>
          </div>
        </div>
      </div>


      <h2 className="section-title">Descrizione</h2>
      <div className="long-description">
        <p>
          Ogni capsula è realizzata a mano con materiali di altissima qualità e
          sottoposta a rigorosi controlli di qualità.
        </p>
        <p>
          Il design minimalista si integra perfettamente in qualsiasi ambiente,
          mentre la costruzione robusta garantisce protezione totale dal tempo e
          dagli elementi.
        </p>
      </div>


      <h2 className="section-title">Specifiche tecniche</h2>
      <div className="specs">
        <div className="spec-row">
          <span className="spec-label">Peso</span>
          <span className="spec-value">850 g</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Capacità</span>
          <span className="spec-value">7 litri</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Materiale principale</span>
          <span className="spec-value">Acciaio inossidabile 316</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Resistenza</span>
          <span className="spec-value">IP68</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Garanzia</span>
          <span className="spec-value">Vita</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Contenuto incluso</span>
          <span className="spec-value">Busta protettiva</span>
        </div>
      </div>


      <h2 className="section-title">Cosa puoi conservare</h2>
      <div className="icons-row">
        {itemsToStore.map((item) => (
          <div className="icon-box" key={item.title}>
            <img
              src={item.image}
              alt={item.title}
              className="icon-image"
            />
            <p className="icon-title">{item.title}</p>
            <p className="icon-caption">{item.caption}</p>
          </div>
        ))}
      </div>


      <h2 className="section-title related-title">Potrebbe interessarti anche</h2>
      <div className="related-row">
        {relatedProducts.map((product) => (
          <div
            className="related-card"
            key={product.name}
            onClick={() => {
              if (product.target && onSelectPage) {
                onSelectPage(product.target);
              } else {
                alert("Pagina non ancora disponibile");
              }
            }}
            style={{ cursor: product.target ? "pointer" : "default" }}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="related-price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
