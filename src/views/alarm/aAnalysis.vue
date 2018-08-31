<template>
<div>
  <div class="e-box">
    <!-- 标题和控制栏 -->
    <div class="t-analysis" v-if="!isShow">
      <chart :options="analysisPolar" :auto-resize=true></chart>
    </div>
    <div class="a-screen">
      <div class="c-box">
        <div class="c-query">
          <el-select v-model="device" filterable :filter-method="deviceSearch" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;width: 34%" clearable >
            <el-option
              v-for="(item,index) in deviceSelect"
              :key="index"
              :label="item.name"
              :value="index">
            </el-option>
            <el-pagination
              @current-change="deviceCurrentChange"
              small
              :pager-count="5"
              :current-page="device_data.page_index"
              :page-size="device_data.page_size"
              layout="prev, pager, next"
              :total="deviceTotal">
            </el-pagination>
          </el-select>

          <el-date-picker
            size="mini"
            v-model="value7"
            type="daterange"
            align="center"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2" style="margin: 0 5px;">
          </el-date-picker>
          <div class="c-button">
            <el-button type="info" size="mini">查询</el-button>
          </div>
          <div class="c-button">
            <el-button type="info" size="mini">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="a-chart">
      <div class="e-body">
        <chart :options="devicePolar" :auto-resize=true></chart>
      </div>
      <div class="e-body">
        <chart :options="alarmPolar" :auto-resize=true></chart>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import deviceList from '@/api/project/deviceList'
export default {
  name: "analysis",
  data(){
    return{
      devicePolar:{
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
          top:'30',
          itemGap: 15,
          data:['设备故障','下钻速度异常','电流异常','掺量异常','电压异常','流量异常','压力异常','喷浆异常','测量异常']
        },
        series: [
          {
            name:'报警来源',
            type:'pie',
            radius: '60%',
            center: ['55%', '50%'],
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
      analysisPolar:{
        title : {
          text: '总量分析',
          x:'left',
        },
        color: ['#3398DB'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6', '设备7','设备8','设备9','设备10','设备11','设备12',],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220,310,230,280,180,80]
          }
        ]
      },
      alarmPolar:{
        title : {
          text: '报警数量',
          x:'center',
          top:'20',
          textStyle: {
            fontSize: 18,
            color: '#333333'
          }
        },
        backgroundColor: '#ffffff',
        name: 'a',
        tooltip: {
          trigger: 'axis', //按x轴显示
          show: true,
          axisPointer: {
            lineStyle: {
              color: 'none', //不显示线条
            },
          },
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          textStyle: {
            align: 'left',
            fontSize: 12,
            color: '#333333',
          },
          extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
        },
        color: ['#0580f2', '#faa732', '#e1575d'],
        grid: {
          left: '5%',
          right: '6%',
          top: '25%',
          bottom: '3%',
          containLabel: true
        },
        /*legend: {
          show: true,
          icon: 'circle',
          top:'10%',
          x:'right',
          textStyle: {
            fontSize: 12,
            color: '#333333'
          },
          data: ['Legend 1', 'Legend 2', 'Legend 3']
        },*/
        xAxis: {
          show: true,
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#eeeeee',
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: 14,
              color: '#999999'
            }
          },
          data: ['8-2', '8-4', '8-6', '8-8', '8-10', '8-12']
        },
        yAxis: {
          show: true,
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f2f3f7'
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#999999'
            }
          }
        },
        series: [{
          name: 'Legend 1',
          type: 'line',
          symbol: 'circle',
          itemStyle: {
            emphasis: {
              symbol: 'circle',
            }
          },
          symbolSize: [8, 8],
          data: [1, 0, 1, 4, 10, 8]
        }, {
          name: 'Legend 2',
          type: 'line',
          symbol: 'circle',
          symbolSize: [8, 8],
          data: [2, 1, 3, 3, 5, 6]
        }, {
          name: 'Legend 3',
          type: 'line',
          symbol: 'circle',
          symbolSize: [8, 8],
          data: [4, 4, 4, 10, 15, 3]
        }]
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value6: '',
      value7: [],
      device:'', //设备选定值
      deviceSelect:[], //设备select列表
      device_data:{//全部设备select列表
        page_index:1,
        page_size:5,
        name:''
      },
      deviceTotal:0,
      deviceName:''
    }
  },
  props:['isShow'],
  created(){
    this.getDeviceList(this.device_data);
    console.log(this.isShow)
  },
  methods:{
    deviceCurrentChange:function(currentPage){ //全部设备select当前页
      this.device_data.page_index=currentPage;
      this.getDeviceList(this.device_data);
    },
    deviceChange(val){ //类型改变
      console.log(val);
      this.deviceKey=val;
    },
    deviceSearch(query){ //select搜索框
      this.device_data.page_index=1;
      this.device_data.page_size=5;
      this.device_data.name=query;
      this.getDeviceList(this.device_data);
    },
    getDeviceList(post_data){
      let _this=this;
      deviceList.list(post_data).then(res=>{
        console.log(res);
        _this.deviceSelect=res.result.items;
        _this.deviceTotal=res.result.total;
        console.log(_this.deviceTotal)
      });
    },
  }
}
</script>

<style scoped lang="scss">
  .echarts {
    width: 100%;
    height: 100%;
  }
  .a-chart{
    display: flex;
    width: 100%;
    height: 350px;
    justify-content: space-between;
    margin: 20px 0 20px;
    .e-body{
      background: #ffffff;
      width: calc(50% - 50px);
      padding: 20px;
    }

  }
  .c-box{

    padding: 0 2% 20px;
    border:1px solid rgba(230,234,238,1);
    background: #fff;
    display: flex;
    justify-content: space-between;
    .c-query{
      width: 600px;
      margin-top: 20px;
      margin-right: 30px;
      display: flex;
      justify-content: space-between;
      .c-button{
        margin:0 3px;
      }
      .el-dropdown-link{
        cursor: pointer;
        width: 140px;
        height: 20px;
        .c-title{
          font-size: 12px;
          color: #666666;
        }

        .el-icon--right{
          margin-left: 10px;
          font-size: 18px;
          color: #4F5059;
        }
      }
    }
  };
  .t-analysis{
    width: calc(100% - 40px);
    height: 300px;
    background: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
  }
  .control-box{
    padding: 20px 30px;
    //background: #fff;
    border-bottom:1px solid rgba(235,237,248,1);
    margin-bottom: 30px;
    .title{
      font-size: 24px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
</style>
