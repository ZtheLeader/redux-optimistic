# Redux Optimistic Updates Demo

A practical demonstration of classic async updates vs optimistic updates in React with Redux Toolkit.

## 💡 Inspiration

This project was inspired by [TanStack Query's optimistic updates](https://tanstack.com/query/v4/docs/framework/react/guides/optimistic-updates). While TanStack Query provides an excellent implementation of optimistic updates along with many other powerful features, not every application needs a full-featured data management library. This demo shows how to implement optimistic updates using just Redux Toolkit, making it a lighter alternative for smaller applications that only need this specific feature.

## 🎯 Purpose

This project demonstrates the difference between traditional asynchronous updates and optimistic updates in a web application. It helps developers understand when and how to implement optimistic updates to enhance user experience.

## 🔄 Understanding the Difference

### Classic Async Updates

In traditional async updates, the UI waits for server confirmation before reflecting changes:

```javascript
// Classic Async Flow
const handleDelete = async (id) => {
  setLoading(true); // 1. Show loading state
  try {
    await api.delete(id); // 2. Wait for server
    updateUI(id); // 3. Update UI after success
  } catch (error) {
    showError(error); // 4. Show error if failed
  }
  setLoading(false); // 5. Hide loading state
};
```

### Optimistic Updates

With optimistic updates, we update the UI immediately and handle failures gracefully:

```javascript
// Optimistic Update Flow
const handleDelete = async (id) => {
  const previousState = [...items]; // 1. Store current state
  updateUI(id); // 2. Update UI immediately
  try {
    await api.delete(id); // 3. Make API call in background
  } catch (error) {
    revertUI(previousState); // 4. Revert on failure
    showError(error);
  }
};
```

## ✨ Features

- CRUD operations with both update patterns
- Real-world API simulation with delays
- Error handling and state reversion
- Clean and modular React components
- TypeScript for type safety
- Redux Toolkit for state management
- Modern UI with dark/light mode support

## 🛠️ Tech Stack

- React 18
- Redux Toolkit
- TypeScript
- Vite
- React Toastify
- UUID

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ZtheLeader/redux-optimistic.git
   ```

2. Install dependencies:

   ```bash
   cd redux-optimistic
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📖 Usage

The demo includes a simple article management interface where you can:

- Create new articles
- Update article titles
- Delete articles

Each operation has two buttons:

- Regular button: Uses classic async update pattern
- Optimistic button: Uses optimistic update pattern

Try both to see the difference in user experience!

## 🤔 When to Use Optimistic Updates?

Optimistic updates are best suited for:

- High-confidence operations (likely to succeed)
- Actions that need to feel snappy
- Non-critical data updates
- Good network conditions

Avoid for:

- Critical financial transactions
- Data-dependent operations
- Operations with complex rollback requirements
- High-risk operations

## 🎨 Project Structure

```
src/
├── components/         # React components
├── store/             # Redux store and slices
├── hooks/             # Custom React hooks
├── types/             # TypeScript types
├── utils/             # Utility functions
└── api/               # API simulation
```

## 🤝 Contributing

Feel free to open issues and pull requests!

## 📝 License

MIT

## 👨‍💻 Author

Muhammad Zain - [@ZtheLeader](https://github.com/ZtheLeader)
