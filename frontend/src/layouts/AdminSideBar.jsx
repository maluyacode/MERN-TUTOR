import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";
import { auth } from '../utils/firebase';

export default function AdminSideBar({ children }) {

    const navigate = useNavigate();

    const logout = () => {
        auth.signOut();
        navigate('/login');
    }

    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
            <Sidebar>
                <Menu>

                    <SubMenu label="Product">
                        <MenuItem onClick={() => navigate("/products/list")} > Lists </MenuItem>
                        <MenuItem onClick={() => navigate("/product/create")}> Create New </MenuItem>
                    </SubMenu>

                    <SubMenu label="Category">
                        <MenuItem onClick={() => navigate("/categories/list")}> Lists </MenuItem>
                        <MenuItem onClick={() => navigate("/category/create")}> Create New </MenuItem>
                    </SubMenu>

                    <MenuItem onClick={() => navigate("/orders")}> Orders </MenuItem>
                    <MenuItem
                        onClick={logout}
                    > Logout
                    </MenuItem>

                </Menu>
            </Sidebar>

            <main className='flex-grow-1' style={{ padding: 10, overflowX: 'hidden' }}>
                {children}
            </main>

        </div>
    )
}
