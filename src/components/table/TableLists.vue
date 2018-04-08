<template lang="html">
  <table class="table table-hover">
    <TableHead :table-head-ary="tableHeadAry" :switchKey="switchKeyCht" />
    <TableBody :table-head-ary="tableHeadAry" :datas="datas" @moreClicked="moreClickedHandler" />

  </table>
</template>

<script>
import TableHead from './TableHead.vue';
import TableBody from './TableBody.vue';
import switchKeyCht from '../../utility/switchKeyCht'

export default {
  props: {
    tableHeadAry: {
      type: Array
    },
    datas: {
      type: Array
    }
  },
  components: {
    TableHead,
    TableBody
  },
  methods: {
    moreClickedHandler (payload) {
      this.$router.push( '/more' + this.$route.path + '/' + payload)
    },
    switchKeyCht
  }
}
</script>

<style lang="css">
</style>
