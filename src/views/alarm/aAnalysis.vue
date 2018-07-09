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
                <el-dropdown class="inline-block">
                  <span class="el-dropdown-link">
                    最近一周<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头黄金糕</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉黄金糕</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶黄金糕</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎黄金糕</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-date-picker
                  class="inline-block"
                  size="small"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" size="small">查询</el-button>
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
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          itemGap: 15,
          data:['报警机故障','邮件营销','联盟广告','视频广告']
        },
        series: [
          {
            name:'报警来源',
            type:'pie',
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            color:['#DBECF8','#76DDFB','#53A8E2','#2C82BE'],
            data:[
              {value:335, name:'报警机故障'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:1548, name:'视频广告'}
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
    padding:0 30px 60px;
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
