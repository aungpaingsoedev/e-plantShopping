# Paradise Nursery

Paradise Nursery is a houseplant shop (e-plantShopping) where you can browse potted plants, add them to a cart, and review quantities and cost before checkout.

The landing page introduces the nursery. The product list groups at least six houseplants into air-purifying, aromatic, and easy-care categories. A shared Redux Toolkit store keeps the cart in sync: the header count, line quantities, and totals all update from the same state.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Optional GitHub Pages publish (after `npm install`):

```bash
npm run deploy
```

## Cart state

`src/CartSlice.jsx` defines three actions:

- `addItem()` adds a plant to the cart
- `removeItem()` removes that plant type
- `updateQuantity()` changes how many of that plant are in the cart

The store lives in `src/store.js` and is provided to the app from `src/main.jsx`.

## License

Apache License 2.0. See [LICENSE](LICENSE).

Plant photos are loaded from Pixabay and Unsplash CDNs.
