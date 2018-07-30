<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="a"
      min-width="400"
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
  name: "realTime",
  data() {
    return {
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
  }
}
</script>

<style scoped>

</style>
