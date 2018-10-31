<template>
  <div style="width: 100%;height: 100%">
    <div id="flow" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
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
      }
    },
    mounted(){
      this.init(this.dataInfo)
    },
    methods:{
      init(post_data){
        this.myChart = this.$echarts.init(document.getElementById('flow'));
        let tips=Number(post_data.rflow).toFixed(2);
        if(isNaN(tips)){
          tips=0
        }
        function loading() {
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
            value: 200 - tips,
          }];
        }
        this.myChart.setOption({
          title: [{
            text: tips +' '+'/'+' ' + 200,
            left: 'center',
            top: '42%',
            textStyle: {
              color: '#333333',
              fontSize:'16'
            }
          }, {
            text: 'L/min',
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
      resize(){
        this.myChart.resize()
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
