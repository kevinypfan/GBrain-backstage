<template lang="html">
  <button
    class="btn"
    :disabled="disabled"
    :class="btnType"
    @click="$emit('clicked')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['disabled', 'btnType']
}
</script>

<style lang="css" scoped>
  .btn {
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
    padding: 6px 20px;
    margin: 0 10px;
    font-weight: bold;
    font-size: 16px;
  }
  .success {
    color: green;
  }
  .danger {
    color: red;
  }
  .primary {
    color: blue;
    word-spacing: 7px;
  }
  .btn:disabled {
    color: #555;
    cursor: not-allowed;
  }
</style>
