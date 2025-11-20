import { useState } from 'react'

import ProductList from '../../components/productlist/ProductList'

import './ProductPage.css'

const ProductPage = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [order, setOrder] = useState('')

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleOrderChange = (e) => {
        setOrder(e.target.value)
    }

    return (
        <>
            <div className='product-wrapper'>
                <section className='filters'>
                    <input type='text'
                        name='searchbar'
                        placeholder='Cerca..'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select name='order' value={order} onChange={handleOrderChange}>
                        <option value="">Scegli</option>
                        <option value="price-desc">Prezzo Alto-Basso</option>
                        <option value="price-asc">Prezzo Basso-Alto</option>
                        <option value="name-asc">Nome A-Z</option>
                        <option value="name-desc">Nome Z-A</option>
                        <option value="recent-desc">Recenti-Meno Recenti</option>
                        <option value="recent-asc">Meno Recenti-Recenti</option>
                    </select>
                </section>
                <ProductList searchTerm={searchTerm} order= {order} />
            </div >
        </>
    )
}

export default ProductPage