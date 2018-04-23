<template lang="html">
  <div class="container">
    <h1 class="title-text">詳細資料</h1>
    <div class="btn-container">
      <button type="button" class="btn btn-primary btn-mr" @click="editDataBtn">編輯資料</button>
      <button type="button" class="btn btn-danger btn-mr" @click="deleteDataBtn">刪除此筆</button>
    </div>
    <UserMore :visible="visibleDatas" :user="data" v-if="pageMode === 'user'" :switchKey="switchKeyCht" />
    <TeamMore :team="data" v-if="pageMode === 'team'" :switchKey="switchKeyCht" @uploadPlanLess="modalOpen = true" />
    <BackDrop v-if="modalOpen"/>
    <transition name="fade" mode="out-in">
      <Modal v-if="modalOpen"
        @modalClose="modalCloseHandler"
        @modalSuccess="modalSuccessHandler"
      >
        <div>
          <input type="file" @change="fileChangeHandler">
        </div>
      </Modal>
  </transition>
  </div>
</template>

<script>
import axios from '../utility/axiosInstance'
import switchKeyCht from '../utility/switchKeyCht'

import UserMore from '../components/UserMore.vue'
import TeamMore from '../components/TeamMore.vue'

import BackDrop from '../components/modal/BackDrop.vue'
import Modal from '../components/modal/Modal.vue'

export default {
  components: {
    UserMore,
    TeamMore,
    BackDrop,
    Modal
  },
  data () {
    return {
      pageMode: "",
      data: null,
      modalOpen: false,
      file: null
    }
  },
  created () {
    const authToken = window.localStorage.getItem('token');

    this.pageMode = this.$route.params.type;
    axios.get(`/api/admin/${this.$route.params.type}/${this.$route.params.id}`, { headers: { authToken } })
      .then(response => {
        console.log(response.data)
        this.data = response.data;
      })
      .catch(err => {
        console.log(err);
      })
  },
  computed: {
    visibleDatas () {
      let visibleArray = [];
      if (this.pageMode === 'user') {
        visibleArray = ['email', 'name', 'phone', 'studentId', 'department', 'lineId', 'roleId'];
      } else if (this.pageMode === 'team') {
        visibleArray = ['title', 'registers', 'teacher', 'leader']
      } else {
        visibleArray = null;
      }
      return visibleArray;
    }
  },
  methods: {
    switchKeyCht,
    editDataBtn () {
      this.$router.push(`/edit/${this.$route.params.type}/${this.$route.params.id}`)
    },
    deleteDataBtn () {
      this.$swal({
        title: '確定刪除嗎？',
        text: '您將無法恢復它！',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定删除！',
        cancelButtonText: '取消'
      }).then((result) => {

        if (result.value === true) {
          const authToken = window.localStorage.getItem('token');
          axios.delete(`/api/admin/${this.$route.params.type}/${this.$route.params.id}`, { headers: { authToken } })
            .then((response) => {
            this.$swal(
              '刪除！',
              response.data.message,
              'success'
            ).then(result => {
              this.$router.push(`/${this.$route.params.type}`)
            })
            })
            .catch(err => {
              this.$swal(
                '刪除！',
                err,
                'error'
                );
                console.log(err);
              })
        }
        if (result.dismiss === 'cancel') {
          console.log('取消')
        }
      })
    },
    modalCloseHandler() {
      this.modalOpen = false;
      this.file = null;
    },
    fileChangeHandler(evt) {
       this.file = evt.target.files[0];
    },
    modalSuccessHandler() {
      const authToken = window.localStorage.getItem('token');
      var formData = new FormData();
      formData.append('teamData', JSON.stringify(this.data))
      formData.append('planLess', this.file)
      axios.post('/api/admin/uploadPlanLess', formData, {headers: { authToken }})
        .then((result) => {
          this.$swal(
            '上傳成功！',
            '檔案上傳或覆蓋成功',
            'success'
          ).then(() => {
            this.$set(this.data, 'planLess',  result);
            this.modalOpen = false;
            this.file = null;
          })
        })
        .catch(err => {
          console.log(err.response.data.error.message)
          this.$swal(
            '上傳失敗！',
            err.response.data.error.message,
            'error'
          )
        })
    }
  }
}
</script>

<style lang="css" scoped>
  .title-text {
    text-align: center;
    margin: 30px 0;
  }
  .btn-container {
    float: right;
  }
  .btn-mr {
    margin: 10px 10px;
  }
</style>
