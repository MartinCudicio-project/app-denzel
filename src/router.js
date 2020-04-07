import Vue from 'vue';
import Router from 'vue-router';
import 'nouislider/distribute/nouislider.css';

//on stipule que Vue initialisé dans le main va utiliser Router pour naviguer entre les pages
Vue.use(Router);

//routes 
import Movies from "./components/Movies.vue";
import InfoMovie from "./components/InfoMovie.vue";

const router = new Router({
    
    mode: 'history', //je crois c'est pas obligatoire mais c'est mieux pour le hashage pendant la navigation
                        //juste ca va marcher à partir Internet Explorer 8 et pas pour les navigateurs antérieurs
    routes : [
        {
            path:'/',
            component : Movies //on redirige la connection vers la page d'acceuil quand on tappe la page   
        },
        {
            path:'/infoMovie/:id',
            name : 'infoMovie',
            props : true,
            component : InfoMovie //on redirige la connection vers la page d'acceuil quand on tappe la page   
        }
]});
        

//guard de notre route pour /account

export default router;