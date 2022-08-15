import React from "react";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';

import Products from './pages/admin/products';
import ProductsEdit from './pages/admin/products/products.edit';
import ProductsRegister from './pages/admin/products/products.register';

import Users from './pages/admin/users';
import UsersEdit from './pages/admin/users/users.edit';
import UsersRegister from './pages/admin/users/users.register';
import Login from './pages/client/login';

//IMPORT CLIENT
import ProductDetails from './pages/client/products/product.details';

import PrivateRoute from './services/wAuth'

export default function Rotas() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Rota Client*/}
                <Route path="/" element={<Login />} />
                <Route path="/produtos/:idProduct" element={<ProductDetails />} />

                {/* Rota Admin*/}
                <Route path="/admin" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />

                <Route path="/admin/products" element={<PrivateRoute> <Products /> </PrivateRoute>} />
                <Route path="/admin/products/register" element={<PrivateRoute> <ProductsRegister /> </PrivateRoute>} />
                <Route path="/admin/products/editar/:idProduct" element={<PrivateRoute> <ProductsEdit /> </PrivateRoute>} />

                {/* Rota Usuarios*/}
                <Route path="/admin/users" element={<PrivateRoute> <Users /></PrivateRoute>} />
                <Route path="/admin/users/register" element={<PrivateRoute> <UsersRegister /> </PrivateRoute>} />
                <Route path="/admin/users/edit/:idUser" element={<PrivateRoute> <UsersEdit /> </PrivateRoute>} />

            </Routes>
        </BrowserRouter>
    )
}