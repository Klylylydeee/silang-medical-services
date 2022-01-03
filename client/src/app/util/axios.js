import Axios from "axios";

// Axios for Protected Routes/Components
export const axiosAPI = Axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: "https://jsonplaceholder.typicode.com/posts/1",
    headers: {
        Authorization: {
            toString () {
                return `Bearer ${localStorage.getItem('Authorization')}`
            }
        }
    }
});