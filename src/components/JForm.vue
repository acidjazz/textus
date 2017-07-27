<template lang="pug">
#Form
  Node(v-model="value",:startHidden="false")
</template>

<script>
import Node from './Node'
export default {
  components: { Node },
  props: {
    value: [Object, Array]
  },
}
</script>
