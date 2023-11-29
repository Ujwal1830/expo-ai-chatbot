import axios from 'axios'

const BASE_URL='http://192.168.1.2:3000/api/bardapi';

const getBardApi = (useMessage)=>axios.get(
    BASE_URL+"?ques="+useMessage
);

export default {
    getBardApi,
}