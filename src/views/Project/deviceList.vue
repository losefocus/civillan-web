<template>
  <div>
    <ul class="a-box">
      <li v-for="(list,index) in navList" :key="index" @click="changeTab1(list,index)" :class="{active:index==isActive}">
        {{list.name}}
      </li>
    </ul>
    <waterfall
      :line-gap="320"
      :min-line-gap="280"
      :max-line-gap="320"
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
          <div class="r-state r-state1" >
          </div>
          <div class="d-name">
            <span>{{item.name}}</span>
          </div>
          <div class="d-title">
            <span>{{item.product.alias}}</span>
            <!--<span v-if="item.device_type=='双头搅拌桩'">双头搅拌桩</span>
            <span v-if="item.device_type=='高压旋桩'">高压旋桩</span>-->
          </div>
          <ul class="d-info">
            <li class="d-img"><img :src="item.product.productCategory.thumbnailBaseUrl+item.product.productCategory.thumbnailPath"></li>
            <li class="d-statistics">
              <div class="d-date">段浆量：10L</div>
              <div class="d-progress">
                <el-progress :percentage="30" color="#999999" :show-text='false'></el-progress>
              </div>

              <div class="d-date">段灰量：20KG</div>
              <div>
                <el-progress  :percentage="80" color="#999999" :show-text='false'></el-progress>
              </div>
            </li>
          </ul>
        </div>
      </waterfall-slot>
    </waterfall>
    <el-dialog
      :visible.sync="dialogVisible"
      :width="dialogWidth"

      :fullscreen="dialogFullscreen"
      top="12vh"
      style="min-width: 1024px;"
    >
      <ul class="t-header">
        <li v-for="(tab,index) in tHeader" :key="index" @click="changeTab(index)" :class="{active:index==tIndex}"> {{tab.name}}</li>
        <div class="t-handle" v-show="isShow">
          <div @click="isFullscreen()"><i class="iconfont" :class="{'icon-dEnlarge':changeIcon==true,'icon-dNarrow':changeIcon==false}"></i></div>
        </div>
      </ul>
      <r-state :deviceName="deviceName"  v-if="dialogVisible" :is="currentView" keep-alive :device-key="deviceKey"  :dialogFullscreen="dialogFullscreen" class="t-Body" :style="dialogHeight" @dialogFullscreen="changeScreen"></r-state>
    </el-dialog>
  </div>
</template>

<script>
  import dictionary from '@/api/common/dictionary'
  import deviceGrouping from '@/api/project/deviceGrouping'
  import deviceList from '@/api/project/deviceList'


  import SAnalysis from '@/views/softBase/SAnalysis'
  import RState from '@/views/softBase/RState'
  import AQuery from '@/views/softBase/AQuery'
  import HData from '@/views/softBase/HData'
  import NRecord from '@/views/softBase/NRecord'

  import Bus from '@/common/eventBus'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  export default {
    name: "device",
    components: {
      Waterfall,
      WaterfallSlot,
      SAnalysis,
      RState,
      AQuery,
      HData,
      NRecord,
    },
    data () {
      return {
        isActive:'',
        navList:[],
        loading:null,
        isShow:true,
        dialogVisible: false,
        dialogWidth:'80%',
        dialogHeight:{
          height:'700px'
        },
        dialogFullscreen:false,
        changeIcon:true,
        radio:"",
        line: 'v',
        items: [],
        group_id:0,
        deviceKey:'',
        deviceName:'',
        tHeader:[
          {name:'运行状况'},
          {name:'历史数据'},
          {name:'统计分析'},
          //{name:'通知记录'},
          {name:'故障报警'},
        ],
        tBody:[
          'RState',
          'HData',
          'SAnalysis',
          //'NRecord',
          'AQuery',
        ],
        tIndex:0,
        currentView:'RState',
        isBusy: false
      };
    },
    created(){
      /*let _this=this;
      Bus.$on('groupId',(e)=>{
        console.log(e);
        console.log(this);
        _this.group_id=e;
      });*/
      /*let clientWidth=document.body.clientWidth;
      if(clientWidth<1500||this.dialogFullscreen){
        this.isShow=false
      }else {
        this.isShow=true
      }
      window.onresize=function () {
        let clientWidth=document.body.clientWidth;
        if(clientWidth<1500||this.dialogFullscreen){
          this.isShow=false
        }else {
          this.isShow=true
        }
      };*/
      this.loading=this.$loading({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.2)'
      });
      let id=this.$store.state.project.projectId;
      let tenant=this.$store.state.project.tenant;
      deviceGrouping.list({'project_id':id,'tenant':tenant,'sort_by':'sort','direction':'asc'}).then(res=>{
        console.log(res);
        if(res.success){
          this.navList=res.result.items;
          this.getList(this.navList[0].id);
          this.$nextTick(()=>{
            this.isShow=true
          })
          this.loading.close();
        }else{
          this.$message.error(res.message);
          this.loading.close();
        }

      });
      /*let group_id=sessionStorage.getItem('group_id');
      let deviceIndex=sessionStorage.getItem('deviceIndex');
      this.getList(group_id);*/
    },
    methods: {
      changeTab1(list,index){ //切换tab
        this.isActive=index;
        console.log(list.id);
        this.getList(list.id)
      },
      radioEvent(){
        this.dialogVisible = false;
      },
      getDetails(item,index){ //获取详情
        this.dialogVisible=true;
        this.deviceName=item.name;
        sessionStorage.setItem('deviceName',item.name);
        this.deviceKey=item.key;
        console.log(item.name)
      },
      changeTab(i){ //模态框tab
        this.tIndex=i;
        this.currentView=this.tBody[i]
      },
      isFullscreen(){ //是否打开模态框
        console.log(this.changeIcon);
        if(this.changeIcon){

          this.dialogWidth='100%';
          this.dialogHeight={
            height:'calc(100% - 65px)'
          };
          this.dialogFullscreen=true;
          this.changeIcon=!this.changeIcon;
        }else{
          this.dialogWidth='70%';
          this.dialogHeight={
            height:'580px'
          };
          this.dialogFullscreen=false;
          this.changeIcon=!this.changeIcon
        }
      },
      changeScreen(data){
        console.log(data);
        this.changeIcon=data;
        this.isFullscreen();
      },
      close(){

      },
      getList(group_id){
        deviceList.list({'group_id':group_id}).then(res=>{
          if(res.success){
            this.items=res.result.items;
            this.loading.close();
          }else{
            this.$message.error(res.message);
            this.loading.close();
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .a-box{
    width: 100%;
    padding-top: 15px;
    height: 80px;
    li{
      font-size: 14px;
      cursor: pointer;
      float: left;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 32px;
      background: #FFFFFF;
      color: #CCCFD4;
      border:1px solid rgba(204,207,212,1);
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
  }
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  waterfall-slot{
    background: black;
  }
  .item {
    position: absolute;
    top: 0;
    left: 5px;
    right: 5px;
    bottom: 30px;
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
      width: 32%;
      height: 32%;
      float: right;
      text-align: right;
      .r-stateText{
        color: #fff;
        font-size: 0.2em;
        margin: 6% 3%;
      }
    }
    .r-state1{background: url(../../assets/device/running.png) no-repeat;background-size: 100% 100%;}
    .r-state2{background: url(../../assets/device/break.png) no-repeat;background-size: 100% 100%;}
    .r-state3{background: url(../../assets/device/fault.png) no-repeat;background-size: 100% 100%;}

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
        width: 25%;
        height: 90%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .d-statistics{
        float: left;
        width: 50%;
        padding-top: 12%;
        height: 85%;
        margin-left: 18%;
        .d-date{
          font-size: 10px;
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

  .t-header{
    height: 45px;
    background: #ffffff;
    li{
      cursor: pointer;
      float: left;
      width:160px;
      height:45px;
      text-align: center;
      line-height: 45px;
      font-size:14px;
      color:rgba(153,153,153,1);
    }
    .t-handle{
      float: right;
      width: 60px;
      height: 45px;
      line-height: 45px;
      margin-right: 30px;
      display: flex;
      justify-content: space-around;
      div{
        cursor: pointer;
      }
    }
    .active {
      background-color: #F85959;
      color: #ffffff;
    }
  }
  .t-Body{
    overflow: auto;
    padding: 10px;
    background: #f5f5f9;
  }

  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }
</style>

