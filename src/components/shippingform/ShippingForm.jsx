const ShippingForm = ({ shipping, onChange }) => {
    return (
        <section>
            <h2>Spedizione</h2>
            <input
                name="address"
                placeholder="Indirizzo spedizione"
                value={shipping.address}
                onChange={onChange}
                required
            />
            <input
                name="city"
                placeholder="Città"
                value={shipping.city}
                onChange={onChange}
                required
            />
            <input
                name="zip"
                placeholder="CAP"
                value={shipping.zip}
                onChange={onChange}
                required
            />
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
  