<template lang="html">
  <main>
    <section class="canvas-section">
      <pixi-renderer
        :background-color="0x0078FF"
        :height="480"
        :width="640"
        @tick="update"
      >
        <pixi-container
          :x="position.x"
          :y="position.y"
          :skew-x="skew.x"
          :skew-y="skew.y"
          :scale-x="scale.x"
          :scale-y="scale.y"
          :pivot-x="pivot.x"
          :pivot-y="pivot.y"
          :rotation="Math.PI / 180 * rotation"
          :alpha="alpha"
        >
          <pixi-sprite
            src="/img/logo.png"
            :x="sprite.x"
            :y="sprite.y"
            :scale-x="sprite.scale"
            :scale-y="sprite.scale"
            :anchor-x="0.5"
            :anchor-y="0.5"
            :rotation="sprite.angle + t / 60"
          />
        </pixi-container>
      </pixi-renderer>
    </section>

    <section />
  </main>
</template>

<script>
import CoordinateField from '../components/CoordinateField.vue';
import ColorField from '../components/ColorField.vue';

export default {
    components: { CoordinateField, ColorField },
    data() {
        return {
            t: 0,
            sprites: [],
            position: { x: 320, y: 240 },
            scale: { x: 1, y: 1 },
            pivot: { x: 0, y: 0 },
            skew: { x: 0, y: 0 },
            rotation: 0,
            alpha: 1
        };
    },
    created() {
        this.addSprite();
        this.addSprite();
        this.addSprite();
    },
    methods: {
        update(dt) {
            this.t += dt;
        }
    }
};
</script>

<style lang="css" scoped>
.wrapper {
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
