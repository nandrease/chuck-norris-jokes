<template>
  <div class="card" :class="{ 'has-background-dark has-text-light': inFavourites }">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="fact.icon_url" alt="Chuck Norris avatar" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4" :class="{ 'has-text-light': inFavourites }">Chuck Norris</p>
          <p class="subtitle is-6">
            <a
              v-show="inFavourites"
              href="#"
              @click.prevent="removeFromFavourites"
              class="has-text-danger"
            >
              <i class="fas fa-star" aria-hidden="true"></i> Remove from Favourites
            </a>
            <a
              v-show="!inFavourites"
              href="#"
              @click.prevent="addToFavourites"
              class="has-text-success"
            >
              <i class="far fa-star" aria-hidden="true"></i> Add to Favourites
            </a>
          </p>
        </div>
      </div>

      <div
        class="subtitle has-text-left"
        :class="{ 'has-text-light': inFavourites }"
      >{{ fact.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fact: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToFavourites() {
      this.$store.dispatch("addToFavourites", this.fact);
    },
    removeFromFavourites() {
      this.$store.dispatch("removeFromFavourites", this.fact.id);
    }
  },
  computed: {
    favourites() {
      return this.$store.state.favourites;
    },
    inFavourites() {
      return this.favourites.find(item => item.id === this.fact.id);
    }
  }
};
</script>
