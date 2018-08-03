<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-if="isShow" v-model="device" placeholder="全部设备" size="mini" style="margin: 0 5px 0 0;" clearable >
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
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
        },
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
        device:'',
        deviceKey:'',
        deviceSelect:[],
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
        }
      }
    },
    props:['isShow'],
    created:function(){
      if(this.isShow==undefined){
        this.isShow=true
      }
      /*var _this=this;
      this.$http.get("http://localhost:8080/static/data/table.json",{})
        .then(function(res){
          _this.tableData=res.data.list;
        })
        .catch(function(err){
        })*/
      deviceList.list().then(res=>{
        console.log(res);
        this.deviceSelect=res.result.items
      });
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
      }
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

