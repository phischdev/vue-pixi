import { Viewport } from 'pixi-viewport';

export default {
    props: {
        screenWidth: Number,
        screenHeight: Number,
        worldWidth: Number,
        worldHeight: Number,
    },
    inject: ['renderer', 'parentContainer'],
    provide() {
        return {
            parentContainer: this.instance
        }
    },
    computed: {
        instance() {
            let { screenWidth, screenHeight, worldWidth, worldHeight, renderer } = this;
            return new Viewport({
                screenWidth,
                screenHeight,
                worldWidth,
                worldHeight,

                interaction: renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
            })
        }
    },
    beforeDestroy() {
        this.parentContainer.removeChild(this.instance)
    },
    created() {
        this.parentContainer.addChild(this.instance)
        this.instance.drag().wheel()
    },
    watch: {
        screenWidth(value) {
            this.instance.screenWidth = value
        },
        screenHeight(value) {
            this.instance.screenHeight = value
        },
        worldWidth(value) {
            this.instance.worldWidth = value
        },
        worldHeight(value) {
            this.instance.worldHeight = value
        }
    },
    render(h) {
        if (this.$slots.default) {
            return h('div', this.$slots.default)
        } else {
            return null;
        }
    }
}
