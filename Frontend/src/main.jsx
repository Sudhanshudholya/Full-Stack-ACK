import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Slice/store.js'
import React from 'react' 

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
  </Provider>
)
