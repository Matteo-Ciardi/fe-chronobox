import { useState } from "react";
import axios from "axios";
import { useProducts } from "../../context/DefaultContext";

import BillingForm from "../../components/billingform/BillingForm";
import ShippingForm from "../../components/shippingform/ShippingForm";
import CapsuleDetailsForm from "../../components/capsuledetailform/CapsuleDetailForm";
import CheckoutCartSummary from "../../components/checkoutsummary/CheckoutSummary";
import OrderSuccessSummary from "../../components/ordersuccess/OrderSuccess";

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
    const [orderSummary, setOrderSummary] = useState(null);

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
            // Snapshot per riepilogo
            const summary = {
                customer_name: `${billing.firstName} ${billing.lastName}`,
                customer_email: billing.email,
                billing: { ...billing },
                shipping: { ...shipping },
                shippingDate,
                letterContent,
                items: cart.map((item) => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: item.price * item.quantity,
                })),
                total: cartTotal,
            };

            // Payload per backend (allineato a tabella orders/capsule_order)
            const orderPayload = {
                method_id: 1,
                customer_name: summary.customer_name,
                customer_email: summary.customer_email,
                shipping_address: `${shipping.address}, ${shipping.zip} ${shipping.city}, ${shipping.country}`,
                billing_address: `${billing.address}, ${billing.zip} ${billing.city}, ${billing.country}`,
                total_amount: cartTotal,
                status: "pending",
                items: summary.items.map((item) => ({
                    capsule_id: item.id,
                    quantity: item.quantity,
                    unit_price: item.price,
                    shipping_period: shippingDate,
                    letter_content: letterContent,
                    discount_percentage: null,
                })),
            };

            const res = await axios.post(
                "http://localhost:3000/api/checkout/orders",
                orderPayload
            );

            console.log("ORDER CREATED:", res.data);
            setOrderSummary(summary);
            clearCart();
        } catch (err) {
            console.error("ORDER ERROR:", err);
        } finally {
            setSubmitting(false);
        }
    };

    // Nessun riepilogo e carrello vuoto -> niente da mostrare
    if (!orderSummary && cart.length === 0) {
        return <p>Il carrello è vuoto.</p>;
    }

    // Dopo ordine: riepilogo completo + messaggio successo
    if (orderSummary) {
        return <OrderSuccessSummary summary={orderSummary} />;
    }

    // Vista checkout normale: form + riepilogo carrello laterale
    return (
        <main className="checkout-page">
            <h1>Checkout</h1>

            <div className="checkout-layout">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <BillingForm billing={billing} onChange={handleBillingChange} />
                    <ShippingForm shipping={shipping} onChange={handleShippingChange} />
                    <CapsuleDetailsForm
                        shippingDate={shippingDate}
                        onChangeShippingDate={setShippingDate}
                        letterContent={letterContent}
                        onChangeLetterContent={setLetterContent}
                    />

                    <button type="submit" disabled={submitting}>
                        {submitting ? "Invio..." : "Conferma ordine"}
                    </button>
                </form>

                <CheckoutCartSummary />
            </div>
        </main>
    );
};

export default CheckoutPage;
