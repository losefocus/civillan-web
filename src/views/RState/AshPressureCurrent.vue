<template>
  <div style="width: 100%;height: 100%;">
    <chart :options="PulpingQuantity" :auto-resize=true></chart>
  </div>
</template>

<script>
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
        timer:null,
        PulpingQuantity:{
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
            max:120,
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
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 3
                }
              },
              itemStyle: {
                normal: {
                  color: '#F86969',
                  borderColor: '#F86969',
                  borderWidth: 8
                }
              },
              data: []
            },
            {
              name: '压力',
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 3
                }
              },

              itemStyle: {
                normal: {
                  color: '#50C9F9',
                  borderColor: '#50C9F9',
                  borderWidth: 8
                }
              },
              data: []
            },
            {
              name: '电流',
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 3
                }
              },
              itemStyle: {
                normal: {
                  color: '#FF9933',
                  borderColor: '#FF9933',
                  borderWidth: 8
                }
              },
              data: []
            }
          ],
        },
      }
    },
    created(){
      let _this=this;
      this.getData(this.$parent.deviceKey);
      this.PulpingQuantity.series[0].data=this.ashData;
      this.PulpingQuantity.series[1].data=this.rpressureData;
      console.log(this.rpressureData);
      this.PulpingQuantity.series[2].data=this.rcurrentData;

      this.timer=setInterval(()=>{
        _this.getData(_this.$parent.deviceKey)
      },3000);

    },
    methods:{
      getData(key){
        deviceData.list({'key':key}).then(res=>{
          console.log(res);
          if(res.success){
            this.RT_data=res.result;

            this.rflow=parseInt(res.result.rflow); //实时流量
            this.rspeed=(parseInt(res.result.rspeed)+5)*20; //实时速度
            this.rcurrent=parseInt(res.result.rcurrent); //实时电流
            this.progress=Math.abs(res.result.rdeep)*2; //实时深度

            let num1=Math.floor(Math.random()*19);
            let num2=Math.floor(Math.random()*22);
            let num3=Math.floor(Math.random()*23);

            let par_ash=parseInt(res.result.par_ash/100000)*num1; //段灰量
            let rpressure=parseInt(res.result.rpressure/100000)*num2;//实时压力
            let rcurrent=parseFloat((res.result.rcurrent+10)/10)*num3;//实时电流

            this.ashData.push(par_ash);
            this.rpressureData.push(rpressure);
            this.rcurrentData.push(rcurrent);
          }else{

          }
        }).catch(err=>{
          console.log(err)
        });
      }
    },
    beforeDestroy(){
      clearInterval(this.timer);
    }

  }
</script>

<style scoped lang="scss">
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
