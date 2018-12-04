<template>
  <div style="width: 100%;height: 100%">
    <div id="flow" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
  import deviceConfig from '@/api/device/deviceConfig.js'
  export default {
    name: "sFlow",
    props:[
      'dataInfo'
    ],
    data(){
      return{
        myChart:null,
        timer:null,
        tips:0,
        rflow:null,
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
          if(this.rflow!=null){
            this.realTime(post_data)
          }else{
            deviceConfig.sensor({page_index:1,page_size:1000,device_id:id}).then(res=>{
              if(res.result.items.length>0){
                res.result.items.forEach(item=>{
                  if(item.label=='rflow'){
                    if(item.maxValue!=undefined){
                      this.rflow = item.maxValue;
                    }else{
                      this.rflow = 100;
                    }
                    this.realTime(post_data)
                  }else{
                    this.rflow = 100;
                    this.realTime(post_data)
                  }
                });
              }else{
                this.rflow = 100;
                this.realTime(post_data)
              }
              // return res.result
            }).catch(e=>{
              this.rflow = 100;
              this.realTime(post_data)
            });
          }
        }
      },
      realTime(post_data){
        let flow=document.getElementById('flow');
        if(flow){
          this.myChart = this.$echarts.init(flow);
          let tips=Number(post_data.rflow).toFixed(2);
          if(isNaN(tips)){
            tips='0.00'
          }
          let loading=()=> {
            if(tips>this.rflow){
              return [{
                value: this.rflow,
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
                value: this.rflow - tips,
              }];
            }
          };
          this.myChart.setOption({
            title: [{
              text: tips +' '+'/'+' ' + this.rflow,
              left: 'center',
              top: '42%',
              textStyle: {
                color: '#333333',
                fontSize:'14',
              }
            }, {
              text: 'L/min',
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
