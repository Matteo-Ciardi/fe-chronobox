const BillingForm = ({ billing, onChange }) => {
	return (
		<section>
			<h2>Fatturazione</h2>

			<label htmlFor="firstName">Nome *</label>
			<input
				name="firstName"
				placeholder="Nome"
				value={billing.firstName}
				onChange={onChange}
				required
			/>

			<label htmlFor="lastName">Cognome *</label>
			<input
				name="lastName"
				placeholder="Cognome"
				value={billing.lastName}
				onChange={onChange}
				required
			/>

			<label htmlFor="email">Email *</label>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={billing.email}
				onChange={onChange}
				required
			/>

			<label htmlFor="address">Indirizzo fatturazione *</label>
			<input
				name="address"
				placeholder="Indirizzo fatturazione"
				value={billing.address}
				onChange={onChange}
				required
			/>

			<label htmlFor="city">Città *</label>
			<input
				name="city"
				placeholder="Città"
				value={billing.city}
				onChange={onChange}
				required
			/>

			<label htmlFor="zip">CAP *</label>
			<input
				name="zip"
				placeholder="CAP"
				value={billing.zip}
				onChange={onChange}
				required
			/>

			<label htmlFor="country">Paese *</label>
			<input
				name="country"
				placeholder="Paese"
				value={billing.country}
				onChange={onChange}
				required
			/>
		</section>
	);
};

export default BillingForm;
