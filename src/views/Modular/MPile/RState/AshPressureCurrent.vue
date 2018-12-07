<template>
  <div style="width: 100%;height: 100%;">
    <div class="t-charts">
      段灰量(kg)、电流(A)变化曲线
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
  import deviceData from '@/api/device/deviceData'
  export default {
    name: "AshPressureCurrent",
    data(){
      return{
        rpressureData:[], //压力
        rcurrentData:[], //段浆量
        ashData:[], //段灰量
        myChart1:null,
        myChart2:null,
        myChart3:null,
        myChart4:null,
        data1:{rcurrentData:[],ashData:[],rpressureData:[],title:'下钻',},
        data2:{rcurrentData:[],ashData:[],rpressureData:[],title:'提钻',},
        data3:{rcurrentData:[],ashData:[],rpressureData:[],title:'复下',},
        data4:{rcurrentData:[],ashData:[],rpressureData:[],title:'复提',},

      }
    },
    props:[
      'dataInfo',
      'isReplay',
      'historyRT'
    ],
    created(){
      this.changeData();
      this.history(this.historyRT)
    },
    mounted(){
      this.myCharts(this.dataInfo)
    },
    methods:{
      //历史回放数据和实时数据的切换
      changeData(){
        if(this.$store.state.project.changeTab==true){
          this.clearData()
        }else{
          this.history()
        }
      },

      //实时历史数据
      history(data){
        if(data){
          if(data.length>0){
            for(let i=0;i<data.length;i++){
              let item=data[i];
              let oldItem;
              if(i>0){
                oldItem=data[i-1];
                this.getState(item,oldItem)
              }
            }
          }
        }
      },

      //实时数据
      getState(dataInfo,oldVal){
        let newDeep=parseFloat(dataInfo.rdeep).toFixed(2);
        let oldDeep;
        if(oldVal){
          oldDeep=parseFloat(oldVal.rdeep).toFixed(2);
        }
        let ashData=[parseFloat(dataInfo.par_ash).toFixed(2),newDeep];
        let rcurrent=[parseFloat(dataInfo.rcurrent).toFixed(2),newDeep];
        if(dataInfo.rpipe_sta==1){
          if(oldVal!=undefined){
            if(newDeep==oldDeep){
              this.data1.ashData[this.data1.ashData.length-1] = ashData;
              this.data1.rcurrentData[this.data1.rcurrentData.length-1] = rcurrent;
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
            if(newDeep==oldVal.rdeep){
              this.data2.ashData[this.data2.ashData.length-1] = ashData;
              this.data2.rcurrentData[this.data2.rcurrentData.length-1] = rcurrent;
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
            if(newDeep==oldVal.rdeep){
              this.data3.ashData[this.data3.ashData.length-1] = ashData;
              this.data3.rcurrentData[this.data3.rcurrentData.length-1] = rcurrent;
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
            if(newDeep==oldVal.rdeep){
              this.data4.ashData[this.data4.ashData.length-1] = ashData;
              this.data4.rcurrentData[this.data4.rcurrentData.length-1] = rcurrent;
            }else{
              this.data4.ashData.push(ashData);
              this.data4.rcurrentData.push(rcurrent);
            }
          }else{
            this.data4.ashData.push(ashData);
            this.data4.rcurrentData.push(rcurrent);
          }
        }
      },

      //echars options
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

        this.getState(dataInfo,oldVal);
        //console.log(this.data1.rcurrentData);

        this.myChart1 = this.$echarts.init(document.getElementById('myCharts1'));
        this.myChart2 = this.$echarts.init(document.getElementById('myCharts2'));
        this.myChart3 = this.$echarts.init(document.getElementById('myCharts3'));
        this.myChart4 = this.$echarts.init(document.getElementById('myCharts4'));

        function getOption(data){
          let option={
            title:{
              text:data.title,
              left:'4%',
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
            dataZoom: [ {
              type: 'inside',
              yAxisIndex: 0
            }],
            grid: {
              top:'27%',
              left: '15%',
              right: '10%',
              bottom: '8%',
            },
            yAxis: [{
              type: 'value',
              inverse:true,
              boundaryGap: false,
              max:dataInfo.depth_design || 20,
              min:0,
            }],
            xAxis: [{
              type: 'value',
              position:'top',
              name: '',
              axisTick: {
                show: true
              },
              nameTextStyle:{

              },
              splitLine: {
                show:false,
              },
              max:60,
              min:0,
            }],
            series: [
              {
                name: '段灰量(kg)',
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

      //echarts 自适应
      resize(){
        this.myChart1.resize();
        this.myChart2.resize();
        this.myChart3.resize();
        this.myChart4.resize()
      },

      //重置echarts数据
      clearData(){
        this.data1={rcurrentData:[],ashData:[],rpressureData:[],title:'下钻',};
        this.data2={rcurrentData:[],ashData:[],rpressureData:[],title:'提钻',};
        this.data3={rcurrentData:[],ashData:[],rpressureData:[],title:'复下',};
        this.data4={rcurrentData:[],ashData:[],rpressureData:[],title:'复提',};
      }
    },

    watch:{
      dataInfo:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          this.myCharts(val,oldVal);
          if(val.pile_describe!=oldVal.pile_describe){
            this.clearData()
          }
        },
      },
      historyRT:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          this.history(val)
        },
      },
      isReplay(val){
        if(val){
          this.clearData()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.t-charts{
  height: 40px;
  line-height: 50px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: bold;
}
</style>
