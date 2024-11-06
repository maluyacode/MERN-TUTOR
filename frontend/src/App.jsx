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

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      setUser(user)
    })

  }, [])

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

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App