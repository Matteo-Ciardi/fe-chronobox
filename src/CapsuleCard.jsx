import './CapsuleCard.css';

export default function CapsuleCard() {
  return (
    <div className="container-capsule">
      <div className="container-image">
        <img
          src="./src/assets/img/capsule-classic.jpg"
          alt="capsule-classic"
        />

      </div>

      <div className="container-capsule-body">
        <h5 className="capsule-title">Capsula</h5>
        <p className="capsule-description">Capsula da ragalare ad un amico</p>

        <div className="capsule-footer">
          <span className="capsule-price">50,00</span>
          {/* <Link to={`/product/${id}`} className="product-button">
            Dettagli
          </Link> */}
        </div>
      </div>
    </div>

  )
}