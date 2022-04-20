import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cart from '../page/Cart/Cart'
import Checkout from '../page/Checkout/Checkout'
import Detail from '../page/Detail/Detail'
import Home from '../page/Home/Home'
import Login from '../page/Login/Login'
import Menu from '../page/Menu/Menu'
import NotFound from '../page/NotFound/NotFound'
import Products from '../page/Products/Products'
import Account from '../page/UserAccount/Account'
import AccountInfor from '../page/UserAccount/AccountInfor/AccountInfor'
import HistoryOrder from '../page/UserAccount/OrderHistory/OrderHistory'
import RequireAuth from './RequireAuth'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu">
                <Route index element={<Menu />} />
                <Route path=":cate" >
                    <Route index element={<Products />} />
                    <Route path=":id" element={<Detail />} />
                </Route>
            </Route>
            <Route element={<RequireAuth />} >
                <Route path='/checkout' element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
                <Route path='/account' element={<Account />}>
                    <Route path='order-history' element={<HistoryOrder />} />
                    <Route path='account-infor' element={<AccountInfor />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Router
