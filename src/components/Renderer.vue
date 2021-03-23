<template>
  <div class="pixi-renderer">
    <!-- All child <template> elements get added in here -->
    <slot v-if="isMounted" />
  </div>
</template>

<script>
import { Application } from 'pixi.js';

export default {
    provide() {
        return {
            app: this.app,
            stage: this.app.stage,
            renderer: this.app.renderer,
            parentContainer: this.app.stage
        };
    },
    props: {
        height: Number,
        width: Number,
        autoResize: Boolean,
        backgroundColor: Number,
        clearBeforeRender: Boolean,
        preserveDrawingBuffer: Boolean,
        resolution: Number,
        roundPixels: Boolean,
        transparent: Boolean
    },
    data() {
        let options = { width: this.width, height: this.height };
        if (this.autoResize) { options.autoResize = this.autoResize; }
        if (this.backgroundColor) { options.backgroundColor = this.backgroundColor; }
        if (this.clearBeforeRender) { options.clearBeforeRender = this.clearBeforeRender; }
        if (this.preserveDrawingBuffer) { options.preserveDrawingBuffer = this.preserveDrawingBuffer; }
        if (this.resolution) { options.resolution = this.resolution; }
        if (this.roundPixels) { options.roundPixels = this.roundPixels; }
        if (this.transparent) { options.transparent = this.transparent; }

        this.app = new Application(options);

        return {
            isMounted: false
        };
    },
    watch: {
        ...['autoResize', 'backgroundColor', 'clearBeforeRender', 'preserveDrawingBuffer',
            'resolution', 'roundPixels', 'transparent']
            .map(prop => function (value) { this.app.renderer[prop] = value; }),
        height(height) { this.app.renderer.resize(this.width, height); },
        width(width) { this.app.renderer.resize(width, this.height); }
    },
    mounted() {
        this.$el.appendChild(this.app.view);
        this.app.ticker.add(delta => this.$emit('tick', delta, { app: this.app, renderer: this.app.renderer, stage: this.app.stage }));
        this.$nextTick(() => {
            this.isMounted = true;
        });
    }
};
</script>

<style>
.pixi-renderer {
  display: inline-block;
  line-height: 0;
}

.pixi-renderer div {
  display: none;
}
</style>
