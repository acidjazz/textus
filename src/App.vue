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
            a.panel-block(
              v-for="data, index of copy",
              @click="activate(index)",
              :class="{'is-active': active === index}",
            )
              span.panel-icon
                i.fa.fa-archive
              | {{ index }}

            .panel-block(:class="{'is-hidden': tog.newkey}",key="button")
                button.button.is-primary.is-fullwidth(@click="tonewkey") New Listing
            .panel-block(:class="{'is-hidden': !tog.newkey}",key="input")
                p.control.has-icons-left(v-on-clickaway="awaynewkey")
                  input.input(
                    type="text",
                    ref="newkey",
                    @keyup.enter="newkey($event.target.value)",
                  )
                  span.icon.is-small.is-left
                    i.fa.fa-file-text

        .column
          Node(v-model="copy[active]",:name="active",:startHidden="false",v-if="copy[active] !== 'loading'")

  Toast(ref='Toast')
  footer.footer
    .container
      .content.has-text-right
        strong textus 
        | by 
        a(href="https://256.io/",target="_new") kevin olson  

</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import Toast from './components/Toast'
import Node from './components/Node'
export default {

  mixins: [ clickaway ],
  components: { Toast, Node },

  methods: {

    activate (index) {
      this.active = index
    },

    newkey (value) {

      if (this.copy[value] !== undefined) {
        this.$refs.Toast.add({ type: 'error', title: 'Key exists', body: value, timeout: 1, })
        return true
      }

      this.copy[value] = []
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

  mounted () {
    this.get(() => {
      this.active = Object.keys(this.copy)[0]
    })
  },

  data () {
    return {
      copy: { this: 'loading' },
      active: 'this',
      name: 'what',
      tog: {
        newkey: false,
        modal: false,
      }
    }
  }
}

</script>

<style lang="stylus">
.panel-block
  position relative
.container
  max-width 960px
  width 960px
</style>

