<template>
  <section v-touch:swipe="controll_down">
    <p class="none" v-if="!map.length && maze == undefined" v-on:click="stop()">切り</p>
    <table
      v-on:click.stop="key = {
            left: false,
            right: false,
            up: false,
            down: false
          }"
    >
      <tbody>
        <tr v-for="(y, b) in map" :key="b">
          <td v-for="(x, a) in y" :key="a">
            <Tile :id="x" :x="a" :y="b"></Tile>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-if="map.length" class="left" v-on:click="key = {
            left: true,
            right: false,
            up: false,
            down: false
          }">
      <font-awesome-icon icon="chevron-left" />
    </button>
    <button v-if="map.length" class="right" v-on:click="key = {
            left: false,
            right: true,
            up: false,
            down: false
          }">
      <font-awesome-icon icon="chevron-right" />
    </button>
    <button v-if="map.length" class="up" v-on:click="key = {
            left: false,
            right: false,
            up: true,
            down: false
          }">
      <font-awesome-icon icon="chevron-up" />
    </button>
    <button v-if="map.length" class="down" v-on:click="key = {
            left: false,
            right: false,
            up: false,
            down: true
          }">
      <font-awesome-icon icon="chevron-down" />
    </button>
  </section>
</template>

<script>
import store from "@/store";

export default {
  name: "Game",
  components: {
    Tile: () => import("@/components/Tile")
  },
  data: () => {
    return {
      maze: undefined,
      map: [],
      key: {
        left: false,
        right: false,
        up: false,
        down: false
      },
      loop: {
        delay: 100
      }
    };
  },
  created() {
    this.load_level(this.level);
  },
  mounted() {
    document.addEventListener("keyup", this.controll_up);
    document.addEventListener("keydown", this.controll_down);
    this.find_player();
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.controll_up);
    document.removeEventListener("keydown", this.controll_down);
  },
  destroyed() {
    this.maze = undefined;
  },
  computed: {
    level() {
      return Math.max(0, store.state.level.completed.length);
    },
    tile_size() {
      return Math.max(10, store.state.tile_size);
    },
    run() {
      return store.state.run;
    },
    x: {
      get() {
        return store.state.player.x;
      },
      set(n) {
        if (this.is_path(n, this.y) || !this.is_path(this.x, this.y))
          store.commit("player_x", n);
      }
    },
    y: {
      get() {
        return store.state.player.y;
      },
      set(n) {
        if (this.is_path(this.x, n) || !this.is_path(this.x, this.y))
          store.commit("player_y", n);
      }
    },
    min_x: {
      get() {
        return store.state.min.x;
      },
      set(n) {
        if (this.min_x != n) store.commit("min_x", n);
      }
    },
    min_y: {
      get() {
        return store.state.min.y;
      },
      set(n) {
        if (this.min_y != n) store.commit("min_y", n);
      }
    },
    max_x: {
      get() {
        return store.state.max.x;
      },
      set(n) {
        if (this.max_x != n) store.commit("max_x", n);
      }
    },
    max_y: {
      get() {
        return store.state.max.y;
      },
      set(n) {
        if (this.max_y != n) store.commit("max_y", n);
      }
    }
  },
  watch: {
    level(_) {},
    tile_size(_) {},
    run(_) {}
  },
  methods: {
    stop() {
      store.commit("stop");
    },
    load_level(n) {
      try {
        require("@/json/maze" + n + ".json"); // if file found
        this.maze = () => import("@/json/maze" + n + ".json");
      } catch (_) {
        this.maze = undefined;
        this.map = [];
      }
    },
    is_path(x, y) {
      const b = Math.min(y, y - this.min_y, this.map.length - 1);
      const a = Math.min(x, x - this.min_x, this.map[b].length - 1);
      return this.map[b][a] < 0 || this.map[b][a] == 1;
    },
    controll_up(n) {
      if (this.map.length) {
        if (n == "top" || n.key == "ArrowUp" || n.key == "W" || n.key == "w")
          this.key.up = false;
        if (
          n == "bottom" ||
          n.key == "ArrowDown" ||
          n.key == "S" ||
          n.key == "s"
        )
          this.key.down = false;
        if (n == "left" || n.key == "ArrowLeft" || n.key == "A" || n.key == "a")
          this.key.left = false;
        if (
          n == "right" ||
          n.key == "ArrowRight" ||
          n.key == "D" ||
          n.key == "d"
        )
          this.key.right = false;
      }
    },
    controll_down(n) {
      if (this.map.length) {
        if (n == "top" || n == "bottom" || n == "left" || n == "right")
          this.key = {
            left: false,
            right: false,
            up: false,
            down: false
          };

        if (n == "top" || n.key == "ArrowUp" || n.key == "W" || n.key == "w")
          this.key.up = true;
        if (
          n == "bottom" ||
          n.key == "ArrowDown" ||
          n.key == "S" ||
          n.key == "s"
        )
          this.key.down = true;
        if (n == "left" || n.key == "ArrowLeft" || n.key == "A" || n.key == "a")
          this.key.left = true;
        if (
          n == "right" ||
          n.key == "ArrowRight" ||
          n.key == "D" ||
          n.key == "d"
        )
          this.key.right = true;
        if (n.key == "PageDown")
          this.loop.delay = Math.max(25, this.loop.delay - 25);
        if (n.key == "PageUp")
          this.loop.delay = Math.min(750, this.loop.delay + 25);
      }
    },
    controll_loop() {
      setTimeout(() => {
        if (this.key.left) this.x = Math.max(0, this.x - 1);
        if (this.key.right) this.x = Math.max(0, this.x + 1);
        if (this.key.down) this.y = Math.max(0, this.y + 1);
        if (this.key.up) this.y = Math.max(0, this.y - 1);
        this.view();
        if (this.run) this.controll_loop();
      }, this.loop.delay);
    },
    find_player() {
      if (this.maze != undefined)
        this.maze().then(e => {
          const length = e.default.length;
          for (let y = 0; y < length; y++) {
            for (let x = 0; x < e[y].length; x++) {
              const n = e[y][x];
              if (n > 1 && n < 5) {
                store.commit("player_x", x);
                store.commit("player_y", y);
                store.commit("char", n);
                this.controll_loop();
                return;
              }
            }
          }
        });
    },
    view() {
      if (this.maze != undefined)
        this.maze().then(e => {
          const max = e.default.length;
          const width = parseInt(window.innerWidth / this.tile_size);
          const height = parseInt(window.innerHeight / this.tile_size);
          const xfactor = parseInt(width / 2);
          const yfactor = parseInt(height / 2);
          this.min_x = Math.max(0, this.x - xfactor);
          this.min_y = Math.max(0, this.y - yfactor);
          this.max_x = Math.max(width, this.x + xfactor);
          this.max_y = Math.max(height, this.y + yfactor);

          this.map = [];
          for (let b = this.min_y; b < Math.min(this.max_y, max); b++) {
            let tmp = [];
            for (
              let a = this.min_x;
              a < Math.min(this.max_x, e[b].length);
              a++
            ) {
              const tile = e[b][a];
              tmp.push(tile);
            }
            this.map.push(tmp);
          }
        });
    }
  }
};
</script>

<style scoped>
.none {
  writing-mode: vertical-lr;
  text-align: center;
  font-size: 5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  width: 100%;
}
.left,
.right,
.up,
.down {
  position: fixed;
  display: block;
  border: none;
  background: transparent;
  font-size: 2em;
  color: #ffffff;
  mix-blend-mode: difference;
}
.left,
.right {
  top: 2em;
  bottom: 2em;
  width: 2em;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
.up,
.down {
  left: 0;
  right: 0;
  height: 2em;
  width: 100%;
}
.up {
  top: 0;
}
.down {
  bottom: 0;
}
</style>