<template lang="pug">
#app
  .container
    .navbar
      .navbar-brand
        .navbar-item(href="https://github.com/acidjazz/textus",target="_blank")
          .icon
            i.fa.fa-github

    footer.footer
      .container
        .content.has-text-centered
          | textus by
          a(href="https://256.io/",target="_new") kevin olson 
          | this source is licensed 
          a(href="https://github.com/acidjazz/#license") Apache
          |.

</template>

<script>
export default {
  data () { 
    return { }
  }
}
</script>

<style lang="stylus">
</style>
