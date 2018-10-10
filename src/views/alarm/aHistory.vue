<template>
  <div class="n-box" :style="newStyle">
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-model="device" placeholder="报警状态" size="mini" @change="deviceChange" style="margin: 0 5px;width: 16%;float: left;">
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-date-picker
          style="float: left"
          v-model="value7"
          size="mini"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <div class="c-button">
          <el-button  type="info" size="mini" @click="query">查询</el-button>
        </div>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">重置</el-button>
        </div>
      </div>
      <div class="c-handle">
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="Refresh">刷新</el-button>
        <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
        <el-button type="primary" icon="el-icon-printer" size="mini">打印</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="a"
        label="报警内容"
        min-width="400">
      </el-table-column>
      <el-table-column
        prop="c"
        align="center"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="d"
        align="center"
        label="状态">
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
    name: "aHistory",
    data() {
      return {
        total:2,
        multipleSelection: [],
        tableData: [
          {
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
        }],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: '',
        isCollapse:false,
        device:'',
        deviceSelect:[
          {key:0,name:'触发'},
          {key:1,name:'恢复'}
        ],
      }
    },
    props:['newStyle'],
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
        this.device=val;
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
      /*getDeviceList(post_data){
        let _this=this;
        deviceList.list(post_data).then(res=>{
          console.log(res);
          _this.deviceSelect=res.result.items;
          _this.deviceTotal=res.result.total;
          console.log(_this.deviceTotal)
        });
      },*/

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
  .n-box{
    padding: 20px;
    height: calc(100% - 60px);
    background: #f5f5f9;
  }
  .c-box{
    padding: 0 2% 20px;
    border:1px solid rgba(230,234,238,1);
    background: #fff;
    overflow: hidden;
    .c-handle{
      margin-top: 20px;
      float: right;
      div{
        width: 51px;
        line-height: 27px;
        margin-left: 10px;
        text-align: right;
        cursor: pointer;
        span{
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
    .c-query{
      width: 675px;
      margin-top: 20px;
      margin-right: 30px;
      float: left;
      .c-button{
        float: left;
        margin:0 3px;
      }
      .el-dropdown-link{
        cursor: pointer;
        width: 140px;
        height: 20px;
        .c-title{
          font-size: 12px;
          color: #666666;
        }

        .el-icon--right{
          margin-left: 10px;
          font-size: 18px;
          color: #4F5059;
        }
      }
    }
  };
  .c-box1{
    flex-wrap:wrap;
  }
  .m-pagination{
    padding: 20px;
    text-align: center;
    background: #ffffff;
  }
</style>
