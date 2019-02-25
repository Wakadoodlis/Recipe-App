<template>
<!-- receptai -->
    <div class="index container main">
      <div class="card card-bg" v-for="recipie in recipies" :key="recipie.id">
        <div class="card-content">
          <!-- delete recepta -->
          <i class="material-icons delete" @click="deleteRec(recipie.id)">delete</i>
          <!-- receptu title -->
          <h2 class="indigo-text">{{recipie.title}}</h2>
          <ul class="ingredients">
            <!-- INGRIDIENTAI -->
            <li v-for="(ing,index) in recipie.ingredients" :key="index">
              <span class="chip">{{ing}}</span>
            </li>
          </ul>
        </div>
        <span class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name:'EditRecipie', params: {recipie_slug: recipie.slug}}">
            <i class="material-icon edit">edit</i>
          </router-link>
        </span>
      </div>
    </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      recipies: []
    };
  },
  methods: {
    deleteRec(id) {
      // deleting from db
      db
        .collection("recepies")
        .doc(id)
        .delete()
        .then(() => {
          // localus istrynimas
          this.recipies = this.recipies.filter(recipie => {
            return recipie.id != id;
          });
        });
    }
  },
  created() {
    // fetch data from db
    db
      .collection("recepies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let recipie = doc.data();
          recipie.id = doc.id;
          this.recipies.push(recipie);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card-bg {
  background-image: linear-gradient(to top, #b0bec5, #4db6ac);
}
body {
  background-image: linear-gradient(90deg, #4fc3f7, #ff8a65);
}
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 2rem;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}

.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

.delete:hover {
  color: #d50000;
  transition: 0.5s;
}

.edit {
  text-transform: lowercase;
  font-size: 1.2rem !important;
}
</style>
