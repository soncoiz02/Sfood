import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import Cart from '../page/Cart/Cart'
import Checkout from '../page/Checkout/Checkout'
import Detail from '../page/Detail/Detail'
import Home from '../page/Home/Home'
import Login from '../page/Login/Login'
import Menu from '../page/Menu/Menu'
import Products from '../page/Products/Products'
import RequireAuth from './RequireAuth'

const Router = () => {
    return (
        <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} >
                <Route path="" element={<Menu />} />
                <Route path=":cate" element={<Products />} />
            </Route>
            <Route path="/detail" element={<Detail />} >
                <Route path="" element={<Detail />} />
                <Route path=":id" element={<Detail />} />
            </Route>
            <Route element={<RequireAuth />} >
                <Route path='/checkout' element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Switch>
    )
}

export default Router
