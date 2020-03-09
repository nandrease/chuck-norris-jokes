<template>
  <a class="button">
    {{ category }}
    <span v-if="favouritesCount" class="tag is-dark">{{
      favouritesCount
    }}</span>
  </a>
</template>

<script>
export default {
  props: {
    category: {
      type: String
    }
  },
  computed: {
    favouritesCount() {
      return this.$store.getters.favouritesCount[this.category];
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  margin-left: 5px;
}
</style>
