<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box">
      <div>
        <el-dropdown trigger="click" placement="bottom-start">
          <span class="el-dropdown-link" >
            <span class="c-title">全部设备</span><i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" placement="bottom-start">
          <span class="el-dropdown-link">
            <span class="c-title">全部桩</span><i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" placement="bottom-start">
          <span class="el-dropdown-link">
            <span class="c-title">最近一周</span><i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-date-picker
          size="mini"
          v-model="value7"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <div class="c-button">
          <el-button type="info" size="mini">查询</el-button>
        </div>
      </div>
      <div class="c-handle">
        <div>
          <i class="iconfont icon-refresh"></i><span>刷新</span>
        </div>
        <div>
          <i class="iconfont icon-exportdata"></i><span>导出</span>
        </div>
        <div>
          <i class="iconfont icon-Printing"></i><span>打印</span>
        </div>
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
    <!--  弹窗  -->
    <el-dialog
      title="列表管理"
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="handleClose">
      <p><el-checkbox v-model="state" label="状态" ></el-checkbox></p>
      <p><el-checkbox v-model="date" label="订单日期" ></el-checkbox></p>
      <p><el-checkbox v-model="number" label="订单编号" ></el-checkbox></p>
      <p><el-checkbox v-model="ship" label="发货单位" ></el-checkbox></p>
      <p><el-checkbox v-model="receive" label="收货单位" ></el-checkbox></p>
      <p><el-checkbox v-model="tel" label="收货电话" ></el-checkbox></p>
      <p><el-checkbox v-model="type" label="货物类型" ></el-checkbox></p>
      <p><el-checkbox v-model="total" label="总件数" ></el-checkbox></p>
      <p><el-checkbox v-model="weight" label="总重量" ></el-checkbox></p>
      <p><el-checkbox v-model="volume" label="总体积" ></el-checkbox></p>
      <p><el-checkbox v-model="price" label="运费" ></el-checkbox></p>
      <p><el-checkbox v-model="remark" label="备注" ></el-checkbox></p>
    </el-dialog>


  </div>
</template>
<script>
  export default {
    data() {
      return {
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
        state:true,
        date:true,
        number:true,
        ship:true,
        receive:true,
        tel:false,
        type:false,
        total:false,
        weight:false,
        volume:false,
        price:false,
        remark:true,
        dialogVisible: false
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
    padding: 20px 30px;
    border:1px solid rgba(230,234,238,1);
    background: #fff;
    display: flex;
    justify-content: space-between;
    .c-handle{
      display: flex;
      justify-content: space-between;
      div{
        width: 51px;
        line-height: 27px;
        margin-left: 40px;
        text-align: right;
        cursor: pointer;
        span{
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
    div{
      .c-button{
        width: 60px;
        display: inline-block;
        margin-left: 20px;
      }
      .el-dropdown-link{
        cursor: pointer;
        display: inline-block;
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

