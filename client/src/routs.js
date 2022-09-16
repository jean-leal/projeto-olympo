import React from "react";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';

import Products from './pages/admin/products';
import ProductsEdit from './pages/admin/products/products.edit';
import ProductsRegister from './pages/admin/products/products.register';

import Groups from './pages/admin/groups';
import GroupsEdit from './pages/admin/groups/groups.edit';
import GroupsRegister from './pages/admin/groups/groups.register';

import Subgroups from './pages/admin/subgroups';
import SubgroupsEdit from './pages/admin/subgroups/subgroups.edit';
import SubgroupsRegister from './pages/admin/subgroups/subgroups.register';

import Providers from './pages/admin/providers';
import ProvidersEdit from './pages/admin/providers/providers.edit';
import ProvidersRegister from './pages/admin/providers/providers.register';

import Sectors from './pages/admin/sectors';
import SectorsEdit from './pages/admin/sectors/sectors.edit';
import SectorsRegister from './pages/admin/sectors/sectors.register';

import Users from './pages/admin/users';
import UsersEdit from './pages/admin/users/users.edit';
import UsersRegister from './pages/admin/users/users.register';
import Login from './pages/client/login';

import LowStock from './pages/admin/stock/low-stock'
import LowStockEdit from './pages/admin/stock/low-stock-edit'
import LowStockRegister from './pages/admin/stock/low-stock'  
import LowStockReport from './pages/admin/stock/low-report'


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
        <Route path="/admin/products/edit/:idProduct" element={<PrivateRoute> <ProductsEdit /> </PrivateRoute>} />

        {/* Rota Usuarios*/}
        <Route path="/admin/users" element={<PrivateRoute> <Users /></PrivateRoute>} />
        <Route path="/admin/users/register" element={<PrivateRoute> <UsersRegister /> </PrivateRoute>} />
        <Route path="/admin/users/edit/:idUser" element={<PrivateRoute> <UsersEdit /> </PrivateRoute>} />

        <Route path="/admin/groups" element={<PrivateRoute> <Groups /> </PrivateRoute>} />
        <Route path="/admin/groups/register" element={<PrivateRoute> <GroupsRegister /> </PrivateRoute>} />
        <Route path="/admin/groups/edit/:idGroup" element={<PrivateRoute> <GroupsEdit /> </PrivateRoute>} />

        <Route path="/admin/providers" element={<PrivateRoute> <Providers /> </PrivateRoute>} />
        <Route path="/admin/providers/register" element={<PrivateRoute> <ProvidersRegister /> </PrivateRoute>} />
        <Route path="/admin/providers/edit/:idProvider" element={<PrivateRoute> <ProvidersEdit /> </PrivateRoute>} />

        <Route path="/admin/subgroups" element={<PrivateRoute> <Subgroups /> </PrivateRoute>} />
        <Route path="/admin/subgroups/register" element={<PrivateRoute> <SubgroupsRegister /> </PrivateRoute>} />
        <Route path="/admin/subgroups/edit/:idSubgroup" element={<PrivateRoute> <SubgroupsEdit /> </PrivateRoute>} />

        <Route path="/admin/sectors" element={<PrivateRoute> <Sectors /> </PrivateRoute>} />
        <Route path="/admin/sectors/register" element={<PrivateRoute> <SectorsRegister /> </PrivateRoute>} />
        <Route path="/admin/sectors/edit/:idSector" element={<PrivateRoute> <SectorsEdit /> </PrivateRoute>} />

        <Route path="/admin/low-report" element={<PrivateRoute> <LowStockReport /> </PrivateRoute>} />
        <Route path="/admin/low-stock" element={<PrivateRoute> <LowStock /> </PrivateRoute>} />
        <Route path="/admin/low-stock/register" element={<PrivateRoute> <LowStockRegister /> </PrivateRoute>} />
        <Route path="/admin/low-stock/edit/:idLowStock" element={<PrivateRoute> <LowStockEdit /> </PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  )
}