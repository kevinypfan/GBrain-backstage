<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <TableList :table-head-ary="tableHeadAry" :datas="users" />
      </div>
    </div>
  </div>
</template>

<script>
import TableList from '../components/table/TableLists.vue'
import axios from '../utility/axiosInstance'
export default {
  data () {
    return {
      users: null
    }
  },
  components: {
    TableList
  },
  created () {
    const authToken = window.localStorage.getItem('token');
    axios.get('/api/admin/userData', { headers: { authToken } })
      .then((res) => {
        this.users = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  computed: {
    tableHeadAry () {
      return ['studentId', 'name', 'email', 'phone', 'verify'];
    }
  }
}
</script>

<style lang="css">
</style>
