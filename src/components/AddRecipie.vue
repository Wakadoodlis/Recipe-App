<template>
<!--ADDING RECIPIE -->
  <div class="add-recipie container">
    <h3 class="center-align indigo-text"> Add new recipie</h3>
    <!--ADDING RECIPIE FORMA -->
    <form action="" @submit.prevent="addRecipie">
      <!--ADDING RECIPIE TITLE -->
      <div class="field title">
        <label for="title" class="label-title">Recipie Title:</label>
        <input type="text" name="title" v-model="title" class="main-inp">
      </div>
      <!--SHOWING ADDED INGREDIENT -->
      <div v-for="(ing,index) in ingredients" :key="index" class="field">
        <label for="ingreedient" class="label-title">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <!--ADDING RECIPIE INGREDIENT -->
      <div class="field add-recipie">
        <label for="add-recipie" class="label-title">Add an ingredient:</label>
        <input type="text" name="add-recipie" class="main-inp" @keydown.tab.prevent="addIng" v-model="another" @blur="active='true'" @active="active='false'">
        <p v-if="active" class="active-p"> Press "tab" to add an ingrident</p>
         <!--BUTTON add recipie -->
        <!-- <a class="btn-floating btn-small purple darken-4"><i class="material-icons">add</i></a> -->
      </div>
      <div class="field center-align">
        <!--FEEDBACK FOR NOT PROVIDING TITLE -->
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <!--BUTTON -->
        <button class="btn pink darken-1 round">Add recipie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddRecipie",
  data() {
    return {
      title: null,
      another: null,
      feedback: null,
      slug: null,
      active: false,
      ingredients: []
    };
  },
  methods: {
    addRecipie() {
      if (this.title) {
        this.feedback = null;
        // creating a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_±§()"'!|\-:@"]/g,
          lower: true
        });
        db
          .collection("recepies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must anter the title";
      }
    },

    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
      } else {
        this.feedback = "You must add ingredients";
      }
      this.another = null;
      this.feedback = null;
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredients => {
        return ingredients != ing;
      });
    }
  }
};
</script>

<style>
.add-recipie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-recipie h3 {
  font-size: 2em;
  margin: 20px auto;
}

.add-recipie .field {
  margin: 20px auto;
  position: relative;
}

.main-inp {
  width: 400px !important;
}

.round {
  border-radius: 3%;
}
.active-p {
  color: #1a237e;
}

.add-recipie .delete {
  position: absolute;
  right: 0;
  bottom: 17px;
  color: #d50000;
  font-size: 1.4em;
  cursor: pointer;
}
</style>

