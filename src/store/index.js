import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const rand = function(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

export default new Vuex.Store({
  state: {
    run: false,
    time: {
      start: new Date().getTime(),
    },
    level: {
      completed: [],
    },
    color: [],
    tile_size: 48,
    player: {
      x: 0,
      y: 0,
      char: 2,
    },
    min: {
      x: 0,
      y: 0,
    },
    max: {
      x: 0,
      y: 0,
    },
  },
  mutations: {
    start(state, _) {
      state.run = true;
      state.time.start = new Date().getTime();
      for (let i = 0; i < 9; i++) {
        state.color.push('rgb(' + rand(230, 255) + ', ' + rand(230, 255) + ', ' + rand(230, 255) + ')');
      }
    },
    next(state, _) {
      state.run = false;
      const start = state.time.start;
      const stop = new Date().getTime();
      state.level.completed.push(Math.floor((stop - start) / 1000));
      state.time.start = 0;
      state.player.char++;
    },
    stop(state, _) {
      state.run = false;
      state.time.start = 0;
    },
    player_x(state, n) {
      state.player.x = n;
    },
    player_y(state, n) {
      state.player.y = n;
    },
    char(state, n) {
      state.player.char = n;
    },
    min_x(state, n) {
      state.min.x = n;
    },
    min_y(state, n) {
      state.min.y = n;
    },
    max_x(state, n) {
      state.max.x = n;
    },
    max_y(state, n) {
      state.max.y = n;
    },
  },
});
