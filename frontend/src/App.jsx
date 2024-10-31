import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>

          {/* Categories CRUD */}
          <Route path='/categories/list' element={<CategoriesList />} />
          <Route path='/category/create' element={<CategoryCreate />} />

          {/* Products CRUD */}
          <Route path='/products/list' element={<ProductsList />} />
          <Route path='/product/create' element={<ProductCreate />} />
          <Route path='/product/update/:id' element={<ProductUpdate />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App