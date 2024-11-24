import React from 'react'
import AdminSideBar from './layouts/AdminSideBar'
import UserNavBar from './layouts/UserNavBar'
import ProductListing from './components/ProductListing'

export default function Home() {

    return (
        <>
            <UserNavBar />

            <div>
                <ProductListing />
            </div>

        </>
    )
}