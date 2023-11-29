import axios from 'axios'

const BASE_URL='https://chatbot-eight-tau.vercel.app/api/bardapi';

const getBardApi = (useMessage)=>axios.get(
    BASE_URL+"?ques="+useMessage
);

export default {
    getBardApi,
}