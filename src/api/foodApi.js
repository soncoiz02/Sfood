import axiosClient from "./axiosClient";

const foodApi = {
    getAll: () => {
        const url = "/our-foods"
        return axiosClient.get(url)
    },
    getByCate: (cate) => {
        const url = `/${cate}`
        return axiosClient.get(url)
    },
    getDetail: (param) => {
        const url = `/our-foods/${param}`
        return axiosClient.get(url)
    },
    getFilter: (param) => {
        const url = `/our-foods?${param}`
        return axiosClient.get(url)
    }
}

export default foodApi