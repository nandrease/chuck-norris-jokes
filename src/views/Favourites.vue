<template>
  <section class="section favourites">
    <div class="container">
      <h1>This is an favourits page</h1>

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
