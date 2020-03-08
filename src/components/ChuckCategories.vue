<template>
  <div class="hello">
    <ul>
      <li v-for="category of state.categories" :key="category">
        <a @click.prevent="() => fetchFacts(category)">{{ category }}</a>
      </li>
    </ul>
    <div v-for="fact of state.facts" :key="fact.id">
      <img :src="fact.icon_url" alt="Chuck Norris icon" />
      <p>{{ fact.value }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
import axios from "axios";

export default {
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
    while (arrLen < 3 && errorLen < 5) {
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
}
</style>
