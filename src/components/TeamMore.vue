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
              <li class="list-group-item" v-for="r in team.registers">{{r.name}}  ({{r.email}})</li>
            </ul>
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
