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
          <td>{{switchKey(team.title)}}</td>
        </tr>
        <tr>
          <th scope="row">隊長</th>
          <td>{{switchKey(team.leader.name)}}  ({{switchKey(team.leader.email)}})</td>
        </tr>
        <tr>
          <th scope="row">指導老師</th>
          <td>{{switchKey(team.teacher.name)}}  ({{switchKey(team.teacher.email)}})</td>
        </tr>
        <tr>
          <th scope="row">隊員</th>
          <td>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="(r, i) in team.registers" :key="i">{{r.name}}  ({{r.email}})</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th scope="row">報名表</th>
          <td>
            <h4><span class="badge" :class="team.register ? 'badge-success' : 'badge-danger'">{{team.register ? "已上傳" : "未上傳"}}</span></h4>
          </td>
        </tr>
        <tr>
          <th scope="row">計畫書</th>
          <td>
            <h4>
              <span class="badge" :class="team.plan ? 'badge-success' : 'badge-danger'">{{team.plan ? "已上傳" : "未上傳"}}</span>
            </h4>
          </td>
        </tr>
        <tr>
          <th scope="row">封面</th>
          <td>
            <h4>
              <span class="badge" :class="team.cover ? 'badge-success' : 'badge-danger'">{{team.cover ? "已上傳" : "未上傳"}}</span>
            </h4>
          </td>
        </tr>
        <tr>
          <th scope="row">成果影片</th>
          <td>
            <h4>
              <span class="badge" :class="team.video ? 'badge-success' : 'badge-danger'">{{team.video ? "已上傳" : "未上傳"}}</span>
            </h4>
          </td>
        </tr>
        <tr>
          <th scope="row">著作授權書</th>
          <td>
            <h4>
              <span class="badge" :class="team.warrant ? 'badge-success' : 'badge-danger'">{{team.warrant ? "已上傳" : "未上傳"}}</span>
            </h4>
          </td>
        </tr>
      </tbody>
    </table>
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
  }
}
</script>

<style lang="css">
</style>
