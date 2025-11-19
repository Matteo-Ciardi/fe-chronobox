import CapsuleCard from "./CapsuleCard";
import {useProducts} from "../../context/DefaultContext";

import "./CapsuleList.css";

export default function CapsuleList() {

    const { products } = useProducts();

    return (
        <>
            <div className="container-capsule-list">
                {products.map((product) => (
                    <CapsuleCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}