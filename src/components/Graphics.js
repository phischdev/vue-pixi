import DisplayObject from './DisplayObject.js'
import { Graphics } from 'pixi.js'

export default {
    mixins: [DisplayObject],
    props: {
        draw: Function
    },
    computed: {
        instance: () => new Graphics()
    },
    watch: {
        'instance': {
            handler(instance) {
                this.draw(instance)
            },
            immediate: true
        }
    },
    render() {
        return null;
    }
}
