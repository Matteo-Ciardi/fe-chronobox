import Hero from "../../components/hero/Hero";
import NewArrivals from "../../components/newarrivals/NewArrivals";
import Popular from "../../components/popular/Popular";

import "./HomePage.css";

const HomePage = () => {
	return (
		<>
			<div className="page-wrapper">
				<Hero />	
			</div>
			<NewArrivals />
			<Popular />
		</>
	);
};

export default HomePage;
