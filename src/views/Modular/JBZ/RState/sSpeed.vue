<template>
  <div style="width: 100%;height: 100%">
    <div id="speed" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
  import deviceConfig from '@/api/device/deviceConfig.js'
  export default {
    name: "sSpeed",
    props:[
      'dataInfo',
    ],
    data(){
      return{
        myChart:null,
        timer:null,
        tips:0,
        rspeed:null,
      }
    },
    mounted(){
      this.init(this.dataInfo)
    },
    methods:{
      init(post_data){
        let deviceInfo=JSON.parse(sessionStorage.getItem('deviceInfo'));
        if(deviceInfo){
          let id=deviceInfo.id;
          if(this.rspeed!=null){
            this.realTime(post_data)
          }else{
            deviceConfig.sensor({page_index:1,page_size:1000,device_id:id}).then(res=>{
              if(res.result.items.length>0){
                res.result.items.forEach(item=>{
                  if(item.label=='rspeed'){
                    if(item.maxValue!=undefined){
                      this.rspeed = item.maxValue;
                    }else{
                      this.rspeed = 250;
                    }
                    this.realTime(post_data)
                  }else{
                    this.rspeed = 250;
                    this.realTime(post_data)
                  }
                });
              }else{
                this.rspeed = 250;
                this.realTime(post_data)
              }
            }).catch(e=>{
              this.rspeed = 250;
              this.realTime(post_data)
            });
          }
        }
      },
      realTime(post_data){
        let speed=document.getElementById('speed');
        if(speed){
          this.myChart = this.$echarts.init(speed);
          let tips=Number(post_data.rspeed).toFixed(2);
          if(isNaN(tips)){
            tips='0.00';
          }
          let loading=()=> {
            if(tips>this.rspeed){

              return [{
                value: this.rspeed,
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
                value: this.rspeed - tips,
              }];
            }
          };
          this.myChart.setOption({
            title: [{
              text: tips +' '+'/'+' ' + this.rspeed,
              left: 'center',
              top: '42%',
              textStyle: {
                color: '#333333',
                fontSize:'14',
              }
            }, {
              text: 'cm/min',
              left: 'center',
              top: '58%',
              textStyle: {
                color: '#999999',
                fontSize:'12'
              }
            }],
            color:'rgba(223,223,223,1)',
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
      }
    }
  }
</script>

<style scoped>

</style>
