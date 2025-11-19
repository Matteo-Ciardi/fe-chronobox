import CapsuleCard from "../capsulecard/CapsuleCard"

import { useProducts } from "../../context/DefaultContext";

import './ProductList.css'

const ProductList = ({ searchTerm = '' }) => {
    const { products } = useProducts();

    const normalizedSearch = searchTerm.toLowerCase()

    const filteredProducts = products.filter((product) => {
        const productName = product.name || product.title || ''
        return productName.toLowerCase().includes(normalizedSearch) 
    })

    return (
        <>
            <div className='product-list-container'>
                {filteredProducts.map((product) => (
                    <CapsuleCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default ProductList