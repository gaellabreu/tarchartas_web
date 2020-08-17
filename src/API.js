import axios from 'axios'

export default axios.create({
    baseURL: 'https://tachartas.herokuapp.com/',
    headers: {
        "Authorization": window.sessionStorage.getItem('token')
    }
})