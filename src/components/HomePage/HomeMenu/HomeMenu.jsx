import React from 'react'
import { Link } from 'react-router-dom'

import Bread from '../../../assets/img/icon/bread.png'
import Burger from '../../../assets/img/icon/burger.png'
import Chicken from '../../../assets/img/icon/chicken.png'
import Drink from '../../../assets/img/icon/drink.png'
import IceCream from '../../../assets/img/icon/ice-cream.png'
import Pizza from '../../../assets/img/icon/pizza.png'
import Sandwich from '../../../assets/img/icon/sandwich.png'

import './menu.scss'

const menu = [
    {
        img: Burger,
        name: 'Burger',
        path: 'burgers'
    },
    {
        img: Bread,
        name: 'Bread',
        path: 'breads'
    },
    {
        img: Chicken,
        name: 'Chicken',
        path: 'fried-chicken'
    },
    {
        img: Sandwich,
        name: 'Sandwich',
        path: 'sandwiches'
    },
    {
        img: Pizza,
        name: 'Pizza',
        path: 'pizzas'
    },
    {
        img: Drink,
        name: 'Drink',
        path: 'drink'
    },
    {
        img: IceCream,
        name: 'Ice Cream',
        path: 'ice-cream'
    }
]

const HomeMenu = () => {
    return (
        <div className="Home__menu">
            <div className="container">
                <h2>Our Menu</h2>
                <div className="list">
                    {
                        menu.map((item, index) => (
                            <Link to={`/menu/${item.path}`} className="item" key={index}>
                                <div className="img">
                                    <img src={item.img} alt="" />
                                </div>
                                <p className='name'>{item.name}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeMenu
