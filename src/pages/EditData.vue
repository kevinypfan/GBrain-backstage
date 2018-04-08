<template lang="html">
  <div class="container">
    <h1 class="title-text">編輯資料</h1>
    <UserEdit
      :visible="visibleDatas"
      :user="data" v-if="pageMode === 'user'"
      :switchKey="switchKeyCht"
      @updateCheckbox="checkboxHandler"
      @updateInput="updateInputHandler"
      @editComplete="editCompleteHandler"
    />
    <TeamEdit
      :team="data" v-if="pageMode === 'team'"
      :switchKey="switchKeyCht"
      @updateInput="updateInputHandler"
      @editComplete="editCompleteHandler"
      @editModal="editModalHandler"
      @registerDelete="registerDeleteHandler"
      @addRegister="addRegisterHandler"
    />
    <BackDrop v-if="modalOpen"/>
    <transition name="fade" mode="out-in">
    <Modal v-if="modalOpen"
      @modalClose="modalOpen = false"
      @modalSuccess="modalSuccessHandler"
    >
      <InputField
        :field="editField"
        @modalInputUpdate="modalInputHandler"
      />
    </Modal>
  </transition>
  </div>
</template>

<script>
import axios from '../utility/axiosInstance'
import switchKeyCht from '../utility/switchKeyCht'

import UserEdit from '../components/UserEdit.vue'
import TeamEdit from '../components/TeamEdit.vue'
import BackDrop from '../components/modal/BackDrop.vue'
import Modal from '../components/modal/Modal.vue'
import InputField from '../components/modal/InputField.vue'

export default {
  components: {
    UserEdit,
    TeamEdit,
    BackDrop,
    Modal,
    InputField
  },
  data () {
    return {
      pageMode: "",
      data: null,
      modalOpen: false,
      editField: null
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
        visibleArray = ['email', 'name', 'phone', 'studentId', 'department', 'lineId'];
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
    checkboxHandler (value) {
      console.log(value)
      this.data.verify = value;
    },
    updateInputHandler (value, key) {
      this.data[key] = value;
    },
    editCompleteHandler () {
      this.$swal({
        title: '確定修改？',
        text: '修改後無法返回哦！',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定編輯！',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.value === true) {
          const authToken = window.localStorage.getItem('token');
          axios.patch(`/api/admin/${this.pageMode}/` + this.$route.params.id, this.data, {headers: { authToken }})
            .then((response) => {
            this.$swal(
              '編輯！',
              response.data.message,
              'success'
            ).then(result => {
              this.$router.push(`/more/${this.$route.params.type}/${this.$route.params.id}`)
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
    editModalHandler (key, index) {
      this.modalOpen = true;
      console.log(index)
      if (index >= 0) {
        this.editField = {
          key: key,
          _id: index,
          data: this.data[key][index],
          mode: 'edit'
        }
      } else {
        this.editField = {
          key: key,
          data: this.data[key],
          mode: 'edit'
        }
      }
    },
    modalInputHandler (value, key) {
      this.editField = {
        ...this.editField,
        data: {
          ...this.editField.data,
          [key]: value
        }
      }
    },
    modalSuccessHandler () {
      if (this.editField.data.email.trim() === "" || this.editField.data.name === "") {
        return ;
      }
      if (this.editField.mode === 'add' ) {
        this.data.registers.push(this.editField.data)
      } else {
        if (this.editField.key === 'registers') {
          this.data.registers[this.editField._id] = this.editField.data
        } else {
          this.data[this.editField.key] = this.editField.data
        }
      }
      this.modalOpen = false;
      this.editField = null;
    },
    registerDeleteHandler (index) {
      this.$swal({
        title: '確定刪除成員？',
        text: '資料上傳請按編輯完成！',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定刪除成員！',
        cancelButtonText: '取消'
      }).then(result => {
        if (result.value === true) {
          this.data.registers.splice(index, 1)
        }
        if (result.dismiss === 'cancel') {
          console.log('取消')
        }
      })
    },
    addRegisterHandler () {
      this.editField = {
        mode: 'add',
        data: {
          email: '',
          name: ''
        },
        key: 'registers'
      }
      this.modalOpen = true;

    }
  }
}
</script>

<style lang="css" scoped>
  .title-text {
    text-align: center;
    margin: 30px 0;
  }
</style>
