<template>
  <div class="n-box" :style="newStyle">
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
        <el-dropdown placement="bottom-end" trigger="click" @command="handleExport">
          <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="1">导出标记项目</el-dropdown-item>
            <el-dropdown-item command="2">导出全部项目</el-dropdown-item>
            <!--<el-dropdown-item>Word</el-dropdown-item>
            <el-dropdown-item>PDF</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
        <el-button style="margin-left: 10px" type="primary" icon="el-icon-refresh" size="mini" @click="Refresh">刷新</el-button>
        <el-popover
          placement="bottom"
          trigger="click">
          <div class="t-rows">
            <el-dropdown-item style="width: 90px;" v-for="(row,index) in newData" :key="index"><el-checkbox v-model="row.checked">{{row.title}}</el-checkbox></el-dropdown-item>
          </div>
          <el-button slot="reference" type="primary" icon="el-icon-caret-bottom" size="mini">选择列</el-button>
        </el-popover>
      </div>
    </div>
    <!-- Echarts部分 -->
    <ul class="e-box">
      <li class="echarts1" style="float: left;"><chart :options="polar" :auto-resize=true></chart></li>
      <li class="echarts2" style="float: left;margin-left: 2%;"><chart :options="test" :auto-resize=true></chart></li>
    </ul>
    <!-- 表格部分 -->
    <el-table
      :data="tableData"
      stripe
      size="small"
      style="">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        label="桩号"
        prop="pile_id">
      </el-table-column>
      <el-table-column
        label="作业周期"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="扩大头桩长">
      </el-table-column>
      <el-table-column
        label="总桩长">
      </el-table-column>
      <el-table-column
        label="扩大桩浆量">
      </el-table-column>
      <el-table-column
        label="下部桩浆量">
      </el-table-column>
      <el-table-column
        label="扩大桩灰量">
      </el-table-column>
      <el-table-column
        label="下部桩灰量">
      </el-table-column>
      <el-table-column
        width="100"
        label="外钻最大电流">
      </el-table-column>
      <el-table-column
        label="最大斜度">
      </el-table-column>
      <el-table-column
        label="喷浆时间">
      </el-table-column>
      <el-table-column
        label="评分值">
      </el-table-column>
    </el-table>
    <!--  分页部分   -->
    <el-footer class="ft">
      <el-pagination
        class="pag-pad"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </el-footer>



  </div>
</template>
<script>
  import deviceList from '@/api/project/deviceList'
  import Bus from '@/common/eventBus'
  export default {
    data() {
      return {
        isCollapse:true,
        polar: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        }, //echarts1
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
        }, //echarts2
        value: '',
        value7: '',
        test:{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        },
        tableData:[],
        currentPage:1,
        pagesize:20,
        multipleSelection: [],
        total:0,
        dialogVisible: false,
        deviceKey:'',
        key:'',
        deviceSelect1:[
          {value1:1,name:'一号桩'},
          {value1:2,name:'二号桩'},
          {value1:3,name:'三号桩'},
          {value1:4,name:'四号桩'},
          {value1:5,name:'五号桩'},
        ],
        value1:'',
        value2:'',
        deviceSelect2:[
          {value2:1,name:'A (80-100)'},
          {value:2,name:'B (70-80)'},
          {value2:3,name:'C (60-70)'},
          {value2:4,name:'D (50-60)'},
          {value2:5,name:'E (40-50)'},
        ],
        post_data:{
          key:'',
          page_index:1,
          page_size:10,
        },
        device: '', //设备选定值
        deviceSelect: [], //设备select列表
        device_data: {//全部设备select列表
          page_index: 1,
          page_size: 5,
          name: ''
        },
        deviceTotal: 0,
        deviceName: '',
        newData:null
      }
    },
    props:['isShow','newStyle'],
    created:function(){
      this.deviceName=sessionStorage.getItem('deviceName');
      this.getDeviceList(this.device_data);
      Bus.$on('isCollapse',res=>{
        this.isCollapse=res
      })
    },
    methods: {
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
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
      },
      handleClose(done) {
        done();
      },
      query(){
        this.post_data.key=this.deviceKey;
        this.post_data.page_index=1;
        this.getList(this.post_data)
      },
      deviceCurrentChange:function(currentPage){ //全部设备select当前页
        this.device_data.page_index=currentPage;
        this.getDeviceList(this.device_data);
      },
      deviceChange(val){ //类型改变
        this.deviceKey=val;
      },
      deviceSearch(query){ //select搜索框
        this.device_data.page_index=1;
        this.device_data.page_size=5;
        this.device_data.name=query;
        this.getDeviceList(this.device_data);
      },
      getDeviceList(post_data){
        let _this=this;
        deviceList.list(post_data).then(res=>{
          _this.deviceSelect=res.result.items;
          _this.deviceTotal=res.result.total;
        }).catch(err => {
          this.loading.close();
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
  // ele-ui部分
  .n-box{
    padding: 20px;
    height: calc(100% - 100px);
    background: #f5f5f9;
  }
  @media screen and (max-width: 1467px){
    .n-box{
      padding: 20px;
      height: auto;
      background: #f5f5f9;
    }
  }
  .el-tabs{
    border-bottom: 1px solid red;
  }
  .el-main{
    padding:0;
    background: red;
  }
  .icons .el-button{
    font-size:12px;
    padding: 10px 11px;
  }
  .c-box{
    //margin-top: 15px;
    padding: 0 2% 20px;
    border:1px solid rgba(230,234,238,1);
    background: #fff;
    overflow: hidden;
    .c-handle{
      float: right;
      margin-top: 20px;
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
  .ft{
    background-color: #fff;
    text-align:center;
    .pag-pad{
      padding: 16px 5px;
    }
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
  .e-box{
    width: 100%;
    height: 300px;
    margin: 20px 0;
    display: flex;
    justify-content:space-between;
    li{
      width: 49%;
      height: 300px;

      background: #fff;
    }
  }
</style>

