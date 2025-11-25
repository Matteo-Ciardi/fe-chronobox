import "./BillingForm.css";

const BillingForm = ({ billing, onChange }) => {
	return (
		<section className="billing-form">
			<h2>Spedizione</h2>

			<div className="form-group">
				<label htmlFor="firstName">Nome *</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
					placeholder="Inserisci il tuo nome"
					value={billing.firstName}
					onChange={onChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="lastName">Cognome *</label>
				<input
					id="lastName"
					name="lastName"
					type="text"
					placeholder="Inserisci il tuo cognome"
					value={billing.lastName}
					onChange={onChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="email">Email *</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="esempio@email.com"
					value={billing.email}
					onChange={onChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="address">Indirizzo fatturazione *</label>
				<input
					id="address"
					name="address"
					type="text"
					placeholder="Via, numero civico"
					value={billing.address}
					onChange={onChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="city">Città *</label>
				<input
					id="city"
					name="city"
					type="text"
					placeholder="Inserisci la città"
					value={billing.city}
					onChange={onChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="zip">CAP *</label>
				<input
					id="zip"
					name="zip"
					type="text"
					placeholder="12345"
					value={billing.zip}
					onChange={onChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="country">Paese *</label>
				<input
					id="country"
					name="country"
					type="text"
					placeholder="Italia"
					value={billing.country}
					onChange={onChange}
					required
				/>
			</div>
		</section>
	);
};

export default BillingForm;
