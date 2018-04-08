import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/Index.vue'
import Auth from '../pages/Auth.vue'
import Team from '../pages/Team.vue'
import User from '../pages/User.vue'
import MoreData from '../pages/MoreData.vue'
import EditData from '../pages/EditData.vue'
import NotFound from '../pages/NotFound.vue'


Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Index, meta: {requireAuth: true} },
    { path: '/auth', component: Auth, meta: {requireLogged: true}},
    { path: '/team', component: Team, meta: {requireAuth: true} },
    { path: '/user', component: User, meta: {requireAuth: true} },
    { path: '/more/:type/:id', component: MoreData, meta: { requireAuth: true } },
    { path: '/edit/:type/:id', component: EditData, meta: { requireAuth: true } },
    { path: '/*', component: NotFound }
  ],
  mode: 'history'
})
