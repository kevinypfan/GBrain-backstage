<template lang="html">
  <div class="input-container">
    <label :for="inputConfig.id" class="default-label">
      <input class="input-style"
        :type="inputConfig.config.elConfig.type"
        :id="inputConfig.id"
        :value="inputConfig.config.value"
        @input="updateValue($event, inputConfig.id)"
        :class="{invalid: !inputConfig.config.valid && !inputConfig.config.onFocus && inputConfig.config.touched}"
        @focus="onFocus(inputConfig.id)"
        @blur="onBlur(inputConfig.id)"
      >
      <p
        class="text-style"
        :class="{'text-animate': inputConfig.config.onFocus || inputConfig.config.touched}"
        >
        {{inputConfig.config.elConfig.label}}
      </p>
    </label>
  </div>
</template>

<script>
export default {
  props: ['inputConfig'],
  methods: {
    updateValue (event, id) {
      this.$emit('inputValueChanged', event.target.value, id)
    },
    onFocus (id) {
      this.$emit('onInputFocus', true, id)
    },
    onBlur (id) {
      this.$emit('onInputFocus', false, id)
    }
  }
}
</script>

<style lang="css" scoped>
.input-container {
  text-align: initial;
}
.default-label {
  width: 100%;
  margin-top: 0;
}
.input-style {
  width: 100%;
  padding: 6px 12px;
  margin: 10px 0;
  box-sizing: border-box;
  line-height: 1.5;
  color: #555555;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: .2s
}
.text-style {
  position: absolute;
  transform: scale(1) translate(10px, -40px);
  color: #aaa;
  transition: .2s
}
.text-animate {
  transform: scale(.8) translate(0, -88px);
  color: #333;
}
.invalid {
  background-color: #f9c0c0;
  border-color: red;
}
</style>
