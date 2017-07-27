<template lang="pug">
#Toasts
  transition-group(name="toast-list",tag="ul")
    article.message.toast-list-item(
      v-for="toast, index of content",
      :key="toast.id",
      :class="type(toast.type)")
      .message-header
        p {{ toast.title}}
        button.delete(@click="remove(toast.id)")
      .message-body {{ toast.body}} 
</template>

<style lang="stylus">

#Toasts
  position absolute
  top 40px
  right 20px
  z-index 10

.toast-list-item
  transition all 1s
  width 240px

.toast-list-enter, .toast-list-leave-to
  opacity 0
  transform translate(30px, 0)

.toast-list-move
  transition transform 1s

.toast-list-leave-active
  position absolute

</style>

<script>
export default {

  methods: {

    add (params) {
      for (let key in this.defaults) {
        if (params[key] === undefined) {
          params[key] = this.defaults[key]
        }
      }

      params.created = Date.now()
      params.id = Math.random()
      params.expire = setTimeout(() => { this.remove(params.id) }, this.defaults.timeout * 1000)

      this.content.unshift(params)
    },

    remove (id) {
      this.content.splice(this.index(id), 1)
    },
    index (id) {
      for (let key in this.content) {
        if (id === this.content[key].id) {
          return key
        }
      }
    },

    type (type) {
      switch (type) {
        case 'error' :
          return 'is-danger'
        case 'success' :
          return 'is-success'
        case 'info' :
          return 'is-info'
      }
    },

  },

  data () {

    return {
      defaults: {
        title: 'undefined title',
        body: 'undefined body',
        timeout: 5,
      },
      content: [],
    }

  }

}

</script>

