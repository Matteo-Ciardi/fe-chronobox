const CapsuleDetailsForm = ({
    shippingDate,
    onChangeShippingDate,
    letterContent,
    onChangeLetterContent,
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

            <label>
                Contenuto della lettera
                <textarea
                    value={letterContent}
                    onChange={(e) => onChangeLetterContent(e.target.value)}
                    rows={4}
                    required
                />
            </label>
        </section>
    );
};

export default CapsuleDetailsForm;
