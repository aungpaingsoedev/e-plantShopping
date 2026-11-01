import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
        description: 'Upright leaves that keep a bedroom feeling fresh overnight.',
        cost: '$18',
      },
      {
        name: 'Spider Plant',
        image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg',
        description: 'Arching stripes and baby plantlets that are easy to share.',
        cost: '$14',
      },
      {
        name: 'Peace Lily',
        image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg',
        description: 'Glossy leaves and white spathes for a shady corner.',
        cost: '$22',
      },
      {
        name: 'Boston Fern',
        image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg',
        description: 'A full fern that softens a bright bathroom or shelf.',
        cost: '$16',
      },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      {
        name: 'Lavender',
        image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?auto=format&fit=crop&w=800&q=80',
        description: 'Silvery foliage and a calm scent for a sunny sill.',
        cost: '$20',
      },
      {
        name: 'Jasmine',
        image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?auto=format&fit=crop&w=800&q=80',
        description: 'Sweet evening fragrance from a compact flowering vine.',
        cost: '$19',
      },
      {
        name: 'Rosemary',
        image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg',
        description: 'Needle leaves you can pinch for cooking or a desk bouquet.',
        cost: '$12',
      },
      {
        name: 'Mint',
        image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg',
        description: 'Bright, cool aroma that grows happily in a wide pot.',
        cost: '$11',
      },
    ],
  },
  {
    category: 'Easy-Care Houseplants',
    plants: [
      {
        name: 'ZZ Plant',
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80',
        description: 'Waxy leaves that tolerate low light and long weekends away.',
        cost: '$28',
      },
      {
        name: 'Pothos',
        image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg',
        description: 'A trailing vine that fills a bookcase with very little fuss.',
        cost: '$15',
      },
      {
        name: 'Cast Iron Plant',
        image: 'https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg',
        description: 'Broad dark leaves for the dim hallway other plants refuse.',
        cost: '$24',
      },
      {
        name: 'Succulent Bowl',
        image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg',
        description: 'A mixed bowl of drought-tolerant shapes for a bright window.',
        cost: '$17',
      },
    ],
  },
];

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.25" fill="currentColor" stroke="none" />
      <path d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.3h8.6a1.5 1.5 0 0 0 1.5-1.2L21 8H7" />
    </svg>
  );
}

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleContinueShopping = (event) => {
    event.preventDefault();
    setShowCart(false);
  };

  return (
    <div className="product-page">
      <header className="navbar">
        <button type="button" className="brand" onClick={onHomeClick}>
          <span className="brand-mark" aria-hidden="true">🌿</span>
          <span>
            <span className="brand-name">Paradise Nursery</span>
            <small>Where green meets serenity</small>
          </span>
        </button>
        <nav className="nav-links" aria-label="Shop">
          <button
            type="button"
            className={`nav-link ${showCart ? '' : 'nav-link-active'}`}
            onClick={() => setShowCart(false)}
          >
            Plants
          </button>
          <button
            type="button"
            className={`cart-button ${showCart ? 'nav-link-active' : ''}`}
            onClick={() => setShowCart(true)}
            aria-label={`Open shopping cart, ${totalCount} items`}
          >
            <CartIcon />
            <span className="cart_quantity_count" data-testid="cart-count">
              {totalCount}
            </span>
          </button>
        </nav>
      </header>

      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <main className="product-grid">
          {plantsArray.map((group) => (
            <section key={group.category} className="category-section">
              <h2 className="plant_heading">{group.category}</h2>
              <div className="product-list">
                {group.plants.map((plant) => {
                  const added = isInCart(plant.name);
                  return (
                    <article className="product-card" key={plant.name}>
                      <img className="product-image" src={plant.image} alt={plant.name} />
                      <h3 className="product-title">{plant.name}</h3>
                      <p className="product-description">{plant.description}</p>
                      <p className="product-price">{plant.cost}</p>
                      <button
                        type="button"
                        className={`product-button ${added ? 'added-to-cart' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={added}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}

export default ProductList;
