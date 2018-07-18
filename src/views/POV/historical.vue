<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box">
      <div class="c-query">
        <el-select v-model="device" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px" clearable >
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-select v-model="device" placeholder="全部桩" size="mini" @change="deviceChange" style="margin: 0 5px">
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-select v-model="device" placeholder="评分等级" size="mini" @change="deviceChange" style="margin: 0 5px">
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
          :picker-options="pickerOptions2" style="margin: 0 5px">
        </el-date-picker>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">查询</el-button>
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
      <el-table-column type="expand">
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

    <div class="m-pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="post_data.page_index"
        layout="total, prev, pager, next, jumper"
        :total='total'>
      </el-pagination>
    </div>
  </div>



</template>


<script>
  import history from '@/api/project/history'
  import deviceList from '@/api/project/deviceList'
  export default {
    data() {
      return {
        multipleSelection: [],
        currentPage:1,
        pagesize:20,
        total:0,
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
        device:'',
        deviceKey:'',
        tableData: [],
        deviceSelect:[],
        post_data:{
          key:'',
          page_index:1,
          page_size:10,
        }
      }
    },
    created(){
      deviceList.list().then(res=>{
        console.log(res);
        this.deviceSelect=res.result.items
      });
      this.getList(this.post_data)
    },
    methods: {
      deviceChange(val){
        console.log(val);
        this.deviceKey=val;
      },
      handleCommand(command) {
        this.$message(command);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
        console.log(currentPage);
        this.post_data.page_index = currentPage;
        this.getList(this.post_data);
        console.log(this.post_data)
      },
      getList:function (post_data) {
        let _this=this;
        let tableList=[];
        history.list(post_data).then(res=>{
          if(res.result.items){
            //console.log(res.result);
            _this.total=res.result.total;
            res.result.items.forEach(function (item) {
              tableList.push(item._v);
            });
            _this.tableData=tableList;
            //console.log(_this.tableData)
          }else {
            console.log('请求不成功')
          }
        })
      },
      query(){
        this.post_data.key=this.deviceKey;
        this.post_data.page_index=1;
        this.getList(this.post_data)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .c-box{
    padding: 20px 2%;
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
        margin-left: 5px;
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
  .m-pagination{
    padding: 20px;
    text-align: center;
    background: #ffffff;
  }
</style>
