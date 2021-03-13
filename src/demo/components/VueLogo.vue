<script>
import VueLogoNested from '../components/VueLogoNested.vue'

export default {
  components: {
    VueLogoNested
  },
  props: {
    t: Number
  }
}
</script>

<template>
    <VueLogoNested :t="t" />
</template>
