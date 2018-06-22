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
           <div class="i-state">喷浆状态</div>
           <div class="i-state">记录状态</div>
         </div>
       </div>
       <div class="i-start">开始时间：<span>2018-01-21 19:00</span></div>
       <div class="i-progress">
         <div>进度：</div>
         <el-progress :percentage="80" color="#8DE8F0" style="width: 195px"></el-progress>
       </div>
     </li>
     <li class="s-chart">
       <chart :options="PulpingQuantity"></chart>
     </li>
     <li class="s-chart">
       <chart :options="ElectricCurrent"></chart>
     </li>
   </ul>
   <ul class="s-box2">
     <li class="s-progress">
       <div class="p-box">
         <div class="progressContainer">
           <div class="progress" :style="{height:progress+'%'}">
           </div>
         </div>
       </div>
       <div class="p-box">
         <el-progress type="circle" :percentage="80" color="#8e71c7" :width="100"></el-progress>
       </div>
       <div class="p-box">
         <el-progress type="circle" :percentage="100" status="success" :width="100"></el-progress>
       </div>
       <div class="p-box">
         <el-progress type="circle" :percentage="50" status="exception" :width="100"></el-progress>
       </div>
     </li>
     <li class="s-chart">
       <chart :options="AshBreakingAmount"></chart>
     </li>
     <li class="s-chart">
       <chart :options="JettingPressure"></chart>
     </li>
   </ul>
 </div>
</template>

<script>
  import echarts from 'echarts'
export default {
  name: "runningState",
  data(){
    let data = [0,10,20,30,40,50,60,70,80,90];
    let data1 = [120.0, 80.2, 100.3, 60.5, 90.6, 70.3,60.6,90.1,110.9,80.5];
    let Data=data.reverse();
    let Data1=data1.reverse();
    console.log(Data);
    return {
      progress:60,
      PulpingQuantity:{
        title: {
          text: 'A-断浆量随桩机里程变化曲线',
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
          data: ['断浆量'],
          top:'5%',
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#333'
          }
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
          name: '断浆量',
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
          name: '电量',
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
  props:['data']
}
</script>

<style scoped lang="scss">
  .progressContainer{
    position: relative;
    height: 80%;
    width: 20px;
    background-color: #ddd;
    margin-left: 30%;
  }
  .progress{
    background-color: #1C8DE0;
    width:20px;
    line-height: 15px;
    position: absolute;
    bottom: 0;
  }

  .echarts {
    width: 100%;
    height: 100%;
  }
 .s-box1,.s-box2{
   display: flex;
   background-color: #F5F5F9;
   justify-content:space-between;
   .s-info{
     width:20%;
     height:260px;
     padding: 20px;
     background:rgba(255,255,255,1);
     box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
     .i-id{
       width:110px;
       height:42px;
       font-size:30px;
       color:rgba(51,51,51,1);
       line-height:42px;
     }
     .i-box{
       margin-top: 15px;
       display: flex;
       justify-content:space-between;
       .i-body{
         width: 135px;
         height: 35px;
         border-right: 1px solid #979797;
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
         width:48px;
         height:17px;
         line-height: 17px;
         font-size:12px;
         color:rgba(153,153,153,1);
       }
     }
     .i-start{
       margin-top: 40px;
       width:100%;
       height:17px;
       font-size:12px;
       color:rgba(102,102,102,1);
       line-height:17px;
     }
     .i-progress{
       margin-top: 17px;
       width: 100%;
       height: 15px;
       line-height: 15px;
       display: flex;
       justify-content:space-between;
     }
   }

   .s-progress{
     width:20%;
     height:260px;
     padding: 20px;
     background:rgba(255,255,255,1);
     box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
     display: flex;
     display: -webkit-flex;
     flex-direction: row;/*决定主轴的方向*/
     flex-wrap:wrap;
     .p-box{
       height: 130px;
       flex: 0 1 50%;
       //background-color: lightcoral;
       color: white;
       font-size: 20px;
       text-align: center;
       line-height: 100px;
       border: 4px solid white;
       box-sizing: border-box;
     }
   }

   .s-chart{
     width:36.5%;
     height:302px;
     background:rgba(255,255,255,1);
     box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
   }
 }
 .s-box1{
   padding: 0 0 10px 0;
 }
</style>
