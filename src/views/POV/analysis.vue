<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-if="isShow" v-model="deviceName" size="mini" disabled placeholder="请选择"></el-select>
        <el-select v-if="!isShow" v-model="device" filterable remote :remote-method="deviceSearch" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;" clearable >
          <!--<div style="width: 90%">
            <el-input
              style="width: 96%;margin:0 0 2% 2%"
              size="mini"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              v-model="input9">
            </el-input>
          </div>-->
          <!--<el-input suffix-icon="el-icon-search" @input="deviceSearch()" v-model="deviceName" size="mini" style="width: 92%;margin:0 0 2% 4%" placeholder="请输入内容"></el-input>-->
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
        <el-select placeholder="全部桩" v-model="value1" size="mini" style="margin: 0 5px;">
          <el-option
            v-for="item in deviceSelect1"
            :key="item.value1"
            :label="item.name"
            :value="item.value1">
          </el-option>
        </el-select>
        <el-select  placeholder="评分等级" v-model="value2" size="mini" style="margin: 0 5px;">
          <el-option
            v-for="item in deviceSelect2"
            :key="item.value2"
            :label="item.name"
            :value="item.value2">
          </el-option>
        </el-select>
        <el-date-picker
          size="mini"
          v-model="value7"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2" style="margin: 0 5px;">
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
    <!-- Echarts部分 -->
    <ul class="e-box">
      <li class="echarts1"><chart :options="polar" :auto-resize=true></chart></li>
      <li class="echarts2"><chart :options="test" :auto-resize=true></chart></li>
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
        deviceName: ''
      }
    },
    props:['isShow'],
    created:function(){
      this.deviceName=sessionStorage.getItem('deviceName');
      this.getDeviceList(this.device_data);
      Bus.$on('isCollapse',res=>{
        console.log(res);
        this.isCollapse=res
      })
    },
    methods: {
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.ajax);
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
        console.log(val);
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
          /*console.log(res);*/
          _this.deviceSelect=res.result.items;
          _this.deviceTotal=res.result.total;
          /*console.log(_this.deviceTotal)*/
        });
      },
    }
  }
</script>
<style scoped lang="scss">
  // ele-ui部分
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
    padding: 0 2% 20px;
    border:1px solid rgba(230,234,238,1);
    background: #fff;
    display: flex;
    justify-content: space-between;
    .c-handle{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
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
      display: flex;
      justify-content: space-between;
      .c-button{
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
    margin: 30px 0;
    display: flex;
    justify-content:space-between;
    li{
      width: 49%;
      height: 300px;

      background: #fff;
    }
  }
</style>

