import { Sprite, Texture } from 'pixi.js'
import DisplayObject from './DisplayObject.js'

export default {
    mixins: [DisplayObject],
    props: {
        anchorX: Number,
        anchorY: Number,
        blendMode: Number,
        // buttonMode
        // pluginName
        // shader
        // texture
        tint: Number,
        src: String,
        texture: Object
    },
    computed: {
        instance() {
            if (this.src && this.src.startsWith('data:image/')) {
                let dataUri = decodeURIComponent(this.src);
                let dataTexture = Texture.from(dataUri);
                return new Sprite(dataTexture);
            } else if (this.src) {
                return Sprite.from(this.src);
            } else if (this.texture) {
                return new Sprite(this.texture);
            } else {
                return new Sprite();
            }
        }
    },
    watch: {
        'instance': {
            handler(instance) {
                if (this.tint) instance.text = this.tint
                if (this.blendMode) instance.blendMode = this.blendMode
                if (this.anchorX || this.anchorY) instance.anchor.set(this.anchorX || 0, this.anchorY || 0)
            },
            immediate: true
        },
        'tint': function (tint) { this.instance.tint = tint },
        'blendMode': function (blendMode) { this.instance.blendMode = blendMode },
        'anchorX': function (anchorX) { this.instance.anchor.x = anchorX },
        'anchorY': function (anchorY) { this.instance.anchor.y = anchorY },
        'texture': function (texture) { 
            this.instance.texture = texture
         }
    }
}
