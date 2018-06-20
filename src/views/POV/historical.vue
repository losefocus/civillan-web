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
    <el-table
      :data="tableData5"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="expand" style="background: #4F5059">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="桩号"
        prop="id">
      </el-table-column>
      <el-table-column
        width="140"
        label="开始时间"
        prop="startTime">
      </el-table-column>
      <el-table-column
        width="140"
        label="结束时间"
        prop="endTime">
      </el-table-column>
      <el-table-column
        label="扩大头桩长"
        prop="a">
      </el-table-column>
      <el-table-column
        label="总桩长"
        prop="b">
      </el-table-column>
      <el-table-column
        label="扩大桩浆量"
        prop="c">
      </el-table-column>
      <el-table-column
        label="下部桩浆量"
        prop="d">
      </el-table-column>
      <el-table-column
        label="扩大桩灰量"
        prop="e">
      </el-table-column>
      <el-table-column
        label="下部桩灰量"
        prop="f">
      </el-table-column>
      <el-table-column
        label="外钻最大电流"
        prop="g">
      </el-table-column>
      <el-table-column
        label="最大斜度"
        prop="h">
      </el-table-column>
      <el-table-column
        label="喷浆时间"
        prop="i">
      </el-table-column>
      <el-table-column
        label="评分值"
        prop="j">
      </el-table-column>
    </el-table>
  </div>

</template>

<style>
  .control-box{
    border-bottom: 1px solid rgba(230,234,238,1);
  }
  .el-tabs{
    border-bottom: 1px solid red;
  }
  .el-table tr{
    background-color: #ffffff;
  }
  .icons .el-button{
    font-size:12px;
    padding: 10px 11px;
  }
  .control-box {
    padding: 10px 20px;
    background: #fff;
  }
  .title{
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table__expanded-cell{
  }
  .has-gutter{
    background: #ffffff !important;
  }
</style>

<script>
  export default {
    data() {
      return {
        multipleSelection: [],
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
        dialogVisible: false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData5: [{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
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
          endTime:'2018-02-22 19:00',
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
          endTime:'2018-02-22 19:00',
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
          endTime:'2018-02-22 19:00',
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
          endTime:'2018-02-22 19:00',
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
          endTime:'2018-02-22 19:00',
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
          endTime:'2018-02-22 19:00',
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
          endTime:'2018-02-22 19:00',
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
          endTime:'2018-02-22 19:00',
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
          endTime:'2018-02-22 19:00',
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
          endTime:'2018-02-22 19:00',
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
        ]
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
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
