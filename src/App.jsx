import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [catalogVisit, setCatalogVisit] = useState(0);

  const handleGetStartedClick = () => {
    setCatalogVisit((visit) => visit + 1);
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      <div
        className={`landing-page ${showProductList ? 'fade-out' : ''}`}
        aria-hidden={showProductList}
        inert={showProductList ? '' : undefined}
      >
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <p className="eyebrow">Houseplant shop</p>
            <h1>Paradise Nursery</h1>
            <div className="divider"></div>
            <p className="tagline">Where green meets serenity</p>
            <button
              type="button"
              className="get-started-button"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>
      <div
        className={`product-list-container ${showProductList ? 'visible' : ''}`}
        aria-hidden={!showProductList}
        inert={showProductList ? undefined : ''}
      >
        <ProductList key={catalogVisit} onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}

export default App;
