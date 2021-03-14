<template lang="html">
  <main>
    <section class="canvas-section">
      <pixi-renderer
        :backgroundColor="0x0078FF"
        :height="480"
        :width="640"
      >
        <pixi-text text="ClickMe"
            :textStyle="{fontSize: 48}"
            :anchor-x="0.5"
            :anchor-y="0.5"
            :x="320"
            :y="240"
            @pointerdown="onPointerDown"
        />
      </pixi-renderer>
    </section>
  </main>
</template>

<script>
export default {
  methods: {
    onPointerDown (e) {
      alert(JSON.stringify(e.data))
    }
  }
}
</script>
