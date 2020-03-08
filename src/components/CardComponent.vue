<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="fact.icon_url" alt="Chuck Norris avatar" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">Chuck Norris</p>
          <p class="subtitle is-6">
            <a href="#">
              <i class="fas fa-star" aria-hidden="true"></i> Add to Favourites
            </a>
            <a href="#">
              <i class="far fa-star" aria-hidden="true"></i> Remove from Favourites
            </a>
          </p>
        </div>
      </div>

      <div class="subtitle">{{ fact.value }}</div>
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
  }
};
</script>
