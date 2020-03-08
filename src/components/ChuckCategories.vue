<template>
  <div class="hello">
    <ul>
      <li v-for="category of state.categories" :key="category">
        <a @click.prevent="() => fetchFacts(category)">{{ category }}</a>
      </li>
    </ul>
    <div class="columns is-block">
      <p v-if="state.loading">Loading...</p>
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

export default {
  components: {
    CardComponent
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
    category: null,
    loading: false,
    facts: []
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

<style lang="scss">
ul > li {
  display: inline;
  margin: 0 10px;

  a {
    padding: 10px;
    display: inline-block;
  }
}
</style>
