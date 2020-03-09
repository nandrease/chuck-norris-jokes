<template>
  <section class="section favourites">
    <div class="container">
      <h1 class="title">These are your favourite Chuck Norris jokes:</h1>
      <div v-show="!this.favourites.length">
        <p>Please select your favourite <router-link to="/" class="has-text-primary">Chuck Norris jokes</router-link> first.</p>
      </div>
      <div class="columns is-block">
        <div v-for="favourite of this.favourites" :key="favourite.id" class="column">
          <CardComponent :fact="favourite" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CardComponent from "@/components/CardComponent.vue";

export default {
  components: {
    CardComponent
  },
  computed: {
    favourites() {
      return this.$store.state.favourites;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 1.5rem;
}
</style>
