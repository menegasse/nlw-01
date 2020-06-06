import axios from 'axios';

const api_ibge = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
});

export default api_ibge;