<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-if="isShow" v-model="deviceName" size="mini" disabled placeholder="请选择"></el-select>
        <el-select v-else="!isShow" v-model="device" filterable :filter-method="deviceSearch" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;width: 34%" clearable >
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

        <el-select  v-model="value1" placeholder="全部桩" size="mini" @change="deviceChange" style="margin: 0 5px;width: 23%;">
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
            <el-dropdown-item style="width: 90px;" v-for="(row,index) in tableRows" :key="index"><el-checkbox v-model="row.checked">{{row.title}}</el-checkbox></el-dropdown-item>
          </div>
          <el-button slot="reference" type="primary" icon="el-icon-caret-bottom" size="mini">选择列</el-button>
        </el-popover>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="Refresh">刷新</el-button>
        <el-dropdown placement="bottom-end" trigger="click" @command="handleExport">
          <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="1">Excel</el-dropdown-item>
            <el-dropdown-item command="2">HTML</el-dropdown-item>
            <el-dropdown-item>Word</el-dropdown-item>
            <el-dropdown-item>PDF</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-table
      v-loading="loading"
      id="rebateSetTable"
      :data="tableData"
      style="width: 100%"
      :highlight-current-row=true
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
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
              label="序号"
              width="50">
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
              label="段浆量（L/m）">
              <template slot-scope="props">
                {{ props.row.p_pulp | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              prop="p_deep"
              label="段深度（cm）">
            </el-table-column>
            <el-table-column
              label="段电流（A）">
              <template slot-scope="props">
                {{ props.row.p_current | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              label="段喷压（pa）">
              <template slot-scope="props">
                {{ props.row.p_pressure | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              label="段钻速（pa）">
              <template slot-scope="props">
                {{ props.row.p_down_speed | formatZ}}
              </template>
            </el-table-column>
            <el-table-column
              label="密度（g/cm3）">
              <template slot-scope="props">
                {{ props.row.p_density | formatZ}}
              </template>
            </el-table-column>
          </el-table>
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
        width="130"
        label="开始时间"
        align="center"
        >
        <template slot-scope="props">
          {{ props.row.begin_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[1].checked"
        width="130"
        label="结束时间"
        align="center"
        >
        <template slot-scope="props">
          {{ props.row.end_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[2].checked"
        :show-overflow-tooltip=true
        label="总桩长">
        <template slot-scope="props">
          {{ props.row.depth | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[3].checked"
        :show-overflow-tooltip=true
        label="水灰比">
        <template slot-scope="scope">
          {{scope.row.water_cement_ratio | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[4].checked"
        :show-overflow-tooltip=true
        label="深度">
        <template slot-scope="scope">
          {{scope.row.depth | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[5].checked"
        :show-overflow-tooltip=true
        label="累计灰量">
        <template slot-scope="props">
          {{ props.row.average_ash | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[6].checked"
        :show-overflow-tooltip=true
        label="累计浆量">
        <template slot-scope="props">
          {{ props.row.cumulative_pulp | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[7].checked"
        :show-overflow-tooltip=true
        label="最大钻杆电流(A)">
        <template slot-scope="props">
          {{ props.row.max_current | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[8].checked"
        :show-overflow-tooltip=true
        label="平均下钻速度">
        <template slot-scope="props">
          {{ props.row.down_speed | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[9].checked"
        :show-overflow-tooltip=true
        label="平均提钻速度">
        <template slot-scope="props">
          {{ props.row.up_speed | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[10].checked"
        :show-overflow-tooltip=true
        label="平均浆量">
        <template slot-scope="props">
          {{ props.row.average_pulp | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[11].checked"
        :show-overflow-tooltip=true
        label="平均灰量">
        <template slot-scope="props">
          {{ props.row.average_ash | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[12].checked"
        :show-overflow-tooltip=true
        label="平均电流"
        prop="average_current">
        <template slot-scope="props">
          {{ props.row.average_current | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[13].checked"
        :show-overflow-tooltip=true
        label="最大钻速">
        <template slot-scope="props">
          {{ props.row.max_down_speed | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[14].checked"
        :show-overflow-tooltip=true
        label="最大提速">
        <template slot-scope="props">
          {{ props.row.max_up_speed | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[15].checked"
        :show-overflow-tooltip=true
        label="最大斜度">
        <template slot-scope="props">
          {{ props.row.max_slope | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[16].checked"
        :show-overflow-tooltip=true
        label="喷浆时间">
        <template slot-scope="props">
          {{ props.row.sprayed_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[17].checked"
        :show-overflow-tooltip=true
        label="扩大头桩长"
        prop="t_type_length">
      </el-table-column>
      <el-table-column
        v-if="tableRows[18].checked"
        :show-overflow-tooltip=true
        label="扩大头浆量">
        <template slot-scope="props">
          {{ props.row.t_type_slurry | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[19].checked"
        :show-overflow-tooltip=true
        label="下部桩浆量">
        <template slot-scope="props">
          {{ props.row.bottom_part_slurry | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[20].checked"
        :show-overflow-tooltip=true
        label="扩大桩灰量">
        <template slot-scope="props">
          {{ props.row.t_type_ash | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[21].checked"
        :show-overflow-tooltip=true
        label="下部桩灰量">
        <template slot-scope="props">
          {{ props.row.bottom_part_ash | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableRows[22].checked"
        :show-overflow-tooltip=true
        label="评分值"
        prop="rate">
      </el-table-column>
    </el-table>
    <div class="s-box">
      <div class="s-body">
        <span class="s-total">总桩数</span>
        <span class="s-num">{{recordSum.total_pile_num}}</span>
      </div>
      <div class="s-body">
        <span class="s-total">总桩长</span>
        <span class="s-num">{{recordSum.total_depth | formatZ}}</span>
        <span class="s-total">m</span>
      </div>
      <div class="s-body">
        <span class="s-total">总浆量</span>
        <span class="s-num">{{recordSum.total_cumulative_pulp | formatZ}}</span>
        <span class="s-total">L</span>
      </div>
      <div class="s-body">
        <span class="s-total">总灰量</span>
        <span class="s-num">{{recordSum.total_cumulative_ash | formatZ}}</span>
        <span class="s-total">KG</span>
      </div>
    </div>
    <div class="m-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="listCurrentChange"
        :current-page="post_data.page_index"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :total='total'>
      </el-pagination>
    </div>
  </div>
</template>


<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import history from '@/api/project/history'
  import deviceList from '@/api/project/deviceList'
  import {formatDate} from '@/common/formatDate.js';
  import Bus from '@/common/eventBus'
  import RthyinfoFormat from '@/common/RthyinfoFormat.js'
  export default {
    data() {
      return {
        loading: true,
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
        input9: '',

        tableRows:[ // 表格列是否展示
          {name:'pileId',title:'桩号',checked:true}, // 桩号
          {name:'begin_time',title:'作业周期',checked:true},// 开始时间
          {name:'depth',title:'总桩长',checked:true},// 总桩长
          {name:'water_cement_ratio',title:'水灰比',checked:true},// 水灰比
          {name:'',title:'深度',checked:true},// 深度
          {name:'cumulative_ash',title:'累计灰量',checked:true},// 累计灰量
          {name:'cumulative_pulp',title:'累计浆量',checked:true},// 累计浆量
          {name:'max_current',title:'最大钻杆电流',checked:true},// 最大钻杆电流
          {name:'down_speed',title:'平均下钻速度',checked:false},// 平均下钻速度
          {name:'up_speed',title:'平均提钻速度',checked:false},// 平均提钻速度
          {name:'average_pulp',title:'平均浆量',checked:false},// 平均浆量
          {name:'average_ash',title:'平均灰量',checked:false},// 平均灰量
          {name:'average_current',title:'平均电流',checked:false},// 平均电流
          {name:'max_down_speed',title:'最大钻速',checked:true},// 最大钻速
          {name:'max_up_speed',title:'最大提速',checked:true},// 最大提速
          {name:'max_slope',title:'最大斜度',checked:true},// 最大斜度
          {name:'sprayed_time',title:'喷浆时间',checked:false},// 喷浆时间
          {name:'t_type_length',title:'扩大头桩长',checked:false},// 扩大头桩长
          {name:'t_type_slurry',title:'扩大头浆量',checked:false},// 扩大头浆量
          {name:'bottom_part_slurry',title:'下部桩浆量',checked:false},// 下部桩浆量
          {name:'t_type_ash',title:'扩大桩灰量',checked:false},// 扩大桩灰量
          {name:'bottom_part_ash',title:'下部桩灰量',checked:false},// 下部桩灰量
          {name:'score',title:'评分',checked:true},// 评分
        ],
        deviceSelect:[],// 全部设备select的列表
        recordSum:[],// 统计总数
        post_data:{ // 请求数据
          key:'',
          page_index:1,
          page_size:10,
        },
        device_data:{//全部设备select列表
          page_index:1,
          page_size:5,
          name:''
        },
        deviceTotal:0,
        deviceName:''
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'MM-dd hh:mm'); //yyyy-MM-dd hh:mm
      }
    },
    props:['isShow'],
    created(){
      this.deviceName=sessionStorage.getItem('deviceName');
      this.getDeviceList(this.device_data);
      this.getList(this.post_data);
      this.getRecords();
      Bus.$on('isCollapse',res=>{
        console.log(res);
        this.isCollapse=res
      })
    },
    methods: {
      handleExport(command){
        if(command=='1'){
          this.exportExcel()
        }else if(command=='2'){
          this.exportXml('rebateSetTable')
        }
      },
      //导出excel
      exportExcel () {
        /* generate workbook object from table */
        console.log('nima')
        let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
        /* get binary string as output */
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '数据报表.xlsx');
        } catch (e)
        {
          if (typeof console !== 'undefined')
            console.log(e, wbout)
        }
        return wbout
      },
      //导出xml
      exportXml(tableid) {
        let _this=this;
        let idTmr;
        if (_this.getExplorer() == 'ie') {
          var curTbl = document.getElementById(tableid);
          var oXL = new ActiveXObject("Excel.Application");
          var oWB = oXL.Workbooks.Add();
          var xlsheet = oWB.Worksheets(1);
          var sel = document.body.createTextRange();
          sel.moveToElementText(curTbl);
          sel.select();
          sel.execCommand("Copy");
          xlsheet.Paste();
          oXL.Visible = true;

          try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
          } catch (e) {
            print("Nested catch caught " + e);
          } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = window.setInterval("_this.Cleanup();", 1);
          }

        }
        else {
          _this.tableToExcel(tableid)
        }
      },
      getExplorer() {
        var explorer = window.navigator.userAgent;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
          return 'ie';
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
          return 'Firefox';
        }
        //Chrome
        else if (explorer.indexOf("Chrome") >= 0) {
          return 'Chrome';
        }
        //Opera
        else if (explorer.indexOf("Opera") >= 0) {
          return 'Opera';
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
          return 'Safari';
        }
      },
      Cleanup() {
        window.clearInterval(idTmr);
        CollectGarbage();
      },
      tableToExcel() {
        var uri = 'data:application/vnd.ms-excel;base64,',
          template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
          base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
          format = function (s, c) {
            return s.replace(/{(\w+)}/g,
              function (m, p) {
                return c[p];
              })
          }
          return function (table, name) {
            if (!table.nodeType) table = document.getElementById(table);
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
            window.location.href = uri + base64(format(template, ctx))
          }
      },

      displayScreening(){

      },
      handleExpandChange(row,expandedRows){
        console.log(expandedRows)
      },
      //类型改变
      deviceChange(val){
        console.log(val);
        this.deviceKey=val;
      },
      handleCommand(command) { //
        this.$message(command);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //列表改变每页显示的条数
      handleSizeChange: function (size) {
        this.post_data.page_size=size;
        this.getList(this.post_data);
      },

      //列表改变当前页
      handleCurrentChange: function(currentPage){
        console.log('好吧');
        this.device_data.page_index = currentPage;
        this.getList(this.post_data);
      },
      //列表改变当前页
      listCurrentChange: function(currentPage){
        console.log('好吧');
        this.post_data.page_index = currentPage;
        this.getList(this.post_data);
      },
      //获取列表
      getList:function (post_data) {
        let _this=this;
        let tableList=[];
        history.list(post_data).then(res=>{
          console.log(res);
          if(res.success){
            //console.log(res.result);
            _this.total=res.result.total;
            res.result.items.forEach(function (item) {
              tableList.push(item);
            });
            _this.tableData=tableList;
            //_this.tableData.tableRows=_this.tableRows
            console.log(_this.tableData);
            _this.loading=false
          }else {
            _this.$message.error(res.message);
            _this.loading=false
          }
        });
      },

      //统计总数
      getRecords(){
        history.records().then(res=>{
          console.log(res);
          this.recordSum=res.result[0]
        })
      },

      //全部设备select当前页
      deviceCurrentChange:function(currentPage){
        this.device_data.page_index=currentPage;
        this.getDeviceList(this.device_data);
      },
      //全部设备select搜索框
      deviceSearch(query){
        this.device_data.name=query;
        this.getDeviceList(this.device_data);
      },
      //全部设备的列表
      getDeviceList(post_data){
        let _this=this;
        deviceList.list(post_data).then(res=>{
          console.log(res);
          _this.deviceSelect=res.result.items;
          _this.deviceTotal=res.result.total;
          console.log(_this.deviceTotal)
        });
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
  .s-box{
    display: flex;
    justify-content: space-around;
    height: 60px;
    line-height: 60px;
    background: #ffffff;
    border-bottom: 2px solid #ebeef5;
    .s-body{
      margin-right: 10px;
      .s-total{
        font-size: 12px;
        color:rgba(102,102,102,1);
      }
      .s-num{
        margin: 0 5px;
        font-size:18px;
        font-weight: bold;
        color:rgba(51,51,51,1);
      }
    }
  }
  .m-pagination{
    padding: 20px;
    text-align: center;
    background: #ffffff;
  }
</style>
