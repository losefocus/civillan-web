<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-model="device" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;width: 16%;" clearable >
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-select v-model="device" placeholder="全部桩" size="mini" @change="deviceChange" style="margin: 0 5px;width: 16%;">
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-select v-model="device" placeholder="评分等级" size="mini" @change="deviceChange" style="margin: 0 5px;width: 16%;">
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
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
          :picker-options="pickerOptions2" style="margin: 0 5px;width: 30%">
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
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      size="small"
      style="">
      <el-table-column
        prop="state"
        v-if="state"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="date"
        v-if="date"
        label="订单日期"
        >
      </el-table-column>
      <el-table-column
        prop="number"
        v-if="number"
        label="订单编号"
        >
      </el-table-column>
      <el-table-column
        prop="ship"
        v-if="ship"
        label="发货单位"
        >
      </el-table-column>
      <el-table-column
        prop="receive"
        v-if="receive"
        label="收货单位"
        >
      </el-table-column>
      <el-table-column
        prop="tel"
        v-if="tel"
        label="收货电话"
        >
      </el-table-column>
      <el-table-column
        prop="type"
        v-if="type"
        label="货物类型"
        >
      </el-table-column>
      <el-table-column
        prop="total"
        v-if="total"
        label="总件数"
        >
      </el-table-column>
      <el-table-column
        prop="weight"
        v-if="weight"
        label="总重量"
        >
      </el-table-column>
      <el-table-column
        prop="volume"
        v-if="volume"
        label="总体积"
        >
      </el-table-column>
      <el-table-column
        prop="price"
        v-if="price"
        label="运费"
        >
      </el-table-column>
      <el-table-column
        prop="remark"
        v-if="remark"
        label="备注"
        >
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
      }
    },
    created:function(){
      /*var _this=this;
      this.$http.get("http://localhost:8080/static/data/table.json",{})
        .then(function(res){
          _this.tableData=res.data.list;
        })
        .catch(function(err){
        })*/
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

