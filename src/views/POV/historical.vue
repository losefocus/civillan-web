<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box">
      <div class="c-query">
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
        <el-dropdown trigger="click" placement="bottom-start">
          <span class="el-dropdown-link">
            <span class="c-title">评分等级</span><i class="el-icon-caret-bottom el-icon--right"></i>
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
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="expand" style="background: #4F5059" >
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-table
              :data="props.row.data"
              style="width: 100%">
              <el-table-column
                prop="part_id"
                label="深度"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="+0.25"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="+0.50">
              </el-table-column>
              <el-table-column
                prop="address"
                label="+0.50">
              </el-table-column>
              <el-table-column
                prop="address"
                label="+0.75">
              </el-table-column>
              <el-table-column
                prop="address"
                label="+1.00">
              </el-table-column>
              <el-table-column
                prop="pulp"
                label="段浆量（L/m）">
              </el-table-column>
              <el-table-column
                prop="density"
                label="密度（g/cm3）">
              </el-table-column>
              <el-table-column
                prop="ash"
                label="灰量（kg）">
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
        prop="pile_id">
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
        prop="depth">
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
        prop="max_current">
      </el-table-column>
      <el-table-column
        label="最大斜度"
        prop="max_slope">
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


<script>
  import history from '@/api/project/history'
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
        tableData: [],

      }
    },
    created(){
      let _this=this
      history.list({"key":"ABCxyz0123456789"}).then(res=>{
        console.log(res);
        res.result.forEach(function (item,i) {
          console.log(item._v)
          _this.tableData.push(JSON.parse(item._v));
        });
        this.tableData.push(JSON.parse(res.result[0]._v));
        console.log(this.tableData)
      })
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
<style lang="scss" scoped>
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
    .c-query{
      width: 1000px;
      display: flex;
      justify-content: space-between;
      .c-button{
        width: 60px;
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
  }
</style>
