<template lang="html">
  <div v-if="value !== undefined">
    <input
      id="test"
      type="checkbox"
      :checked="value"
      @change="updateCheckbox($event)"
      :disabled="disabled"
      >
      <label for="test">{{ value === true ? '已驗證' : '未驗證' }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  methods: {
    updateCheckbox (event) {
      if (!this.disabled) {
        this.$emit('updateCheckbox', !this.value)
      }
    }
  }
}
</script>

<style lang="css" scoped>
#test + label { /* + 號代表 "下一個"，意指 #test 的下一個節點 label */
    display: block;
    position: relative;
    font-size: 16px;
    line-height: 20px; /* 將 label 的高設為 20px */
    padding-left: 50px; /* 避開勾選框 */
}

#test + label::before { /* 勾選框的底 */
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 20px;
    background-color: #CC4541;
    transition: .3s;
    border-radius: 30px;
}

#test + label::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 18px; /* 製作一個 20px * 20px 的開關 */
    height: 18px;
    border-width: 1px;
    border-style: solid;
    border-color: #CC4541;
    background-color: #fff;
    transition: .2s;
    border-radius: 50%;
}

#test:checked + label::before {
    background-color: #83cc41;
}

#test:checked + label::after {
    border-color: #83cc41;
    left: 20px; /* 開關往左移動 20px */
}

#test {
  display: none;
}
</style>
