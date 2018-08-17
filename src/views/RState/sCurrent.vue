<template>
  <div style="width: 100%;height: 100%">
    <div id="current" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "sDeep",
  data(){
    return{
      myChart:null,
      timer:null,
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      let _this=this;
      this.myChart = this.$echarts.init(document.getElementById('current'));
      let tips=0;
      function loading() {
        return [{
          value: tips,
          itemStyle: {
            normal: {
              color: 'rgba(31,189,238)',
              shadowBlur: 10,
              shadowColor: 'rgba(31,189,238)'
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
          top: '30%',
          textStyle: {
            color: 'rgba(31,189,238)',
            fontSize:'20'
          }
        }, {
          text: 'cm/L',
          left: '48%',
          top: '45%',
          textAlign: 'center',
          textStyle: {
            color: '#999999',
            fontSize:'14'
          }
        },{
          text: '电流',
          left: '48%',
          top: '60%',
          textAlign: 'center',
          textStyle: {
            color: '#000',
            fontSize:'18'
          }
        }],
        color:'rgba(31,189,238,0.2)',
        series: [{
          name: 'loading',
          type: 'pie',
          radius: ['85%', '90%'],
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
            }
          },
          data: loading(),
        }]
      });
      this.timer=setInterval(function() {

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
      }, 1000);
    },
    resize(){
      this.myChart.resize()
    }
  }
}
</script>

<style scoped>

</style>
