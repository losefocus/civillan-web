
<template>
  <div>
    <!-- 标题和控制栏 -->
    <ul class="a-box">
      <li v-for="(list,index) in navList" :key="index" @click="changeTab(list,index)" :class="{active:index==isActive}">
        {{list.name}}
      </li>
    </ul>
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-model="device" filterable :filter-method="deviceSearch" placeholder="选择设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;width: 15%;float: left;" clearable >
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

        <!--<el-select  v-model="value1" placeholder="全部桩" size="mini" @change="deviceChange" style="margin: 0 5px;width: 15%;float: left;">
          <el-option
            v-for="item in deviceSelect1"
            :key="item.value1"
            :label="item.name"
            :value="item.value1">
          </el-option>
        </el-select>-->
        <el-select v-model="value2" placeholder="评分等级" size="mini" @change="deviceChange" style="margin: 0 5px;width: 15%;float: left;">
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
          :picker-options="pickerOptions2" style="margin: 0 5px;width: 30%;float: left;">
        </el-date-picker>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">查询</el-button>
        </div>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">重置</el-button>
        </div>
      </div>
      <div class="c-handle">
        <el-dropdown placement="bottom-end" trigger="click">
          <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="1">导出标记项目</el-dropdown-item>
            <el-dropdown-item command="2">导出全部项目</el-dropdown-item>
            <!--<el-dropdown-item>Word</el-dropdown-item>
            <el-dropdown-item>PDF</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
        <el-button style="margin-left: 7px" type="primary" icon="el-icon-refresh" size="mini" @click="Refresh">刷新</el-button>
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
      :data="tableData5"
      style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        label="序号"
        prop="id">
      </el-table-column>
      <el-table-column
        width="300"
        label="桩机号（设备）"
        prop="startTime">
      </el-table-column>
      <el-table-column
        width="300"
        label="型号"
        prop="endTime">
      </el-table-column>
      <el-table-column
        align="center"
        label="累计天数"
        prop="a">
      </el-table-column>
      <el-table-column
        align="center"
        label="累计根数"
        prop="b">
      </el-table-column>
      <el-table-column
        align="center"
        label="累计长度"
        prop="c">
      </el-table-column>
      <el-table-column
        align="center"
        label="日均"
        prop="d">
      </el-table-column>
      <el-table-column
        align="center"
        label="总浆量（L）"
        prop="e">
      </el-table-column>
      <el-table-column
        align="center"
        label="最大值"
        prop="f">
      </el-table-column>
      <el-table-column
        align="center"
        label="最小值"
        prop="g">
      </el-table-column>
      <el-table-column
        align="center"
        label="评级"
        prop="h">
      </el-table-column>
    </el-table>
    <div class="s-box">
      <div class="s-body">
        <span class="s-total">桩机总数</span>
        <span class="s-num">30</span>
      </div>
      <div class="s-body">
        <span class="s-total">施工总长</span>
        <span class="s-num">30</span>
        <span class="s-total">m</span>
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
  import deviceList from '@/api/project/deviceList'
  import deviceGrouping from '@/api/project/deviceGrouping'
  import Bus from '@/common/eventBus'
  export default {
    name: "oOperational",
    data(){
      return{
        tableData5: [
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
        ],
        value1: '',
        isCollapse:true,
        post_data:{
          key:'',
          page_index:1,
          page_size:10,
        },
        device: '', //设备选定值
        deviceSelect: [], //设备select列表
        deviceSelect1:[],
        deviceSelect2:[],
        pickerOptions2:[],
        value2:'',
        value7:'',
        newData:'',
        device_data: {//全部设备select列表
          page_index: 1,
          page_size: 5,
          name: ''
        },
        deviceTotal: 0,
        deviceName: '',
        total:0,
        navList:[],
        isActive:'',
        group_post:{
          page_index:1,
          page_size:10,
          parent_id:sessionStorage.getItem('groupId'),
          project_id:this.$cookies.get('projectId'),
          direction:'asc',
          sort_by:'sort'
        },
      }
    },
    created(){
      this.getGroup();
      this.getDeviceList(this.device_data);
      Bus.$on('isCollapse',res=>{
        this.isCollapse=res
      })
    },
    methods: {
      changeTab(list,index){ //切换tab
        this.isActive=index;
        /*console.log(list)
        if(list.code=='JBZ'){
          this.currentView='HPile'
        }else if(list.code=='PMHNT'){
          this.currentView='HFoam'
        }else if(list.code=='PLYH'){
          this.currentView='HFoam'
        }else if(list.code=='YYLZL'){
          this.currentView='HFoam'
        }else if(list.code=='YYLYJ'){
          this.currentView='HFoam'
        }*/
      },
      //设备分组
      getGroup()  {
        deviceGrouping.list(this.group_post).then(res=>{
          console.log(res);
          if(res.success){
            this.navList=res.result.items;
            let allDevice={
              project_id:this.$cookies.get('projectId'),
              name:'全部',
              id:sessionStorage.getItem('groupId'),
            };
            this.navList.unshift(allDevice);
            this.getList(this.post_data);

            this.$nextTick(()=>{
              this.isShow=true
            });
          }else{
            this.$message.error(res.message);
          }
        }).catch(e=>{

        });
      },
      //列表改变当前页
      listCurrentChange: function(currentPage){
        this.post_data.page_index = currentPage;
        this.getList(this.post_data);
      },
      handleExpandChange(row,expandedRows){
      },
      deviceChange(val){ //类型改变
        this.deviceKey=val;
      },
      handleCommand(command) { //
        this.$message(command);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange: function (size) {  //列表改变每页显示的条数
        this.post_data.page_size=size;
        this.getList(this.post_data);
      },

      handleCurrentChange: function(currentPage){ //列表改变当前页
        this.device_data.page_index = currentPage;
        this.getList(this.post_data);
      },
      getList:function (post_data) { //获取列表
        let _this=this;
        let tableList=[];
        history.list(post_data).then(res=>{
          if(res.result.items){
            _this.total=res.result.total;
            res.result.items.forEach(function (item) {
              tableList.push(item._v);
            });
            _this.tableData=tableList;
          }else {

          }
        })
      },

      deviceCurrentChange:function(currentPage){ //全部设备select当前页
        this.device_data.page_index=currentPage;
        this.getDeviceList(this.device_data);
      },
      deviceSearch(query){ //select搜索框
        this.device_data.name=query;
        this.getDeviceList(this.device_data);
      },
      getDeviceList(post_data){
        let _this=this;
        deviceList.list(post_data).then(res=>{
          _this.deviceSelect=res.result.items;
          _this.deviceTotal=res.result.total;
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

<style scoped lang="scss">
  .a-box{
    width: calc(100% - 20px);
    padding: 15px 0 0 20px;
    height: 50px;
    background: #ffffff;
    margin-bottom: 10px;
    li{
      font-size: 14px;
      cursor: pointer;
      float: left;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #FFFFFF;
      color: #cccccc;
      border:1px solid #cccccc;
      margin-left: -1px;
    }
    li:first-child{
      border-radius: 5px 0 0 5px;
    }
    li:last-child{
      border-radius: 0 5px 5px 0;
    }
    .active{
      background: #F76A6A;
      color: #ffffff;
      border:1px solid #F76A6A;
    }
    .active+li{
      border-left: none;
    }
  }
  .c-box{
    padding: 0 2% 20px;
    border:1px solid rgba(230,234,238,1);
    background: #fff;
    overflow: hidden;
    .c-handle{
      margin-top: 20px;
      float: right;
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
      float: left;
      .c-button{
        margin:0 3px;
        float: left;
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
    width: 100%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: #ffffff;
    border-bottom: 2px solid #ebeef5;
    .s-body{
      float: left;
      margin-left: 30%;
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
