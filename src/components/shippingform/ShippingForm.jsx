const ShippingForm = ({ shipping, onChange }) => {
	return (
		<section>
			<h2>Spedizione</h2>

			<label htmlFor="shippingAddress">Indirizzo spedizione *</label>
			<input
				name="address"
				placeholder="Indirizzo spedizione"
				value={shipping.address}
				onChange={onChange}
				required
			/>

			<label htmlFor="shippingCity">Città *</label>
			<input
				name="city"
				placeholder="Città"
				value={shipping.city}
				onChange={onChange}
				required
			/>

			<label htmlFor="shippingZip">CAP *</label>
			<input
				name="zip"
				placeholder="CAP"
				value={shipping.zip}
				onChange={onChange}
				required
			/>

			<label htmlFor="shippingCountry">Paese *</label>
			<input
				name="country"
				placeholder="Paese"
				value={shipping.country}
				onChange={onChange}
				required
			/>
		</section>
	);
};

export default ShippingForm;
