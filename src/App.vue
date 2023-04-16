<template>
  <v-app>
    <v-main>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/test">test</router-link> |
        <router-link to="/test2">test2</router-link>
      </nav>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
