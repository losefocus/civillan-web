<template>
  <div class="h-box" :style="newStyle">
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-model="value2" placeholder="评分等级" size="mini" @change="deviceChange1" style="margin: 0 5px 0 0;width: 20%;float: left;">
          <el-option
            v-for="item in deviceSelect2"
            :key="item.value2"
            :label="item.name"
            :value="item.value2">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="value7"
          size="mini"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2" style="margin: 0 5px;width: 40%;float: left;">
        </el-date-picker>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">查询</el-button>
        </div>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">重置</el-button>
        </div>
      </div>
      <div class="c-handle">
        <el-dropdown placement="bottom-end" trigger="click" @command="handleExport">
          <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="1">导出标记项目</el-dropdown-item>
            <el-dropdown-item command="2">导出全部项目</el-dropdown-item>
            <!--<el-dropdown-item>Word</el-dropdown-item>
            <el-dropdown-item>PDF</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
        <el-button style="margin-left: 10px" type="primary" icon="el-icon-refresh" size="mini" @click="Refresh">刷新</el-button>
        <el-popover
          placement="bottom"
          trigger="click">
          <div class="t-rows">
            <el-dropdown-item style="width: 90px;" v-for="(row,index) in newData" :key="index"><el-checkbox v-model="row.checked">{{row.title}}</el-checkbox></el-dropdown-item>
          </div>
          <el-button slot="reference" type="primary" icon="el-icon-caret-bottom" size="mini">选择列</el-button>
        </el-popover>
      </div>
    </div>
    <el-table

      ref="multipleSelection"
      :data="tableData1"
      style="width: 100%"
      align="center"
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
              align="center"
              label="段浆量（L/m）">
              <template slot-scope="props">
                {{ props.row.p_pulp | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              label="段灰量（L/m）">
              align="center"
              <template slot-scope="props">
                {{ props.row.p_ash | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              prop="p_deep"
              align="center"
              label="段深度（cm）">
            </el-table-column>
            <el-table-column
              align="center"
              label="段电流（A）">
              <template slot-scope="props">
                {{ props.row.p_current | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="段密度（g/cm3）">
              <template slot-scope="props">
                {{ props.row.p_density | formatZ}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="段喷压（pa）">
              <template slot-scope="props">
                {{ props.row.p_pressure | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="段钻速（pa）">
              <template slot-scope="props">
                {{ props.row.p_down_speed | formatZ}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="段提速（pa）">
              <template slot-scope="props">
                {{ props.row.p_up_speed | formatZ}}
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
        v-if="newData.begin_time.checked"
        width="130"
        label="开始时间"
        align="center"
      >
        <template slot-scope="props">
          {{ props.row.a | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.end_time.checked"
        width="130"
        label="结束时间"
        align="center"
      >
        <template slot-scope="props">
          {{ props.row.b | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.depth.checked"
        :show-overflow-tooltip=true
        align="center"
        label="轻质土流量">
        <template slot-scope="props">
          {{ props.row.c | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.water_cement_ratio.checked"
        :show-overflow-tooltip=true
        align="center"
        label="水泥用量">
        <template slot-scope="scope">
          {{scope.row.d | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.re_depth.checked"
        :show-overflow-tooltip=true
        align="center"
        label="发泡剂用量">
        <template slot-scope="scope">
          {{scope.row.e | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.cumulative_ash.checked"
        :show-overflow-tooltip=true
        align="center"
        label="用水总量">
        <template slot-scope="props">
          {{ props.row.f | formatP}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.rate.checked"
        :show-overflow-tooltip=true
        align="center"
        label="评分值"
        prop="g">
      </el-table-column>
    </el-table>
    <!--<div class="s-box">
      <div class="s-body">
        <span class="s-total">总桩数</span>
        <span class="s-num" v-if="recordSum">{{recordSum.total_pile_num}}</span>
        <span class="s-num" v-else>0</span>
      </div>
      <div class="s-body">
        <span class="s-total">总桩长</span>
        <span class="s-num" v-if="recordSum">{{recordSum.total_depth | formatZ}}</span>
        <span class="s-num" v-else>0</span>
        <span class="s-total">m</span>
      </div>
      <div class="s-body">
        <span class="s-total">总浆量</span>
        <span class="s-num" v-if="recordSum">{{recordSum.total_cumulative_pulp | formatZ}}</span>
        <span class="s-num" v-else>0</span>
        <span class="s-total">L</span>
      </div>
      <div class="s-body">
        <span class="s-total">总灰量</span>
        <span class="s-num" v-if="recordSum">{{recordSum.total_cumulative_ash | formatZ}}</span>
        <span class="s-num" v-else>0</span>
        <span class="s-total">KG</span>
      </div>
    </div>-->
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
        //deviceKey:'',// 设备key值
        tableData1: [
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
          {a:'2018-10-10',b:'2018-10-10',c:'20',d:'30',e:40,f:50,g:60},
        ],// 列表数据
        input9: '',

        multipleSelection:[],

        //选择列
        newData:{
          pile_id:{title:'桩号',checked:true},
          begin_time:{title:'开始时间',checked:true},
          end_time:{title:'结束时间',checked:true},
          depth:{title:'实际桩长',checked:true},
          re_depth:{title:'复搅深度',checked:true},
          water_cement_ratio:{title:'水灰比',checked:true},
          cumulative_ash:{title:'累计灰量',checked:true},
          cumulative_pulp:{title:'累计浆量',checked:true},
          max_current:{title:'最大钻杆电流',checked:true},
          down_speed:{title:'平均下钻速度',checked:false},
          up_speed:{title:'平均提钻速度',checked:false},
          average_pulp:{title:'平均浆量',checked:false},
          average_ash:{title:'平均灰量',checked:false},
          average_current:{title:'平均电流',checked:false},
          max_down_speed:{title:'最大钻速',checked:true},
          max_up_speed:{title:'最大提速',checked:true},
          max_slope:{title:'最大斜度',checked:true},
          sprayed_time:{title:'喷浆时间',checked:false},
          t_type_length:{title:'扩大头桩长',checked:false},
          t_type_slurry:{title:'扩大头浆量',checked:false},
          bottom_part_slurry:{title:'扩大桩灰量',checked:false},
          t_type_ash:{title:'下部桩浆量',checked:false},
          bottom_part_ash:{title:'下部桩灰量',checked:false},
          rate:{title:'评分',checked:true},
        },
        tableHeader:[],
        tableName:[],
        recordSum:[],// 统计总数
        post_data:{ // 请求数据
          key:'',
          page_index:1,
          page_size:10,
        },
        deviceTotal:0,
        deviceName:'',
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'MM-dd hh:mm'); //yyyy-MM-dd hh:mm
      }
    },
    props:['isShow','newStyle','deviceKey'],
    created(){
      this.deviceName=sessionStorage.getItem('deviceName');
      /*this.getDeviceList(this.device_data);
      this.getList(this.post_data);
      this.getRecords();*/
      Bus.$on('isCollapse',res=>{
        this.isCollapse=res
      })
    },
    mounted(){

    },
    methods: {
      handleExport(command){
        if(command=='1'){
          this.importExcel();
        }else if(command=='2'){
          this.importExcelAll();
        }
      },
      //excel导出
      importExcel() {
        require.ensure([], () => {
          if(this.multipleSelection.length!==0){
            for(name in this.newData){
              if(this.newData[name].checked==true){
                this.tableHeader.push(this.newData[name].title);
                this.tableName.push(name)
              }
            }
            const { export_json_to_excel } = require('@/vendor/Export2Excel');//引入文件
            let tHeader = this.tableHeader; //将对应的属性名转换成中文
            let filterVal = this.tableName; //table表格中对应的属性名
            let list=[];
            let obj = {};
            this.multipleSelection.forEach(e=>{
              for(let i=0;i<filterVal.length;i++){
                obj[filterVal[i]] = e[filterVal[i]]
              }
              list.push(obj);
            });
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '数据报表');

            //引用赋值  用完清空
            this.tableHeader=[];
            this.tableName=[];
            list=[];
          }else{
            this.$message.error('请先选择需要导出的项目！')
          }
        })
      },
      importExcelAll(){
        history.list({page_index:1,page_size:100,key:''}).then(res=>{
          if(res.success){
            for(name in this.newData){
              this.tableHeader.push(this.newData[name].title);
              this.tableName.push(name)
            }
            const { export_json_to_excel } = require('@/vendor/Export2Excel');//引入文件
            let tHeader = this.tableHeader; //将对应的属性名转换成中文
            let filterVal = this.tableName; //table表格中对应的属性名
            let list=[];
            let obj = {};
            res.result.items.forEach(e=>{
              for(let i=0;i<filterVal.length;i++){
                obj[filterVal[i]] = e[filterVal[i]]
              }
              list.push(obj);
            });
            const data = this.formatJson(filterVal, list);
            //console.log(list);
            export_json_to_excel(tHeader, data, '数据报表');

            //引用赋值  用完清空
            this.tableHeader=[];
            this.tableName=[];
            list=[];
          }else {
            _this.$message.error(res.message);
          }
        }).catch(err => {
        });
      },

      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
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
      },
      //类型改变
      deviceChange1(val){
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
        this.device_data.page_index = currentPage;
        this.getList(this.post_data);
      },
      //列表改变当前页
      listCurrentChange: function(currentPage){
        this.post_data.page_index = currentPage;
        this.getList(this.post_data);
      },
      //获取列表
      getList:function (post_data) {
        let _this=this;
        let tableList=[];
        history.list(post_data).then(res=>{
          if(res.success){
            console.log(res);
            _this.total=res.result.total;
            /*res.result.items.forEach(function (item) {
              tableList.push(item);
            });*/
            //console.log(res.result.items);
            _this.tableData=res.result.items;
            _this.loading=false
          }else {
            _this.$message.error(res.message);
            _this.loading=false
          }
        }).catch(err => {
          this.loading=false;
        });
      },

      //统计总数
      getRecords(){
        history.records().then(res=>{
          this.recordSum=res.result[0]
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
    watch:{
      deviceKey:{
        handler(val, oldVal){
          console.log(val);
          this.post_data.key=val;
          this.getList(this.post_data)
        },
      }
    },
  }
</script>
<style lang="scss" scoped>
  .h-box{
    height: auto;
    background: #f5f5f9;
  }
  .t-rows{
    width:260px;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between
  }
  .c-box{
    margin-top: 15px;
    padding: 0 2% 20px;
    border:1px solid rgba(230,234,238,1);
    background: #fff;
    overflow: hidden;

    .c-handle{
      margin-top: 20px;
      float: right;
      div{
        float: left;
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
      float: left;
      .c-button{
        float: left;
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
    margin-top: 0;
  }
  .s-box{
    height: 60px;
    line-height: 60px;
    background: #ffffff;
    border-bottom: 2px solid #ebeef5;
    .s-body{
      float: left;
      margin-left: 15%;
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
