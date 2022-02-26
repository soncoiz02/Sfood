import React, { useEffect, useState } from 'react'
import Banner from '../../assets/img/banner.jpg'
import { useParams } from 'react-router-dom'
import './products.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import foodApi from '../../api/foodApi'
import { setAllFood } from '../../redux/action/food'
import ListProducts from '../../components/ListProducts/ListProducts'
import Loader from '../../components/Loader/Loader'
import ProductSidebar from '../../components/ProductSidebar/ProductSidebar'


const Products = () => {
    const param = useParams().cate

    const listData = useSelector(state => state.foods.list)
    const dispatch = useDispatch()


    const [loader, setLoader] = useState(true)

    const [activeBtn, setActiveBtn] = useState(false)

    useEffect(() => {
        const data = getData()
        return data
    }, [param])

    const getData = async () => {
        const res = await foodApi.getByCate(param)
        const filterData = getUnique(res, 'id')
        dispatch(setAllFood(filterData))
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoader(false)
        }, 2000)
    }

    const getUnique = (arr, comp) => {

        const unique = arr
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

        return unique;
    }



    window.onscroll = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setActiveBtn(true)
        }
        else {
            setActiveBtn(false)
        }
    }

    return (
        <div className='Products'>
            {loader === true &&
                <Loader />
            }
            <div className="Products__banner">
                <img src={Banner} alt="" />
            </div>
            <div className="Products__menu">
                <div className="container">
                    <ProductSidebar param={param} setLoader={setLoader} />
                    <div className="Products__menu-foods">
                        <div className="search-form">
                            <div className="form">
                                <input type="text" placeholder='Search' />
                                <button>
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                        </div>
                        <ListProducts data={listData} />
                    </div>
                    <div className="btn-scroll"></div>
                </div>
            </div>
        </div>
    )
}

export default Products
