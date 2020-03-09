<template>
  <div class="hello">
    <div class="content">
      <ul :class="state.showCategories ? 'openCategories' : 'hideCategories'">
        <li v-for="category of state.categories" :key="category">
          <a
            @click.prevent="() => fetchFacts(category)"
            class="button"
            :class="[category === state.currentCategory ? 'is-primary' : 'is-light']"
          >
            {{ category }}
            <TagCount :category="category" />
          </a>
        </li>
      </ul>
      <button @click="state.showCategories = !state.showCategories" class="button button--toggle">
        <span v-show="state.showCategories">
          <i class="fas fa-chevron-up" aria-hidden="true"></i>
        </span>
        <span v-show="!state.showCategories">
          <i class="fas fa-chevron-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="columns is-block">
      <p v-show="state.loading">Loading...</p>
      <div v-show="!state.loading && !state.facts.length">
        <p class="content">Please choose a category from above...</p>
      </div>
      <div v-for="fact of state.facts" :key="fact.id" class="column">
        <CardComponent :fact="fact" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
import axios from "axios";
import CardComponent from "./CardComponent.vue";
import TagCount from "./TagCount.vue";

export default {
  components: {
    CardComponent,
    TagCount
  },
  methods: {
    favouritesCount(name) {
      return this.$store.getters.favouritesCount[name];
    }
  },
  setup() {
    const { state, fetchCategories, fetchFacts } = useCategoriesFetch();
    return {
      state,
      fetchCategories,
      fetchFacts
    };
  }
};

function useCategoriesFetch() {
  let state = reactive({
    categories: [],
    currentCategory: null,
    loading: false,
    facts: [],
    showCategories: false
  });

  function fetchCategories() {
    axios
      .get("https://api.chucknorris.io/jokes/categories")
      .then(result => {
        state.categories = result.data;
      })
      .catch(err => console.log("Error", err));
  }

  async function fetchFacts(category) {
    state.facts = [];
    state.loading = true;
    state.currentCategory = category;
    const facts = [];
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    let arrLen = facts.length;
    let errorLen = 0;
    while (arrLen < 3 && errorLen < 7) {
      await axios
        .get(url)
        .then(result => {
          const duplicate = facts.some(fact => fact.id === result.data.id);
          if (duplicate) {
            errorLen++;
          } else {
            facts.push(result.data);
            arrLen++;
          }
        })
        .catch(err => console.log("Error", err));
    }
    state.loading = false;
    state.showCategories = false;
    state.facts = facts;
  }

  onMounted(fetchCategories);

  return {
    state,
    fetchCategories,
    fetchFacts
  };
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;

  ul {
    margin: 0;
    overflow: hidden;
    margin-right: 50px;

    &.hideCategories {
      max-height: 50px;
    }
    &.openCategories {
      max-height: 300px;
    }

    & > li {
      display: inline-block;
      margin: 4px 10px;

      a {
        padding: 10px;
        display: inline-flex;
      }
    }
  }

  .button--toggle {
    border: none;
    position: absolute;
    top: 0;
    right: 0;
    margin: 4px 0;
  }
}
</style>
