import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import AdminSideBar from './layouts/AdminSideBar'

// Pages
import Home from './Home'

// Categories CRUD
import CategoriesList from './pages/category/CategoriesList'
import CategoryCreate from './pages/category/CategoryCreate'

// Products CRUD
import ProductsList from './pages/product/ProductsList'
import ProductCreate from './pages/product/ProductCreate'
import ProductUpdate from './pages/product/ProductUpdate'
import Register from './pages/user/Register'
import Login from './pages/user/Login'
import { auth } from './utils/firebase'
import Cart from './pages/Cart'
import OrdersList from './pages/order/OrdersList'

import { getToken, onMessage } from "firebase/messaging";

import { messaging } from './utils/firebase'
import { baseUrl, VAPID_KEY } from './assets/constants'
import { useSelector } from 'react-redux'
import axios from 'axios'

function App() {

  const [user, setUser] = useState(null);
  const { access_token } = useSelector(state => state.auth);

  const sendTokenToServer = async ({ token }) => {
    try {

      const { data } = await axios.post(`${baseUrl}/user/token`, { token: token }, {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      })

      console.log(access_token);

    } catch (err) {
      console.log(err);
    }
  }

  const requestPermission = async () => {

    const permission = await Notification.requestPermission();


    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });

      if (access_token) {
        sendTokenToServer({ token: token })
      }

    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      setUser(user)
    })

  }, [])

  useEffect(() => {

    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {

      console.log(payload)

    });

    return () => {
      unsubscribe();
    };

  }, [access_token])

  return (
    <>

      <BrowserRouter>
        <Routes>

          {/* User Routes */}
          <Route path='/register'
            element={user ? <Navigate to={'/products/list'} /> : <Register />}
          />

          <Route path='/login'
            element={user ? <Navigate to={'/products/list'} /> : <Login />}
          />
          <Route path='/' element={<Home />} />
          {/* <Route path='/cart' element={user ? <Cart /> : <Navigate to={'/login'} />} /> */}
          <Route path='/cart' element={<Cart />} />


          {/* Admin Routes */}
          {/* Categories CRUD */}
          <Route path='/categories/list'
            element={user ? <CategoriesList /> : <Navigate to={'/login'} />}
          />
          <Route path='/category/create'
            element={user ? <CategoryCreate /> : <Navigate to={'/login'} />}
          />

          {/* Products CRUD */}
          <Route path='/products/list'
            element={user ? <ProductsList /> : <Navigate to={'/login'} />}
          />
          <Route path='/product/create'
            element={user ? <ProductCreate /> : <Navigate to={'/login'} />}
          />
          <Route path='/product/update/:id'
            element={user ? <ProductUpdate /> : <Navigate to={'/login'} />}
          />

          {/* Orders */}

          <Route path='/orders'
            element={user ? <OrdersList /> : <Navigate to={'/login'} />}
          />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App