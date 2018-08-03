<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-if="isShow" v-model="device" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;" clearable >
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-select v-model="value1" placeholder="全部桩" size="mini" @change="deviceChange" style="margin: 0 5px;">
          <el-option
            v-for="item in deviceSelect1"
            :key="item.value1"
            :label="item.name"
            :value="item.value1">
          </el-option>
        </el-select>
        <el-select v-model="value2" placeholder="评分等级" size="mini" @change="deviceChange" style="margin: 0 5px;">
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
          align="center"
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
        <el-popover
          style="margin-right: 10px;"
          placement="bottom"
          trigger="click">
          <div class="t-rows">
            <el-dropdown-item style="width: 90px;" v-for="(row,index) in tableRows"><el-checkbox v-model="row.checked">{{row.title}}</el-checkbox></el-dropdown-item>
          </div>
          <el-button slot="reference" type="primary" icon="el-icon-caret-bottom" size="mini"></el-button>
        </el-popover>
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
        v-if="tableRows[0].checked"
        label="桩号"
        prop="pile_id">
      </el-table-column>
      <el-table-column
        v-if="tableRows[1].checked"
        width="200"
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
        v-if="tableRows[2].checked"
        :show-overflow-tooltip=true
        label="总桩长">
        <template slot-scope="props">
          {{ props.row.depth | keepTwo}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[3].checked"
        :show-overflow-tooltip=true
        label="水灰比"
        prop="water_cement_ratio">
      </el-table-column>
      <el-table-column
        v-if="tableRows[4].checked"
        :show-overflow-tooltip=true
        label="平均下钻速度"
        prop="down_speed">
      </el-table-column>
      <el-table-column
        v-if="tableRows[5].checked"
        :show-overflow-tooltip=true
        label="平均提钻速度"
        prop="up_speed">
      </el-table-column>
      <el-table-column
        v-if="tableRows[6].checked"
        :show-overflow-tooltip=true
        label="累计浆量"
        prop="cumulative_pulp">
      </el-table-column>
      <el-table-column
        v-if="tableRows[7].checked"
        :show-overflow-tooltip=true
        label="平均浆量"
        prop="average_pulp">
      </el-table-column>
      <el-table-column
        v-if="tableRows[8].checked"
        :show-overflow-tooltip=true
        label="累计灰量"
        prop="average_ash">
      </el-table-column>
      <el-table-column
        v-if="tableRows[9].checked"
        :show-overflow-tooltip=true
        label="平均灰量"
        prop="average_ash">
      </el-table-column>
      <el-table-column
        v-if="tableRows[10].checked"
        :show-overflow-tooltip=true
        label="最大钻杆电流">
        <template slot-scope="props">
          {{ props.row.max_current | keepTwo}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[11].checked"
        :show-overflow-tooltip=true
        label="平均电流"
        prop="average_ash">
      </el-table-column>
      <el-table-column
        v-if="tableRows[12].checked"
        :show-overflow-tooltip=true
        label="最大钻速"
        prop="max_down_speed">
      </el-table-column>
      <el-table-column
        v-if="tableRows[13].checked"
        :show-overflow-tooltip=true
        label="最大提速"
        prop="max_up_speed">
      </el-table-column>
      <el-table-column
        v-if="tableRows[14].checked"
        :show-overflow-tooltip=true
        label="最大斜度"
        prop="max_slope">
      </el-table-column>
      <el-table-column
        v-if="tableRows[15].checked"
        :show-overflow-tooltip=true
        label="喷浆时间"
        prop="sprayed_time">
      </el-table-column>
      <el-table-column
        v-if="tableRows[16].checked"
        :show-overflow-tooltip=true
        label="扩大头桩长"
        prop="t_type_length">
      </el-table-column>
      <el-table-column
        v-if="tableRows[17].checked"
        :show-overflow-tooltip=true
        label="扩大头浆量"
        prop="t_type_slurry">
      </el-table-column>
      <el-table-column
        v-if="tableRows[18].checked"
        :show-overflow-tooltip=true
        label="下部桩浆量"
        prop="bottom_part_slurry">
      </el-table-column>
      <el-table-column
        v-if="tableRows[19].checked"
        :show-overflow-tooltip=true
        label="扩大桩灰量">
        <template slot-scope="props">
          {{ props.row.t_type_ash | keepTwo}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[19].checked"
        :show-overflow-tooltip=true
        label="下部桩灰量">
        <template slot-scope="props">
          {{ props.row.bottom_part_ash | keepTwo}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[21].checked"
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
        isCollapse:true, //是否展开nav
        currentPage:1, //当前页
        pagesize:20, //条数
        total:0, //总数
        dialogVisible: false, //模态框
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
        },  //时间筛选
        deviceSelect1:[
          {value1:1,name:'一号桩'},
          {value1:2,name:'二号桩'},
          {value1:3,name:'三号桩'},
          {value1:4,name:'四号桩'},
          {value1:5,name:'五号桩'},
        ], //全部桩筛选
        value1:'', // 全部桩选定值
        value2:'',// 评分等级选定值
        deviceSelect2:[
          {value2:1,name:'A (80-100)'},
          {value2:2,name:'B (70-80)'},
          {value2:3,name:'C (60-70)'},
          {value2:4,name:'D (50-60)'},
          {value2:5,name:'E (40-50)'},
        ],// 评分等级选定值
        value7: '',// 时间选定值
        device:'',// 全部设备选定值
        deviceKey:'',// 设备key值
        tableData: [],// 列表数据

        tableRows:[ // 表格列是否展示
          {pileId:true,title:'桩号',checked:true}, // 桩号
          {cycle_time:true,title:'作业周期',checked:true},// 作业周期
          {depth:true,title:'总桩长',checked:true},// 总桩长
          {water_cement_ratio:true,title:'水灰比',checked:true},// 水灰比
          {down_speed:true,title:'平均下钻速度',checked:true},// 平均下钻速度
          {up_speed:true,title:'平均提钻速度',checked:false},// 平均提钻速度
          {cumulative_pulp:true,title:'累计浆量',checked:true},// 累计浆量
          {average_pulp:true,title:'平均浆量',checked:false},// 平均浆量
          {cumulative_ash:true,title:'累计灰量',checked:true},// 累计灰量
          {average_ash:true,title:'平均灰量',checked:false},// 平均灰量
          {max_current:true,title:'最大钻杆电流',checked:true},// 最大钻杆电流
          {average_current:true,title:'平均电流',checked:false},// 平均电流
          {max_down_speed:true,title:'最大钻速',checked:true},// 最大钻速
          {max_up_speed:true,title:'最大提速',checked:false},// 最大提速
          {max_slope:true,title:'最大斜度',checked:true},// 最大斜度
          {sprayed_time:true,title:'喷浆时间',checked:true},// 喷浆时间
          {t_type_length:true,title:'扩大头桩长',checked:true},// 扩大头桩长
          {t_type_slurry:true,title:'扩大头浆量',checked:false},// 扩大头浆量
          {bottom_part_slurry:true,title:'下部桩浆量',checked:true},// 下部桩浆量
          {t_type_ash:true,title:'扩大桩灰量',checked:false},// 扩大桩灰量
          {bottom_part_ash:true,title:'下部桩灰量',checked:false},// 下部桩灰量
          {score:true,title:'评分',checked:true},// 评分
        ],
        deviceSelect:[],// 全部设备的列表
        post_data:{ // 请求数据
          key:'',
          page_index:1,
          page_size:10,
        }
      }
    },
    props:['isShow'],
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'MM-dd hh:mm'); //yyyy-MM-dd hh:mm
      },
      keepTwo(value){
        value=Number(value);
        return value.toFixed(2)
      }
    },
    created(){
      console.log(this.$parent.$parent);
      if(this.isShow==undefined){
        this.isShow=true
      }
      deviceList.list().then(res=>{
        console.log(res);
        this.deviceSelect=res.result.items
      });
      this.getList(this.post_data);
      Bus.$on('isCollapse',res=>{
        console.log(res);
        this.isCollapse=res
      })
    },
    methods: {
      displayScreening(){

      },
      handleExpandChange(row,expandedRows){
        console.log(expandedRows)
      },
      deviceChange(val){ //类型改变
        console.log(val);
        this.deviceKey=val;
      },
      handleCommand(command) { //
        this.$message(command);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange: function (size) {  //改变页数
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){ //改变当前页
        console.log(currentPage);
        this.post_data.page_index = currentPage;
        this.getList(this.post_data);
        console.log(this.post_data)
      },
      getList:function (post_data) { //获取列表
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
    },
  }
</script>
<style lang="scss" scoped>
  .t-rows{
    width:260px;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between
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
</style>
