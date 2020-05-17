import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteSingle = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(() => id)
}

const update = (singlePersonId, personObject) => {
    const updateData = { 
        name: personObject.name,
        number: personObject.number,
        id: singlePersonId,
    }
    const request = axios.put(`${baseUrl}/${singlePersonId}`, updateData)
    return request.then(() => updateData)
}

export default {
    getAll: getAll,
    create: create,
    deleteSingle: deleteSingle,
    update: update
}