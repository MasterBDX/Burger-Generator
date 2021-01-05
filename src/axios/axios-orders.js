
import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-generator-84fcc-default-rtdb.firebaseio.com'
})


export default instance;