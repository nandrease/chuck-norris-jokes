<template>
  <section class="section home">
    <div class="container">
      <h1 class="title">Chuck Norris jokes</h1>
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
