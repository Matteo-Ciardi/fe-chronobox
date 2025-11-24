import CapsuleCard from "../capsulecard/CapsuleCard";

import "./ProductList.css";

const ProductList = ({ products = [] }) => {
	return (
		<div className="product-list-container">
			{products.map((product) => (
				<CapsuleCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default ProductList;
