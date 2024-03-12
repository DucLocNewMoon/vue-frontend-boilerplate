<script>
import axios from 'axios';
import { GET_EMAILS, CREATE_TODO } from './graphql/emails';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    HelloWorld
  },
  data() {
    return {
      error: null,
      emails: [],
      newTodoText: 'Hello Mutation',
    }
  },
  created() {
    axios.get('/')
      .then(response => {
        // Handle the response data here
        console.log(response.data);
      })
      .catch(error => {
        // Handle the error here
        console.error(error);
      });
  },
  computed: {
    defaultEnvsByVite() {
      return import.meta.env
    },
  },
  apollo: {
    emails: {
      query: GET_EMAILS,
      error(error) {
        this.error = JSON.stringify(error.message)
      } 
    },
  },
  methods: {
    createTodo() {
      // Save the user input in case of an error
      const newTodoText = this.newTodoText;
      // Clear it early to give the UI a snappy feel
      this.newTodoText = '';
      
      // Call the GraphQL mutation
      this.$apollo.mutate({
        mutation: CREATE_TODO,
        variables: {
          text: newTodoText,
          userId: "1", 
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createTodo: {
            __typename: 'Todo',
            id: -1, // Assuming you don't have the ID yet
            text: newTodoText,
            done: false, // Assuming it's not done when initially created
            user: {
              __typename: 'User',
              id: "1", // Assuming you have a userId
            },
          },
        },
      })
      .then((response) => {
        // Handle success if needed
        const createdTodo = response.data.createTodo;
        const userId = createdTodo.user.id;
        const todoText = createdTodo.text;
        const isDone = createdTodo.done;

        // You can then use these variables as needed
        console.log("User ID:", userId);
        console.log("Todo Text:", todoText);
        console.log("Is Done:", isDone);
      })
      .catch((error) => {
        // Restore the initial user input
        this.newTodoText = newTodoText;
        // Set error message if needed
        this.error = JSON.stringify(error.message);
      });
    },
  },
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <!-- Element Plus -->
      <el-button type="primary">Hello from Element Plus</el-button>

      <!-- Vuetify -->
      <v-btn
        prepend-icon="$vuetify"
        append-icon="$vuetify"
        variant="outlined"
      >
        Hello From Vuetify
      </v-btn>

      <!-- TailwindCSS -->
      <h1 class="text-3xl font-bold underline">
        Hello From TailwindCSS
      </h1>

      <!-- Vite -->
      <p>
        Default Envs By Vite: {{ defaultEnvsByVite }}
      </p>

      <!-- Graphql -->
      <div>
        <p style="font-size: 30px">Hello from graphql</p>
        <div v-if="$apollo.queries.emails.loading">
          Loading ...
        </div>
        <div v-if="error">
          {{ error }}
        </div>
        <div v-for="email in emails" :key="email.id">
          {{ email.account }} - {{ email.pass }}
        </div>
        <button @click="createTodo">Create Todo</button>
      </div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
