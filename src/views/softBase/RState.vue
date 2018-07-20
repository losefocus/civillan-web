<template>
 <div>
   <div class="r-box">
     <div class="t-box" :class="{'t-box1':classChange==1}">
       <div class="r-stateTab" :class="{'tabActive':!isTab}" @click="tabChange(0)">运行状况</div>
       <div class="p-designTab" :class="{'tabActive':isTab}" @click="tabChange(1)">桩设计值</div>
     </div>
     <ul class="s-box1">
       <li class="s-info" :class="{'s-info1':classChange==1}" v-if="!isTab">
         <div class="i-id">
           <span :class="{'titleActive':titleActive==1}" @click="titleChange1(1)">NB-001</span>
           <span style="margin-left: 20px" :class="{'titleActive':titleActive==2}" @click="titleChange2(2)">AJ-002</span>
         </div>
         <div class="i-box">
           <div class="i-body">
             <div class="i-name">双头搅拌设备</div>
             <div class="i-company">宏远建设记录仪一号</div>
           </div>
           <div>
             <div class="i-state"><span>喷浆状态</span><i class="iconfont icon-state"></i></div>
             <div class="i-state"><span>记录状态</span><i class="iconfont icon-state"></i></div>
           </div>
         </div>
         <div class="i-start">开始时间：<span>2018-12-12</span></div>
         <div class="i-progress">
           <div class="i-progressName" style="width: 20%">进度：</div>
           <el-progress :stroke-width="15" :percentage="progress" color="#24BCF7" style="width: 80%"></el-progress>
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
             <span class="d-key">桩间距：</span>
             <span class="d-value">30</span>
           </div>
           <div>
             <span class="d-key">设计灰量：</span>
             <span class="d-value">30</span>
           </div>
           <div>
             <span class="d-key">桩径：</span>
             <span class="d-value">30</span>
           </div>
           <div>
             <span class="d-key">设计水灰比：</span>
             <span class="d-value">30</span>
           </div>
           <div>
             <span class="d-key">桩长：</span>
             <span class="d-value">30</span>
           </div>
           <div>
             <span class="d-key">工艺：</span>
             <span class="d-value">工艺</span>
           </div>
         </div>
       </li>
       <li class="s-chart" v-if="isRouterAlive">
         <chart :options="PulpingQuantity" :auto-resize=true></chart>
       </li>
       <li class="s-chart" v-if="isRouterAlive">
         <chart :options="ElectricCurrent" :auto-resize=true></chart>
       </li>
     </ul>
     <ul class="s-box2">
       <li class="s-progress" :class="{'s-progress1':classChange==1}">
         <div class="p-box">
           <div style="height: 80%;background: #F85959">
             <div style="height: 80%;">
               <div class="progressContainer">
                 <div class="progress" :style="{height:(100-progress)+'%'}">
                 </div>
               </div>
             </div>

           </div>
           <div class="p-name">深度</div>
         </div>
         <div class="p-box">
           <div class="p-progress">
             <radial-progress-bar :diameter="diameter"
                                  :total-steps="totalSteps"
                                  :completed-steps="completedSteps"
                                  :animate-speed="animateSpeed"
                                  :stroke-width="strokeWidth"
                                  :start-color="startColor"
                                  :stop-color="stopColor"
                                  :inner-stroke-color="innerStrokeColor"
                                  :timing-func="timingFunc">
               <p><span class="p-completedSteps">{{ completedSteps }}</span> <span class="p-totalSteps">/{{ totalSteps }}</span></p>
               <p class="p-unit">cm/min</p>
             </radial-progress-bar>
             <div class="p-title">流量</div>
           </div>
         </div>
         <div class="p-box">
           <div class="p-progress">
             <radial-progress-bar :diameter="diameter"
                                  :total-steps="totalSteps"
                                  :completed-steps="completedSteps"
                                  :animate-speed="animateSpeed"
                                  :stroke-width="strokeWidth"
                                  :start-color="startColor"
                                  :stop-color="stopColor"
                                  :inner-stroke-color="innerStrokeColor"
                                  :timing-func="timingFunc">
               <p><span class="p-completedSteps">{{ completedSteps }}</span> <span class="p-totalSteps">/{{ totalSteps }}</span></p>
               <p class="p-unit">L/min</p>
             </radial-progress-bar>
             <div class="p-title">钻速</div>
           </div>
         </div>
         <div class="p-box">
           <div class="p-progress">
             <radial-progress-bar :diameter="diameter"
                                  :total-steps="totalSteps"
                                  :completed-steps="completedSteps"
                                  :animate-speed="animateSpeed"
                                  :stroke-width="strokeWidth"
                                  :start-color="startColor"
                                  :stop-color="stopColor"
                                  :inner-stroke-color="innerStrokeColor"
                                  :timing-func="timingFunc">
               <p><span class="p-completedSteps">{{ completedSteps }}</span> <span class="p-totalSteps">/{{ totalSteps }}</span></p>
               <p  class="p-unit">A</p>
             </radial-progress-bar>
             <div class="p-title">电流</div>
           </div>
         </div>
       </li>
       <li class="s-chart1" v-if="isRouterAlive">
         <chart :options="AshBreakingAmount" :auto-resize=true></chart>
       </li>
     </ul>
   </div>

 </div>
</template>

<script>
  import echarts from 'echarts'
  import RadialProgressBar from 'vue-radial-progress'
  import deviceData from '@/api/device/deviceData'
  import {formatDate} from '@/common/formatDate.js';
export default {
  name: "runningState",
  components:{
    RadialProgressBar
  },
  data(){
    let data = [0,10,20,30,40,50,60,70,80,90,100];
    let data1 = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    let Data=data;
    let Data1=data1.slice(0, 4).concat(['', '', '', '', '', '']).reverse();
    let Data2= ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'].concat(data1.slice(3, 10)).reverse();


    let arr=[];
    let num =0;
    let max=100;
    let min=1;
    let timer=setInterval(()=>{
      num+=5;
      //data.push(num);
      if(num>0&&num<=25){
        data1.push(num);
        data2.push('');
        data3.push('');
        data4.push('');
      }else if(num>=25&&num<=50){
        data1.push('');
        data2.push(num);
        data3.push('');
        data4.push('');
      }else if(num>=50&&num<=75){
        data1.push('');
        data2.push('');
        data3.push(num);
        data4.push('');
      }else if(num>=75){
        data1.push('');
        data2.push('');
        data3.push('');
        data4.push(num);
      }

    },1000);
    console.log( Data1);
    console.log( Data2);


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

    let aData = [];
    let aData1 = [];
    let aData2 = [];
    let now = +new Date(1997, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
      aData.push(randomData());
      aData1.push(randomData()-200);
      aData2.push(randomData()+200);
    }
    setInterval(function () {
      for (var i = 0; i < 5; i++) {
        aData.shift();
        aData.push(randomData());
        aData1.push(randomData()-200);
        aData2.push(randomData()+200);
      }
    }, 1000);


    return {
      titleActive:'1',//设备样式切换

      classChange:1,//改变样式

      isRouterAlive: true, //ECharts刷新

      completedSteps:3,//进度条中已完成步骤的数量
      totalSteps: 100,//完成进度条的步骤总数。
      animateSpeed: 500,//动画一步的时间量（以毫秒为单位）
      diameter: 110,//进度条圆的直径，以像素为单位。
      strokeWidth: 8,//进度条的宽度
      startColor: '#17A8F5',//进度条渐变的前沿颜色。
      stopColor: '#20CEDE',//进度条渐变的辅助颜色。
      innerStrokeColor: 'rgba(151,151,151,0.3)',//进度条的背景颜色。
      timingFunc: 'linear',//用于CSS转换的转换计时功能

      RT_data:null, //实时数据

      progress:20,//深度进度

      isWarming:true,//未发现问题显示

      isTab:false,//设备型号切换

      PulpingQuantity:{
        title: {
          text: 'A-电流随桩机里程变化曲线',
          show: true,
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#333'
          },
          top:'4%',
          left: '6%'
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
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['电量'],
          textStyle: {
            fontSize: 12,
            color: '#333'
          },
          top:'5%',
          right:'4%'
        },
        grid: {
          top:'20%',
          left: '8%',
          right: '8%',
          bottom: '8%',
          containLabel: true
        },
        yAxis: [{
          type: 'category',
          inverse:true,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },

          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12,
              color: '#999'
            }
          },
          data: Data
        }],
        xAxis: [{
          type: 'value',
          max:120,
          position:'top',
          name: '',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12,
              color: '#999'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: '#ccc'
            }
          }
        }],
        series: [
          {
          name: '测试1',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: '#17A8F5'
              }, {
                offset: 1,
                color: '#17A8F5'
              }], false),
              shadowColor: '#17A8F5',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: '#17A8F5',
              borderColor: '#17A8F5',
              borderWidth: 12
            }
          },
          data: data1
        },
          {
          name: '测试2',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: '#20CEDE'
              }, {
                offset: 1,
                color: '#20CEDE'
              }], false),
              shadowColor: '#20CEDE',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: '#20CEDE',
              borderColor: '#20CEDE',
              borderWidth: 12
            }
          },
          data: data2
        },
          {
          name: '测试3',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: '#979797'
              }, {
                offset: 1,
                color: '#979797'
              }], false),
              shadowColor: '#979797',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: '#979797',
              borderColor: '#979797',
              borderWidth: 12
            }
          },
          data: data3
        },
          {
          name: '测试4',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: 'rgba(113,226,237,1)'
              }, {
                offset: 1,
                color: 'rgba(0, 136, 212, 1)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(100,100,100)',
              borderColor: 'rgba(100,100,100,0.2)',
              borderWidth: 12
            }
          },
          data: data4
        },
        ],
      },
      ElectricCurrent:{
        title: {
          text: 'A-电流随桩机里程变化曲线',
          show: true,
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#333'
          },
          top:'4%',
          left: '6%'
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
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['电量'],
          textStyle: {
            fontSize: 12,
            color: '#333'
          },
          top:'5%',
          right:'4%'
        },
        grid: {
          top:'20%',
          left: '8%',
          right: '8%',
          bottom: '8%',
          containLabel: true
        },
        yAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12,
              color: '#999'
            }
          },
          data: Data
        }],
        xAxis: [{
          type: 'value',
          position:'top',
          name: '',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12,
              color: '#999'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: '#ccc'
            }
          }
        }],
        series: [{
          name: '测试1',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: 'rgba(113,226,237,1)'
              }, {
                offset: 1,
                color: 'rgba(0, 136, 212, 1)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(113,226,237)',
              borderColor: 'rgba(0,136,212,0.2)',
              borderWidth: 12
            }
          },
          data: Data1
        },{
          name: '测试2',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: 'rgba(0,0,0,1)'
              }, {
                offset: 1,
                color: 'rgba(0, 0, 0, 1)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(0,0,0)',
              borderColor: 'rgba(0,0,0,0.2)',
              borderWidth: 12
            }
          },
          data: Data2
        },]
      },
      AshBreakingAmount:{
        title: {
          text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        legend: {
          x: 'center',
          data:['NO1','NO2','NO3'],
          textStyle:{
            color:"#000",
            fontsize:5
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: [{
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLine: {
            lineStyle: {
              color:'#0B438B'
            }
          },
          name:'电流 A',
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
                color:'#0B438B'
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
                color:'#0B438B'
              }
            },
            splitLine:{
              show:false,
            },
            type: 'value',
            name:'转速 C',
            position:'left',
//            min:0,
//            max:100,
            axisLabel: {
              formatter: '{value} C'
            },

          },
        ],
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: aData
        },
          {
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: aData1
          },
          {
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: aData2
          }]
      },
    }
  },
  props:['dialogFullscreen','deviceKey'],
  mounted(){
    this.init();
    this.reload();
    const that = this;
    window.onresize = function (){
      let clientWidth=document.body.clientWidth;
      that.temp(that.dialogFullscreen,that.diameter,that,clientWidth)
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
    }
  },
  methods:{

    init(){
      let clientWidth=document.body.clientWidth;
      this.temp(this.dialogFullscreen,this.diameter,this,clientWidth)
    },
    titleChange1(x){
      this.titleActive=x;
    },
    titleChange2(x){
      this.titleActive=x;
    },

    temp(isDialog,diameter,that,clientWidth) {

      if(!isDialog){
        this.classChange=2;
        if(clientWidth>1660){
          diameter=110;
        }else if(clientWidth<1660&&clientWidth>1500){
          diameter=100;
        }else if(clientWidth<1500&&clientWidth>1380){
          diameter=90;
        }else if(clientWidth<1380){
          that.$emit('dialogFullscreen','true')
        }
      }else{
        if(clientWidth>1700){
          this.classChange=1;
          diameter=170;
        }else if(clientWidth<1700&&clientWidth>1600){
          this.classChange=1;
          diameter=160;
        }else if(clientWidth<1600&&clientWidth>1510){
          this.classChange=1;
          diameter=150;
        }else if(clientWidth<1510&&clientWidth>1420){
          this.classChange=2;
          diameter=140;
        }else if(clientWidth<1420&&clientWidth>1300){
          this.classChange=2;
          diameter=120;
        }else if(clientWidth<1300&&clientWidth>1100){
          this.classChange=2;
          diameter=100;
        }else if(clientWidth<1100&&clientWidth>1000){
          this.classChange=2;
          diameter=90;
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
        console.log(res);
        this.RT_data=res.result;
      })
    }
  },
  created(){
    console.log(this.deviceKey);
    this.getData(this.deviceKey);
    /*let timer=setInterval(()=>{
      this.getData(this.deviceKey)
    },2000);*/
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

  .echarts {
    width: 100%;
    height: 100%;
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
          margin-top: 10px;
          width:100%;
          line-height:42px;
          span{
            cursor: pointer;
          }
        }
        .titleActive{
          font-size:30px;
          color:rgba(51,51,51,1);
        }
        .i-box{
          display: flex;
          justify-content:space-between;
          height: 30%;
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
          }
          .i-state{
            line-height: 30px;
            font-size:12px;
            color:rgba(153,153,153,1);
            span{
              margin-right: 20px;
            }
          }
          .icon-state{
            font-size: 12px;
            color: #24BCF7;
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
            width: 50%;
          }
          .d-key{
            margin-right: 5%;
          }
          .d-value{

            color: #24BCF7;
          }
        }
      }
      .s-info1{
        .i-id{
          font-size:30px;
          color:#DADADA;
          line-height:42px;
        }
        .titleActive{
          font-size:40px;
          color:rgba(51,51,51,1);
        }
        .i-box{
          display: flex;
          justify-content:space-between;
          height: 30%;
          .i-body{
            width: 60%;
            height: 45px;
            line-height: 45px;
            font-weight: bold;
            .i-name{
              font-size:20px;
              color:rgba(51,51,51,1);
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
          width: 100%;
          height: 15px;
          line-height: 15px;
          display: flex;
          justify-content:space-between;
          .i-progressName{
            font-size: 16px;
          }
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
          i{
            font-size: 20px;
          }
          span{
            margin-left: 5%;
            font-size: 20px;
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
            width: 50%;
          }
          .d-key{
            font-size: 16px;
            margin-right: 5%;
          }
          .d-value{
            font-size: 16px;
            color: #24BCF7;
          }
        }
      }

      .s-progress{
        width:23%;
        padding: 15px 20px;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        display: flex;
        display: -webkit-flex;
        flex-direction: row;/*决定主轴的方向*/
        justify-content:space-around;
        flex-wrap:wrap;
        .p-box{
          position: relative;
          flex: 0 1 50%;
          display:flex;
          justify-content:center;
          border: 1px solid white;
          box-sizing: border-box;
          .p-progress{
            .p-title{
              width: 100%;
              font-size: 12px;
              color: #999999;
              text-align: center;
              position: relative;
            }
          }
          .p-name{
            position: absolute;
            bottom: 2%;
            font-size:12px;
            color:rgba(151,151,151,1);
          }
          .p-completedSteps{
            font-size: 30px;
            font-weight: bold;
          }
          .p-totalSteps{
            font-size: 12px;
          }
          .p-unit{
            font-size: 12px;
          }
          .p-title{
            width: 78%;
            text-align: center;
          }
        }
      }
      .s-progress1{
        .p-box{
          .p-progress{
            .p-title{
              font-size: 18px;
            }
          }
          .p-name{
            font-size:18px;
          }
          .p-completedSteps{
            font-size: 50px;
          }
          .p-totalSteps{
            font-size: 18px;
          }
          .p-unit{
            font-size: 18px;
          }
        }
      }
      .s-chart{
        width:36.5%;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
      }
      .s-chart1{
        width:73.3%;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
      }
    }
    .s-box1{
      padding: 0 0 10px 0;
    }
  }

</style>
