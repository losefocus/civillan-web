<template>
  <div style="width: 100%;height: 700px;">
    <ul class="t-header">
      <li v-for="(tab,index) in tHeader" :key="index" @click="changeTab(index)" :class="{active:index==tIndex}"> {{tab.name}}</li>
      <div class="t-handle" v-if="isShow">
        <div @click="isFullscreen()"><i class="iconfont" :class="{'icon-dEnlarge':changeIcon==true,'icon-dNarrow':changeIcon==false}"></i></div>
      </div>
    </ul>
    <r-state :deviceName="deviceName" :is="currentView" :isShow="isShow" :clientWidth="clientWidth" :dialogFullscreen="dialogFullscreen" class="t-Body" @dialogFullscreen="changeScreen"></r-state>
  </div>
</template>


<script>
  import deviceGrouping from '@/api/project/deviceGrouping'
  import deviceList from '@/api/project/deviceList'
  import deviceData from '@/api/device/deviceData'

  import SAnalysis from '@/views/softBase/SAnalysis'
  import RState from '@/views/softBase/RState'
  import AQuery from '@/views/softBase/AQuery'
  import HPile from '@/views/softBase/HPile'
  import NRecord from '@/views/softBase/NRecord'

  import FConcrete from '@/views/FConcrete/FConcrete'
  import HFoam from '@/views/FConcrete/HFoam'

  import SCuring from '@/views/SCuring/SCuring'


  export default {
    name: "newRunning",
    components: {
      RState,
      AQuery,
      HPile,
      SAnalysis,
      NRecord,
      FConcrete,
      HFoam,
      SCuring
    },
    data () {
      return {
        isActive:'',
        navList:[],
        loading:null,
        isShow:true,
        dialogVisible: false,
        dialogWidth:'70%',
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
        //deviceType:'',
        tHeader:[
          {name:'运行状况'},
          {name:'历史数据'},
          {name:'统计分析'},
          {name:'故障报警'},
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

    props:['deviceType'],
    created(){
      this.changeType();
      let clientWidth1=document.body.clientWidth;
      if(clientWidth1<1366){
        //this.isShow=false;
        this.changeIcon=true;
        this.isFullscreen()
      }else{
        this.isShow=true
      }
      this.deviceStatus = new Map();
      for (let i=0; i<this.deviceStatusLists.length; i++) {
        this.deviceStatus.set(this.deviceStatusLists[i].id,this.deviceStatusLists[i].name)
      }

      this.loading=this.$loading({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.2)'
      });
      let id=this.$cookies.get('projectId');
      let tenant=this.$cookies.get('tenant');
      this.getGroup(id,tenant)
    },
    mounted(){

      let _this=this;
      window.onresize = function(){
        let clientWidth=document.body.clientWidth;
        _this.clientWidth=clientWidth;
        if(clientWidth<1266){
          _this.isShow=false;
          _this.changeIcon=true;
          _this.isFullscreen()
        }else{
          _this.isShow=true
        }
      }
    },
    methods: {
      changeType(){
        //let type=sessionStorage.getItem('deviceType');
        console.log(this.deviceType);
        if(this.deviceType=='PMHNT'){
          this.tBody=['FConcrete', 'HFoam', 'SAnalysis', 'AQuery',];
          this.currentView='FConcrete'
        }else if(this.deviceType=='JBZ'){
          this.tBody=['RState', 'HPile', 'SAnalysis', 'AQuery',];
          this.currentView='RState'
        }else if(this.deviceType=='PLYH'){
          this.tBody=['SCuring', 'HFoam', 'SAnalysis', 'AQuery',];
          this.currentView='SCuring'
        }else if(this.deviceType=='YYLZL'){
          this.tBody=['SCuring', 'HFoam', 'SAnalysis', 'AQuery',];
          this.currentView='SCuring'
        }else if(this.deviceType=='YYLYJ'){
          this.tBody=['SCuring', 'HFoam', 'SAnalysis', 'AQuery',];
          this.currentView='SCuring'
        }
      },
      getGroup(id,tenant){
        deviceGrouping.list({'project_id':id,'tenant':tenant,'sort_by':'sort','direction':'asc'}).then(res=>{
          if(res.success){
            this.navList=res.result.items;
            this.getList(this.navList[0].id);

            this.loading.close()
          }else{
            this.$message.error(res.message);
            this.loading.close()
          }
        }).catch(e=>{
          this.loading.close()
        });
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
      isFullscreen(){ //是否打开模态框
        if(this.changeIcon){
          this.dialogFullscreen=true;
        }else{
          this.dialogFullscreen=false;
        }
        this.changeIcon=!this.changeIcon;
        //console.log(this.changeIcon)
        this.$emit('changeIcon',this.changeIcon)
      },
      changeScreen(data){
        console.log(data);
        this.changeIcon=data;
        this.isFullscreen();
      },
      closeDialog(){
        //console.log('关闭弹窗');
        this.tIndex=0
      }
    }
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
    overflow: auto;
    padding: 10px;
    background: #f5f5f9;
  }
</style>
