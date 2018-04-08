<template lang="html">
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand" tag="a">Home Page</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <router-link
            v-for="(item, i) in menuItems"
            class="nav-item"
            tag="li"
            activeClass="active"
            :key="i"
            :to="item.link"
          >
          <div class="nav-link">{{item.title}}</div>
        </router-link>
        </ul>
        <form class="form-inline" v-if="userIsAuthenticated">
          <button class="btn btn-danger bar-btn" type="button" @click="onLogout">Logout</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      collapse: false
    }
  },
  computed: {
    menuItems () {
      var menuItems;
      if (this.userIsAuthenticated) {
        menuItems = [
          {title: '會員資料', link: '/user'},
          {title: '隊伍資料', link: '/team'}
        ]
      } else {
        menuItems = [
          {title: '登入', link: '/auth'}
        ]
      }
      return menuItems;
    },
    userIsAuthenticated () {
        return this.$store.state.user !== null && this.$store.state.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('userLogout').then(() => {
        this.$router.push('/auth')
      }).catch(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="css" scoped>
.nav-link {
  cursor: pointer;
}
.bar-btn {
  margin-left: 20px;
}
</style>
