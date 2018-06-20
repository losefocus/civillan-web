<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="control-box">
      <el-row>
        <el-col :span="19">
          <div class="grid-content bg-purple">
            <div class="hd">
              <div class="inline-block">
                <el-dropdown class="inline-block">
                  <span class="el-dropdown-link">
                    全部设备<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown class="inline-block">
                  <span class="el-dropdown-link">
                    全部桩<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown class="inline-block">
                  <span class="el-dropdown-link">
                    最近一周<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-date-picker
                  class="inline-block"
                  size="small"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" size="small">查询</el-button>
                <el-button type="warning" size="small">重置</el-button>
                <!--<el-button v-popover:popover>focus 激活</el-button>-->
                <el-button type="text" @click="dialogVisible = true">编辑</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple icons">
            <el-button-group class="right">
              <el-button icon="el-icon-circle-plus-outline" >添加</el-button>
              <el-button icon="el-icon-share" >下载Excel文件 </el-button>
              <el-button icon="el-icon-upload2" @click="downloadFile(excelData)" >导出</el-button>
              <el-button icon="el-icon-download" @click="uploadFile()" >导入</el-button>
            </el-button-group>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- Echarts部分 -->
    <ul class="e-box">
      <li class="echarts1"><chart :options="polar"></chart></li>
      <li class="echarts2"><chart :options="test"></chart></li>
    </ul>
    <!-- 表格部分 -->

    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      border
      size="small"
      style="">
      <el-table-column
        prop="state"
        v-if="state"
        label="状态"
         align="center">
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
      <el-table-column
        label="操作"
        :render-header="renderHeader"
        >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" class="font-ora">删除</el-button>
        </template>
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
      width="30%"
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
<style>
  .el-table th{
    background:#f5f5f5 !important;
  }
</style>
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
      renderHeader(h) {
        return (
          <div>
          <span>操作</span>
          <el-button type="text" class='font-blu' style="padding:0px 15px;font-size:12px;"><span class="el-icon-edit-outline"></span > 编辑</el-button>
        </div>
      )
      },
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
  // 页面部分
   /*.pdrl25{
     padding-left: 25px;
     padding-right: 25px;
   }*/
  .control-box{
    padding: 10px 20px;
    background: #fff;
    .title{
      font-size: 24px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
  .entrust-table{
  //.pdrl25;
    padding-bottom: 15px;
  }
  .hd{
    background: #fff;
  //.pdrl25;
    padding-bottom: 10px;
    .el-input {
      width:150px;
      height:32px;
    //.inline-block;
    }
    .el-select{
      width:160px;
    }
    .el-date-picker{
      width:300px;
    }
    .inline-block{
      margin-right:15px;
    }
  }
  .ft{
    background-color: #fff;
    text-align:center;
    .pag-pad{
      padding: 16px 5px;
    }
  }

  //echarts
  .echarts {
    width: 100%;
    height: 100%;
  }
  .e-box{
    width: 100%;
    height: 300px;
    margin: 30px 0;
    li{
      width: 45%;
      height: 300px;
      float: left;
      background: #fff;
    }
    .echarts2{
      margin-left: 94px;
    }
  }
</style>

