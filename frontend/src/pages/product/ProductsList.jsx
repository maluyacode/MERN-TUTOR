import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../layouts/AdminSideBar'
import axios from 'axios'

import { MDBDataTable } from 'mdbreact';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:5000/product/all"

export default function ProductsList() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    const tableData = products.map(product => (
        {
            image: (
                <div style={{ display: 'flex', gap: 5, width: 200, overflowX: 'scroll', paddingRight: 10, paddingLeft: 10, }} >
                    {product.images.map(image => (
                        <img key={image._id} style={{ width: 100, height: 100, objectFit: 'contain' }} src={image.url} />
                    ))}
                </div>
            ),
            name: product.name,
            description: product.description,
            cost_price: product.cost_price,
            category: product.category?.name,
            sell_price: product.sell_price,
            stock_quantity: product.stock_quantity,
            action: (
                <div>
                    <Button onClick={() => navigate(`/product/update/${product._id}`)} color='success' size='small'>
                        Edit
                    </Button>
                    <Button onClick={() => deleteProduct(product._id)} color='error' size='small'>
                        Delete
                    </Button>
                </div>
            ),
        }
    ))

    const deleteProduct = async (id) => {
        if (window.confirm('Are your sure do you want to delete this product?')) {
            await axios.delete(`http://localhost:5000/product/delete/${id}`);
            getProducts();
        }
    }


    const data = {
        columns: [
            {
                label: 'Image',
                field: 'image',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Description',
                field: 'description',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Cost Price',
                field: 'cost_price',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Category',
                field: 'category',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Sell Price',
                field: 'sell_price',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 100
            },
        ],

        rows: tableData
    };

    const getProducts = async () => {

        const { data } = await axios.get(BASE_URL);

        setProducts(data.products);
    }

    useEffect(() => {

        getProducts();

    }, [])

    return (
        <AdminSideBar>

            <MDBDataTable
                striped
                bordered
                responsive
                hover
                data={data}
            />

        </AdminSideBar>
    )
}
