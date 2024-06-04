import axios from 'axios';

export const InfoRetrieveService = {
    getAllUsData: function () {
        return axios.get('https://corona.lmao.ninja/v2/jhucsse/counties');
    }
};