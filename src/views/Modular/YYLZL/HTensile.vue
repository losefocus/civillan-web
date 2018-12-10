<template>
  <div class="h-box" :style="newStyle">
    <!-- 标题和控制栏 -->
    <h-process v-if="dataTab==3"></h-process>
    <h-trip v-if="dataTab==2"></h-trip>
    <div v-if="dataTab==1">
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
        header-row-class-name="pass-header"
        :highlight-current-row=true
        @selection-change="handleSelectionChange"
        @expand-change="handleExpandChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="孔道号"
          align="center"
          width="180"
        >
          <template slot-scope="props">
            <span>{{props.row.a}}</span>
            <span>[ </span>
            <el-popover
              placement="right-start"
              title="作业配置参数"
              trigger="click"
            >
              <ul >
                <li><span class="c-name">梁板类型</span> : <span class="c-key">20米箱梁-中跨（B)</span></li>
                <li><span class="c-name">桥梁名称</span> : <span class="c-key">杭州湾特大桥（HE）</span></li>
                <li><span class="c-name">预制梁场</span> : <span class="c-key">中建3号</span></li>
                <li><span class="c-name">梁孔数量</span> : <span class="c-key">888</span></li>
              </ul>
              <span class="c-parameter"  slot="reference">参数</span>
            </el-popover>
            <span> | </span>
            <el-popover
              placement="right-start"
              title="孔道设置信息"
              trigger="click"
            >
              <ul class="b-pass">
                <li><span>钢绞线长度(m)：</span><span>25.8</span></li>
                <li><span>张拉工艺：</span><span>2</span></li>
                <li><span>弹性模量(Gpa)：</span><span>0</span></li>
                <li><span>分级比例：</span><span>0</span></li>
                <li><span>张拉次序：</span><span>1</span></li>
                <li><span>分级张力(KN)：</span><span>0</span></li>
              </ul>
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="a"
                  align="center"
                  width="130"
                  label="千斤顶编号">
                </el-table-column>
                <el-table-column
                  prop="b"
                  align="center"
                  label="检验日期"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="c"
                  width="130"
                  align="center"
                  label="油压泵编号">
                </el-table-column>
                <el-table-column
                  prop="d"
                  width="130"
                  align="center"
                  label="油压表编号">
                </el-table-column>
                <el-table-column
                  prop="e"
                  width="130"
                  align="center"
                  label="回归系数a">
                </el-table-column>
                <el-table-column
                  prop="f"
                  width="130"
                  align="center"
                  label="回归系数b">
                </el-table-column>
              </el-table>

              <span class="c-parameter"  slot="reference">孔道信息</span>
            </el-popover>
            <span> ]</span>
          </template>
        </el-table-column>
        <el-table-column
          label="梁号"
          align="center"
          prop="b"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="设备编号"
          prop="c">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="II号张拉力(KN)">
          <template slot-scope="scope">
            {{scope.row.d | formatZ}}
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="I号张拉力(KN)">
          <template slot-scope="scope">
            {{scope.row.e | formatZ}}
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="设计张力">
          <template slot-scope="props">
            {{ props.row.f | formatP}}
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="总伸长量"
          prop="g">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="总伸长量"
          prop="h">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="设计伸长量"
          prop="i">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="延伸量误差"
          prop="j">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="超张百分比"
          prop="k">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="张拉时间"
          prop="l">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="记录时间"
          prop="m">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip=true
          align="center"
          label="状态"
          prop="n">
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="getTrip(scope.row)" type="text" size="small">行程数据</el-button>
            <el-button @click="getProcess(scope.row)" type="text" size="small" style="margin-left: 0">过程数据</el-button>
          </template>
        </el-table-column>
      </el-table>
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

  </div>
</template>
<script>
  import history from '@/api/project/history'
  import deviceList from '@/api/project/deviceList'
  import {formatDate} from '@/common/formatDate.js';
  import Bus from '@/common/eventBus'
  import RthyinfoFormat from '@/common/RthyinfoFormat.js'

  import HProcess from '@/views/Modular/YYLZL/HTensile/HProcess.vue'
  import HTrip from '@/views/Modular/YYLZL/HTensile/HTrip.vue'
  export default {
    components:{
      HProcess,
      HTrip,
    },
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
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
          {a:'N1',b:'LH9012',c:'LJZL01-0305',d:'1367.1',e:1367.1,f:1367.1,g:1367.1,h:1367.1,i:1367.1,j:1367.1,k:1367.1,l:'2018-10-10',m:'2018-10-10',},
        ],// 列表数据
        tableData: [{
          a: '1',
          b: '2018.11.20',
          c: '1',
          d: '5571',
          e: '0.017300',
          f: '-0.170000',
        }, {
          a: '1',
          b: '2018.11.20',
          c: '1',
          d: '5571',
          e: '0.017300',
          f: '-0.170000',
        }, {
          a: '1',
          b: '2018.11.20',
          c: '1',
          d: '5571',
          e: '0.017300',
          f: '-0.170000',
        }, {
          a: '1',
          b: '2018.11.20',
          c: '1',
          d: '5571',
          e: '0.017300',
          f: '-0.170000',
        }, ],
        input9: '',

        multipleSelection:[],

        //选择列
        newData:{
          pile_id:{title:'孔道号',checked:true},
          begin_time:{title:'梁号',checked:true},
          end_time:{title:'设备编号',checked:true},
          depth:{title:'II号张拉力 （KN）',checked:true},
          re_depth:{title:'I号张拉力 （KN）',checked:true},
          water_cement_ratio:{title:'设计张力',checked:true},
          cumulative_ash:{title:'总伸长量',checked:true},
          cumulative_pulp:{title:'设计伸长量',checked:true},
          max_current:{title:'延伸量误差',checked:true},
          down_speed:{title:'张拉时间',checked:false},
          up_speed:{title:'记录时间',checked:false},
          average_pulp:{title:'状态',checked:false},
          average_ash:{title:'明细',checked:false},
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
        dataTab:1,
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
      });
      this.$bus.on('tab',(res)=>{
        this.dataTab=res;
      })
    },
    mounted(){

    },
    methods: {
      //切换记录数据页
      getTrip(){
        this.dataTab=2
      },
      //切换过程数据页
      getProcess(){
        this.dataTab=3
      },

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
            _this.total=res.result.total;
            /*res.result.items.forEach(function (item) {
              tableList.push(item);
            });*/
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
          this.post_data.key=val;
          this.getList(this.post_data)
        },
      }
    },
  }
</script>
<style lang="scss" scoped>

  .h-box{
    height: 100%;
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
  .c-name{
    display: inline-block;
    width: 50px;
    vertical-align: top;
    font-size: 12px;
  }
  .c-key{
    display:inline-block;
    margin-left: 10px;
    vertical-align: top;
    width:115px;
    word-wrap:break-word;
    font-size: 12px;
  }
  .c-parameter{
    color: #1ab3e6;
    cursor: pointer;
    text-decoration:underline;
  }
  .b-pass{
    border: 1px solid #ebeef5;
    height: 40px;
    li{
      font-size: 12px;
      float: left;
      width: 130px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
</style>

