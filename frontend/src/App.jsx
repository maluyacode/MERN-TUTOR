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
import Profile from './pages/user/Profile'
import ProtectedRoute from './Auth/ProtectedRoute'

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
            element={<Register />}
          />

          <Route path='/login'
            element={<Login />}
          />
          <Route path='/' element={<Home />} />
          {/* <Route path='/cart' element={user ? <Cart /> : <Navigate to={'/login'} />} /> */}
          <Route path='/cart' element={<Cart />} />

          <Route path='/profile' element={<Profile />} />


          {/* Admin Routes */}
          {/* Categories CRUD */}
          <Route path='/categories/list'
            element={<CategoriesList />}
          />
          <Route path='/category/create'
            element={<CategoryCreate />}
          />

          {/* Products CRUD */}
          <Route path='/products/list'
            element={
              <ProtectedRoute>
                <ProductsList />
              </ProtectedRoute>
            }
          />
          <Route path='/product/create'
            element={<ProductCreate />}
          />
          <Route path='/product/update/:id'
            element={<ProductUpdate />}
          />

          {/* Orders */}

          <Route path='/orders'
            element={<OrdersList />}
          />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App