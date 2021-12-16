import axios from 'axios'

// Kald til Mongo 
const api = {
    baseUrl: 'http://localhost:5023/',
}

// http://localhost:5023/aboutus

export const hentAbout = () => {

    let endpoint = "aboutus/";

    let response = axios.get(api.baseUrl + endpoint)
    .then( res => {
        console.log(res)
        return res.data
    })
    .catch(fejl => {
        console.log("FEJL: ", fejl) 
        return null;}
    )
    return response;

}