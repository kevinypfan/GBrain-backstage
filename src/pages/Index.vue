<template lang="html">
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">Hello, 管理員！</h1>
      <p class="lead">您可以點選右上角，切換至您要的資料</p>
      <hr class="my-4">
      <p>按下More 可以看更多訊息，如需要修改按下修改資料，必須按下完成編輯才是編輯完成！</p>

      <div class="generate-container">
        <a class="btn btn-primary btn-lg" role="button" @click="generateXlsx">產生Excel檔案</a>
        <a class="btn btn-primary btn-lg" role="button" @click="generateZip">產生隊伍Zip檔案</a>
      </div>

    </div>
    <BackDrop v-if="modalOpen"/>
    <transition name="fade" mode="out-in">
      <Modal v-if="modalOpen"
        @modalClose="modalCloseHandler"
        modalType="下載："
      >
      <div class="modal-section">
        <img src="@/assets/loading.gif" v-if="xlsxPath === null &&  zipPath === null">
        <a :href="apiHost + zipPath" class="btn btn-primary" v-if="xlsxPath || zipPath">{{xlsxPath ? "Excel" : "Zip"}} 檔案下載</a>
      </div>

      </Modal>
    </transition>
  </div>
</template>

<script>
import axios from '../utility/axiosInstance'

import BackDrop from '../components/modal/BackDrop.vue'
import Modal from '../components/modal/Modal.vue'

export default {
  data () {
    return {
      modalOpen: false,
      loading: false,
      xlsxPath: null,
      zipPath: null,
      apiHost: 'http://120.105.129.58/'
    }
  },
  components: {
    BackDrop,
    Modal
  },
  methods: {
    generateXlsx () {
      const authToken = window.localStorage.getItem('token');

      this.modalOpen = true;
      axios.get('/api/system/fileXlsx', { headers: { authToken }})
        .then(res => {
          this.xlsxPath = res.data
        }).catch(err => {
          console.log(err)
        })
    },
    generateZip () {
      const authToken = window.localStorage.getItem('token');

      this.modalOpen = true;
      axios.get('/api/system/fileZIP', { headers: { authToken }})
        .then(res => {
          this.zipPath = res.data
        }).catch(err => {
          console.log(err)
        })
    },
    modalCloseHandler () {
      this.modalOpen = false
      this.xlsxPath = null
      this.zipPath = null
    }
  }
}
</script>

<style lang="css" scoped>
  .modal-section {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-section img {
    height: 200px;
  }
  .generate-container {
    color: #ededed;
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
  }
</style>
