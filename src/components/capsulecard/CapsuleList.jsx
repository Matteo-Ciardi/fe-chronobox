import {useProducts} from "../../context/DefaultContext";

import CapsuleCard from "./CapsuleCard";

import "./CapsuleList.css";

export default function CapsuleList() {

    const { products } = useProducts();

    const newArrivals = products.slice(-6)

    return (
        <>
            <div className="container-capsule-list">
                {newArrivals.map((product) => (
                    <CapsuleCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}