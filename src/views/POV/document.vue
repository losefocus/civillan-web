<template>
  <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="100">
    </el-table-column>
    <el-table-column
      type="index"
      width="150">
    </el-table-column>
    <el-table-column
      prop="a"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="b"
      label="上传时间">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">上传</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          a: '工程项目地图文件名',
          b: '2018-02-21 19:00',
          c: '上海市普陀区金沙江路 1518 弄'
        }, {
          a: '工程项目地图文件名',
          b: '2018-02-21 19:00',
          c: '上海市普陀区金沙江路 1518 弄'
        }, {
          a: '工程项目地图文件名',
          b: '2018-02-21 19:00',
          c: '上海市普陀区金沙江路 1518 弄'
        }, {
          a: '工程项目地图文件名',
          b: '2018-02-21 19:00',
          c: '上海市普陀区金沙江路 1518 弄'
        }, {
          a: '工程项目地图文件名',
          b: '2018-02-21 19:00',
          c: '上海市普陀区金沙江路 1518 弄'
        }, {
          a: '工程项目地图文件名',
          b: '2018-02-21 19:00',
          c: '上海市普陀区金沙江路 1518 弄'
        }, {
          a: '工程项目地图文件名',
          b: '2018-02-21 19:00',
          c: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>

</style>
