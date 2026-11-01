import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const parseCost = (cost) => {
  const value = Number.parseFloat(String(cost).replace(/[^0-9.]/g, ''));
  return Number.isNaN(value) ? 0 : value;
};

const money = (amount) => amount.toFixed(2);

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPlants = cart.reduce((sum, item) => sum + item.quantity, 0);

  const calculateTotalAmount = () => {
    return cart.reduce((sum, item) => sum + parseCost(item.cost) * item.quantity, 0);
  };

  const calculateTotalCost = (item) => {
    return parseCost(item.cost) * item.quantity;
  };

  const handleContinueShopping = (event) => {
    event.preventDefault();
    onContinueShopping(event);
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-summary">
        <p>
          Total plants in cart:{' '}
          <strong data-testid="plant-count">{totalPlants}</strong>
        </p>
        <p>
          Total cost:{' '}
          <strong data-testid="cart-total">${money(calculateTotalAmount())}</strong>
        </p>
      </div>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Continue shopping to add a plant.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit price: {item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    type="button"
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">Total: ${money(calculateTotalCost(item))}</div>
                <button
                  type="button"
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="continue_shopping_btn">
        <button type="button" className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button type="button" className="get-started-button1" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
