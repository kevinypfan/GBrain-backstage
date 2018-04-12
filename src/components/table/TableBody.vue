<template lang="html">
  <tbody v-if="tableBodyAry">
    <tr v-for="(table, index) in tableBodyAry" :key="index">
      <th scope="row">{{index + 1}}</th>
      <td v-for="(t, i) in table" :key="i">{{t}}</td>
      <td>
        <DefaultButton
          btnType="primary"
          @clicked="moreClick(index)"
        >
        More
        </DefaultButton>
      </td>
    </tr>
  </tbody>
</template>

<script>
import DefaultButton from '../UI/DefaultButton.vue'
export default {
  props:{
    tableHeadAry: {
      type: Array
    },
    datas: {
      type: Array
    }
  },
  components: {
    DefaultButton
  },
  computed: {
    tableBodyAry () {
      const processCheck = ['register', 'plan', 'cover', 'video', 'warrant'];
      if (this.datas && this.tableHeadAry) {
        let tableData = this.datas.map( user => {
          let item = [];

          let count = 0;
          processCheck.forEach( p => {
            if (user[p]) {
              count ++
            }
          })
          user.process = count / 5 * 100 + '%';

          this.tableHeadAry.forEach(head => {
            if (head === 'leader' || head === 'teacher') {
              item.push(`${user[head].name}(${user[head].email})`)
            } else {
              if (user[head] === true) {
                item.push("已驗證")
              } else if (user[head] === false) {
                item.push("未驗證")
              } else {
                item.push(user[head])
              }
            }
          })

          return item;
        })
        return tableData;
      } else {
        return null;
      }
    }
  },
  methods: {
    moreClick (index) {
      console.log(index)
      console.log(this.datas[index])
      this.$emit('moreClicked', this.datas[index]._id)
    }
  }
}
</script>

<style lang="css">
</style>
