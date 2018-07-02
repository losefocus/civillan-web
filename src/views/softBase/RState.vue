<template>
 <div>
   <ul class="s-box1">
     <li class="s-info">
       <div class="i-id">NB-001</div>
       <div class="i-box">
         <div class="i-body">
           <div class="i-name">双头搅拌设备</div>
           <div class="i-company">宏远建设记录仪一号</div>
         </div>
         <div>
           <div class="i-state"><i class="iconfont icon-state"></i><span>喷浆状态</span></div>
           <div class="i-state"><i class="iconfont icon-state"></i><span>记录状态</span></div>
         </div>
       </div>
       <div class="i-start">开始时间：<span>2018-01-21 19:00</span></div>
       <div class="i-progress">
         <div style="width: 20%">进度：</div>
         <el-progress :stroke-width="15" :percentage="80" color="#24BCF7" style="width: 80%"></el-progress>
       </div>
       <div class="i-normal" v-if="isWarming">
         未发现任何问题
       </div>
       <div class="i-warning" v-else>
         <i class="iconfont icon-warming"></i>
         <div class="w-text">
           <p>下钻钻速超过50cm/min</p>
           <p>下钻钻速超过50cm/min</p>
         </div>
       </div>
     </li>
     <li class="s-chart">
       <chart :options="PulpingQuantity" :auto-resize=true></chart>
     </li>
     <li class="s-chart">
       <chart :options="ElectricCurrent" :auto-resize=true></chart>
     </li>
   </ul>
   <ul class="s-box2">
     <li class="s-progress">
       <div class="p-box">
         <div style="height: 80%">
           <div class="progressContainer">
             <div class="progress" :style="{height:progress+'%'}">
             </div>
           </div>
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
             <p><span :style="completedStepsStyle">{{ completedSteps }}</span> <span :style="totalStepsStyle">/{{ totalSteps }}</span></p>
             <p :style="totalStepsStyle">cm/min</p>
           </radial-progress-bar>
           <div :style="titleStyle">流量</div>
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
             <p><span :style="completedStepsStyle">{{ completedSteps }}</span> <span :style="totalStepsStyle">/{{ totalSteps }}</span></p>
             <p :style="totalStepsStyle">L/min</p>
           </radial-progress-bar>
           <div :style="titleStyle">下钻速度</div>
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
             <p><span :style="completedStepsStyle">{{ completedSteps }}</span> <span :style="totalStepsStyle">/{{ totalSteps }}</span></p>
             <p :style="totalStepsStyle">A</p>
           </radial-progress-bar>
           <div :style="titleStyle">外钻杆电流</div>
         </div>
       </div>
     </li>
     <li class="s-chart">
       <chart :options="AshBreakingAmount" :auto-resize=true></chart>
     </li>
     <li class="s-chart">
       <chart :options="JettingPressure" :auto-resize=true></chart>
     </li>
   </ul>
 </div>
</template>

<script>
  import echarts from 'echarts'
  import RadialProgressBar from 'vue-radial-progress'
export default {
  name: "runningState",
  components:{
    RadialProgressBar
  },
  data(){
    let data = [0,10,20,30,40,50,60,70,80,90];
    let data1 = [120.0, 80.2, 100.3, 60.5, 90.6, 70.3,60.6,90.1,110.9,80.5];
    let Data=data.reverse();
    let Data1=data1.slice(0, 4).concat(['', '', '', '', '', '']).reverse();
    let Data2= ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'].concat(data1.slice(3, 10)).reverse();
    console.log( Data1);
    console.log( Data2);


    return {
      completedStepsStyle:{
        "font-size": "30px",
        "font-weight": "bold"
      },
      totalStepsStyle:{
        "color":"#979797",
        "font-size": "12px"
      },
      titleStyle:{
        "color":"#979797",
        "width":"100%",
        "text-align":"center",
        "font-size": "12px"
      },
      completedSteps:3,
      totalSteps: 20,
      animateSpeed: 500,
      diameter: 110,
      strokeWidth: 8,
      startColor: '#17A8F5',
      stopColor: '#20CEDE',
      innerStrokeColor: 'rgba(151,151,151,0.3)',
      timingFunc: 'linear',

      progress:10,

      isWarming:true,

      PulpingQuantity:{
        title: {
          text: 'A-电流随桩机里程变化曲线',
          show: true,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14,
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
              fontSize: 14,
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
              fontSize: 14,
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
      ElectricCurrent:{
        title: {
          text: 'A-电流随桩机里程变化曲线',
          show: true,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14,
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
              fontSize: 14,
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
              fontSize: 14,
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
          text: 'A-断灰量随桩机里程变化曲线',
          show: true,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#333'
          },
          left: '6%',
          top:'4%'
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
          data: ['断灰量'],
          right: '4%',
          top:'5%',
          textStyle: {
            fontSize: 12,
            color: '#333'
          }
        },
        grid: {
          left: '8%',
          right: '8%',
          bottom: '8%',
          top: '20%',
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
              fontSize: 14,
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
              fontSize: 14,
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
          name: '断灰量',
          type: 'line',
          smooth: true,
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
        },]
      },
      JettingPressure:{
        title: {
          text: 'A-喷浆压力随桩机里程变化曲线',
          show: true,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#333'
          },
          left: '6%',
          top:'4%'
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
          data: ['喷浆压力'],
          right: '4%',
          top:'5%',
          textStyle: {
            fontSize: 12,
            color: '#333'
          }
        },
        grid: {
          left: '8%',
          right: '8%',
          bottom: '8%',
          top: '20%',
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
              fontSize: 14,
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
              fontSize: 14,
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
          name: '喷浆压力',
          type: 'line',
          smooth: true,
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
        },]
      }
    }
  },
  props:['dialogFullscreen'],
  mounted(){
    const that = this;
    window.onresize = function temp() {
      //console.log(document.body.clientWidth);
      let clientWidth=document.body.clientWidth;
      if(!that.dialogFullscreen){
        if(clientWidth>1660){
          that.diameter=110;
        }else if(clientWidth<1660&&clientWidth>1500){
          that.diameter=100;
        }else if(clientWidth<1500&&clientWidth>1380){
          that.diameter=90;
        }else if(clientWidth<1380){
          that.$emit('dialogFullscreen','true')
        }
      }else{
        if(clientWidth>1700){
          that.diameter=170;
        }else if(clientWidth<1700&&clientWidth>1600){
          that.diameter=160;
        }else if(clientWidth<1600&&clientWidth>1510){
          that.diameter=150;
        }else if(clientWidth<1510&&clientWidth>1420){
          that.diameter=140;
        }else if(clientWidth<1420&&clientWidth>1300){
          that.diameter=120;
        }else if(clientWidth<1300&&clientWidth>1100){
          that.diameter=100;
        }else if(clientWidth<1100&&clientWidth>1024){
          that.diameter=90;
        }
      }
    }
  },
  methods:{
    add(){
      this.progress+=10
    }
  },
  created(){

  },
  watch:{
    dialogFullscreen:function (val,oldVal) {
      let that=this;
      let clientWidth=document.body.clientWidth;
      if(val){
        if(clientWidth>1700){
          that.diameter=170;
        }else if(clientWidth<1700&&clientWidth>1600){
          that.diameter=160;
        }else if(clientWidth<1600&&clientWidth>1510){
          that.diameter=150;
        }else if(clientWidth<1510&&clientWidth>1420){
          that.diameter=140;
        }else if(clientWidth<1420&&clientWidth>1300){
          that.diameter=120;
        }else if(clientWidth<1300&&clientWidth>1100){
          that.diameter=100;
        }else if(clientWidth<1100&&clientWidth>1024){
          that.diameter=90;
        }

        this.completedStepsStyle={
          "font-size": "40px",
          "font-weight": "bold"
        };
        this.totalStepsStyle={
          "color":"#979797",
            "font-size": "16px"
        };
        this.titleStyle={
          "color":"#979797",
          "font-size": "16px",
          "width":"100%",
          "text-align":"center",
        }
      }else{
        if(clientWidth>1660){
          that.diameter=110;
        }else if(clientWidth<1660&&clientWidth>1500){
          that.diameter=100;
        }else if(clientWidth<1500&&clientWidth>1380){
          that.diameter=90;
        }else if(clientWidth<1380){
          that.$emit('dialogFullscreen','true')
        }
        this.completedStepsStyle={
          "font-size": "30px",
          "font-weight": "bold"
        };
        this.totalStepsStyle={
          "color":"#979797",
          "font-size": "12px"
        };
        this.titleStyle={
          "color":"#979797",
          "font-size": "12px",
          "width":"100%",
          "text-align":"center",
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .progressContainer{
    position: relative;
    height: 100%;
    width: 20px;
    background-color: #ddd;
  }
  .progress{
    background-color: #24BCF7;
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
       width:110px;
       font-size:30px;
       color:rgba(51,51,51,1);
       line-height:42px;
     }
     .i-box{
       display: flex;
       justify-content:space-between;
       .i-body{
         width: 60%;
         height: 45px;
         line-height: 25px;
         font-weight: bold;
         border-right: 1px solid rgba(51,51,51,0.3);
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
         line-height: 25px;
         font-size:12px;
         color:rgba(153,153,153,1);
       }
       .icon-state{
         font-size: 12px;
         color: #24BCF7;
         margin-right: 20px;
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
         }
       }
     }
   }
   .s-chart{
     width:36.5%;
     background:rgba(255,255,255,1);
     box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
   }
 }
 .s-box1{
   padding: 0 0 10px 0;
 }
</style>
