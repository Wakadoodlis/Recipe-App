<template>
  <div v-if="recipie" class="edit-recipie container">
    <h3>Edit a {{recipie.title}} recipie</h3>
    <!--editing RECIPIE FORMA -->
    <form action="" @submit.prevent="editRecipie">
      <!--editing RECIPIE TITLE -->
      <div class="field title">
        <label for="title" class="label-title">Recipie Title:</label>
        <input type="text" name="title" v-model="recipie.title" class="main-inp">
      </div>
      <!--SHOWING editing INGREDIENT -->
      <div v-for="(ing,index) in recipie.ingredients" :key="index" class="field">
        <label for="ingreedient" class="label-title">Ingredient:</label>
        <input type="text" name="ingredient" v-model="recipie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <!--ADDING RECIPIE INGREDIENT -->
      <div class="field add-recipie">
        <label for="add-recipie" class="label-title">Add an ingredient:</label>
        <input type="text" name="add-recipie" class="main-inp" @keydown.tab.prevent="addIng" v-model="another">
   
         <!--BUTTON add recipie -->
        <!-- <a class="btn-floating btn-small purple darken-4"><i class="material-icons">add</i></a> -->
      </div>
      <div class="field center-align">
        <!--FEEDBACK FOR NOT PROVIDING TITLE -->
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <!--BUTTON -->
        <button class="btn pink darken-1 round">Edit recipie</button>
      </div>
    </form>
  </div>

</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EdditRecipie",
  data() {
    return {
      recipie: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editRecipie() {
      if (this.recipie.title) {
        this.feedback = null;
        // creating a slug
        this.recipie.slug = slugify(this.recipie.title, {
          replacement: "-",
          remove: /[$*_±§()"'!|\-:@"]/g,
          lower: true
        });
        db
          .collection("recepies")
          .doc(this.recipie.id)
          .update({
            title: this.recipie.title,
            ingredients: this.recipie.ingredients,
            slug: this.recipie.slug
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
        this.recipie.ingredients.push(this.another);
      } else {
        this.feedback = "You must add ingredients";
      }
      this.another = null;
      this.feedback = null;
    },
    deleteIng(ing) {
      this.recipie.ingredients = this.recipie.ingredients.filter(
        ingredients => {
          return ingredients != ing;
        }
      );
    }
  },
  created() {
    let ref = db
      .collection("recepies")
      .where("slug", "==", this.$route.params.recipie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.recipie = doc.data();
        this.recipie.id = doc.id;
      });
    });
  }
};
</script>

<style>
.label-title {
  color: #424242;
}
.edit-recipie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-recipie h3 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-recipie .field {
  margin: 20px auto;
  position: relative;
}

.main-inp {
  width: 400px !important;
  border-bottom: 2px solid #333 !important;
}

.round {
  border-radius: 3%;
}
.active-p {
  color: #1a237e;
}

.edit-recipie .delete {
  position: absolute;
  right: 0;
  bottom: 17px;
  color: #d50000;
  font-size: 1.4em;
  cursor: pointer;
}
</style>

