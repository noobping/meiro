<template>
  <Game v-if="run"></Game>
  <div v-else v-on:click="run = true">
    <HeaderComponent></HeaderComponent>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "App",
  components: {
    HeaderComponent: () => import("@/components/HeaderComponent"),
    Game: () => import("@/components/Game"),
    FooterComponent: () => import("@/components/FooterComponent"),
  },
  computed: {
    run: {
      get() {
        return store.state.run;
      },
      set(n) {
        if (n && !this.run) store.commit("start");
        if (!n && this.run) store.commit("stop");
      }
    },
  },
  mounted() {
    document.addEventListener("keyup", this.controlls);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.controlls);
  },
  methods: {
    controlls(n) {
      this.run = !(n.isTrusted && n.key == "Escape");
    },
  },
};
</script>

<style>
* {
  font-family: "Courier New", Courier, monospace;
  font-weight: normal;
  -ms-text-size-adjust: 100%; /* 2 */
  -webkit-text-size-adjust: 100%; /* 2 */
  margin: 0;
  padding: 0;
  border-spacing: 0;
}
p, h1 {
  color: #ffffff;
}
body {
  overscroll-behavior-y: contain;
  background: #252525;
}
</style>
