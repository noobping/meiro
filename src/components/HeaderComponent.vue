<template>
  <header>
    <p v-for="(v, k) in stats" :key="k">
      <span>{{ k + 1 }}</span>
      だんかい
      <b v-if="parseInt(v / 60)">
        は
        <span>{{ parseInt(v / 60) }}</span>
        ぷん
      </b>
      です。
    </p>
    <p v-if="stats.length">
      <br />
    </p>
    <p alt="押すは諾">おしましょう</p>
    <p>迷路遊ぶ</p>
    <h1>迷路</h1>
  </header>
</template>

<script>
import store from "@/store";

export default {
  name: "HeaderComponent",
  computed: {
    stats() {
      return store.state.level.completed.reverse();
    }
  },
  watch: {
    stats(_) {}
  }
};
</script>

<style scoped>
* {
  writing-mode: vertical-lr;
  text-align: center;
}
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  width: 100%;
}
h1 {
  font-size: 5em;
}
p {
  font-size: 1em;
}
span {
  writing-mode: horizontal-tb;
}
</style>
