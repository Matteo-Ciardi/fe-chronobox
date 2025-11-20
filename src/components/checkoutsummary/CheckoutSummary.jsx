import { useProducts } from "../../context/DefaultContext";

const CheckoutCartSummary = () => {
    const { cart, cartTotal } = useProducts();

    if (cart.length === 0) {
        return null;
    }

    const SHIPPING_THRESHOLD = 170;
    const SHIPPING_FEE = 30;

    const shippingCost = cartTotal < SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
    const finalTotal = cartTotal + shippingCost;

    return (
        <aside className="checkout-summary">
            <h2>Riepilogo ordine</h2>
            <ul className="summary-list">
                {cart.map((item) => (
                    <li key={item.id} className="summary-item">
                        <div>
                            <span>{item.name}</span>
                            <span>× {item.quantity}</span>
                        </div>
                        <div>
                            {(item.price * item.quantity).toFixed(2)} €
                        </div>
                    </li>
                ))}
            </ul>

            <div className="summary-total">
                <span>Totale:</span>
                <strong>{finalTotal.toFixed(2)} €</strong>
            </div>
        </aside>
    );
};

export default CheckoutCartSummary;
