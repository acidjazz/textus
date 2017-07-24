<template lang="pug">
#app
  .container
    .navbar
      .navbar-brand
        .navbar-item
          img(src="/static/textus.svg",width="28",height="28")
          .title.is-4 &nbsp; textus
      .navbar-end
        a.navbar-item(href="https://github.com/acidjazz/textus",target="_blank")
          .icon
            i.fa.fa-github
  section.section
    .container
      .columns
        .column.is-one-quarter
          nav.panel
            p.panel-heading Content

            .panel-block
              p.control.has-icons-left
                input.input.is-small(type="text",placeholder="Search")
                span.icon.is-small.is-left
                  i.fa.fa-search
            a.panel-block(v-for="data, index of copy")
              span.panel-icon
                i.fa.fa-archive
              | {{ index }}

            .panel-block
              button.button.is-primary.is-fullwidth(
                @click="tonewkey",
                :class="{'is-hidden': tog.newkey}",
              ) New Listing

              p.control.has-icons-left(
                :class="{'is-hidden': !tog.newkey}",
                v-on-clickaway="awaynewkey",
              )
                input.input(
                  type="text",
                  ref="newkey",
                  @keyup.enter="newkey($event.target.value)",
                )
                span.icon.is-small.is-left
                  i.fa.fa-file-text
        .column
          .block(v-if="active !== undefined")
            | {{ copy[active] }}

  .toasts
    transition-group(name="toast-list",tag="ul")
      article.message.toast-list-item(
        v-for="toast, index of toasts.content",
        :key="toast.id",
        :class="toastType(toast.type)")
        .message-header
          p {{ toast.title}}
          button.delete(@click="toastDelete(toast.id)")
        .message-body {{ toast.body}} 

  footer.footer
    .container
      .content.has-text-right
        strong textus 
        | by 
        a(href="https://256.io/",target="_new") kevin olson  

</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {

  mixins: [ clickaway ],

  methods: {

    toast (params) {
      for (let key in this.toasts.defaults) {
        if (params[key] === undefined) {
          params[key] = this.toasts.defaults[key]
        }
      }

      params.created = Date.now()
      params.id = Math.random()
      params.expire = setTimeout(() => { this.toastDelete(params.id) }, this.toasts.defaults.timeout * 1000)

      this.toasts.content.push(params)
    },

    toastDelete (id) {
      this.toasts.content.splice(this.toastIndex(id), 1)
    },
    toastIndex (id) {
      for (let key in this.toasts.content) {
        if (id === this.toasts.content[key].id) {
          return key
        }
      }
    },

    toastType (type) {
      switch (type) {
        case 'error' :
          return 'is-danger'
        case 'success' :
          return 'is-success'
        case 'info' :
          return 'is-info'
      }
    },

    shuffle () {
      this.toasts.content = window._.shuffle(this.toasts.content)
    },

    newkey (value) {

      if (this.copy[value] !== undefined) {
        this.toast({ type: 'error', title: 'Key exists', body: value, timeout: 1, })
        return true
      }

      this.copy[value] = {}
      this.$refs.newkey.value = ''
      this.tog.newkey = false
      this.save()
    },

    awaynewkey () {
      this.$refs.newkey.value = ''
      this.tog.newkey = false
    },
    tonewkey () {
      setTimeout(() => {
        this.tog.newkey = true
      }, 10)
      setTimeout(() => {
        this.$refs.newkey.focus()
      }, 20)
    },

    get (complete) {
      window.axios.get('http://localhost:3000/json')
      .then(response => {
        this.copy = response.data
        complete()
      })
    },

    save (complete) {
      window.axios.post('http://localhost:3000/json', this.copy)
      .then(response => {
        this.copy = response.data
        if (complete !== undefined) {
          complete()
        }
      })
    },

  },

  created () {
    this.get(() => {

      this.active = Object.keys(this.copy)[0]

      this.toast({ title: 'title', body: 'this is a toast' })
      this.toast({ title: 'error title', type: 'error', body: 'this is an error' })
      this.toast({ title: 'succcess title', type: 'success', body: 'this is a success' })
      this.toast({ title: 'info title', type: 'info', body: 'this is an info toast' })

    })
  },

  data () {
    return {
      copy: undefined,
      active: undefined,
      tog: {
        newkey: false,
        modal: false,
      },
      toasts: {
        timeouts: undefined,
        defaults: {
          title: 'undefined title',
          body: 'undefined body',
          timeout: 5,
        },
        content: []
      },
    }
  }
}
</script>

<style lang="stylus">
.container
  max-width 960px
  width 960px

.toasts
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
