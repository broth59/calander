import axios from 'axios'

const CalanderAPI = axios.create({
    baseURL: "localhost:8080/calander/",
    headers: {
        "Content-Type": "application/sjson",
        "Authorization": "WINGS"
    }
})
