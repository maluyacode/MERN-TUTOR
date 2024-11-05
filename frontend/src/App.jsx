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
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import { auth } from './utils/firebase'

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user)
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, [])

  console.log(user);

  return (
    <>

      <BrowserRouter>
        <Routes>

          {/* User Routes */}
          <Route path='/login' element={user ? <Navigate to={'/'} /> : <Login />} />
          <Route path='/register' element={user ? <Navigate to={'/'} /> : <Register />} />
          <Route path='/' element={!user ? <Navigate to={'/login'} /> : <Home />} />

          {/* Admin Routes */}
          {/* Categories CRUD */}
          <Route path='/categories/list' element={!user ? <Navigate to={'/login'} /> : <CategoriesList />} />
          <Route path='/category/create' element={!user ? <Navigate to={'/login'} /> : <CategoryCreate />} />

          {/* Products CRUD */}
          <Route path='/products/list' element={user ? <ProductsList /> : <Navigate to={'/login'} />} />
          <Route path='/product/create' element={user ? <ProductCreate /> : <Navigate to='/login' />} />
          <Route path='/product/update/:id' element={user ? <ProductUpdate /> : <Navigate to='/login' />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App