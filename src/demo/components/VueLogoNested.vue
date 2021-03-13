<script>
export default {
  data () {
    return {
      dimensions: { x: 640, y: 480 }
    }
  },
  props: {
    t: Number
  }
}
</script>

<template>
    <pixi-sprite  src="/img/logo.png" :x="dimensions.x / 2" :y="dimensions.y / 2 + 40 * Math.sin(t / 20)" :anchorX="0.5" :anchorY="0.5" />
</template>
