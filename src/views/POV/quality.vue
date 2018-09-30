<template>
  <div class="n-box">
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select style="width: 5%;float: left" v-if="isShow" v-model="deviceName" size="mini" disabled placeholder="请选择"></el-select>
        <el-select  v-else="!isShow" v-model="device" filterable :filter-method="deviceSearch" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;width: 15%;float: left;" clearable >
          <el-option
            v-for="(item,index) in deviceSelect"
            :key="index"
            :label="item.name"
            :value="index">
          </el-option>
          <el-pagination
            @current-change="deviceCurrentChange"
            small
            :pager-count="5"
            :current-page="device_data.page_index"
            :page-size="device_data.page_size"
            layout="prev, pager, next"
            :total="deviceTotal">
          </el-pagination>
        </el-select>

        <el-select  v-model="value1" placeholder="全部桩" size="mini" @change="deviceChange" style="margin: 0 5px;width: 15%;float: left;">
          <el-option
            v-for="item in deviceSelect1"
            :key="item.value1"
            :label="item.name"
            :value="item.value1">
          </el-option>
        </el-select>
        <el-select v-model="value2" placeholder="评分等级" size="mini" @change="deviceChange" style="margin: 0 5px;width: 15%;float: left;">
          <el-option
            v-for="item in deviceSelect2"
            :key="item.value2"
            :label="item.name"
            :value="item.value2">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="value7"
          size="mini"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2" style="margin: 0 5px;width: 30%;float: left;">
        </el-date-picker>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">查询</el-button>
        </div>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">重置</el-button>
        </div>
      </div>
      <div class="c-handle">
        <el-button type="primary" icon="el-icon-refresh" size="mini">刷新</el-button>
        <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
        <el-button type="primary" icon="el-icon-printer" size="mini">打印</el-button>
      </div>
    </div>
    <el-table
      :data="tableData5"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        width="80"
        label="序号"
        prop="id">
      </el-table-column>
      <el-table-column
        align="center"
        width="140"
        label="施工日期"
        prop="startTime">
      </el-table-column>
      <el-table-column
        align="center"
        width="140"
        label="完成根数"
        prop="endTime">
      </el-table-column>
      <el-table-column
        align="center"
        label="日桩长（m)"
        prop="c">
      </el-table-column>
      <el-table-column
        align="center"
        label="日注浆量（L）"
        prop="d">
      </el-table-column>
      <el-table-column
        align="center"
        label="日注灰量（kg)"
        prop="e">
      </el-table-column>
      <el-table-column
        align="center"
        label="成桩时间（min）"
        prop="f">
      </el-table-column>
      <el-table-column
        align="center"
        label="日成效"
        prop="g">
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
  import Bus from '@/common/eventBus'
  export default {
    name: "QualityAssessment",
    data(){
      return{
        isCollapse:true,
        isShow:false,
        tableData5: [
          {
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'5',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        }, {
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'1',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        }, {
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        }, {
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'3',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'4',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'5',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'3',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'7',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'8',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'9',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'3',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        }
        ],
        device:'',
        deviceSelect:[
          {value1:1,name:'一号桩'},
          {value1:2,name:'二号桩'},
          {value1:3,name:'三号桩'},
          {value1:4,name:'四号桩'},
          {value1:5,name:'五号桩'},
        ],
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
        value7:'',
        total:0,
        post_data:{ // 请求数据
          key:'',
          page_index:1,
          page_size:10,
        },
        device_data:{//全部设备select列表
          page_index:1,
          page_size:5,
          name:''
        },
        deviceTotal:0,
        deviceName:'',
        deviceSelect1:[
          {value1:1,name:'一号桩'},
          {value1:2,name:'二号桩'},
          {value1:3,name:'三号桩'},
          {value1:4,name:'四号桩'},
          {value1:5,name:'五号桩'},
        ], //全部桩筛选
        value1:'', // 全部桩选定值
        value2:'',// 评分等级选定值
        deviceSelect2:[
          {value2:1,name:'A (80-100)'},
          {value2:2,name:'B (70-80)'},
          {value2:3,name:'C (60-70)'},
          {value2:4,name:'D (50-60)'},
          {value2:5,name:'E (40-50)'},
        ],// 评分等级选定值
      }
    },
    created(){
      Bus.$on('isCollapse',res=>{
        console.log(res);
        this.isCollapse=res
      })
    },
    methods:{
      handleExport(command){
        if(command=='1'){
          this.importExcel();
        }else if(command=='2'){
          this.importExcelAll();
        }
      },
      //excel导出
      importExcel() {
        require.ensure([], () => {
          if(this.multipleSelection.length!==0){
            for(name in this.newData){
              if(this.newData[name].checked==true){
                this.tableHeader.push(this.newData[name].title);
                this.tableName.push(name)
              }
            }
            const { export_json_to_excel } = require('@/vendor/Export2Excel');//引入文件
            let tHeader = this.tableHeader; //将对应的属性名转换成中文
            let filterVal = this.tableName; //table表格中对应的属性名
            let list=[];
            let obj = {};
            this.multipleSelection.forEach(e=>{
              for(let i=0;i<filterVal.length;i++){
                obj[filterVal[i]] = e[filterVal[i]]
              }
              list.push(obj);
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
      importExcelAll(){
        history.list({page_index:1,page_size:100,key:''}).then(res=>{
          if(res.success){
            for(name in this.newData){
              this.tableHeader.push(this.newData[name].title);
              this.tableName.push(name)
            }
            const { export_json_to_excel } = require('@/vendor/Export2Excel');//引入文件
            let tHeader = this.tableHeader; //将对应的属性名转换成中文
            let filterVal = this.tableName; //table表格中对应的属性名
            let list=[];
            let obj = {};
            res.result.items.forEach(e=>{
              for(let i=0;i<filterVal.length;i++){
                obj[filterVal[i]] = e[filterVal[i]]
              }
              list.push(obj);
            });
            const data = this.formatJson(filterVal, list);
            //console.log(list);
            export_json_to_excel(tHeader, data, '数据报表');

            //引用赋值  用完清空
            this.tableHeader=[];
            this.tableName=[];
            list=[];
          }else {
            _this.$message.error(res.message);
          }
        }).catch(err => {
        });
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
      },
      //类型改变
      deviceChange(val){
        this.deviceKey=val;
      },
      handleCommand(command) { //
        this.$message(command);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
          if(res.success){
            _this.total=res.result.total;
            /*res.result.items.forEach(function (item) {
              tableList.push(item);
            });*/
            _this.tableData=res.result.items;
            _this.loading=false
          }else {
            _this.$message.error(res.message);
            _this.loading=false
          }
        }).catch(err => {
          this.loading=false;
        });
      },

      //统计总数
      getRecords(){
        history.records().then(res=>{
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
          _this.deviceSelect=res.result.items;
          _this.deviceTotal=res.result.total;
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
    }

  }
</script>

<style scoped lang="scss">
  .n-box{
    padding: 20px;
    height: calc(100% - 100px);
    background: #f5f5f9;
  }
  .c-box{
    margin-top: 15px;
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
        float: right;
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


