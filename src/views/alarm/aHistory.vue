<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="a"
        label="报警内容">
      </el-table-column>
      <el-table-column
        prop="b"
        label="触发时间">
      </el-table-column>
      <el-table-column
        prop="c"
        label="恢复时间">
      </el-table-column>
      <el-table-column
        prop="d"
        label="恢复状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "aHistory",
    data() {
      return {
        multipleSelection: [],
        tableData: [{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        }, {
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        }, {
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        }, {
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        },{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        },{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        },{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        },{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        },{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        }]
      }
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped>

</style>
