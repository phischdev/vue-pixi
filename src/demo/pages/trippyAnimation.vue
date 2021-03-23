<script>
import { RenderTexture, Sprite } from 'pixi.js';

export default {
    components: {  },
    data() {
        this.renderTexture1 = RenderTexture.create(640, 480);
        this.renderTexture2 = RenderTexture.create(640, 480);
        
        return {
            t: 0,
            rotation: 0,
            renderTexture: this.renderTexture1
        };
    },
    computed: {
        currentTexture() {
            return this.renderTexture;
        },
        fruits() {
            return [
                '/img/rt_object_01.png',
                '/img/rt_object_02.png',
                '/img/rt_object_03.png',
                '/img/rt_object_04.png',
                '/img/rt_object_05.png',
                '/img/rt_object_06.png',
                '/img/rt_object_07.png',
                '/img/rt_object_08.png'
            ];
        },
        scale() {
            let f = 1 + Math.sin(this.t / 100) * 0.2;
            return f;
        },
        spritePositions() {
            let positions = [...Array(20).keys()].map(i => ({
                x: Math.random() * 320 - 160,
                y: Math.random() * 240 - 120
            }));
            return positions;
        }
    },
    created() {
        
    },
    methods: {
        update(dt, { renderer, stage }) {
            this.t += dt;
            
            if (this.renderTexture === this.renderTexture1) {
                this.renderTexture = this.renderTexture2;
                this.$nextTick(() => {
                    renderer.render(stage, this.renderTexture1);
                });
            } else if (this.renderTexture === this.renderTexture2) {
                this.renderTexture = this.renderTexture1;
                this.$nextTick(() => {
                    renderer.render(stage, this.renderTexture2);
                });
            }

            
        }
    }
};
</script>

<template lang="html">
  <main>
    <section class="canvas-section">
      <pixi-renderer
        :background-color="0x0078FF"
        :width="640"
        :height="480"
        @tick="update"
      >
        <pixi-sprite
          :texture="renderTexture"
          :x="320"
          :y="240"
          :anchor-x="0.5"
          :anchor-y="0.5"
          :scale-x="scale"
          :scale-y="scale"
        />
        <pixi-container
          :x="320"
          :y="240"
          :pivot-x="0.5"
          :pivot-y="0.5"
          :rotation="-t / 100"
        >
          <pixi-sprite
            v-for="i in 20"
            :key="i-1"
            :rotation="t / 10"
            :src="fruits[(i - 1) % fruits.length]"
            :x="spritePositions[i-1].x"
            :y="spritePositions[i-1].y"
            :anchor-x="0.5"
            :anchor-y="0.5"
          />
        </pixi-container>
      </pixi-renderer>
    </section>

    <section />
  </main>
</template>

<style lang="css" scoped>
.wrapper {
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
