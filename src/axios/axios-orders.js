
import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-generator-db26b-default-rtdb.firebaseio.com'
})


export default instance;