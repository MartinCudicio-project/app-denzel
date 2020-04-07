<template>
<body>
    <Navbar id="Nav"/>
    <br/>
    <div class="row">
        <div id="left" class="col s3">
            <div class="row">
                <div class="center-align">
                    <img id="posterImg" :src="movie.poster" width="350" class="responsive-img"> 
                </div>
            </div>
        </div>
        <div id="right" class="col s9">
            <div class="col s12">
                <h4 align="center" class="card-panel blue lighten-5" >{{movie.title}}</h4>
                <h5 align="left"> Synopsis</h5>
                <div class="card-panel grey lighten-5">
                    <span class="dark-text text-darken-2">{{movie.synopsis}}</span>
                </div>
                <div  class="row">
                    <div class="col s4">
                        <!-- <div id="panelBadge" class="card-panel grey lighten-5">
                            <span class="dark-text text-darken-2">Votes</span>
                            <span class="badge">{{movie.votes}}</span>
                        </div> -->
                        <ul class="collection">
                            <li class="collection-item">
                                 <span class="dark-text text-darken-2">Votes</span>
                                <span class="badge">{{movie.votes}}</span>
                            </li>
                            <div v-if="movie.review">
                                <a v-if="movie.review.length!=0" class="collection-item modal-trigger" href="#modalSee">
                                    <span class="new badge" data-badge-caption="saved" >{{movie.review.length}}</span>Reviews
                                </a>
                                <li v-else class="collection-item">
                                    <span class="new badge" data-badge-caption="saved" >{{movie.review.length}}</span>Reviews
                                </li>
                            </div>
                           

                        </ul>
                    </div>
                    <div class="col s4">
                        <div id="panelBadge" class="card-panel grey lighten-5">
                            <span class="dark-text text-darken-2">Metascore</span>
                            <span v-if="movie.metascore>70" class="green lighten-3 badge">{{movie.metascore}}</span>
                            <span v-else-if="movie.metascore>50" class="amber lighten-2 badge">{{movie.metascore}}</span>
                            <span v-else class="deep-orange lighten-2 badge">{{movie.metascore}}</span>
                        </div>
                    </div>
                    <div class="col s4">
                        <div id="panelBadge" class="card-panel grey lighten-5">
                            <span class="dark-text text-darken-2">Rating</span>
                            <span v-if="movie.rating>5" class="green lighten-3 badge">{{movie.rating}}</span>
                            <span v-else-if="movie.rating>3" class="amber lighten-2 badge">{{movie.rating}}</span>
                            <span v-else class="deep-orange lighten-2 badge">{{movie.rating}}</span>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <br/>
                <br/>
                <div class="row">
                    <div class="col s6">
                        <a id="watchBut" data-target="modalAdd" class="btn modal-trigger">WRITE A REVIEW
                            <i class="material-icons left">comment</i>
                        </a>
                    </div>
                    <div class="col s6">
                        <a :href="movie.link" id="watchBut" class="btn waves-effect waves-light">SEE ON IMDb WEBSITE
                            <i class="material-icons left">web_asset</i>
                        </a>
                    </div>
                </div>
            </div>
        </div> 
    </div>

    <div id="modalAdd" class="modal">
        <div class="modal-content">
            <h4 align ="center">{{movie.title}}</h4>
            <p align="center">Save your comment and your rate for this film</p>
            <div class="row">
                <div class="row">
                    <div class="input-field col s8">
                        <i class="material-icons prefix">account_circle</i>
                        <input id="icon_prefix" v-model="pseudo" type="text" class="validate">
                        <label for="icon_prefix">Pseudo</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s8 ">
                        <textarea id="textReview" v-model="textReview" class="materialize-textarea"></textarea>
                        <label for="textReview">Your review</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col 2">
                        <h6>score : {{scoreReview}}</h6>
                    </div>
                    <p class="range-field col s6">
                        <input type="range" v-model="scoreReview" min="0" max="100" />
                    </p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a v-on:click="saveReview()" class="modal-close waves-effect waves-green btn-flat">Save</a>
        </div>
    </div>

    <div id="modalSee" class="modal">
        <div class="modal-content">
            <h4>Reviews for {{movie.title}}</h4>
            <div class="divider"></div>
            <div  class="row">
                <div class="col s12" v-for="(review,index) in movie.review"
                    v-bind:item="review"
                    v-bind:index="index"
                    v-bind:key="review.pseudo">
                    <h6> {{review.pseudo}} , {{review.date.slice(0,10)}} </h6>
                    <div class="row">
                        <ul  class="collection col s8 grey lighten-5">
                            <li class="collection-item">{{review.comment}}</li>
                        </ul> 
                        <div class="col s4">
                            <div  class="collection grey lighten-5">
                                <span class="dark-text text-darken-2">Rate</span>
                                <span v-if="review.score>67" class="green lighten-3 badge">{{review.score}}</span>
                                <span v-else-if="review.score>45" class="amber lighten-2 badge">{{review.score}}</span>
                                <span v-else class="deep-orange lighten-2 badge">{{review.score}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="divider"></div>
                </div>
            </div>
        </div>
    </div>

    
    

</body>
</template>

<script>
// https://alligator.io/vuejs/vue-google-maps/
// https://console.cloud.google.com/google/maps-apis/overview?hl=fr&project=bike-datamining
import Navbar from "./Navbar.vue";
import PostService  from '../PostService';
const postService = new PostService();
import * as noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
export default {
    name:'Movies',
    components :{
        Navbar
    },
    data(){
        return {
            movie : '',
            id : this.$route.params.id,
            textReview : '',
            scoreReview : 50,
            pseudo : ''
        }
    },
    mounted(){
       var slider = document.getElementById('slider');
        noUiSlider.create(slider, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });
    },
    async created() {
        const id = this.$route.params.id
        const res = await postService.fetchMovieById(id)
        this.movie = res.data
        console.log(this.movie)
    },
    methods : {
        moreFilmInfo(id){
            console.log(id)
        },

        saveReview(){
            postService.addReview(this.id,this.pseudo,this.textReview,this.scoreReview)
            .then(res=>{
                console.log(res.data)
                postService.fetchMovieById(this.id)
                .then(res=>this.movie=res.data)
            })

        }
    }
}
</script>


<style scoped>

#posterImg {
    border-radius: 5%;
}

#watchBut {
    top:0px;
    height: 40px;
    width: 416px;
}

#commentPanel{
    height : 50px;
}

</style>