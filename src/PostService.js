import axios from 'axios';
const apiBaseUrl = 'http://localhost:3000';

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
}