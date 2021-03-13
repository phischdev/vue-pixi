<template lang="html">
  <main>
    <section class="canvas-section">
      <pixi-renderer
        @tick="update"
        :backgroundColor="color.hex"
        :height="dimensions.y"
        :width="dimensions.x"
      >
        <VueLogo :t="t" />
      </pixi-renderer>
    </section>

    <section>
      <h1 class="title">PIXI Renderer</h1>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Size</label>
        </div>
        <CoordinateField :coordinate="dimensions" />
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Background</label>
        </div>
        <ColorField :color="color" />
      </div>
    </section>
  </main>
</template>

<script>
import CoordinateField from '../components/CoordinateField.vue'
import ColorField from '../components/ColorField.vue'
import VueLogo from '../components/VueLogo.vue'

export default {
  components: { CoordinateField, ColorField, VueLogo },
  data () {
    return {
      t: 0,
      dimensions: { x: 640, y: 480 },
      color: { r: 0, g: 120, b: 255 }
    }
  },
  methods: {
    update (dt) {
      this.t += dt
    }
  }
}
</script>

<style scoped>
.canvas-section { min-height: 544px; }
</style>
