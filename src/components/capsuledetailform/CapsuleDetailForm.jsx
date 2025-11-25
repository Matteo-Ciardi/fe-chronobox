const CapsuleDetailsForm = ({
	shippingDate,
	onChangeShippingDate
}) => {
	return (
		<section>
			<h2>Dettagli capsula</h2>
			<label>
				Data di consegna/apertura
				<input
					type="date"
					value={shippingDate}
					onChange={(e) => onChangeShippingDate(e.target.value)}
					required
				/>
			</label>
		</section>
	);
};

export default CapsuleDetailsForm;
