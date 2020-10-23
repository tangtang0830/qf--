<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: ""
    };
  },
  mounted() {
    console.log(123);
    // this.$store.dispatch("FETCH_MENULIST")
  }
};
</script>
