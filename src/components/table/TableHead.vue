<template lang="html">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" v-for="headItem in tableHeadAry" :key="headItem">{{switchKey(headItem)}}</th>
    </tr>
  </thead>
</template>

<script>
export default {
  props: {
    tableHeadAry: {
      type: Array
    },
    switchKey: {
      type: Function
    }
  }
}
</script>

<style lang="css">
</style>
