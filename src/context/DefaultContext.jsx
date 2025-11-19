import { createContext, useState,useEffect, useContext  } from 'react';
import axios from 'axios';

const DefaultContext = createContext();

const DefaultProvider = ( { children } ) =>{

    const [products, setProducts] = useState([]);

    function fetchProducts() {
    axios.get("http://localhost:3000/api/capsules")
        .then((res) => {
            console.log("RESPONSE:", res.data);
            setProducts(res.data);
        })
        .catch(error => console.error("FETCH ERROR:", error));
}

    useEffect(() => {
        fetchProducts()
    }, [])
    

    return (<DefaultContext.Provider
        value={{
          products
        }}
    >
        {children}
    </DefaultContext.Provider>)

}

const useProducts = () => {
    const context = useContext(DefaultContext);
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export  { DefaultProvider, useProducts };