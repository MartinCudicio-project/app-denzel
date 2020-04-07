<template>
<body>
    <Navbar/>
    <div class="row">
        <div class="col s12">
            <ul class="tabs">
                <li class="tab col s3"><a href="#AllMovies">All movies</a></li>
                <li class="tab col s3"><a class="active" href="#FilterMovies">Search a movie with filter</a></li>
                <li class="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
                <li class="tab col s3"><a href="#test4">Test 4</a></li>
            </ul>
        </div>
        <div id="AllMovies" class="col s12">
            <div class="container">
                <div class="row">
                    <div class="col s3" v-for="(movie,index) in movies"
                    v-bind:item="movie"
                    v-bind:index="index"
                    v-bind:key="movie.id">
                        <div id="cardAllMovies" class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" :src="movie.poster">
                                <a class="btn-floating halfway-fab waves-effect waves-light red" :href="'/infoMovie/'+movie.id"><i class="material-icons">search</i></a>
                            </div>
                            <div class="card-content activator grey-text text-darken-4">
                                <p>{{movie.title}}</p>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-2"><i class="material-icons right">close</i></span>
                                <p>{{movie.synopsis}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   

        <div id="FilterMovies" class="col s12">
            <div class="row">
                <div id="left" class="col s5">
                    <div class="container">
                        <div class="row">
                            <div class="center-align">
                                <br/> 
                                <h5  class="dark-text text-darken-2">Search a movie with the folowing filters</h5>
                                <br/>
                                <h6  align="center" class="dark-text text-darken-2">Filter Date</h6>
                                <div class="row">
                                    <div class="col s4">
                                        <div id="event-start"></div>
                                    </div>
                                    <div class="col s4">
                                        <div> --> </div>
                                    </div>
                                    <div class="col s4">
                                        <div id="event-end"></div>
                                    </div>
                                </div>
                                <div id="slider-date"></div>

                                <br/>
                                <h6  align="center" class="dark-text text-darken-2">Filter Metascore</h6>
                                <div class="row">
                                    <div class="col s4">
                                        <div id="minMeta"></div>
                                    </div>
                                    <div class="col s4">
                                        <div> --> </div>
                                    </div>
                                    <div class="col s4">
                                        <div id="maxMeta"></div>
                                    </div>
                                </div>
                                <div id="slider-metascore"></div>

                                <br/>
                                <h6  align="center" class="dark-text text-darken-2">Filter Metascore</h6>
                                <div class="row">
                                    <div class="col s4">
                                        <div id="minRating"></div>
                                    </div>
                                    <div class="col s4">
                                        <div> --> </div>
                                    </div>
                                    <div class="col s4">
                                        <div id="maxRating"></div>
                                    </div>
                                </div>
                                <div id="slider-rating"></div>

                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="center-align">
                                <div class="col s6">
                                    <a id="btnFilter" align="center" class="waves-effect waves-light btn" v-on:click="resetFilter()">reset</a>
                                </div>
                            </div>
                            <div class="center-align">
                                <div class="col s6">
                                    <a id="btnFilter" class="waves-effect waves-light btn" v-on:click="searchMovie()">search</a>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                <div id="right" class="col s7">
                    <div class="col s12">
                        <div class="center-align">
                            <div  class="row">
                                <div class="col s3" v-for="(movie,index) in movies"
                                v-bind:item="movie"
                                v-bind:index="index"
                                v-bind:key="movie.id">
                                    <div id="cardFilter" class="card"> 
                                        <div class="card-image waves-effect waves-block waves-light">
                                            <img class="activator" :src="movie.poster">
                                            <a class="btn-floating halfway-fab waves-effect waves-light red" :href="'/infoMovie/'+movie.id"><i class="material-icons">search</i></a>
                                        </div>
                                        <div class="card-content activator grey-text text-darken-4">
                                            <p>{{movie.title}}</p>
                                        </div>
                                        <div class="card-reveal">
                                            <span class="card-title grey-text text-darken-2"><i class="material-icons right">close</i></span>
                                            <p>{{movie.synopsis}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="test3" class="col s12">Test 3</div>
        
        <div id="test4" class="col s12">Test 4</div>
    </div>
    
</body>
</template>

<script>
// https://alligator.io/vuejs/vue-google-maps/
// https://console.cloud.google.com/google/maps-apis/overview?hl=fr&project=bike-datamining
import Navbar from "./Navbar.vue";
import PostService  from '../PostService';
const postService = new PostService();
const wNumb = require('wnumb')
// import M from 'materialize-css'
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

export default {
    name:'Movies',
    components :{
        Navbar
    },
    data(){
        return {
            movies : 'Nothing',
        }
    },
    mounted() {  
        var dateSlider = document.getElementById('slider-date');
        noUiSlider.create(dateSlider, {
        // Create two timestamps to define a range.
            range: {
                min: 1977,
                max: 2021
            },
        // Steps of one year
            step: 1,

        // Two more timestamps indicate the handle starting positions.
            start: [1977,2021],

        // No decimals
            format: wNumb({
                decimals: 0
            })
        });
        var dateValues = [
            document.getElementById('event-start'),
            document.getElementById('event-end')
        ];
        dateSlider.noUiSlider.on('update', function (values, handle) {
            dateValues[handle].innerHTML = values[handle];
        });
        
        var metaSlider = document.getElementById('slider-metascore');
        noUiSlider.create(metaSlider, {
            range: {
                min: 0,
                max: 100,
            },
            step: 1,
            start: [0, 100],
            format: wNumb({
                decimals: 0
            })
        });

        var metaValues = [
            document.getElementById('minMeta'),
            document.getElementById('maxMeta')
        ];
        metaSlider.noUiSlider.on('update', function (values, handle) {
            metaValues[handle].innerHTML = values[handle];
        });

        var ratingSlider = document.getElementById('slider-rating');
        noUiSlider.create(ratingSlider, {
            range: {
                min: 0,
                max: 10,
            },
            step: 0.1,
            start: [0, 10],
            format: wNumb({
                decimals: 1
            })
        });
        var ratingValues = [
            document.getElementById('minRating'),
            document.getElementById('maxRating')
        ];
        ratingSlider.noUiSlider.on('update', function (values, handle) {
            ratingValues[handle].innerHTML = values[handle];
        });


        // if we reset the filters, we have to launch movie
        // we listen just one slider because, we reset all sliders and
        // we don't want to launch movies each time that a slider is reset
        // we arbitrarily choose dateSlider
        // dateSlider.noUiSlider.on('set', function () {
        //     LauchMovie()
        // });

        // we add listener on our sliders
        // if we change the value of one, we have to launch movies
        // let launch = false

        dateSlider.noUiSlider.on('change', function () {
            LauchMovie()
        });
        metaSlider.noUiSlider.on('change', function () {
            LauchMovie()
        });
        ratingSlider.noUiSlider.on('change', function () {
            LauchMovie()
            
        });

        function LauchMovie(){
            let date = dateSlider.noUiSlider.get();
            let meta = metaSlider.noUiSlider.get();
            let rate = ratingSlider.noUiSlider.get();
            const dateObj = {
                    from : Number(date[0]),
                    to : Number(date[1])
                };
            const metaObj = {
                    from : Number(meta[0]),
                    to : Number(meta[1])
                };
            const rateObj = {
                    from : Number(rate[0]),
                    to : Number(rate[1])
                };
            // console.log(this.movies.length)
            // console.log(this.movies)
            postService.searchMovieWithFilter(dateObj,metaObj,rateObj)
            .then((resp)=>{
                // document.getElementById('mytest').innerHTML = resp.data
                console.log(resp.data.length)
                // console.log(this.movies)
            });
        }
    },

    created() {
       postService.getAllMovies()
       .then(res=> {
           this.movies = res.data
       });
       
    },
    methods : {
        resetFilter(){
            var dateSlider = document.getElementById('slider-date')
            var metaSlider = document.getElementById('slider-metascore');
            var ratingSlider = document.getElementById('slider-rating');
            dateSlider.noUiSlider.reset();
            metaSlider.noUiSlider.reset();
            ratingSlider.noUiSlider.reset();
            postService.getAllMovies()
            .then(res=> {
                console.log("nous avons reset")
                this.movies = res.data
                // console.log(this.movies)
            });
        },
        searchMovie(){

            var dateSlider = document.getElementById('slider-date')
            var metaSlider = document.getElementById('slider-metascore');
            var ratingSlider = document.getElementById('slider-rating');
            let date = dateSlider.noUiSlider.get();
            let meta = metaSlider.noUiSlider.get();
            let rate = ratingSlider.noUiSlider.get();
            const dateObj = {
                    from : Number(date[0]),
                    to : Number(date[1])
                };
            const metaObj = {
                    from : Number(meta[0]),
                    to : Number(meta[1])
                };
            const rateObj = {
                    from : Number(rate[0]),
                    to : Number(rate[1])
                };
            // console.log(this.movies.length)
            console.log({dateObj,metaObj,rateObj})
            postService.searchMovieWithFilter(dateObj,metaObj,rateObj)
            .then((resp)=>{
                // document.getElementById('mytest').innerHTML = resp.data
                console.log(resp.data.length)
                this.movies = resp.data
            });
        }
    }
}

           
</script>


<style scoped>
#cardAllMovies {
    height: 420px;
}

#cardFilter{
    height : 350px;
}
.btn-floating {
  bottom: 3px;
  right:  3px;
}

#left {
    height: 600px;
}

#btnFilter {
    width: 200px;
}

</style>