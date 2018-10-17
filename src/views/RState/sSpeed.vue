<template>
  <div style="width: 100%;height: 100%">
    <div id="speed" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
  export default {
    name: "sSpeed",
    props:[
      'realTime'
    ],
    data(){
      return{
        myChart:null,
        timer:null,
        tips:0,
      }
    },
    mounted(){
      this.init(this.tips)
    },
    methods:{
      init(post_data){
        let _this=this;
        let tips=Math.abs(post_data) || 0;

        this.myChart = this.$echarts.init(document.getElementById('speed'));
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
            value: 200-tips,
          }];
        }
        this.myChart.setOption({
          title: [{
            text: tips +' '+'/'+' ' + 200,
            left: 'center',
            top: '42%',
            textStyle: {
              color: '#333333',
              fontSize:'18'
            }
          }, {
            text: 'cm/Min',
            left: 'center',
            top: '58%',
            //textAlign: 'center',
            textStyle: {
              color: '#999999',
              fontSize:'14'
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
        }, 2000);*/
      },
      resize(){
        this.myChart.resize()
      }
    },
    watch:{
      realTime:{
        handler(oldData,newData){
          //console.log(oldData,newData);
          this.init(newData.rspeed)
        }
      }
    }
  }
</script>

<style scoped>

</style>
