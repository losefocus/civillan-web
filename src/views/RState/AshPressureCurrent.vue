<template>
  <div style="width: 100%;height: 100%;">
    <!--<chart :options="PulpingQuantity" :auto-resize=true></chart>-->
    <div id="myCharts" style="width: 100%;height: 100%;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import deviceData from '@/api/device/deviceData'
  export default {
    name: "AshPressureCurrent",
    data(){
      let data = [0,10,20,30,40,50,60,70,80,90,100];
      let Data=data;
      return{
        rcurrentData:[], //段浆量
        ashData:[], //段灰量
        rpressureData:[], //压力
        myChart:null,
      }
    },
    props:[
      'dataInfo'
    ],
    created(){

    },
    mounted(){
      this.myCharts(this.dataInfo)
    },
    methods:{
      myCharts(dataInfo){
        let _this=this;
        this.ashData.push(parseFloat(dataInfo.par_ash).toFixed(2));
        this.rpressureData.push(parseFloat(dataInfo.rpressure).toFixed(2));
        this.rcurrentData.push(parseFloat(dataInfo.rcurrent).toFixed(2));
        let Data=[10,20,30,40,50,60,70,80,90,100,120,140];
        this.myChart = this.$echarts.init(document.getElementById('myCharts'));
        this.myChart.setOption({
          title: {
            text: '段灰量、压力、电流随桩机里程变化曲线',
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
            },
            formatter:function (params) {
              var res='<div><p>深度：'+params[0].name+'</p></div>'
              for(var i=0;i<params.length;i++){
                res+='<div>'+'<div style="width: 10px;height: 10px;border-radius: 50%;display: inline-block;background: '+params[i].color+';"></div>'+'<p style="display: inline-block;margin-left: 10px;font-size: 12px;">'+params[i].seriesName+':'+params[i].data+'</p>'+'</div>'
              }
              return res;
            }
          },
          legend: {
            itemWidth: 12,
            itemHeight: 5,
            itemGap: 13,
            textStyle: {
              fontSize: 12,
              color: '#333'
            },
            top:'12%',
            right:'2%'
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
            max:100,
            position:'top',
            name: '',
            axisTick: {
              show: false
            },
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
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: '#ccc'
              }
            }
          }],
          series: [
            {
              name: '段灰量',
              type: 'line',
              showSymbol: false
              ,
              itemStyle: {
                normal: {
                  color: '#F86969',
                  borderColor: '#F86969',
                }
              },
              data: _this.ashData
            },
            {
              name: '压力',
              type: 'line',
              showSymbol: false,
              itemStyle: {
                normal: {
                  color: '#50C9F9',
                  borderColor: '#50C9F9',
                }
              },
              data: _this.rpressureData
            },
            {
              name: '电流',
              type: 'line',
              showSymbol: false,
              itemStyle: {
                normal: {
                  color: '#FF9933',
                  borderColor: '#FF9933',
                }
              },
              data: _this.rcurrentData
            }
          ],
        });
      },
      resize(){
        this.myChart.resize()
      }
    },
    watch:{
      dataInfo:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          this.myCharts(val)
        },
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
