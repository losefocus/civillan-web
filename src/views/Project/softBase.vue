<template>
  <div>
    <waterfall
      :line-gap="250"
      :min-line-gap="240"
      :max-line-gap="280"
      :single-max-width="350"
      :watch="items">
      <waterfall-slot
        v-for="(item, index) in items"
        :width="210"
        :height="220"
        :order="index"
        :key="item.id"
        move-class="item-move"
      >
        <div class="item pj-box" :style="item.style" :index="item.id" @click="getDetails(item,index)">
          <div class="r-state" :class="{'r-state1':item.running==0,'r-state2':item.running==1,'r-state3':item.running==2}">
          </div>
          <div class="d-name">
            <span>{{item.name}}</span>
          </div>
          <div class="d-title">
            <span v-if="item.device==0">搅拌桩</span>
            <span v-if="item.device==1">双头搅拌桩</span>
            <span v-if="item.device==2">高压旋桩</span>
          </div>
          <ul class="d-info">
            <li class="d-img" :class="{'d-type1':item.device==0,'d-type2':item.device==1,'d-type3':item.device==2}"></li>
            <li class="d-statistics">
              <div class="d-date">段浆量：10L</div>
              <div class="d-progress">
                <el-progress :percentage="30" color="#6FDDE8" :show-text='false'></el-progress>
              </div>

              <div class="d-date">段灰量：20KG</div>
              <div>
                <el-progress  :percentage="80" color="#6FDDE8" :show-text='false'></el-progress>
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
      style="min-width: 1024px;"
      >
      <ul class="t-header">
        <li v-for="(tab,index) in tHeader" :key="index" @click="changeTab(index)" :class="{active:index==tIndex}"> {{tab.name}}</li>
        <div class="t-handle">
          <div @click="isFullscreen()"><i class="iconfont" :class="{'icon-dEnlarge':changeIcon==true,'icon-dNarrow':changeIcon==false}"></i></div>
        </div>
      </ul>
      <r-state :is="currentView" keep-alive  :dialogFullscreen="dialogFullscreen" class="t-Body" :style="dialogHeight" @dialogFullscreen="changeScreen"></r-state>
    </el-dialog>
  </div>
</template>

<script>
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
    name: "project",
    components: {
      Waterfall,
      WaterfallSlot,
      SAnalysis,
      RState,
      AQuery,
      HData,
      NRecord
    },
    data () {
      return {
        dialogVisible: false,
        dialogWidth:'70%',
        dialogHeight:{
          height:'580px'
        },
        dialogFullscreen:false,
        changeIcon:true,
        radio:"",
        line: 'v',
        items: [
          /*{id:1,running:1,runningText:'断线中',device:1,name:'我是名字'},
          {id:2,running:0,runningText:'运行中',device:0,name:'我是名字'},
          {id:3,running:2,runningText:'故障中',device:2,name:'我是名字'},
          {id:4,running:0,runningText:'运行中',device:1,name:'我是名字'},
          {id:5,running:1,runningText:'断线中',device:2,name:'我是名字'},
          {id:7,running:2,runningText:'故障中',device:0,name:'我是名字'},
          {id:8,running:0,runningText:'运行中',device:1,name:'我是名字'},
          {id:9,running:2,runningText:'故障中',device:2,name:'我是名字'},
          {id:10,running:1,runningText:'断线中',device:1,name:'我是名字'},
          {id:11,running:0,runningText:'运行中',device:1,name:'我是名字'},
          {id:12,running:1,runningText:'断线中',device:1,name:'我是名字'},
          {id:13,running:0,runningText:'运行中',device:0,name:'我是名字'},*/
        ],
        group_id:0,
        tHeader:[
          {name:'运行状况'},
          {name:'历史数据'},
          {name:'统计分析'},
          //{name:'通知记录'},
          {name:'报警查询'},
        ],
        tBody:[
          'RState',
          'HData',
          'SAnalysis',
          //'NRecord',
          'AQuery'
        ],
        tIndex:0,
        currentView:'RState',
        isBusy: false
      };
    },
    created(){
      Bus.$on('groupId',(e)=>{
        console.log(e);
        deviceList.list({'group_id':e}).then(res=>{
          console.log(res);
          this.items=res.result.items;
        })
      });

    },
    methods: {
      radioEvent(){
        this.dialogVisible = false;
      },
      getDetails(item,index){
        this.dialogVisible=true
      },
      changeTab(i){
        this.tIndex=i;
        this.currentView=this.tBody[i]
      },
      isFullscreen(){
        console.log(this.changeIcon);
        if(this.changeIcon){
          this.dialogWidth='100%';
          this.dialogHeight={
            height:'91%'
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

      }
    }
  }
</script>
<style scoped lang="scss">
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
    left: 0;
    right: 30px;
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
      width: 38%;
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
      font-size: 18px;
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
    padding: 20px;
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
