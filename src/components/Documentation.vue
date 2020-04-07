<template>
<body>
  <Navbar />
  <div class="de">
    <h3>WORK FROM Martin C and Francois-Xavier dBdP</h3>
    <h5>Explication de la solution</h5>
    <p>Nous avons décidé pour notre solution d’utiliser vue.js, qui est une nouvelle techonologie permettant de créer facilement une application web avec node.js.</p>
    <h5>Recuperation des données :</h5>
    <p>
      Dans getData.js , nous avons créeé une fonction async qui va nous permettre de récupérer l’ensemble des données. Au debut de cette fonction, nous pouvons voir une liste de tous les bases de données que nous avons incorporées. Nous avons ensuite créer une classe station qui a pour propriétés : id, name, position : {lat,lng}, parkAvailability, bikeAvailability, capacity.
      Nous exportons la méthode getDataresponse() qui va nous permettre de charger l’ensemble des informations dans notre application.
    </p>
    <h5>JSON to JSON-LD to TripleStore to SPARQL</h5>
    <p>
      Nous avons ensuite utilisé la librairie ‘jsonld’ (installée avec npm) pour pouvoir convertir notre json-ld en RDF sous le format n-quads.
      Pour installer Fuseki, nous avons run l’image Docker de Fuseki, et ensuite créé par l’interface de Fuseki notre dataset : bikes. Il est primordial de le créer manuellement en lançant getData.js puisque nous n’avons pas réussi à créer une requête http post permettant de créer le dataset automatiquement.
      Nous avons ensuite une première requête qui va permettre de supprimer tous les triplets de notre dataset bikes. Puis nous avons une méthodes qui prend en paramètres notre variable .nt et qui va load nos triplets dans le tripleStore.
    </p>
    <h5>Application Vue.js</h5>
    <p>
      Pour créer notre application, nous avons utilisé le framework CSS, materialize.
      Celui-ci nous a permis de faire la NavBar. Nous avons également intaller le package ‘vue-router’ pour indiquer quel ressource charger à l’intérieur de notre App. Le dernier package est ‘vue2-google-map’ qui va nous permettre d’utiliser l’API de google maps pour afficher notre carte.
      Cette vue est la plus importante de notre projet. A la création, on demande à l’utilisateur d’accepter la géolocalisation. On y appelle également la fonction de getData() qui va nous permettre de charger toutes les stations de France.
      Par défaut la carte va se placer sur la position de l’utilisateur et va afficher les 10 plus proches stations. Si il n’y a pas de stations dans un rayon pertinent, alors il n’y a aura rien d’afficher.
      L’utilisateur peut également indiquer un lieu : il y a une auto-completion implémentée. Quand il fera enter, alors la map va se mettre cette lieu indiqué et afficher les 10 stations les plus proches de lui.
    </p>
  </div>
  <pdf src="./static/relativity.pdf"></pdf>
</body>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  components: {
    Navbar
  },
  data() {
    return {};
  }
};
</script>