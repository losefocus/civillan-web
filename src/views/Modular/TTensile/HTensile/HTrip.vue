<template>
  <div>
    <div>
      <el-button @click="getReturn" icon="el-icon-arrow-left" size="mini">返回</el-button>
      <span class="t-title">行程数据</span>
    </div>
    <el-table
      :data="tableData6"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="a"
        label="张拉断面"
        width="180">
      </el-table-column>
      <el-table-column
        prop="b"
        label="记录点">
      </el-table-column>
      <el-table-column
        prop="c"
        label="初始行程(10%)">
      </el-table-column>
      <el-table-column
        prop="d"
        label="第一行程(20%)">
      </el-table-column>
      <el-table-column
        prop="e"
        label="第二行程(50%)">
      </el-table-column>
      <el-table-column
        prop="f"
        label="第二行程(50%)">
      </el-table-column>
      <el-table-column
        prop="g"
        label="第三行程(100%)">
      </el-table-column>
      <el-table-column
        prop="h"
        label="第四行程(超张)">
      </el-table-column>
      <el-table-column
        prop="i"
        label="实测结论">
      </el-table-column>
      <el-table-column
        prop="j"
        label="回缩量（mm)">
      </el-table-column>
      <el-table-column
        prop="k"
        label="持荷时间(s)">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HRecord",
  data(){
    return{
      tableData6: [{
        a: '张拉仪I',
        b: '张拉力(KN)',
        c: '273.4',
        d: '3.2',
        e: '273.4',
        f: '273.4',
        g: '273.4',
        h: '273.4',
        i: '273.4',
        j: 10,
        k: 10,
      },{
        a: '张拉仪I',
        b: '张拉力(KN)',
        c: '273.4',
        d: '3.2',
        e: '273.4',
        f: '273.4',
        g: '273.4',
        h: '273.4',
        i: '273.4',
        j: 10,
        k: 10,
      },{
        a: '张拉仪I',
        b: '张拉力(KN)',
        c: '273.4',
        d: '3.2',
        e: '273.4',
        f: '273.4',
        g: '273.4',
        h: '273.4',
        i: '273.4',
        j: 10,
        k: 10,
      },{
        a: '张拉仪I',
        b: '张拉力(KN)',
        c: '273.4',
        d: '3.2',
        e: '273.4',
        f: '273.4',
        g: '273.4',
        h: '273.4',
        i: '273.4',
        j: 10,
        k: 10,
      },{
        a: '张拉仪I',
        b: '张拉力(KN)',
        c: '273.4',
        d: '3.2',
        e: '273.4',
        f: '273.4',
        g: '273.4',
        h: '273.4',
        i: '273.4',
        j: 10,
        k: 10,
      },{
        a: '张拉仪I',
        b: '张拉力(KN)',
        c: '273.4',
        d: '3.2',
        e: '273.4',
        f: '273.4',
        g: '273.4',
        h: '273.4',
        i: '273.4',
        j: 10,
        k: 10,
      },{
        a: '张拉仪I',
        b: '张拉力(KN)',
        c: '273.4',
        d: '3.2',
        e: '273.4',
        f: '273.4',
        g: '273.4',
        h: '273.4',
        i: '273.4',
        j: 10,
        k: 10,
      },{
        a: '张拉仪I',
        b: '张拉力(KN)',
        c: '273.4',
        d: '3.2',
        e: '273.4',
        f: '273.4',
        g: '273.4',
        h: '273.4',
        i: '273.4',
        j: 10,
        k: 10,
      },{
        a: '张拉仪I',
        b: '张拉力(KN)',
        c: '273.4',
        d: '3.2',
        e: '273.4',
        f: '273.4',
        g: '273.4',
        h: '273.4',
        i: '273.4',
        j: 10,
        k: 10,
      }]
    }
  },
  methods:{
    getReturn(){
      this.$bus.emit('tab',1)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }else if(columnIndex === 9){
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }else if(columnIndex === 10){
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .t-title{
    font-weight: bold;
    font-size: 20px;
    margin-left: 20px;
    vertical-align: middle;
  }
</style>
