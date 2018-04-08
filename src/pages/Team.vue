<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <TableList :table-head-ary="tableHeadAry" :datas="teams"/>
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
      teams: null
    }
  },
  components: {
    TableList
  },
  created () {
    const authToken = window.localStorage.getItem('token');
    axios.get('/api/admin/teamData', { headers: { authToken } })
      .then((res) => {
        this.teams = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  computed: {
    tableHeadAry () {
      return ['title', 'leader', 'teacher'];
    }
  }
}
</script>

<style lang="css">
</style>
