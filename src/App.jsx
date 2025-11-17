import { useState } from "react";
import PremiumPage from "./ProductDetail/PremiumPage.jsx";
import AmorePage from "./capsula-amore/AmorePage.jsx";

export default function App() {
  const [selectedPage, setSelectedPage] = useState("premium");

  function handleNavigate(page) {
    setSelectedPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>

      <header className="top-nav">
        <button
          className={
            "nav-btn " + (selectedPage === "premium" ? "nav-btn-active" : "")
          }
          onClick={() => handleNavigate("premium")}
        >
          Capsula Premium
        </button>
        <button
          className={
            "nav-btn " + (selectedPage === "amore" ? "nav-btn-active" : "")
          }
          onClick={() => handleNavigate("amore")}
        >
          Capsula Amore
        </button>
      </header>

      {selectedPage === "premium" ? (
        <PremiumPage onSelectPage={handleNavigate} />
      ) : (
        <AmorePage onSelectPage={handleNavigate} />
      )}
    </div>
  );
}
