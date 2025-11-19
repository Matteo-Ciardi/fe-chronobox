import CapsuleCard from "../capsulecard/CapsuleCard"

import { useProducts } from "../../context/DefaultContext";

import './ProductList.css'

const ProductList = () => {

    const { products } = useProducts();

    return (
        <>
            <div className='product-list-container'>
                {products.map((product) => (
                    <CapsuleCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default ProductList