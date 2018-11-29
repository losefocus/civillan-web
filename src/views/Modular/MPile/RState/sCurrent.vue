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
      rcurrent:null,
    }
  },
  props:['dataInfo'],
  created(){

  },
  mounted(){
    this.init(this.dataInfo)
  },
  methods:{
    init(post_data){
      let deviceInfo=JSON.parse(sessionStorage.getItem('deviceInfo'));
      if(deviceInfo){
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
                    this.rcurrent=120;
                  }
                  this.realTime(post_data)
                }else{
                  this.rcurrent=120;
                }
              });
            }
          }).catch(e=>{
            this.rcurrent=120;
          });
        }
      }
    },
    realTime(post_data){
      let current=document.getElementById('current');
      if(current){
        this.myChart = this.$echarts.init(current);
        let tips=Number(post_data.rcurrent).toFixed(2);
        if(isNaN(tips)){
          tips='0.00'
        }
        let loading=()=> {
          if(tips>this.rcurrent){
            return [{
              value: this.rcurrent,
              itemStyle: {
                normal: {
                  color: '#F31A1A',
                }
              }
            }, {
              value: 0,
            }];
          }else{
            return [{
              value: tips,
              itemStyle: {
                normal: {
                  color: '#1FBDEE',
                }
              }
            }, {
              value: this.rcurrent - tips,
            }];
          }
        };

        this.myChart.setOption({
          title: [{
            text: tips +' '+'/'+' ' + this.rcurrent,
            left: 'center',
            top: '42%',
            textStyle: {
              color: '#333333',
              fontSize:'14',
            }
          }, {
            text: 'A',
            left: 'center',
            top: '58%',
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
      }else{

      }
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
