<template>
  <div class='navbar'>
    <nav class='nav-extended main-nav'>
      <div class='nav-content'>
          <router-link :to="{name:'Index'}">
            <span class='nav-title title'> Recipies</span>
          </router-link>
          <a href='' class='btn-floating btn-large halfway-fab purple darken-4'>
              <router-link :to="{name: 'AddRecipie'}">
                <i class='material-icons'> add</i>
              </router-link> 
           </a>  
      </div>
    </nav>
  </div>
</template>


<<script>
  export default {
    name: 'navbar',
    data() {
      return {

      }
    }
  }
</script>

<style>
.main-nav {
  background-image: linear-gradient(to bottom, #b0bec5, #4db6ac);
}
.nav-title {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1rem;
  text-shadow: 2px 2px #b0bec5;
}
</style>