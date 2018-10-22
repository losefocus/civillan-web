<template>
  <div class="n-box" :style="newStyle">
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <ul class="a-box">
        <li v-for="(list,index) in navList" :key="index" @click="changeTab(list,index)" :class="{active:index==isActive}">
          {{list.name}}
        </li>
      </ul>
    </div>
    <h-pile :is="currentView" :deviceKey="deviceKey"></h-pile>
  </div>
</template>


<script>
  import history from '@/api/project/history'
  import deviceList from '@/api/project/deviceList'
  import {formatDate} from '@/common/formatDate.js';
  import Bus from '@/common/eventBus'

  import HPile from '@/views/softBase/HPile'
  import HFoam from '@/views/FConcrete/HFoam'

  import categories from '@/api/configure/categories'
  import RthyinfoFormat from '@/common/RthyinfoFormat.js'
  export default {
    data() {
      return {
        currentView:'HPile',
        loading: true,
        isCollapse:true, //是否展开nav
        currentPage:1, //当前页
        pagesize:20, //条数
        total:0, //总数
        device:'',// 全部设备选定值
        deviceKey:'',// 设备key值
        tableData: [],// 列表数据
        input9: '',

        multipleSelection:[],

        //选择列
        tableHeader:[],
        tableName:[],
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
        deviceName:'',
        navList:[],
        allListQuery:{ //类型select列表请求参数
          page_index: 1,
          page_size: 999,
          direction:'asc',
          sort_by:'sort'
        },
        isActive:'',
      }
    },
    components:{
      HPile,
      HFoam
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'MM-dd hh:mm'); //yyyy-MM-dd hh:mm
      }
    },
    props:['isShow','newStyle'],
    created(){
      this.deviceName=sessionStorage.getItem('deviceName');
      this.getDeviceList(this.device_data);
      /*this.getList(this.post_data);
      this.getRecords();
      Bus.$on('isCollapse',res=>{
        this.isCollapse=res
      })*/
    },
    mounted(){
      this.getCategoryList()
    },
    methods: {
      //类型改变
      /*deviceChange(val){
        console.log(val.split(','));
        let deviceType=val.split(',')[1];
        this.deviceKey=val.split(',')[0];

        if(deviceType=='JBZ'){
          this.currentView='HPile'
        }else if(deviceType=='FPJ'){
          this.currentView='HFoam'
        }else{
          this.currentView='HFoam'
        }
        this.post_data.key=val;
        this.getList(this.post_data)
      },*/

      //获取类型列表数据
      getCategoryList(){
        this.allListQuery.tenant=this.$cookies.get('tenant');
        categories.list(this.allListQuery).then(res => {
          console.log(res);
          let list = res.result.items;
          this.navList=res.result.items;
          /*this.typeOptions = list.map(item => {
            return { value: item.id, label: item.name };
          });
          this.typeMap = new Map();
          for (let i=0; i<list.length; i++) {
            this.typeMap.set(list[i].id,list[i].name)
          }*/
        })
      },
      changeTab(list,index){ //切换tab
        this.isActive=index;
        console.log(list)
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
        }
        /*this.post_data={
          group_id:list.id,
          page_index:1,
          page_size:10,
        };*/
        //this.getList(this.post_data)
      },
      visibleChange(val){
        console.log(val);
        if(val){
          this.device_data.name='';
          this.getDeviceList(this.device_data)
        }
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

      //全部设备select当前页
      deviceCurrentChange:function(currentPage){
        this.device_data.page_index=currentPage;
        this.getDeviceList(this.device_data);
      },
      //全部设备select搜索框
      deviceSearch(query){
        console.log(this.device);
        this.device=query
        this.device_data.name=query;
        this.getDeviceList(this.device_data);
      },
      //全部设备的列表
      getDeviceList(post_data){
        let _this=this;
        deviceList.list(post_data).then(res=>{
          console.log(res.result.items);
          _this.deviceSelect=res.result.items;
          _this.deviceTotal=res.result.total;
        });
      },

    },
  }
</script>
<style lang="scss" scoped>
  .n-box{
    padding: 20px;
    height: auto;
    background: #f5f5f9;
  }
  .t-rows{
    width:260px;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between
  }
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
    //padding: 0 2% 20px;
    /*border:1px solid rgba(230,234,238,1);*/
    /*background: #fff;*/
    margin-bottom: 20px;
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
    flex-wrap:wrap;
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
