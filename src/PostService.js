import axios from 'axios';
const apiBaseUrl = 'https://nifty-noyce-ad1b9f.netlify.com/.netlify/functions/app';

export default class PostService {

    getAllMovies(){
        return axios.get(`${apiBaseUrl}/movies/`)
    }
    
    fetchMovieById(id){
        return axios.get(`${apiBaseUrl}/movies/fetch/${id}`)
    }

    searchMovieWithFilter(date,meta,rate){
        return axios.post(`${apiBaseUrl}/movies/search`,{date,meta,rate})
    }

    addReview(id,pseudo,text,score){
        return axios.post(`${apiBaseUrl}/movies/review`,{id,pseudo,text,score})
    }

    getMustWatch(){
        return axios.get(`${apiBaseUrl}/movies/must-watch`)
    }
}