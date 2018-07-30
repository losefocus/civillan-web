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
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2" style="margin: 0 5px;width: 35%">
        </el-date-picker>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">查询</el-button>
        </div>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">重置</el-button>
        </div>
      </div>
      <div class="c-handle">
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="Refresh">刷新</el-button>
        <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
        <el-button type="primary" icon="el-icon-printer" size="mini">打印</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :highlight-current-row=true
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"

    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-table
              header-cell-class-name="history-header"
              header-row-class-name="h-header"
              header-align="center"
              border
              :data="props.row.data"
              style="width: 100%">
              <el-table-column
                align="center"
                prop="part_id"
                label="深度"
                width="120">
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
                prop="p_pulp"
                label="段浆量（L/m）">
              </el-table-column>
              <el-table-column
                prop="p_density"
                label="密度（g/cm3）">
              </el-table-column>
              <el-table-column
                prop="p_ash"
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
        width="300"
        label="作业周期"
        align="center"
        >
        <template slot-scope="props">
          {{ props.row.begin_time | formatDate }}
          <span style="margin: 0 8px">-</span>
          {{ props.row.end_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        label="扩大头桩长">
        <template slot-scope="props">
          {{ props.row.t_type_length | keepTwo}}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        label="总桩长"
        prop="depth">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        label="扩大桩浆量"
        prop="t_type_slurry">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        label="下部桩浆量"
        prop="bottom_part_slurry">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        label="扩大桩灰量"
        prop="t_type_ash">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        label="下部桩灰量"
        prop="bottom_part_ash">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        label="外钻最大电流"
        prop="max_current">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        label="最大斜度"
        prop="max_slope">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        label="喷浆时间">
        <template slot-scope="props">
          {{ props.row.sprayed_time | keepTwo}}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        label="评分值"
        prop="rate">
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
  import {formatDate} from '@/common/formatDate.js';
  import Bus from '@/common/eventBus'
  export default {
    data() {
      return {
        isCollapse:true,
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
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss'); //yyyy-MM-dd hh:mm
      },
      keepTwo(value){
        value=Number(value)
        return value.toFixed(2)
      }
    },
    created(){
      deviceList.list().then(res=>{
        console.log(res);
        this.deviceSelect=res.result.items
      });
      this.getList(this.post_data);
      Bus.$on('isCollapse',res=>{
        console.log(res)
        this.isCollapse=res
      })
    },
    methods: {
      handleExpandChange(row,expandedRows){
        console.log(expandedRows)
      },
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
      },
      Refresh(){
        this.getList(this.post_data)
      }
    }
  }
</script>
<style lang="scss" scoped>
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
</style>
