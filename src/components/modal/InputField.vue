<template lang="html">
  <form>
    <div class="form-group">
      <label for="email">電子信箱</label>
      <input type="email"
        class="form-control"
        id="email" placeholder="Enter your email"
        :value="field.data.email"
        @input="$emit('modalInputUpdate', $event.target.value, 'email')"
      >
    </div>
    <div class="form-group">
      <label for="Name">姓名</label>
      <input type="Name"
        class="form-control" id="Name"
        placeholder="Enter your Name"
        :value="field.data.name"
        @input="$emit('modalInputUpdate', $event.target.value, 'name')"
      >
    </div>
  </form>
</template>

<script>
export default {
  props: {
    field: {
      type: Object
    }
  }
}
</script>

<style lang="css">
</style>
