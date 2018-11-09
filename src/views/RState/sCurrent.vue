<template>
  <div style="width: 100%;height: 100%">
    <div id="current" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
  import deviceConfig from '@/api/device/deviceConfig.js'
export default {
  name: "sDeep",
  data(){
    return{
      myChart:null,
      timer:null,
      tips:0,
      rcurrent:null
    }
  },
  props:['dataInfo'],
  mounted(){
    this.init(this.dataInfo)
  },
  methods:{
    init(post_data){
      let deviceInfo=JSON.parse(sessionStorage.getItem('deviceInfo'));
      let id=deviceInfo.id;

      if(this.rcurrent!=null){
        this.realTime(post_data)
      }else{
        deviceConfig.sensor({page_index:1,page_size:1000,device_id:id}).then(res=>{
          if(res.result.items.length>0){
            res.result.items.forEach(item=>{
              if(item.label=='rcurrent'){
                if(item.maxValue!=undefined){
                  this.rcurrent = item.maxValue;
                }else{
                  this.rcurrent=500;
                }
                this.realTime(post_data)
              }
            });
          }
          // return res.result
        });
      }
      /*this.timer=setInterval(function() {

        if (tips == 200) {
          tips = 0;
        } else {
          ++tips;
        }
        _this.myChart.setOption({
          title: {
            text: tips +' '+'/'+' ' + 200
          },
          series: [{
            name: 'loading',
            data: loading()
          }]
        })
      }, 1000);*/
    },
    realTime(post_data){
      this.myChart = this.$echarts.init(document.getElementById('current'));
      let tips=Number(post_data.rcurrent).toFixed(2);
      if(isNaN(tips)){
        tips=0
      }
      let loading=()=> {
        return [{
          value: tips,
          itemStyle: {
            normal: {
              color: '#1FBDEE',
              //shadowBlur: 10,
              //shadowColor: 'rgba(31,189,238)'
            }
          }
        }, {
          value: this.rcurrent - tips,
        }];
      };
      this.myChart.setOption({
        title: [{
          text: tips +' '+'/'+' ' + this.rcurrent,
          left: 'center',
          top: '42%',
          textStyle: {
            color: '#333333',
            fontSize:'16',
          }
        }, {
          text: 'A',
          left: 'center',
          top: '58%',
          //textAlign: 'center',
          textStyle: {
            color: '#999999',
            fontSize:'12'
          }
        }],
        color:'rgba(31,189,238,0.2)',
        series: [{
          name: 'loading',
          type: 'pie',
          radius: ['85%', '92%'],
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
            }
          },
          data: loading(),
        }]
      });
    },
    resize(){
      if(this.myChart!=null){
        this.myChart.resize()
      }else{

      }

    }
  },
  watch:{
    dataInfo:{
      handler(newData,oldData){
        this.init(newData)
      }
    },
  }

}
</script>

<style scoped>

</style>
