<template>
  <div style="width: 100%;height: 700px;">
    <ul class="t-header">
      <li v-for="(tab,index) in tHeader" :key="index" @click="changeTab(index)" :class="{active:index==tIndex}"> {{tab.name}}</li>
      <div class="t-handle" v-if="isShow">
        <div @click="changeFullScreen()"><i class="iconfont" :class="{'icon-dEnlarge':changeIcon==true,'icon-dNarrow':changeIcon==false}"></i></div>
      </div>
    </ul>
    <r-state :deviceKey="deviceKey" :is="currentView" :isShow="isShow" :isDevice="isDevice" :clientWidth="clientWidth" :dialogFullScreen="dialogFullScreen" class="t-Body"></r-state>
  </div>
</template>

<script>
  import deviceGrouping from '@/api/project/deviceGrouping'
  import RState from '@/views/Modular/MPile/RState'
  import FConcrete from '@/views/Modular/FConcrete/FConcrete'
  import SCuring from '@/views/Modular/SCuring/SCuring'
  import TTensile from '@/views/Modular/TTensile/TTensile'
  import PGrouting from '@/views/Modular/PGrouting/PGrouting'

  import Bus from '@/common/eventBus'
  export default {
    name: "newRunning",
    components: {
      RState,
      FConcrete,
      SCuring,
      TTensile,
      PGrouting
    },
    data () {
      return {
        isActive:'',
        loading:null,
        isShow:true,
        isDevice:false,
        dialogVisible: false,
        dialogWidth:'75%',
        dialogHeight:{
          height:'700px'
        },
        dialogFullscreen:true,
        changeIcon:true,
        radio:"",
        line: 'v',
        items: [],
        group_id:0,
        deviceKey:'',
        deviceName:'',
        tHeader:[
          {name:'运行状况'},
        ],
        tBody:[],
        tIndex:0,
        currentView:'RState',
        isBusy: false,
        deviceStatus:null,
        deviceStatusLists:[
          {id:0,name:'故障中'},
          {id:1,name:'运行中'},
          {id:2,name:'已断线'},
          {id:3,name:'已离线'},
        ],
        clientWidth:0,
      };
    },

    props:['deviceType','dialogFullScreen'],

    created(){
      this.changeType();
      this.deviceStatus = new Map();
      for (let i=0; i<this.deviceStatusLists.length; i++) {
        this.deviceStatus.set(this.deviceStatusLists[i].id,this.deviceStatusLists[i].name)
      }
    },
    mounted(){
      Bus.$on('changeTab',res=>{
        if(res){
          this.tIndex=0;
          this.currentView=this.tBody[0];
        }
      });

      this.getFullScreen(this.dialogFullScreen);
      this.selfAdaption()
    },
    beforeDestroy(){

    },
    methods: {
      getFullScreen(data){
        if(data){
          this.changeIcon=false
        }else{
          this.changeIcon=true
        }
      },
      selfAdaption(){
        let clientWidth1=document.body.clientWidth;
        if(clientWidth1<1400){
          this.isShow=false;
          this.changeIcon=true;
          this.changeFullScreen()
        }else{
          this.isShow=true
        }
        let _this=this;
        window.onresize = function(){
          let clientWidth=document.body.clientWidth;
          // _this.$bus.emit('isCollapse','bus传值');
          _this.clientWidth=clientWidth;
          if(clientWidth<1400){
            _this.isShow=false;
            _this.changeIcon=true;
            _this.changeFullScreen();
            _this.$bus.emit('isCollapse',false)
          }else{
            _this.isShow=true;
            _this.$bus.emit('isCollapse',true)
          }
        }
      },
      changeType(){
        if(this.deviceType=='PMHNT'){
          this.tBody=['FConcrete'];
          this.currentView='FConcrete'
        }else if(this.deviceType=='JBZ'){
          this.tBody=['RState'];
          this.currentView='RState'
        }else if(this.deviceType=='PLYH'){
          this.tBody=['SCuring'];
          this.currentView='SCuring'
        }else if(this.deviceType=='YYLZL'){
          this.tBody=['TTensile'];
          this.currentView='TTensile'
        }else if(this.deviceType=='YYLYJ'){
          this.tBody=['PGrouting'];
          this.currentView='SCuring'
        }
      },
      changeTab1(list,index){ //切换tab
        this.isActive=index;
        this.getList(list.id)
      },
      radioEvent(){
        this.dialogVisible = false;
      },
      changeTab(i){ //模态框tab
        this.tIndex=i;
        this.currentView=this.tBody[i]
      },
      changeFullScreen(){ //是否打开模态
        this.changeIcon=!this.changeIcon;
        this.$emit('changeIcon',this.changeIcon)
      },
      closeDialog(){
        this.tIndex=0
      }
    },
  }
</script>
<style scoped lang="scss">
  .t-header{
    width: 100%;
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
    height: 100%;
    min-height: 600px;
    overflow: auto;
    padding: 10px;
    background: #f5f5f9;
  }
</style>
