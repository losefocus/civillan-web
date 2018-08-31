<template>
 <div style="position: relative;height: 100%">
   <transition name="fade">
     <div class="b-device" v-if="noDevice"><div class="t-device">设备已离线！</div></div>
   </transition>
   <div class="r-box">
     <div class="t-box" :class="{'t-box1':classChange==1}">
       <div class="r-stateTab" :class="{'tabActive':!isTab}" @click="tabChange(0)">运行状况</div>
       <div class="p-designTab" :class="{'tabActive':isTab}" @click="tabChange(1)">设计参数</div>
     </div>
     <ul class="s-box1">
       <li class="s-info" :class="{'s-info1':classChange==1}" v-if="!isTab">
         <div class="i-id">
           <div class="d-model">{{deviceName[deviceIndex-1].name}}</div>
           <div class="d-kind">
             <div v-for="(index,list) in deviceType" @click="deviceChange(index)" :class="{'deviceActive':index==deviceIndex}">{{index}}</div>
           </div>

         </div>
         <div class="">
           <!--<div class="i-start">开始时间：<span>{{ RT_data.start_time/1 | formatDate }}</span></div>-->
           <div class="i-progress">
             <div class="i-progressName" style="width: 80px">成桩进度：</div>
             <el-progress :stroke-width="15" :text-inside="true" :percentage="progress" color="#24BCF7" style="width: calc(100% - 80px)"></el-progress>
           </div>
         </div>
         <div class="i-box">
           <div class="i-body">
             <div class="i-name">双头搅拌设备</div>
             <div class="i-company">宏远建设记录仪一号</div>
           </div>
           <div>
             <div class="i-state"><span style="vertical-align: center">喷浆状态</span><div :class="{'led-green':RT_data.nozzle_sta==1,'led-gray':RT_data.nozzle_sta==0}"></div></div>
             <div class="i-state"><span>记录状态</span><div :class="{'led-green':RT_data.record_sta==1,'led-gray':RT_data.record_sta==0}"></div></div>
           </div>
         </div>
         <div class="h-box">
           <div class="i-body">
             <div class="b-info"><span class="iconfont icon-portrait"></span><span class="i-info">张三三</span></div>
             <div class="b-info"><span class="iconfont icon-phonenew"></span><span class="i-info">186-1396-1168</span></div>
           </div>
           <div class="b-angle">
           </div>
         </div>

         <div class="i-normal" v-if="isWarming">
           未发现问题
         </div>
         <div class="i-warning" v-else>
           <i class="iconfont icon-warming"></i>
           <div class="w-text">
             <p>下钻钻速超过50cm/min</p>
             <p>下钻钻速超过50cm/min</p>
           </div>
         </div>
       </li>
       <li class="s-info" :class="{'s-info1':classChange==1}" v-else="!isTab">
         <div class="d-name">
           <i class="iconfont icon-pie"></i>
           <span>桩设计参考值</span>
         </div>
         <div class="d-box">
           <div>
             <p class="d-key">桩间距</p>
             <p class="d-value">30</p>
           </div>
           <div>
             <p class="d-key">桩长</p>
             <p class="d-value">30</p>
           </div>
           <div>
             <p class="d-key">桩径</p>
             <p class="d-value">30</p>
           </div>
           <div>
             <p class="d-key">水灰比</p>
             <p class="d-value">30</p>
           </div>
           <div>
             <p class="d-key">灰量</p>
             <p class="d-value">30</p>
           </div>
           <div>
             <p class="d-key">工艺</p>
             <p class="d-value1">{{RT_data.process_type}}</p>
           </div>
         </div>
       </li>
       <li class="s-chart" v-if="isRouterAlive">
         <a-sp></a-sp>
       </li>
       <li class="s-chart" v-if="isRouterAlive">
        <!-- <chart :options="ElectricCurrent" :auto-resize=true></chart>-->
         <p-map></p-map>
       </li>
     </ul>
     <ul class="s-box2">
       <li class="s-progress" :class="{'s-progress1':classChange==1}">
         <div class="p-box" >
           <div class="p-echart" style="display:flex;justify-content:center;align-items:center;">
             <div class="p-progress" :style="{height:'80%'}">
               <div style="height: 100%;">
                 <div class="progressContainer">
                   <div class="progress" :style="{height:(100-progress)+'%'}" style="font-size: 12px">
                     <div style="border-bottom: 3px solid #24BCF7;width: 32px;"></div>
                     <div style="margin-left: 35px;color: #24BCF7;margin-top: -9px;width: 60px"><!--{{ progress+'%'}}--><span style="font-size: 25px;font-weight: bold;">{{parseInt(Math.abs(RT_data.rdeep))}}</span>米</div>
                   </div>
                   <span style="margin-left: -24px">0米</span>
                   <span style="position: absolute;bottom: 0;left:-32px;">50米</span>
                 </div>
               </div>
             </div>
           </div>
           <div class="p-title">深度</div>
         </div>
         <div class="p-box">
          <!-- <div class="p-progress">
             <radial-progress-bar :diameter="diameter"
                                  :total-steps="totalSteps"
                                  :completed-steps="rflow"
                                  :animate-speed="animateSpeed"
                                  :stroke-width="strokeWidth"
                                  :start-color="startColor1"
                                  :stop-color="stopColor1"
                                  :inner-stroke-color="innerStrokeColor1"
                                  :timing-func="timingFunc"
                                  >
               <p><span class="p-completedSteps">{{ rflow }}</span> <span class="p-totalSteps">/{{ totalSteps }}</span></p>
               <p class="p-unit">cm/min</p>
               <div class="p-title">流量</div>
             </radial-progress-bar>
           </div>-->
           <div class="p-echart">
             <s-speed ref="sSpeed" :realTime="RT_data"></s-speed>
           </div>
           <div class="p-title">钻速</div>
         </div>
         <div class="p-box">
           <div class="p-echart">
             <s-flow ref="sFlow" :realTime="RT_data"></s-flow>
           </div>
           <div class="p-title">钻速</div>
         </div>
         <div class="p-box">
           <div class="p-echart">
             <s-current ref="sCurrent" :realTime="RT_data"></s-current>
           </div>
           <div class="p-title">钻速</div>
           <!--<div id="myChart2" style="width: 100%;height: 100%"></div>-->
         </div>
       </li>
       <li style="width: 0.4%"></li>
       <li class="s-chart1">
         <p-operation :dataInfo="RT_data"></p-operation>
       </li>
     </ul>
   </div>

 </div>
</template>

<script>
  import echarts from 'echarts'
  import RadialProgressBar from 'vue-radial-progress'
  import sCurrent from '@/views/RState/sCurrent'
  import sSpeed from '@/views/RState/sSpeed'
  import sFlow from '@/views/RState/sFlow'
  import {formatDate} from '@/common/formatDate.js';
  import deviceData from '@/api/device/deviceData'

  import aSp from '@/views/RState/AshPressureCurrent.vue'
  import pOperation from '@/views/RState/pileOperation.vue'
  import pMap from '@/views/RState/pileMap.vue'
export default {
  name: "runningState",
  components:{
    RadialProgressBar,
    sCurrent,
    sSpeed,
    sFlow,
    aSp,
    pOperation,
    pMap,
  },
  data(){
    let data = [0,10,20,30,40,50,60,70,80,90,100];
    let Data=data;

    return {
      //timer:null,//定时器
      angelWidth:0,
      noDevice:false,
      timer1:null,//定时器1
      deviceType:['1','2','3'],
      deviceIndex:1,
      deviceName:[
        {name:'NB-001'},{name:'NB-002'},{name:'NB-003'}
      ],
      isShow:true,
      titleActive:'1',//设备样式切换
      classChange:1,//改变样式
      isRouterAlive: true, //ECharts刷新
      completedSteps:3,//进度条中已完成步骤的数量

      rflow:3,//流量实时数据
      rspeed:3,//速度实时数据
      rcurrent:3,//电流实时数据

      totalSteps: 200,//完成进度条的步骤总数。
      animateSpeed: 500,//动画一步的时间量（以毫秒为单位）
      diameter: 110,//进度条圆的直径，以像素为单位。
      strokeWidth: 8,//进度条的宽度

      startColor1: '#17A8F5',//进度条渐变的前沿颜色。
      stopColor1: '#20CEDE',//进度条渐变的辅助颜色。
      innerStrokeColor1: 'rgba(151,151,151,0.3)',//进度条的背景颜色。

      startColor2: '#17A8F5',//进度条渐变的前沿颜色。
      stopColor2: '#20CEDE',//进度条渐变的辅助颜色。
      innerStrokeColor2: 'rgba(151,151,151,0.3)',//进度条的背景颜色。

      startColor3: '#17A8F5',//进度条渐变的前沿颜色。
      stopColor3: '#20CEDE',//进度条渐变的辅助颜色。
      innerStrokeColor3: 'rgba(151,151,151,0.3)',//进度条的背景颜色。


      timingFunc: 'linear',//用于CSS转换的转换计时功能

      RT_data:{}, //实时数据


      slurryData:[], //段浆量
      ashData:[], //段灰量
      rpressureData:[], //段灰量
      progress:40,//深度进度

      isWarming:true,//未发现问题显示

      isTab:false,//设备型号切换
    }
  },
  props:['dialogFullscreen','deviceKey'],
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
    }
  },

  beforeDestroy(){
    clearInterval(this.timer);
    clearInterval(this.timer1)
  },
  methods:{

    init(){
      let clientWidth=document.body.clientWidth;
      this.temp(this.dialogFullscreen,this.diameter,this,clientWidth)
    },
    deviceChange(index){
      this.deviceIndex=index;
    },
    temp(isDialog,diameter,that,clientWidth) {
      if(!isDialog){
        this.classChange=2;
        if( that.$refs.sCurrent!==undefined){that.$refs.sCurrent.resize()}
        if( that.$refs.sSpeed!==undefined){that.$refs.sSpeed.resize()}
        if( that.$refs.sFlow!==undefined){that.$refs.sFlow.resize()}
        if(clientWidth>1660){
          diameter=110;
        }else if(clientWidth<1660&&clientWidth>1500){
          diameter=120;
        }else if(clientWidth<1500&&clientWidth>1380){
          that.$emit('dialogFullscreen','true');
          that.$emit('zoomShow','false');
          that.isShow=false;
          diameter=100;
        }else if(clientWidth<1380){
          that.$emit('zoomShow','false');
          that.$emit('dialogFullscreen','true')
        }
      }else{
        if( that.$refs.sCurrent!==undefined){that.$refs.sCurrent.resize()};
        if( that.$refs.sSpeed!==undefined){that.$refs.sSpeed.resize()};
        if( that.$refs.sFlow!==undefined){that.$refs.sFlow.resize()};
        if(clientWidth>1800){
          this.classChange=1;
          diameter=170;
        }else if(clientWidth<1800&&clientWidth>1700){
          this.classChange=1;
          diameter=160;
        }else if(clientWidth<1700&&clientWidth>1600){
          this.classChange=1;
          diameter=140;
        }else if(clientWidth<1600&&clientWidth>1510){
          this.classChange=1;
          diameter=120;
        }else if(clientWidth<1510&&clientWidth>1420){
          this.classChange=2;
          diameter=120;
        }else if(clientWidth<1420&&clientWidth>1300){
          this.classChange=2;
          diameter=110;
        }else if(clientWidth<1300&&clientWidth>1200){
          this.classChange=2;
          diameter=110;
        }else if(clientWidth<1200&&clientWidth>1100){
          this.classChange=2;
          diameter=120;
        }else if(clientWidth<1100&&clientWidth>1000){
          this.classChange=2;
          diameter=120;
        }
      }
      this.diameter=diameter
    },
    add(){
      this.progress+=10
    },
    tabChange(x){
      if(x==0){
        this.isTab=false;
      }else {
        this.isTab=true;
      }
    },
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true))
    },

    getData(key){
      deviceData.list({'key':key}).then(res=>{
        if(res.success){
          //console.log(res);
          this.RT_data=res.result;
          this.RT_data.status=1;
          this.RT_data.rdeep=Math.abs(this.RT_data.rdeep);
          this.RT_data.depth_design=100;

          this.rflow=parseInt(res.result.rflow);
          this.rspeed=(parseInt(res.result.rspeed)+5)*20;
          this.rcurrent=parseInt(res.result.rcurrent);
          this.progress=Math.abs(res.result.rdeep)*2;
          if(this.rflow>=this.totalSteps){
            this.startColor1='#F85959';
            this.stopColor1='#F85959';
            this.innerStrokeColor1='#F85959 '
          }else{
            this.startColor1='#17A8F5';
            this.stopColor1='#20CEDE';
            this.innerStrokeColor1='rgba(151,151,151,0.3)'
          }

          if(this.rspeed>=this.totalSteps){
            this.startColor2='#F85959';
            this.stopColor2='#F85959';
            this.innerStrokeColor2='#F85959'
          }else{
            this.startColor2='#17A8F5';
            this.stopColor2='#20CEDE';
            this.innerStrokeColor2='rgba(151,151,151,0.3)'
          }

          if(this.rcurrent>=this.totalSteps){
            this.startColor3='#F85959';
            this.stopColor3='#F85959';
            this.innerStrokeColor3='#F85959'
          }else{
            this.startColor3='#17A8F5';
            this.stopColor3='#20CEDE';
            this.innerStrokeColor3='rgba(151,151,151,0.3)'
          }


          let num1=Math.floor(Math.random()*10);
          let num2=Math.floor(Math.random()*10);
          let par_slurry=parseInt(res.result.par_slurry/1000000)*num1*10;
          let par_ash=parseInt(res.result.par_ash/1000000)*num2*10;
          let rpressure=parseInt(res.result.rpressure/1000000)*num1*10;

          this.slurryData.push(par_slurry);
          this.ashData.push(par_ash);
          this.rpressureData.push(rpressure);
        }else {
          console.log('adasd')
          this.noDevice=true
        }

      }).catch(err=>{
        console.log(err)
      });
    }
  },
  created(){
    this.getData(this.deviceKey);
    this.timer=setInterval(()=>{
      this.getData(this.deviceKey)
    },2000);
  },
  mounted(){
    this.init();
    this.reload();
    const that = this;


    //倾角图片的长宽相等
    /*this.$nextTick(()=>{
      this.angelWidth=this.$refs.angleHeight.offsetHeight;
    });*/


    setTimeout(()=>{
      this.$refs.sCurrent.resize();
      this.$refs.sSpeed.resize();
      this.$refs.sFlow.resize();
    },100);



    window.onresize = function(){
      if( that.$refs.sCurrent!==undefined){that.$refs.sCurrent.resize()}
      if( that.$refs.sSpeed!==undefined){that.$refs.sSpeed.resize()}
      if( that.$refs.sFlow!==undefined){that.$refs.sFlow.resize()}
      let clientWidth=document.body.clientWidth;
      that.temp(that.dialogFullscreen,that.diameter,that,clientWidth)
    }



    /*let myChart = this.$echarts.init(document.getElementById('myChart1'));
    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round(value)
        ]
      }
    }
    let data = [];
    let now = +new Date(2018, 7, 1);
    let oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
      data.push(randomData());
    }

    myChart.setOption({
      title: {
        text: '电流随桩机里程变化曲线',
        show: true,
        textStyle: {
          fontWeight: 'bold',
          fontSize: 16,
          color: '#333'
        },
        top:'4%',
        left: '3%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#333'
          }
        }
      },
      legend: {
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        textStyle: {
          fontSize: 12,
          color: '#333'
        },
        top:'8%',
        right:'4%'
      },
      grid: {
        top:'25%',
        left:'185px',
        bottom: '15%',
        right:'4%'
        //containLabel: true
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        },axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 12,
            color: '#666666'
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          boundaryGap: [0, '10%'],
          axisLine: {
            lineStyle: {
              color:'#999'
            }
          },
          name:'电流A',
          position:'left',
          offset:50,
          splitNumber:10,
          splitLine: {
            show: false
          }
        },
        {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLine: {
            lineStyle: {
              color:'#999'
            }
          },
          name:'深度 C',
          position:'left',
          offset:100,
          splitNumber:10,
          splitLine: {
            show: false
          }
        },
        {
          boundaryGap: [0, '50%'],
          axisLine: {
            lineStyle: {
              color:'#999'
            }
          },
          splitLine:{
            show:false,
          },
          type: 'value',
          name:'转速 C',
          position:'left',
          axisLabel: {
            formatter: '{value} C'
          },

        },
      ],
      series: [{
        name: '深度',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        itemStyle: {
          normal: {
            color: '#F86969',
            borderColor: '#F86969',
            borderWidth: 12
          }
        },
        data: data
      },
        {
          name: '钻速',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              color: '#50C9F9',
              borderColor: '#50C9F9',
              borderWidth: 12
            }
          },
          data: data
        },
        {
          name: '电流',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              color: '#FFC285',
              borderColor: '#FFC285',
              borderWidth: 12
            }
          },
          data: data
        }]
    });
    this.timer1=setInterval(function () {

      for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }

      myChart.setOption({
        series: [{
          name:'深度',
          data: data,
          yAxisIndex:0,
        },{
          name:'钻速',
          data: data,
          yAxisIndex:1,
        },{
          name:'电流',
          data: data,
          yAxisIndex:2,
        }]
      });
    }, 1000);

    this.$nextTick(() => (myChart.resize()));
    window.onresize = function(){
      myChart.resize();
      let clientWidth=document.body.clientWidth;
      that.temp(that.dialogFullscreen,that.diameter,that,clientWidth)
    }*/

    /*let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
    let tips = 0;
    function loading() {
      return [{
        value: tips,
        itemStyle: {
          normal: {
            color: '#fb358a',
            shadowBlur: 10,
            shadowColor: '#fb358a'
          }
        }
      }, {
        value: 200 - tips,
      }];
    }

    myChart2.setOption({
      title: [{
        text: tips +' '+'/'+' ' + 200,
        left: 'center',
        top: '30%',
        textStyle: {
          color: '#fb358a',
          fontSize:20
        }
      }, {
        text: 'cm/L',
        left: '50%',
        top: '45%',
        textAlign: 'center',
        textStyle: {
          color: '#000'
        }
      },{
        text: '深度',
        left: '50%',
        top: '60%',
        textAlign: 'center',
        textStyle: {
          color: '#000',
          fontSize:20
        }
      }],
      series: [{
        name: 'loading',
        type: 'pie',
        radius: ['80%', '83%'],
        hoverAnimation: false,
        label: {
          normal: {
            show: false,
          }
        },
        data: loading(),
      }]
    });

    this.timer1=setInterval(function() {

      if (tips == 200) {
        tips = 0;
      } else {
        ++tips;
      }
      myChart2.setOption({
        title: {
          text: tips +' '+'/'+' ' + 200
        },
        series: [{
          name: 'loading',
          data: loading()
        }]
      })
    }, 100);
    this.$nextTick(() => (myChart2.resize()));
    window.onresize = function(){
      myChart2.resize();
      let clientWidth=document.body.clientWidth;
      that.temp(that.dialogFullscreen,that.diameter,that,clientWidth)
    }*/
  },
  watch:{
    dialogFullscreen:function (val,oldVal) {
      let that=this;
      let clientWidth=document.body.clientWidth;
      that.temp(val,that.diameter,that,clientWidth)
    }
  }
}
</script>

<style scoped lang="scss">

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
  .progressContainer{
    position: relative;
    height: 100%;
    width: 20px;
    background-color: #24BCF7;
  }
  .progress{
    background-color: #ddd;
    width:20px;
    line-height: 15px;
    position: absolute;
    bottom: 0;
    transition: 0.5s linear;
  }

  .p-title{

  }
  .echarts {
    width: 100%;
    height: 100%;
  }
  .b-device{
    position: absolute;
    top:0;
    left:-10px;
    width: calc(100% + 10px);
    height: 100%;
    background: rgba(255,255,255,0.7);
    z-index: 10;
    text-align: center;
    overflow: hidden;
    .t-device{
      color: #666666;
      font-size: 30px;
      padding-top: 25%;
    }
  }
  .r-box{
    padding-left: 2%;
    height: 100%;
    position: relative;
    .t-box{
      cursor: pointer;
      width: 2%;
      position: absolute;
      left:0;
      .r-stateTab{
        padding: 25%;
        height: 50%;
        text-align: center;
        font-size: 12px;
        border-radius:4px 0 0 0;
        border:1px solid rgba(206,206,206,1);
      }
      .p-designTab{
        padding: 20%;
        height: 50%;
        text-align: center;
        font-size: 12px;
        border-radius:0 0 0 4px;
        border:1px solid rgba(206,206,206,1);
      }
      .tabActive{
        background: #828282;
        color: #fff;
        border: 1px solid #828282;
      }
    }
    .t-box1{
      .r-stateTab{
        font-size: 16px;
      }
      .p-designTab{
        font-size: 16px;
      }
    }

    .s-box1,.s-box2{
      height: 49%;
      display: flex;
      background-color: #F5F5F9;
      justify-content:space-between;

      .s-info{
        width:23%;
        height: 100%;
        padding:0 20px;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        .i-id{
          font-size: 20px;
          color: rgba(218,218,218,1);
          margin-top: 20px;
          width:100%;
          display: flex;
          justify-content: space-between;
          //line-height:42px;
          .d-model{
            width: 150px;
            font-size: 30px;
            font-weight: bold;
            color: #333333;
          }
          .d-kind{
            height: 40px;
            padding-top: 5px;
            display: flex;
            justify-content: space-between;
            div{
              cursor: pointer;
              width: 24px;
              height: 24px;
              line-height: 26px;
              border-radius: 50%;
              border: 1px solid rgba(218,218,218,1);
              text-align: center;
              margin-left:20px;
            }
          }
        }
        .deviceActive{
          font-size:20px;
          background: #24BCF7;
          color:#ffffff;
        }
        .i-box{
          display: flex;
          justify-content:space-between;
            height: 15%;
          .i-body{
            width: 60%;
            height: 45px;
            line-height: 30px;
            font-weight: bold;
            .i-name{
              font-size:16px;
              color:rgba(51,51,51,1);
            }
            .i-company{
              font-size:10px;
              color:rgba(153,153,153,1);
            }
            .icon-portrait{
              color: #787F87;
            }
            .icon-phonenew{
              color: #787F87;
            }
          }
          .i-state{
            line-height: 30px;
            font-size:12px;
            color:rgba(153,153,153,1);
            .led-green{
              vertical-align: center;
              display: inline-block;
              background-color: #00ff00;
              width: 6px;
              height: 6px;
              box-shadow: 0px 0px 2px 4px #26c702;
              -moz-box-shadow: 0px 0px 2px 4px #26c702;
              -webkit-box-shadow: 0px 0px 2px 4px #26c702;
              border-radius: 50%;
            }
            .led-gray{
              display: inline-block;
              background-color: #6f6f6f;
              width: 6px;
              height: 6px;
              box-shadow: 0px 0px 2px 4px #828282;
              -moz-box-shadow: 0px 0px 2px 4px #828282;
              -webkit-box-shadow: 0px 0px 2px 4px #828282;
              border-radius: 50%;
            }
            span{
              margin-right: 20px;
            }
          }
          .icon-state{
            font-size: 12px;
            color: #24BCF7;
          }
        }
        .h-box{
          display: flex;
          justify-content:space-between;
          height: 15%;
          .i-body{
            width: 60%;
            height: 45px;
            line-height: 30px;
            font-weight: bold;
            .i-info{
              margin-left: 10px;
            }
            .icon-portrait{
              color: #787F87;
            }
            .icon-phonenew{
              color: #787F87;
            }

          }
          .b-angle{
            width: 60px;
            height: 60px;
            background: url("../../assets/RState/angle.png") no-repeat;
            background-size: 100% 100%;
          }
        }

        .i-start{
          width:100%;
          height:17px;
          font-size:12px;
          color:rgba(102,102,102,1);
          line-height:17px;
        }
        .i-progress{
          margin-top: 10px;
          width: 100%;
          height: 15px;
          line-height: 15px;
          display: flex;
          justify-content:space-between;
        }
        .i-normal{
          width:100%;
          line-height: 57px;
          text-align: center;
          height:57px;
          background:rgba(141,232,240,0.06);
        }
        .i-warning{
          width:100%;
          padding-top: 10px;
          height:47px;
          background:rgba(248,89,89,0.06);
          text-align: center;
          .icon-warming{
            vertical-align: top;
            color: #DF2A2A;
          }
          .w-text{
            margin-left: 10px;
            vertical-align: top;
            display: inline-block;
          }
        }

        .d-name{
          span{
            margin-left: 5%;
            font-size: 14px;
            font-weight: bold;
          }
        }
        .d-box{
          height: 60%;
          display: flex;
          flex-direction: row;/*决定主轴的方向*/
          flex-wrap:wrap;
          justify-content:space-around;
          div{
            text-align: center;
            width: 33%;
          }
          .d-key{
            font-size: 12px;

            color: #666666;
          }
          .d-value{
            margin-top: 10px;
            font-weight: bold;
            height: 30px;
            font-size: 20px;
            color: #333333;
          }
          .d-value1{
            margin-top: 10px;
            font-weight: bold;
            height: 30px;
            font-size: 17px;
            color: #333333;
          }
        }
      }
      .s-info1{
        .i-id{
          font-size:30px;
          color:#DADADA;
          line-height:42px;
          .d-model{
            font-weight: bold;
            width: 250px;
            font-size: 35px;
            color: #333333;
          }
          .d-kind{
            height: 40px;
            div{
              width: 35px;
              height: 35px;
              line-height: 38px;
              border-radius: 50%;
              border: 1px solid rgba(218,218,218,1);
              text-align: center;
              margin:0 10px;
            }
          }
        }
        .deviceActive{
          font-size:30px;
          background: #24BCF7;
          color:#ffffff;
        }
        .i-box{
          display: flex;
          justify-content:space-between;
          height: 20%;
          .i-body{
            width: 60%;
            height: 45px;
            line-height: 45px;
            font-weight: bold;
            .i-name{
              font-size:20px;
              color:rgba(51,51,51,1);
            }
            .b-info{
              .i-info{
                display: inline-block;
                margin-left: 10px;
                color: #999999;
                font-size: 12px;
              }
            }

            .i-company{
              font-size:16px;
              color:rgba(153,153,153,1);
            }
          }
          .i-state{
            line-height: 45px;
            font-size:16px;
            color:rgba(153,153,153,1);
          }
          .icon-state{
            font-size: 16px;
            color: #24BCF7;
            margin-right: 20px;
          }
        }

        .i-start{
          width:100%;
          height:17px;
          font-size:16px;
          color:rgba(102,102,102,1);
          line-height:17px;
        }
        .i-progress{
          margin-top: 20px;
          width: 100%;
          height: 15px;
          line-height: 15px;
          display: flex;
          justify-content:space-between;
          .i-progressName{
            font-size: 14px;
          }
        }
        .i-normal{
          width:100%;
          //line-height: 57px;
          text-align: center;
          height:120px;
          background:rgba(141,232,240,0.06);
        }
        .i-warning{
          width:100%;
          padding-top: 10px;
          height:120px;
          background:rgba(248,89,89,0.06);
          text-align: center;
          .icon-warming{
            vertical-align: top;
            color: #DF2A2A;
          }
          .w-text{
            margin-left: 10px;
            vertical-align: top;
            display: inline-block;
          }
        }

        .d-name{
          i{
            font-size: 30px;
          }
          span{
            margin-left: 5%;
            font-size: 30px;
            font-weight: bold;
          }
        }
        .d-box{
          height: 60%;
          display: flex;
          flex-direction: row;/*决定主轴的方向*/
          flex-wrap:wrap;
          justify-content:space-around;
          div{
            width: 33.3%;
          }
          .d-key{
            font-size: 18px;
            margin-top: 30px;
            color: #666666;
          }
          .d-value{
            font-weight: bold;
            height: 30px;
            font-size: 40px;
            color: #333333;
          }
          .d-value1{
            font-weight: bold;
            height: 30px;
            font-size: 26px;
            color: #333333;
          }
        }
      }

      .s-progress{
        width:23%;
        padding:10px 20px;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        display: flex;
        display: -webkit-flex;
        flex-direction: row;/*决定主轴的方向*/
        justify-content:space-around;
        flex-wrap:wrap;
        .p-box{
          width: 50%;
          height: 50%;
          .p-progress{
            .p-title{
              width: 50%;
              font-size: 12px;
              color: #999999;
              text-align: center;
              position: absolute;
              bottom: -20px;
              //position: relative;
            }
          }
          .p-name{
            width: 40px;
            position: absolute;
            bottom: -22px;

            font-size:12px;
            color:rgba(151,151,151,1);
          }
          .p-completedSteps{
            font-size: 25px;
            font-weight: bold;
          }
          .p-totalSteps{
            font-size: 12px;
          }
          .p-unit{
            font-size: 12px;
          }

          .p-title{
            text-align: center;
            width: 100%;
            height: 20px;
            font-size:16px;
            font-weight: bold;
            color:#000000;
          }
          .p-echart{
            width: 100%;
            height: calc( 100% - 20px);
          }
        }
      }
      .s-progress1{
        .p-box{
          /*margin-bottom: 6%;
          .p-progress{
            .p-title{
              font-size: 18px;
            }
          }
          .p-name{
            font-size:18px;
          }
          .p-completedSteps{
            font-size: 40px;
          }
          .p-totalSteps{
            font-size: 18px;
          }
          .p-unit{
            font-size: 18px;
          }
          .p-title{
            font-size:18px;
          }
        }*/}
      }
      .s-chart{
        margin-left: 10px;
        width:calc( 38.5% - 30px );
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
      }
      .s-chart1{
        width:calc(77% - 50px);
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
      }
    }
    .s-box1{
      padding: 0 0 10px 0;
    }
  }

</style>
