import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../layouts/AdminSideBar'
import axios from 'axios'

import { MDBDataTable } from 'mdbreact';
import { Button, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MUIDataTable from 'mui-datatables';

const BASE_URL = "http://localhost:5000/product/all"

export default function ProductsList() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    const tableData = products.map(product => (
        {
            _id: product._id,
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

    const columns = [
        {
            label: 'Image',
            name: 'image',
            options: {
                display: false,
            }
        },
        {
            label: 'Name',
            name: 'name',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Description',
            name: 'description',
            options: {
                filter: true,
                sort: true,
                display: false,
            }
        },
        {
            label: 'Cost Price',
            name: 'cost_price',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Category',
            name: 'category',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Sell Price',
            name: 'sell_price',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Action',
            name: 'action',
        },
    ]

    const getProducts = async () => {

        const { data } = await axios.get(BASE_URL);

        setProducts(data.products);
    }

    const bulkDelete = async (ids) => {
        try {

            const { data } = await axios.put(`http://localhost:5000/product/bulk/delete`, {
                productIds: ids,
            },)

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        getProducts();

    }, [])

    return (
        <AdminSideBar>

            {/* <MDBDataTable
                striped
                bordered
                responsive
                hover
                data={data}
            /> */}

            <MUIDataTable
                title={"Employees List"}
                data={tableData}
                columns={columns}
                options={{
                    responsive: 'standard',
                    filterType: 'multiselect',
                    expandableRows: true,
                    renderExpandableRow: (rowData, rowMeta) => {

                        const colSpan = rowData.length + 1;

                        return (
                            <TableRow>
                                <TableCell colSpan={2}>
                                    {rowData[0]}
                                </TableCell>
                                <TableCell colSpan={4}>
                                    {rowData[2]}
                                </TableCell>
                            </TableRow>
                        )
                    },
                    onRowsDelete: ({ data }) => {
                        const ids = data.map(d => (
                            tableData[d.index]._id
                        ))

                        bulkDelete(ids)
                    }
                }}
            />

        </AdminSideBar>
    )
}
