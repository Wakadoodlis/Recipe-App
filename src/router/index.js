import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import addRecipie from '@/components/AddRecipie'
import editRecipie from '@/components/EditRecipie'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-recipie',
      name: 'AddRecipie',
      component: addRecipie
    },
    {
      path: '/edit-recipie:recipie_slug',
      name: 'EditRecipie',
      component: editRecipie
    }

  ]


})
