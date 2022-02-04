import React from 'react'
import Filter from '../Filter/Filter'
import Menu from '../Menu/Menu'

const ProductSidebar = ({ param, setLoader }) => {
    return (
        <div className="Products__menu-sidebar">
            <Menu param={param} setLoader={setLoader} />
            <Filter />
        </div>
    )
}

export default ProductSidebar
