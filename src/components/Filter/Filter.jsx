import { faCheck, faFilter, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from '@mui/material/Slider'
import { makeStyles } from '@mui/styles';
import { param } from 'jquery';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import foodApi from '../../api/foodApi';
import { setAllFood } from '../../redux/action/food';

import './filter.scss'

const useStyles = makeStyles(
    {
        track: {
            color: "coral",
            height: "5px",
            borderRadius: "5px"
        },
        rail: {
            opacity: 1,
            backgroundColor: "#e6e9ea",
            height: "5px",
            borderRadius: "5px"
        },
        thumb: {
            color: "white",
            width: "1rem",
            height: "1rem",
            marginTop: "0",
            border: "2px solid coral",
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.09)",
            "&$focusVisible,&:hover": {
                boxShadow: "0 0 0 5px rgba(155, 38, 182, 0.2)"
            },
            "&$active": {
                boxShadow: "0 0 0 5px rgba(155, 38, 182, 0.2)"
            }
        },
        focusVisible: {},
        active: {}
    },
    { name: "MuiSlider" }
);

const Filter = () => {
    const classes = useStyles();

    const dispatch = useDispatch()

    const [priceValue, setPriceValue] = useState([0, 250]);
    const [ratedValue, setRatedValue] = useState(5)
    const [sortValue, setSortValue] = useState(0)

    const handleSorting = async () => {
        const filterParam = `price_gte=${priceValue[0]}&price_lte=${priceValue[1]}&rate=${ratedValue}&_sort=price&_order=${sortValue === 1 ? 'desc' : 'asc'}`
        const data = await foodApi.getFilter(filterParam)
        dispatch(setAllFood(data))
        window.scrollTo(0, 0)
        // const listFoods = JSON.parse(window.localStorage.getItem('list-foods'))
        // const listSortByPrice = listFoods.filter(e => e.price >= priceValue[0] && e.price <= priceValue[1])
        // const listSortByRate = listFoods.filter(e => e.rate === ratedValue)
        // let mergeList = []
        // let finalList = []
        // if (ratedValue > 0) {
        //     mergeList = getUnique([...listSortByPrice, ...listSortByRate], 'id')
        //     finalList = mergeList.filter(e => e.price >= priceValue[0] && e.price <= priceValue[1] && e.rate === ratedValue)
        // }
        // else {
        //     mergeList = [...listSortByPrice]
        //     finalList = mergeList
        // }

        // if (sortValue === '1') {
        //     finalList.sort((a, b) => a.price - b.price)
        //     dispatchSortedData(finalList)
        // }
        // else if (sortValue === '2') {
        //     finalList.sort((a, b) => b.price - a.price)
        //     dispatchSortedData(finalList)
        // }
        // else {
        //     dispatchSortedData(finalList)
        // }
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

    const dispatchSortedData = (data) => {
        dispatch(setAllFood(data))
        window.scrollTo(0, 0)
    }

    const [activeFilter, setActiveFilter] = useState(false)

    return (
        <>
            <div className={`filter ${activeFilter ? 'active' : ''}`}>
                <div className="price-range">
                    <p className="title">Price range</p>
                    <Slider
                        classes={classes}
                        step={5}
                        min={0}
                        max={250}
                        value={priceValue}
                        onChange={(ev, v) => setPriceValue(v)}
                        valueLabelDisplay="off"
                        aria-labelledby="range-slider"
                    />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontWeight: 500,
                            color: "#202243",
                            width: '100%'
                        }}
                    >
                        <div>{`$${priceValue[0]}`}</div>
                        <div>{`$${priceValue[1]}`}</div>
                    </div>
                </div>
                <div className="rate">
                    <p className="title">Rated</p>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={ratedValue}
                        valueLabelDisplay='on'
                        value={ratedValue}
                        onChange={(ev, v) => setRatedValue(v)}
                        step={1}
                        marks
                        min={0}
                        max={5}
                    />
                    <div className="list-star">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                </div>
                <div className="sort">
                    <p className="title">Sort</p>
                    <div className="check-box">
                        <input type="radio" id="low" name="sort" onClick={() => setSortValue(1)} />
                        <label htmlFor="low">
                            <div className="box">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <p>Low price - High price</p>
                        </label>
                        <input type="radio" id="high" name="sort" onClick={() => setSortValue(2)} />
                        <label htmlFor="high">
                            <div className="box">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <p>High price - Low price</p>
                        </label>
                    </div>
                </div>
                <div className="btn-apply" onClick={handleSorting}>Apply</div>
            </div>
            <div className="show">
                <div className="btn-show" style={{ display: activeFilter ? 'none' : 'block' }} onClick={() => setActiveFilter(true)}>
                    <FontAwesomeIcon icon={faFilter} />
                    Filter
                </div>
                <div className="btn-hide" style={{ display: activeFilter ? 'block' : 'none' }} onClick={() => setActiveFilter(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                    Hide
                </div>
            </div>
        </>
    )
}

export default Filter
