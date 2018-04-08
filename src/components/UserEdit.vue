<template lang="html">
  <div class="container" v-if="user">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Key</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in visible">
          <th scope="row">{{switchKey(key)}}</th>
          <td>
            <input class="form-control" type="text" :value="user[key]" @input="updateValue($event, key)" :placeholder="switchKey(key)">
          </td>
        </tr>
        <tr>
          <th scope="row">驗證</th>
          <td>
            <CheckboxItem :value="user.verify" :disabled="false" @updateCheckbox="updateCheckbox" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btn-container">
      <button type="button" class="btn btn-primary btn-mr" @click="$emit('editComplete')">編輯完成</button>
      <button type="button" class="btn btn-danger" @click="$router.push(`/more/user/${$route.params.id}`)">取消編輯</button>
    </div>
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
  methods: {
    updateCheckbox (value) {
      this.$emit('updateCheckbox', value)
    },
    updateValue (event, key) {
      this.$emit('updateInput', event.target.value, key)
    }
  }
}
</script>

<style lang="css" scoped>
 .btn-container {
    float: right;
 }
 .btn-mr {
   margin-right: 20px;
 }
</style>
