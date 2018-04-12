<template lang="html">
  <div class="container" v-if="team">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Key</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">專題題目</th>
          <td><input class="form-control" type="text" :value="team['title']" @input="updateValue($event, 'title')" :placeholder="switchKey('title')"></td>
        </tr>
        <tr>
          <th scope="row">隊長</th>
          <td class="table-td">
            {{switchKey(team.leader.name)}}  ({{switchKey(team.leader.email)}})
            <div class="table-btn">
              <button type="button" class="btn btn-primary btn-mr" @click="$emit('editModal', 'leader')">編輯</button>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">指導老師</th>
          <td class="table-td">
            {{switchKey(team.teacher.name)}}  ({{switchKey(team.teacher.email)}})
            <div class="table-btn">
              <button type="button" class="btn btn-primary btn-mr" @click="$emit('editModal', 'teacher')">編輯</button>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row" class="table-td">
            隊員
            <div class="table-btn">
              <button type="button" class="btn btn-success btn-mr" @click="$emit('addRegister')">新增</button>
            </div>
          </th>
          <td>
            <ul class="list-group list-group-flush">
              <li class="list-group-item table-td" v-for="(r, index) in team.registers" :key="index">
                {{r.name}}  ({{r.email}})
                <div class="table-btn">
                  <button type="button" class="btn btn-danger btn-mr" @click="$emit('registerDelete', index)">刪除</button>
                </div>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btn-container">
      <button type="button" class="btn btn-primary btn-mr" @click="$emit('editComplete')">編輯完成</button>
      <button type="button" class="btn btn-danger" @click="$router.push(`/more/team/${$route.params.id}`)">取消編輯</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    team: {
      type: Object
    },
    switchKey: {
      type: Function
    }
  },
  methods: {
    updateValue (event, key) {
      this.$emit('updateInput', event.target.value, key)
    }
  }
}
</script>

<style lang="css" scoped>
.table-td {
  position: relative;
  display: block;
}
.table-td .table-btn {
  position: absolute;
  right: 10px;
  top: 5px;
}
.btn-mr {
  margin-right: 10px;
}
.btn-container {
   float: right;
}
</style>
