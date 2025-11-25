import "./CapsuleDetailForm.css";

const CapsuleDetailsForm = ({ shippingDate, onChangeShippingDate }) => {
	return (
		<section className="capsule-form">
			<h2>Dettagli capsula</h2>

			<div className="form-group">
				<label htmlFor="shippingDate">
					Data di consegna/apertura *
				</label>
				<input
					id="shippingDate"
					type="date"
					value={shippingDate}
					onChange={(e) => onChangeShippingDate(e.target.value)}
					required
				/>
			</div>
		</section>
	);
};

export default CapsuleDetailsForm;
