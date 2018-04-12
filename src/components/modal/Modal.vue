<template lang="html">
  <div class="modal-container">
    <div class="title">
      <h4>{{modalType ? modalType : "編輯："}}</h4>
    </div>
    <div class="section">
      <slot></slot>
    </div>
    <div class="bottom">
      <button type="button" class="btn btn-primary btn-mr" @click="$emit('modalSuccess')" v-if="!modalType">確定</button>
      <button type="button" class="btn btn-danger btn-mr" @click="$emit('modalClose')">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalType: String
  }
}
</script>

<style lang="css" scoped>
  .modal-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #eee;
    padding: 20px 30px;
    border-radius: 30px;
    width: 480px;
    z-index: 999;
  }

  .title {
    margin: 10px;
  }
  .section {
    border-top: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    padding: 10px 10px;
  }
  .bottom {
    float: right;
    margin-top: 10px;
  }
  .bottom button {
    margin-right: 10px;
  }

  @media only screen and (max-width: 480px) {
      .modal-container {
          width: 100%;
      }
  }

</style>
