import axios from "axios";

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyA1V8VnUhGvKIZmCcI3tM5bdu-HX6EH9oU'
    }
})

export default authApi