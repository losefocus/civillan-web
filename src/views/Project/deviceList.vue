<template>
  <div class="n-box">
    <ul class="a-box">
      <li v-for="(list,index) in navList" :key="index" @click="changeTab(list,index)" :class="{active:index==isActive}">
        {{list.name}}
      </li>
    </ul>
    <div class="noData" v-if="noData">
      <div style="display: table-cell;vertical-align: middle;">
        <div class="iconfont icon-zanwushuju2"></div>
        <div class="d-title">
          暂无记录
        </div>
      </div>
    </div>
    <waterfall
      style="margin-left: -10px;width: calc( 100% + 20px)"
      v-else="noData"
      :line-gap="320"
      :min-line-gap="250"
      :max-line-gap="350"
      :single-max-width="350"
      :watch="items">
      <waterfall-slot
        v-for="(item, index) in items"
        :width="210"
        :height="210"
        :order="index"
        :key="item.id"
        move-class="item-move"
      >
        <div class="item pj-box" :style="item.style" :index="item.id" @click="getDetails(item,index)">
          <!--:class="{'r-state1':item.status==0,'r-state2':item.status==1,'r-state3':item.status==2}"-->
          <div class="r-state" :class="{'r-state1':item.status==21,'r-state2':item.status==11,'r-state4':item.status==1||item.status==2||item.status==0,}">
            {{ deviceStatus.get(item.status) }}
          </div>
          <div class="d-name">
            <span>{{item.name}}</span>
          </div>
          <div class="d-title">
            <span v-if="item.product">{{item.key}}</span>
            <span v-else>-</span>
            <!--<span v-if="item.device_type=='双头搅拌桩'">双头搅拌桩</span>
            <span v-if="item.device_type=='高压旋桩'">高压旋桩</span>-->
          </div>
          <ul class="d-info">
            <li class="d-img">
              <img v-if="item.type=='JBZ'" :src="jbzImg">
              <img v-if="item.type=='PLYH'" :src="pnyhImg">
              <img v-if="item.type=='PMHNT'" :src="pmhntImg">
              <img v-if="item.type=='YYLZL'" :src="yylzlImg">
              <img v-if="item.type=='YYLYJ'" :src="yylyjImg">
              <img v-if="item.type=='GYXPZ'" :src="gyxpzImg">
            </li>
            <li class="d-statistics">
              <div class="d-date">当前作业</div>
              <div class="d-progress">
                k2358-805
              </div>

              <div class="d-date">形象进度</div>
              <div>
                <el-progress  :percentage="80" color="rgb(36, 188, 247)" :show-text='false'></el-progress>
              </div>
            </li>
          </ul>
        </div>
      </waterfall-slot>
    </waterfall>
    <div class="m-pagination" v-if="!noData">
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

    <el-dialog
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :fullscreen="dialogFullScreen"
      top="7vh"
      style="min-width: 1024px;"
      @close="closeDialog"
    >
      <new-running @changeIcon="isFullScreen" v-if="dialogVisible" :style="dialogHeight" :deviceType="deviceType" :dialogFullScreen="dialogFullScreen"></new-running>
    </el-dialog>
  </div>
</template>

<script>
  import { mapActions , mapState} from 'vuex'
  import dictionary from '@/api/common/dictionary'
  import deviceGrouping from '@/api/project/deviceGrouping'
  import deviceList from '@/api/project/deviceList'
  import deviceData from '@/api/device/deviceData'
  import newRunning from '@/views/softBase/newRunning.vue'

  import jbzImg from '@/assets/Modular/deviceList/JBZ.png'
  import pmhntImg from '@/assets/Modular/deviceList/PMHNT.png'
  import pnyhImg from '@/assets/Modular/deviceList/PNYH.png'
  import yylzlImg from '@/assets/Modular/deviceList/YYLZL.png'
  import yylyjImg from '@/assets/Modular/deviceList/YYLYJ.png'
  import gyxpzImg from '@/assets/Modular/deviceList/GYXPZ.png'


  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  export default {
    name: "device",
    components: {
      Waterfall,
      WaterfallSlot,
      newRunning
    },
    data () {
      return {
        jbzImg:jbzImg,
        pmhntImg:pmhntImg,
        pnyhImg:pnyhImg,
        yylzlImg:yylzlImg,
        yylyjImg:yylyjImg,
        gyxpzImg:gyxpzImg,
        isActive:'',
        noData:false,
        navList:[],
        loading:null,
        isShow:true,
        dialogVisible: false,
        dialogWidth:'70%',
        dialogHeight:{
          height:'700px'
        },
        dialogFullScreen:false,
        changeIcon:true,
        radio:"",
        line: 'v',
        items: [],
        group_id:0,
        deviceKey:'',
        deviceName:'',
        deviceType:'',
        tIndex:0,
        currentView:'RState',
        isBusy: false,
        deviceStatus:null,
        deviceStatusLists:[
          {id:21,name:'故障中'},
          {id:11,name:'运行中'},
          {id:0,name:'未激活'},
          {id:1,name:'已离线'},
          {id:2,name:'已离场'},
        ],
        post_data:{
          project_id:this.$cookies.get('projectId'),
          group_id:sessionStorage.getItem('groupId'),
          page_index:1,
          page_size:10,
        },
        group_post:{
          page_index:1,
          page_size:10,
          parent_id:sessionStorage.getItem('groupId'),
          project_id:this.$cookies.get('projectId'),
          direction:'asc',
          sort_by:'sort'
        },
        total:0,
      };
    },

    created(){
      this.deviceStatus = new Map();
      for (let i=0; i<this.deviceStatusLists.length; i++) {
        this.deviceStatus.set(this.deviceStatusLists[i].id,this.deviceStatusLists[i].name)
      }
      this.getGroup()
    },

    computed: {
      ...mapState({token:state=>state.project.deviceKey})
    },
    methods: {
      ...mapActions('deviceKey',['incrementKey']),
      getGroup(){
        deviceGrouping.list(this.group_post).then(res=>{
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
      changeTab(list,index){ //切换tab
        this.isActive=index;
        this.post_data.group_id=list.id;
        this.getList(this.post_data);
      },
      radioEvent(){
        this.dialogVisible = false;
      },
      getDetails(item){ //获取详情
        this.deviceType=item.type;
        this.dialogVisible=true;
        this.deviceName=item.name;
        let deviceInfo=JSON.stringify(item);
        sessionStorage.setItem('deviceInfo',deviceInfo);
        this.$store.dispatch('incrementKey',item.key);
        this.deviceKey=item.key;
      },
      isFullScreen(val){ //是否打开模态框
        if(!val){
          this.dialogWidth='100%';
          this.dialogHeight={
            height:'calc(100% - 65px)'
          };
          this.changeIcon=!this.changeIcon;
          this.dialogFullScreen=true;
        }else{
          this.dialogWidth='70%';
          this.dialogHeight={
            height:'700px'
          };
          this.changeIcon=!this.changeIcon;
          this.dialogFullScreen=false;
        }
      },
      getList(){
        this.loading=this.$loading({
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.2)'
        });
        deviceList.list(this.post_data).then(res=>{
          if(res.success){
            if(res.result.items.length>0){
              this.noData=false;
              this.items=res.result.items;
              this.total=res.result.total;
              this.loading.close();
            }else{
              this.noData=true;
              this.loading.close();
            }
          }else{
            this.loading.close();
          }
          this.loading.close();
        }).catch(e=>{
          this.loading.close();
        })
      },
      handleSizeChange(size){
        this.post_data.page_size=size;
        this.getList();
      },
      listCurrentChange(currentPage){
        this.post_data.page_index = currentPage;
        this.getList();
      },
      closeDialog(){
        this.tIndex=0
      }
    }
  }
</script>
<style scoped lang="scss">
  .n-box{
    width: calc(100% - 40px);
    height: auto;
    padding: 20px;
    background: #f5f5f9;
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
      color: #999999;
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
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }

  .noData{
    width: 100%;
    height: calc(100% - 95px);
    font-size: 30px;
    font-weight: bold;
    margin-top: 10%;
    display: table;
    text-align: center;
    .icon-zanwushuju2{
      font-size: 80px;
      color: #cccccc;
    }
    .d-title{
      margin-top: 10px;
      font-size: 28px;
      color: #cccccc;
    }
  }

  waterfall-slot{
    background: black;
  }
  .item {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    font-size: 0.9em;
    box-shadow:0 5px 7px 0 rgba(144,164,183,0.3);
    cursor: pointer;
    .equipment{
      width: 50%;

      float: left;
    }
    .online{
      width: 25%;
      float: left;
    }
    .statistics{
      width: 25%;
      float: left;
    }
  }
  .pj-box{
    background: #ffffff;
    padding-left: 25px;
    .r-state{
      padding: 2px 15px;
      color: #ffffff;
      border-radius: 15px 0 0 15px;
      margin-top: 20px;
      background: #24BCF7;
      float: right;
      text-align: right;
      .r-stateText{
        color: #fff;
        font-size: 0.2em;
        margin: 6% 3%;
      }
    }

    .r-state1{background: #D44848;}
    .r-state2{background: #24BCF7;}
    .r-state3{background: #808080;}
    .r-state4{background: #DADADA;}

    .d-name{
      color: #333333;
      margin-top: 20px;
      font-size: 16px;
      font-weight: bold;
    }
    .d-title{
      margin-top: 6px;
      color: #999999;
      font-size: 12px;
    }
    .d-info{
      margin-top: 16%;
      width: 100%;
      height: 50%;
      .d-img{
        float: left;
        width: 40%;
        height: 90%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .d-statistics{
        float: left;
        width: 50%;
        padding-top: 5%;
        height: 85%;
        margin-left: 3%;
        .d-date{
          font-size: 14px;
          margin-bottom: 6%;
        }
        .d-progress{
          width: 100%;
          margin-bottom: 18%;
        }
      }
      .d-type1{background: url(../../assets/device/mixingPile.png)no-repeat center;background-size: cover;}
      .d-type2{background: url(../../assets/device/dHMixing.png)no-repeat center;background-size: cover;}
      .d-type3{background: url(../../assets/device/highPressureJet.png)no-repeat center;background-size: cover;}
    }
  }


  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }
  .m-pagination{
    padding: 20px;
    text-align: center;
    //background: #ffffff;
  }
</style>

