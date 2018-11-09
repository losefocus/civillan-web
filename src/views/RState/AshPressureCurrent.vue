<template>
  <div style="width: 100%;height: 100%;">
    <!--<chart :options="PulpingQuantity" :auto-resize=true></chart>-->
    <div style="height: 40px;line-height: 40px;padding-left: 10px;font-size: 16px;font-weight: bold;">
      段灰量、电流随桩机里程变化曲线
    </div>
    <div style="height: calc(100% - 40px)">
      <div id="myCharts1" style="width: 50%;height: 50%;float: left;"></div>
      <div id="myCharts2" style="width: 50%;height: 50%;float: left;"></div>
      <div id="myCharts3" style="width: 50%;height: 50%;float: left;"></div>
      <div id="myCharts4" style="width: 50%;height: 50%;float: left;"></div>
    </div>
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
        myChart1:null,
        myChart2:null,
        myChart3:null,
        myChart4:null,
        data1:{
          rcurrentData:[],ashData:[],rpressureData:[],title:'下钻',
        },
        data2:{
          rcurrentData:[],ashData:[],rpressureData:[],title:'提钻',
        },
        data3:{
          rcurrentData:[],ashData:[],rpressureData:[],title:'复下',
        },
        data4:{
          rcurrentData:[],ashData:[],rpressureData:[],title:'复提',
        },

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
      myCharts(dataInfo,oldVal){
        if(isNaN(dataInfo.rdeep)){
          dataInfo.rdeep=0
        }
        if(isNaN(dataInfo.par_ash)){
          dataInfo.par_ash=0
        }
        if(isNaN(dataInfo.rpressure)){
          dataInfo.rpressure=0
        }
        if(isNaN(dataInfo.rcurrent)){
          dataInfo.rcurrent=0
        }

        let ashData=[parseFloat(dataInfo.par_ash).toFixed(2),parseFloat(dataInfo.rdeep).toFixed(2)];
        let rcurrent=[parseFloat(dataInfo.rcurrent).toFixed(2),parseFloat(dataInfo.rdeep).toFixed(2)];


        if(dataInfo.rpipe_sta==1){
          if(oldVal!=undefined){
            if(dataInfo.rdeep==oldVal.rdeep){
              if(dataInfo.par_ash!=oldVal.par_ash){
                this.data1.ashData.push(ashData);
              }
              if(dataInfo.rcurrent!=oldVal.rcurrent){
                this.data1.rcurrentData.push(rcurrent);
              }
            }else{
              this.data1.ashData.push(ashData);
              this.data1.rcurrentData.push(rcurrent);
            }
          }else{
            this.data1.ashData.push(ashData);
            this.data1.rcurrentData.push(rcurrent);
          }
        }else if(dataInfo.rpipe_sta==2){
          if(oldVal!=undefined){
            if(dataInfo.rdeep==oldVal.rdeep){
              if(dataInfo.par_ash!=oldVal.par_ash){
                this.data2.ashData.push(ashData);
              }
              if(dataInfo.rcurrent!=oldVal.rcurrent){
                this.data2.rcurrentData.push(rcurrent);
              }
            }else{
              this.data2.ashData.push(ashData);
              this.data2.rcurrentData.push(rcurrent);
            }
          }else{
            this.data2.ashData.push(ashData);
            this.data2.rcurrentData.push(rcurrent);
          }
        }else if(dataInfo.rpipe_sta==3){
          if(oldVal!=undefined){
            if(dataInfo.rdeep==oldVal.rdeep){
              if(dataInfo.par_ash!=oldVal.par_ash){
                this.data3.ashData.push(ashData);
              }
              if(dataInfo.rcurrent!=oldVal.rcurrent){
                this.data3.rcurrentData.push(rcurrent);
              }
            }else{
              this.data3.ashData.push(ashData);
              this.data3.rcurrentData.push(rcurrent);
            }
          }else{
            this.data3.ashData.push(ashData);
            this.data3.rcurrentData.push(rcurrent);
          }
        }else if(dataInfo.rpipe_sta==4){
          if(oldVal!=undefined){
            if(dataInfo.rdeep==oldVal.rdeep){
              if(dataInfo.par_ash!=oldVal.par_ash){
                this.data4.ashData.push(ashData);
              }
              if(dataInfo.rcurrent!=oldVal.rcurrent){
                this.data4.rcurrentData.push(rcurrent);
              }
            }else{
              this.data4.ashData.push(ashData);
              this.data4.rcurrentData.push(rcurrent);
            }
          }else{
            this.data4.ashData.push(ashData);
            this.data4.rcurrentData.push(rcurrent);
          }
        }

        if(dataInfo.record_sta==3){
          this.data1.ashData=[];
          this.data2.ashData=[];
          this.data3.ashData=[];
          this.data4.ashData=[];
          this.data1.rcurrentData=[];
          this.data2.rcurrentData=[];
          this.data3.rcurrentData=[];
          this.data4.rcurrentData=[];
        }

        //console.log(this.data1.rcurrentData);

        this.myChart1 = this.$echarts.init(document.getElementById('myCharts1'));
        this.myChart2 = this.$echarts.init(document.getElementById('myCharts2'));
        this.myChart3 = this.$echarts.init(document.getElementById('myCharts3'));
        this.myChart4 = this.$echarts.init(document.getElementById('myCharts4'));

        function getOption(data){
          let option={
            title:{
              text:data.title,
              left:'2%',
              textStyle:{
                fontSize:12,
                fontWeight:'normal',
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer:{
                type: 'line',
                axis: 'y'
              },
              formatter:function (params) {
                var res='<div><p>深度(米)：'+params[0].data[1]+'</p></div>';
                for(var i=0;i<params.length;i++){
                  res+='<div>'+'<div style="width: 10px;height: 10px;border-radius: 50%;display: inline-block;background: '+params[i].color+';"></div>'+'<p style="display: inline-block;margin-left: 10px;font-size: 12px;">'+params[i].seriesName+'：'+params[i].data[0]+'</p>'+'</div>'
                }
                return res;
              }
            },
            grid: {
              top:'27%',
              left: '15%',
              right: '6%',
              bottom: '8%',
            },
            yAxis: [{
              type: 'value',
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
              max:30,
              min:0,
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
              },
              max:100,
              min:0,
            }],
            series: [
              {
                name: '段灰量(Kg)',
                type: 'line',
                showSymbol: false,
                itemStyle: {
                  normal: {
                    color: '#F86969',
                    borderColor: '#F86969',
                  }
                },
                data: data.ashData
              },
              {
                name: '电流(A)',
                type: 'line',
                showSymbol: false,
                itemStyle: {
                  normal: {
                    color: '#2CC0FF',
                    borderColor: '#2CC0FF',
                  }
                },
                data: data.rcurrentData
              }
            ],
          };
          return option
        }


        //let Data=[0,10,20,30,40,50];


        this.myChart1.setOption(getOption(this.data1));
        this.myChart2.setOption(getOption(this.data2));
        this.myChart3.setOption(getOption(this.data3));
        this.myChart4.setOption(getOption(this.data4));


      },
      resize(){
        this.myChart1.resize();
        this.myChart2.resize();
        this.myChart3.resize();
        this.myChart4.resize()
      }
    },
    watch:{
      dataInfo:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          this.myCharts(val,oldVal)
        },
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
