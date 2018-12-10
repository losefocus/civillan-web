<template>
  <div class="p-box">
    <div class="p-nav">
      <el-button @click="getReturn" icon="el-icon-arrow-left" size="mini">返回</el-button>
      <span class="p-title">过程数据</span>
    </div>
    <div class="p-body">
      <chart :options="polar7" :auto-resize=true></chart>
      <el-table
        :data="tableData"
        border
        style="width: 95%;margin: 0 auto;">
        <el-table-column
          prop="a"
          align="center"
          width="150"
          label="记录时间">
        </el-table-column>
        <el-table-column
          prop="b"
          align="center"
          label="张拉次数">
        </el-table-column>
        <el-table-column
          prop="c"
          align="center"
          label="张拉力1（KN)">
        </el-table-column>
        <el-table-column
          prop="d"
          align="center"
          label="油压1（Mpa)">
        </el-table-column>
        <el-table-column
          prop="e"
          align="center"
          label="顶行程1（mm)">
        </el-table-column>
        <el-table-column
          prop="f"
          align="center"
          label="伸长量1（mm)">
        </el-table-column>
        <el-table-column
          prop="g"
          align="center"
          label="张拉力2（KN)">
        </el-table-column>
        <el-table-column
          prop="h"
          align="center"
          label="油压2（Mpa)">
        </el-table-column>
        <el-table-column
          prop="i"
          align="center"
          label="顶行程2（mm)">
        </el-table-column>
        <el-table-column
          prop="j"
          align="center"
          label="伸长量2（mm)">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  name: "HProcess",
  data(){
    return {
      polar7:{
        tooltip: {
          trigger: 'axis',
          formatter: "{b} <br> 进度: {c}"
        },
        legend: {
          itemWidth: 12,
          itemHeight: 5,
          itemGap: 13,
          textStyle: {
            fontSize: 12,
            color: '#333'
          },
          right:'3%'
        },
        grid: {
          top:'10%',
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '张拉力1',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          itemStyle: {
            normal: {
              color: '#50C9F9',
              borderColor: '#50C9F9',
            }
          },
        },{
          name: '油压1',
          data: [220, 332, 101, 534, 890, 730, 520],
          type: 'line',
          itemStyle: {
            normal: {
              color: '#47f944',
              borderColor: '#47f944',
            }
          },
        },{
          name: '顶行程1',
          data: [420, 1132, 1301, 534, 390, 530, 1520],
          type: 'line',
          itemStyle: {
            normal: {
              color: '#f95bd6',
              borderColor: '#f95bd6',
            }
          },
        },{
          name: '伸长量1',
          data: [120, 232, 301, 434, 590, 430, 320],
          type: 'line',
          itemStyle: {
            normal: {
              color: '#f97636',
              borderColor: '#f97636',
            }
          },
        },]
      },
      tableData: [
        {
        a: '2018-10-21 18:20:55',
        b: '11',
        c: '5.6',
        d: '18.6',
        e: '28.5',
        f: '26.3',
        g: '58.6',
        h: '18.6',
        i: '273.4',
        j: '283.6',
        k: '283.6',
      }, {
        a: '2018-10-21 18:20:55',
        b: '11',
        c: '5.6',
        d: '18.6',
        e: '28.5',
        f: '26.3',
        g: '58.6',
        h: '18.6',
        i: '273.4',
        j: '283.6',
        k: '283.6',
      },{
        a: '2018-10-21 18:20:55',
        b: '11',
        c: '5.6',
        d: '18.6',
        e: '28.5',
        f: '26.3',
        g: '58.6',
        h: '18.6',
        i: '273.4',
        j: '283.6',
        k: '283.6',
      },{
        a: '2018-10-21 18:20:55',
        b: '11',
        c: '5.6',
        d: '18.6',
        e: '28.5',
        f: '26.3',
        g: '58.6',
        h: '18.6',
        i: '273.4',
        j: '283.6',
        k: '283.6',
      },{
        a: '2018-10-21 18:20:55',
        b: '11',
        c: '5.6',
        d: '18.6',
        e: '28.5',
        f: '26.3',
        g: '58.6',
        h: '18.6',
        i: '273.4',
        j: '283.6',
        k: '283.6',
      },{
        a: '2018-10-21 18:20:55',
        b: '11',
        c: '5.6',
        d: '18.6',
        e: '28.5',
        f: '26.3',
        g: '58.6',
        h: '18.6',
        i: '273.4',
        j: '283.6',
        k: '283.6',
      }]
    }
  },
  methods:{
    getReturn(){
      this.$bus.emit('tab',1)
    },

  }
}
</script>

<style scoped lang="scss">

  .echarts {
    width: 100%;
    height: 50%;
  }
  .p-box{
    width: 100%;
    height: 100%;
    .p-nav{
      height: 40px;
      line-height: 40px;
      .p-title{
        font-weight: bold;
        font-size: 20px;
        margin-left: 20px;
        vertical-align: middle;
      }
    }
    .p-body{
      width: 100%;
      margin-top: 10px;
      height: calc(100% - 40px);
      background: #ffffff;
    }
  }
</style>
