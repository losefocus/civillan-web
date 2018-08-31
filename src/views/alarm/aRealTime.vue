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
  <div class="m-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="listCurrentChange"
      layout="total,sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      :total='total'>
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: "realTime",
  data() {
    return {
      total:'',
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
  methods: {
    handleExport(command){
      if(command=='1'){
        this.importExcel();
      }else if(command=='2'){
        this.exportXml('rebateSetTable')
      }
    },
    //excel导出
    importExcel() {
      for(name in this.newData){
        if(this.newData[name].checked==true){
          this.tableHeader.push(this.newData[name].title);
          this.tableName.push(name)
        }
      }
      require.ensure([], () => {

        if(this.multipleSelection.length!==0){
          const { export_json_to_excel } = require('@/vendor/Export2Excel');//引入文件
          let tHeader = this.tableHeader; //将对应的属性名转换成中文
          let filterVal = this.tableName; //table表格中对应的属性名
          let list=[];
          let obj = {};
          this.multipleSelection.forEach(e=>{
            //console.log(e);
            for(let i=0;i<filterVal.length;i++){
              obj[filterVal[i]] = e[filterVal[i]]
            }
            list.push(obj);
            //console.log(list);
          });
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '数据报表');

          //引用赋值  用完清空
          this.tableHeader=[];
          this.tableName=[];
          list=[];
        }else{
          this.$message.error('请先选择需要导出的项目！')
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    Cleanup() {
      window.clearInterval(idTmr);
      CollectGarbage();
    },
    tableToExcel() {
      var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function (s, c) {
          return s.replace(/{(\w+)}/g,
            function (m, p) {
              return c[p];
            })
        }
      return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
        window.location.href = uri + base64(format(template, ctx))
      }
    },

    displayScreening(){

    },
    handleExpandChange(row,expandedRows){
      console.log(expandedRows)
    },
    //类型改变
    deviceChange(val){
      console.log(val);
      this.deviceKey=val;
    },
    handleCommand(command) { //
      this.$message(command);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //列表改变每页显示的条数
    handleSizeChange: function (size) {
      this.post_data.page_size=size;
      this.getList(this.post_data);
    },

    //列表改变当前页
    handleCurrentChange: function(currentPage){
      this.device_data.page_index = currentPage;
      this.getList(this.post_data);
    },
    //列表改变当前页
    listCurrentChange: function(currentPage){
      this.post_data.page_index = currentPage;
      this.getList(this.post_data);
    },
    //获取列表
    getList:function (post_data) {
      let _this=this;
      let tableList=[];
      history.list(post_data).then(res=>{
        console.log(res);
        if(res.success){
          //console.log(res.result);
          _this.total=res.result.total;
          res.result.items.forEach(function (item) {
            tableList.push(item);
          });
          _this.tableData=tableList;
          //_this.tableData.tableRows=_this.tableRows
          console.log(_this.tableData);
          _this.loading=false
        }else {
          _this.$message.error(res.message);
          _this.loading=false
        }
      });
    },

    //统计总数
    getRecords(){
      history.records().then(res=>{
        console.log(res);
        this.recordSum=res.result[0]
      })
    },

    //全部设备select当前页
    deviceCurrentChange:function(currentPage){
      this.device_data.page_index=currentPage;
      this.getDeviceList(this.device_data);
    },
    //全部设备select搜索框
    deviceSearch(query){
      this.device_data.name=query;
      this.getDeviceList(this.device_data);
    },
    //全部设备的列表
    getDeviceList(post_data){
      let _this=this;
      deviceList.list(post_data).then(res=>{
        console.log(res);
        _this.deviceSelect=res.result.items;
        _this.deviceTotal=res.result.total;
        console.log(_this.deviceTotal)
      });
    },

    query(){
      this.post_data.key=this.deviceKey;
      this.post_data.page_index=1;
      this.getList(this.post_data)
    },
    Refresh(){
      this.getList(this.post_data)
    }
  },
}
</script>

<style scoped lang="scss">
  .m-pagination{
    padding: 20px;
    text-align: center;
    background: #ffffff;
  }
</style>
