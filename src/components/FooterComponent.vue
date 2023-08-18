<template>
  <footer>
    <p>&copy; ニック {{ year }}</p>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  computed: {
    year() {
      return new Date().getFullYear() || "2017";
    }
  }
};
</script>

<style scoped>
footer {
  margin: auto;
  display: block;
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
}
p {
  padding: 1em;
  writing-mode: horizontal-tb;
  text-align: center;
  font-size: 1em;
}
</style>
