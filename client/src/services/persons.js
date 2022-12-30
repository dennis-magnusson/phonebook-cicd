import axios from 'axios'
const url = '/api/persons'

const getAll = () => {
    return axios.get(url).then(res => res.data)
}

const create = (newPerson) => {
    return axios.post(url, newPerson).then(res => res.data)
}

const deletePerson = (id) => {
    return axios.delete(`${url}/${id}`).then(res => res.data)
}

const update = (id, newData) => {
    return axios.put(`${url}/${id}`, newData).then(res => res.data)
}

const services = { getAll, create, deletePerson, update }

export default services