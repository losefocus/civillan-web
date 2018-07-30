<template>
<div>
  <div class="e-box">
    <!-- 标题和控制栏 -->
    <div class="control-box">
      <el-row>
        <el-col :span="19">
          <div class="grid-content bg-purple">
            <div class="hd">
              <div class="inline-block">
                <el-date-picker
                  class="inline-block"
                  size="small"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="info" size="small">查询</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="e-body">
      <chart :options="polar" :auto-resize=true></chart>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "analysis",
  data(){
    return{
      polar:{
        aria: {
          show: true
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          x: 'left',
          itemGap: 15,
          data:['设备故障','下钻速度异常','电流异常','掺量异常','电压异常','流量异常','压力异常','喷浆异常','测量异常']
        },
        series: [
          {
            name:'报警来源',
            type:'pie',
            //radius: ['50%', '80%'],
            avoidLabelOverlap: true,
            labelLine: {
              normal: {
                show: true
              }
            },

            data:[
              {value:1563, name:'设备故障'},
              {value:310, name:'下钻速度异常'},
              {value:234, name:'电流异常'},
              {value:1244, name:'掺量异常'},
              {value:548, name:'电压异常'},
              {value:982, name:'流量异常'},
              {value:436, name:'压力异常'},
              {value:1369, name:'喷浆异常'},
              {value:563, name:'测量异常'},
            ]
          }
        ]
      },
    }
  }
}
</script>

<style scoped lang="scss">
  .echarts {
    width: 100%;
    height: 400px;
  }
  .e-box{
    background: #ffffff !important;
  }
  .e-body{
    padding:0 30px 0px;
  }
  .control-box{
    padding: 20px 30px;
    background: #fff;
    border-bottom:1px solid rgba(235,237,248,1);
    margin-bottom: 30px;
    .title{
      font-size: 24px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
</style>
