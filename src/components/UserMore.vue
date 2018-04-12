<template lang="html">
  <div class="container">
    <table class="table table-bordered"  v-if="user">
      <thead>
        <tr>
          <th scope="col">Key</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in visible" :key="key">
          <th scope="row">{{switchKey(key)}}</th>
          <td>{{user[key]}}</td>
        </tr>
        <tr>
          <th scope="row">驗證</th>
          <td>
            <CheckboxItem :value="user.verify" disabled />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CheckboxItem from './UI/CheckboxItem.vue'
export default {
  components: {
    CheckboxItem
  },
  props: {
    user: {
      type: Object
    },
    visible: {
      type: Array
    },
    switchKey: {
      type: Function
    }
  },
  computed: {
    userKeys () {
      return Object.keys(this.user)
    }
  },
  methods: {

  }
}
</script>

<style lang="css">
</style>
