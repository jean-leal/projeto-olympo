import React from "react";

import {BrowserRouter, Routes, Route} from 'react-router-dom';

//IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';

import Products from './pages/admin/products';
import ProductsEdit from './pages/admin/products/products.edit';
import ProductsRegister from './pages/admin/products/products.register';

import Users from './pages/admin/users';
import UsersEdit from './pages/admin/users/users.edit';
import UsersRegister from './pages/admin/users/users.register';
import Login from './pages/admin/login';

//IMPORT CLIENT
import Home from './pages/client/home';
import ProductDetails from './pages/client/products/product.details';

export default function Rotas(){

    return(
        <BrowserRouter>
            <Routes>
                {/* Rota Client*/}
                <Route path="/" element={<Home/>}/>
                <Route path="/produtos/:idProduct" element={<ProductDetails/>} />

                {/* Rota Admin*/}
                <Route path="/admin/login" element={<Login/>} />
                <Route path="/admin" element={<Dashboard/>} />

                <Route path="/admin/products" element={<Products/>} />
                <Route path="/admin/products/register"  element={<ProductsRegister/>} />
                <Route path="/admin/products/editar/:idProduct" element={<ProductsEdit/>} />
                
                {/* Rota Usuarios*/}
                <Route path="/admin/users" element={<Users/>} />
                <Route path="/admin/users/register" element={<UsersRegister/>} />
                <Route path="/admin/users/edit/:idUser" element={<UsersEdit/>} />

            </Routes>
        </BrowserRouter>
    )
}