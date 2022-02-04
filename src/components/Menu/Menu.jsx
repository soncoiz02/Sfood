import React from 'react'


import All1 from '../../assets/img/icon/svg/all.svg'
import All2 from '../../assets/img/icon/svg/all1.svg'
import Bread1 from '../../assets/img/icon/svg/bread.svg'
import Burger1 from '../../assets/img/icon/svg/burger.svg'
import Chicken1 from '../../assets/img/icon/svg/chicken.svg'
import Pizza1 from '../../assets/img/icon/svg/pizza.svg'
import Sandwich1 from '../../assets/img/icon/svg/sandwich.svg'
import Drink1 from '../../assets/img/icon/svg/drink.svg'
import IceCream1 from '../../assets/img/icon/svg/ice-cream.svg'
import Bread2 from '../../assets/img/icon/svg/bread1.svg'
import Burger2 from '../../assets/img/icon/svg/burger1.svg'
import Chicken2 from '../../assets/img/icon/svg/chicken1.svg'
import Pizza2 from '../../assets/img/icon/svg/pizza1.svg'
import Sandwich2 from '../../assets/img/icon/svg/sandwich1.svg'
import Drink2 from '../../assets/img/icon/svg/drink1.svg'
import IceCream2 from '../../assets/img/icon/svg/ice-cream1.svg'
import { Link } from 'react-router-dom'

import './menu.scss'

const listCategories = [
    {
        name: 'All',
        param: 'our-foods',
        img1: All1,
        img2: All2
    },
    {
        name: 'Burgers',
        param: 'burgers',
        img1: Burger1,
        img2: Burger2
    },
    {
        name: 'Breads',
        param: 'breads',
        img1: Bread1,
        img2: Bread2
    },
    {
        name: 'Fried Chicken',
        param: 'fried-chicken',
        img1: Chicken1,
        img2: Chicken2
    },
    {
        name: 'Pizzas',
        param: 'pizzas',
        img1: Pizza1,
        img2: Pizza2
    },
    {
        name: 'Sandwiches',
        param: 'sandwiches',
        img1: Sandwich1,
        img2: Sandwich2
    },
    {
        name: 'Ice Cream',
        param: 'ice-cream',
        img1: IceCream1,
        img2: IceCream2
    },
    {
        name: 'Drink',
        param: 'drink',
        img1: Drink1,
        img2: Drink2
    }
]
const Menu = ({ param, setLoader }) => {
    return (
        <div className="list-cate">
            {
                listCategories &&
                listCategories.map((item, index) => (
                    <Link className={`item ${item.param === param ? 'active' : ''}`} to={`/menu/${item.param}`} key={index} onClick={() => setLoader(true)}>
                        <div className="img">
                            <img src={item.img1} alt="" />
                            <img src={item.img2} alt="" />
                        </div>
                        <div className="name">{item.name}</div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Menu
