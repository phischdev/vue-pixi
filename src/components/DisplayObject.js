
import { DisplayObject } from 'pixi.js'

/**
 * This is the base mixin component for most object components in VueGL,
 * corresponding [THREE.Object3D](https://threejs.org/docs/index.html#api/core/Object3D).
 * Object3d components inside a object3d component are added
 * as children via THREE.Object3D.prototype.add() method.
 *
 * VglObject3d components inside default slots are added as children.
 */

let pixiEvents = new Set([
  'pointerdown',
  'mousedown'
])

export default {
  props: {
    alpha: Number,
    // buttonMode: Number,
    // cacheAsBitmap: Number,
    cursor: String,
    // filterArea: Number,
    // filters: Number,
    // hitArea: Number,
    // interactive: Number,
    // localTransform: Number,
    // mask: Number,
    // name: Number,
    // parent: Number,
    pivotX: Number,
    pivotY: Number,
    // renderable: Number,
    rotation: Number,
    scaleX: Number,
    scaleY: Number,
    skewX: Number,
    skewY: Number,
    visible: Boolean,
    x: Number,
    y: Number
  },
  computed: {
    instance() {
      return new DisplayObject()
    }
  },
  inject: ['parentContainer'],
  // created () { this.vglNamespace.update() },
  // beforeUpdate () { this.vglNamespace.update() },
  beforeDestroy() {
    const { instance } = this
    this.parentContainer.removeChild(instance)
  },
  render() {
    return null;
  },
  methods: {
    addEvents() {
      // let listenedEvents = Object.keys(this._events)
      for (let event in this._events) {
        if (pixiEvents.has(event)) {
          this.instance.interactive = true
          this.instance.on(event, (e) => {
            this.$emit(event, e)
          })
        }
      }
    }
  },
  watch: {
    'instance': {
      handler(newInstance, oldInstance) {
        if (oldInstance && oldInstance.parent) oldInstance.parent.removeChild(oldInstance)
        // if (parent.instance) parent.instance.addChild(newInstance)
        this.parentContainer.addChild(newInstance)
        this.addEvents()
        if (this.x) newInstance.x = this.x
        if (this.y) newInstance.y = this.y

        if (this.alpha) newInstance.alpha = this.alpha
        if (this.cursor) newInstance.cursor = this.cursor
        if (this.rotation) newInstance.rotation = this.rotation
        if (this.visible) newInstance.visible = this.visible
        if (this.skewX || this.skewY) newInstance.skew.set(this.skewX || 1, this.skewY || 1)
        if (this.scaleX || this.scaleY) newInstance.scale.set(this.scaleX || 1, this.scaleY || 1)
        if (this.pivotX || this.pivotY) newInstance.pivot.set(this.pivotX || 1, this.pivotY || 1)
      },
      immediate: true
    },
    '$parent.instance': function parentInstance(instance) {
      this.instance.setParent(instance)
    },
    'x': function (x) { this.instance.x = x },
    'y': function (y) { this.instance.y = y },
    'alpha': function (alpha) { this.instance.alpha = alpha },
    'cursor': function (cursor) { this.instance.cursor = cursor },
    'rotation': function (rotation) { this.instance.rotation = rotation },
    'visible': function (visible) { this.instance.visible = visible },
    'skewX': function (skewX) { this.instance.skew.x = skewX },
    'skewY': function (skewY) { this.instance.skew.y = skewY },
    'scaleX': function (scaleX) { this.instance.scale.x = scaleX },
    'scaleY': function (scaleY) { this.instance.scale.y = scaleY },
    'pivotX': function (pivotX) { this.instance.pivot.x = pivotX },
    'pivotY': function (pivotY) { this.instance.pivot.y = pivotY }
  }
}
