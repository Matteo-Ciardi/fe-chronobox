import ProductList from '../../components/productlist/ProductList'

import './ProductPage.css'

const ProductPage = () => {
    return (
        <>
            <div className='product-wrapper'>
            <section className='filters'>
                    <input type='text' name='searchbar' placeholder='Cerca..'></input>
                    <select name='order'>
                        <option value="">Scegli</option>
                        <option value="Prezzo Alto-Basso">Prezzo Alto-Basso</option>
                        <option value="Prezzo Basso-Alto">Prezzo Basso-Alto</option>
                        <option value="Nome A-Z">Nome A-Z</option>
                        <option value="Nome Z-A">Nome Z-A</option>
                        <option value="Recenti-Meno Recenti">Recenti-Meno Recenti</option>
                        <option value="Meno Recenti-Recenti">Meno Recenti-Recenti</option>
                    </select>
                </section>
                <ProductList />
            </div>
        </>
    )
}

export default ProductPage