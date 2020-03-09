<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/favourites">
        Favourites
        <span v-if="totalCount" class="tag is-dark">{{ totalCount }}</span>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    totalCount() {
      return this.$store.getters.totalFavourites;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px 10px 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: hsl(171, 100%, 41%);
    }
  }
}
</style>
