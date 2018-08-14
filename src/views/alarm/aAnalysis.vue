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
                <el-select v-model="device" filterable remote :remote-method="deviceSearch" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;" clearable >
                  <!--<div style="width: 90%">
                    <el-input
                      style="width: 96%;margin:0 0 2% 2%"
                      size="mini"
                      placeholder="请输入内容"
                      suffix-icon="el-icon-search"
                      v-model="input9">
                    </el-input>
                  </div>-->
                  <!--<el-input suffix-icon="el-icon-search" @input="deviceSearch()" v-model="deviceName" size="mini" style="width: 92%;margin:0 0 2% 4%" placeholder="请输入内容"></el-input>-->
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
                  class="inline-block"
                  size="mini"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="info" size="mini">查询</el-button>
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
  import deviceList from '@/api/project/deviceList'
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
  created(){
    this.getDeviceList(this.device_data);
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
