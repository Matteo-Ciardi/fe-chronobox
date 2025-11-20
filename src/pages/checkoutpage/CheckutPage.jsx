import { useState } from "react";
import axios from "axios";
import { useProducts } from "../../context/DefaultContext";

const CheckoutPage = () => {
    const { cart, cartTotal, clearCart } = useProducts();

    const [billing, setBilling] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        country: "",
    });

    const [shipping, setShipping] = useState({
        address: "",
        city: "",
        zip: "",
        country: "",
    });

    const [shippingDate, setShippingDate] = useState("");
    const [letterContent, setLetterContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBilling((prev) => ({ ...prev, [name]: value }));
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShipping((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setSubmitting(true);

        try {
            const orderPayload = {
                method_id: 1,
                session_id: null,
                customer_name: `${billing.firstName} ${billing.lastName}`,
                customer_email: billing.email,
                shipping_address: `${shipping.address}, ${shipping.zip} ${shipping.city}, ${shipping.country}`,
                billing_address: `${billing.address}, ${billing.zip} ${billing.city}, ${billing.country}`,
                total_amount: cartTotal,
                status: "pending",
                items: cart.map((item) => ({
                    capsule_id: item.id,
                    quantity: item.quantity,
                    unit_price: item.price,
                    shipping_period: shippingDate,
                    letter_content: letterContent,
                    discount_percentage: null,
                })),
            };

            const res = await axios.post(
                "http://localhost:3000/api/orders",
                orderPayload
            );

            console.log("ORDER CREATED:", res.data);
            clearCart();
            // TODO: navigate("/ordine-completato");
        } catch (err) {
            console.error("ORDER ERROR:", err);
        } finally {
            setSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return <p>Il carrello è vuoto.</p>;
    }

    return (
        <main>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <h2>Fatturazione</h2>
                <input
                    name="firstName"
                    placeholder="Nome"
                    value={billing.firstName}
                    onChange={handleBillingChange}
                    required
                />
                <input
                    name="lastName"
                    placeholder="Cognome"
                    value={billing.lastName}
                    onChange={handleBillingChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={billing.email}
                    onChange={handleBillingChange}
                    required
                />
                <input
                    name="address"
                    placeholder="Indirizzo fatturazione"
                    value={billing.address}
                    onChange={handleBillingChange}
                    required
                />
                <input
                    name="city"
                    placeholder="Città"
                    value={billing.city}
                    onChange={handleBillingChange}
                    required
                />
                <input
                    name="zip"
                    placeholder="CAP"
                    value={billing.zip}
                    onChange={handleBillingChange}
                    required
                />
                <input
                    name="country"
                    placeholder="Paese"
                    value={billing.country}
                    onChange={handleBillingChange}
                    required
                />

                <h2>Spedizione</h2>
                <input
                    name="address"
                    placeholder="Indirizzo spedizione"
                    value={shipping.address}
                    onChange={handleShippingChange}
                    required
                />
                <input
                    name="city"
                    placeholder="Città"
                    value={shipping.city}
                    onChange={handleShippingChange}
                    required
                />
                <input
                    name="zip"
                    placeholder="CAP"
                    value={shipping.zip}
                    onChange={handleShippingChange}
                    required
                />
                <input
                    name="country"
                    placeholder="Paese"
                    value={shipping.country}
                    onChange={handleShippingChange}
                    required
                />

                <h2>Dettagli capsula</h2>
                <label>
                    Data di consegna/apertura
                    <input
                        type="date"
                        value={shippingDate}
                        onChange={(e) => setShippingDate(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Contenuto della lettera
                    <textarea
                        value={letterContent}
                        onChange={(e) => setLetterContent(e.target.value)}
                        rows={4}
                        required
                    />
                </label>

                <button type="submit" disabled={submitting}>
                    {submitting ? "Invio..." : "Conferma ordine"}
                </button>
            </form>
        </main>
    );
};

export default CheckoutPage;