<template>
  <section class="section home">
    <div class="container">
      <h1 class="title">Choose your favourite Chuck Norris joke</h1>
      <ChuckCategories />
    </div>
  </section>
</template>

<script>
import ChuckCategories from "@/components/ChuckCategories.vue";

export default {
  components: {
    ChuckCategories
  }
};
</script>

<style scoped>
.section {
  padding: 1.5rem;
}
</style>
