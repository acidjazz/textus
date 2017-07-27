<template lang="pug">
.nodes
  .node.node_array(v-if="isArray(value)")
    nav.level
      .level-left
        .level-item
          .subtitle.is-5
            strong {{ value.length }} 
        .level-item {{ name }}
        .level-item
          span.tag Array
      .level-right
        .level-item

          .dropdown.is-right.is-hoverable
            .dropdown-trigger
              button.button(aria-haspopup="true",aria-controls="dropdown-menu")
                span
                  | New
                span.icon.is-small
                  i.fa.fa-angle-down(aria-hidden="true")
            .dropdown-menu#dropdown-menu(role="menu")
              .dropdown-content
                a.dropdown-item.is-unselectable(@click="add('array')") Array
                a.dropdown-item.is-unselectable(@click="add('object')") Object
                a.dropdown-item.is-unselectable(@click="add('element')") Element

        .level-item
          a.button(@click="toggle()")
            span.icon.is-small
              i.fa(:class="{'fa-expand': hidden, 'fa-compress': !hidden}")
    .content(:class="{ 'is-hidden': hidden }")
      Node(v-model="internal[index]",:name="index",:key="index",v-for="item, index in value")
  .node(v-if="isObject(internal)")
    Node(v-model="internal[index]",:name="index",:key="index",v-for="item, index in value")
  .node(v-if="isString(internal) && isString(name)")
    .field.has-addons
      p.control
        input.input(type="text",v-model="iname")
      p.control.is-expanded
        input.input(type="text",v-model="internal")
      p.control
        a.button
          span.icon.is-small.has-text-danger
            i.fa.fa-trash
  .node(v-if="(isString(internal) || isNumber(internal)) && isNumber(name)")
    .field.has-addons
      p.control.is-expanded
        textarea.textarea(type="text",v-model="internal",rows="1")
      p.control
        a.button
          span.icon.is-small.has-text-danger
            i.fa.fa-trash
  // .node(v-if="isNumber(value)") {{ number }} number
</template>

<style lang="stylus">
.nodes
  > .node
    padding-bottom 0.75rem
    &.node_array
      padding-left 10px
      border-left 2px solid rgb(222,226,229)
  textarea
    border-radius 0.4em 0 0.4em 0.4em
    min-height auto
    height auto
</style>


<script>
export default {

  name: 'Node',

  props: {
    name: null,
    value: null,
    startHidden: {
      type: Boolean,
      default: true,
    }
  },

  methods: {


    add (type) {
      switch (type) {
        case 'element' :
          console.log(type)
          this.value.push('hello there')
          break

      }
    },

    toggle () {

      this.hidden = !this.hidden

      if (this.hidden === false) {
        setTimeout(() => {
          window.autosize.update(document.querySelectorAll('textarea'))
        }, 20)
      }
    },
    isObject (value) {
      return (!(Array.isArray(value)) &&
      !(value === null) &&
      (typeof value === 'object'))
    },
    isArray (value) { return Array.isArray(value) },
    isString (value) { return typeof value === 'string' },
    isNumber (value) { return typeof value === 'number' },
    isBoolean (value) { return typeof value === 'boolean' },
    isNull (value) { return value === null },
  },

  watch: {
    name: function (name) {
      this.iname = name
    },
    value: function (value) {
      this.internal = value
    },
    internal: function (value) {
      this.$emit('input', value)
    },
  },

  mounted () {
    this.hidden = this.startHidden
    window.autosize(document.querySelectorAll('textarea'))
  },

  data () {
    return {
      hidden: true,
      internal: this.value,
      iname: this.name,
    }
  },

}

</script>
