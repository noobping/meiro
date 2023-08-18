<template>
  <div
    v-bind:style="{ 
      width: tile_size + 'px', 
      height: tile_size + 'px', 
      background: id < 0 || id == 1 ? bg : 'transparent' 
    }"
  >
    <span v-if="player || id > 1" v-bind:style="{ 'font-size': (tile_size * 0.7) + 'px',}">
      <b v-if="player && char == 2">め</b>
      <b v-if="player && char == 3">い</b>
      <b v-if="player && char == 4">ろ</b>

      <b v-if="!player && id == 2">迷</b>
      <b v-if="!player && id == 3">路</b>
      
      <b v-if="id == 5">切</b>
      <b v-if="id == 6">り</b>
    </span>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "Tile",
  props: {
    id: 0,
    x: 0,
    y: 0
  },
  mounted() {
    this.char = Math.max(2, this.id);
  },
  computed: {
    char: {
      get() {
        return store.state.player.char;
      },
      set(n) {
        if (this.char != n) store.commit("char", n);
      }
    },
    bg() {
      return store.state.color[Math.abs(this.id) - 1];
    },
    tile_size() {
      return Math.max(10, store.state.tile_size);
    },
    player() {
      const x = Math.min(
        store.state.player.x,
        (store.state.max.x - store.state.min.x) / 2
      );
      const y = Math.min(
        store.state.player.y,
        (store.state.max.y - store.state.min.y) / 2
      );
      if (x == this.x && y == this.y && this.id == 1) store.commit("next");
      return x == this.x && y == this.y;
    }
  },
  watch: {
    bg(_) {},
    tile_size(_) {},
    player(_) {}
  }
};
</script>

<style scoped>
span {
  margin: auto;
  writing-mode: vertical-lr;
  text-align: center;
  margin: auto;
  color: #ffffff;
  mix-blend-mode: difference;
}
</style>
