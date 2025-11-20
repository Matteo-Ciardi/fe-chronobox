const BillingForm = ({ billing, onChange }) => {
	return (
		<section>
			<h2>Fatturazione</h2>
			<input
				name="firstName"
				placeholder="Nome"
				value={billing.firstName}
				onChange={onChange}
				required
			/>
			<input
				name="lastName"
				placeholder="Cognome"
				value={billing.lastName}
				onChange={onChange}
				required
			/>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={billing.email}
				onChange={onChange}
				required
			/>
			<input
				name="address"
				placeholder="Indirizzo fatturazione"
				value={billing.address}
				onChange={onChange}
				required
			/>
			<input
				name="city"
				placeholder="Città"
				value={billing.city}
				onChange={onChange}
				required
			/>
			<input
				name="zip"
				placeholder="CAP"
				value={billing.zip}
				onChange={onChange}
				required
			/>
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
