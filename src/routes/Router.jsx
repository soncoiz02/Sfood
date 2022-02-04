import React from 'react'
import { Routes as Switch, Route, useLocation } from 'react-router-dom'
import Cart from '../page/Cart/Cart'
import Detail from '../page/Detail/Detail'
import Home from '../page/Home/Home'
import Login from '../page/Login/Login'
import Menu from '../page/Menu/Menu'
import Products from '../page/Products/Products'

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
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
        </Switch>
    )
}

export default Router
