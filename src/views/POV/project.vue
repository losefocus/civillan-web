<template>
  <div style="height: 100%;min-height: 756px">
    <ul class="p-box">
      <li class="p-info">
        <div class="i-name">
          {{ info.name }}
          <el-popover
            placement="right-start"
            width="400"
            trigger="click"
          >
            <p>{{ info.comment }}</p>
            <span class="d-content" slot="reference"><span class="el-icon-info"></span></span>
          </el-popover>
        </div>
        <div class="i-time">
          <span class="t-title">项目工期：</span>
          <span class="t-date">{{ info.beginAt*1000 | formatDate }} 至 {{info.endAt*1000 | formatDate}}</span>
          <el-progress style="width: 100%;margin-top: 10px" :percentage="70" color="#24BCF7"></el-progress>
        </div>
        <ul class="i-statistics">
          <li class="s-data">
            <router-link to="device">
              <p class="d-num">{{ deviceTotal }}</p>
              <p class="d-name">设备</p>
            </router-link>
          </li>
          <li class="s-data">
            <router-link to="#">
              <p class="d-num">30</p>
              <p class="d-name">人员</p>
            </router-link>
          </li>
          <li class="s-data">
            <router-link to="video">
              <p class="d-num">{{ videoTotal }}</p>
              <p class="d-name">影像</p>
            </router-link>
          </li>
          <li class="s-data">
            <router-link to="document">
              <p class="d-num">{{ documentTotal }}</p>
              <p class="d-name">文档</p>
            </router-link>
          </li>
        </ul>
        <div class="i-box p-item" style="width: 100%;">
          <el-popover
            placement="left"
            trigger="click"
            v-for="(list,index) in organTypeList"
            :key="index"
          >
            <p style="line-height: 30px">{{list.organList[0].name}}</p>
            <p style="line-height: 30px">{{list.organList[0].address}}</p>
            <p style="line-height: 30px"><span style="margin-right: 20px">{{list.organList[0].contact}}</span> <span>{{list.organList[0].phone}}</span></p>
            <div class="c-info c-infoM" slot="reference">
              <div class="c-icon">
                <span class="iconfont icon-house"></span>
              </div>

              <div>
                <h2>{{list.name}}</h2>
                <p>{{list.organList[0].name}}</p>
              </div>

            </div>
          </el-popover>
        </div>
      </li>
      <li class="d-map">
        <d-map></d-map>
        <div class="m-searchBox" @click="enlarge()">
          <span class="iconfont icon-dEnlarge"></span>
        </div>
      </li>
    </ul>
    <ul class="a-box">
      <li class="p-info">
        <chart :options="polar1" :auto-resize=true></chart>
      </li>
      <li class="d-map">
        <chart :options="polar2" :auto-resize=true></chart>
      </li>
    </ul>
  </div>
</template>

<script>
  import deviceList from '@/api/project/deviceList'
  import document from '@/api/project/document'
  import media from '@/api/video/media'
  import marker from '@/assets/AMap/marker.png'
  import stateMarker from '@/assets/AMap/marker.png'

  import dMap from '@/views/Project/deviceMap.vue'

  import deviceGrouping from '@/api/project/deviceGrouping'
  import project from '@/api/userCenter/project'
  import {formatDate} from '@/common/formatDate.js';

  import Bus from '@/common/eventBus'
  export default {
    name: "project",
    components:{
      dMap
    },
    data(){
      return{
        polar1:{
          title : {
            text: '统计分析',
            x:'left'
          },
          toolbox: {
            feature: {
              restore: {
                title:'刷新'
              },
              saveAsImage: {
                title:'下载'
              }
            },
          },
          aria: {
            show: true
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          /*legend: {
            type: 'scroll',
            orient: 'horizontal',
            top:50,
            x: 'left',
            itemGap: 10,
            data:['设备故障','下钻速度异常','电流异常','掺量异常','电压异常','流量异常']
          },*/
          series: [
            {
              name:'报警来源',
              type:'pie',
              radius : '65%',
              center: ['50%', '55%'],
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
              ]
            }
          ]
        }, //统计分析图表
        polar2:{
          color: ['#3398DB'],
          title: {
            text: '施工进度',
            //textStyle: {
            //    color: '#fff'
            //}
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{b} <br> 进度: {c}%"
          },
          toolbox: {
            feature: {
              restore: {
                title:'刷新'
              },
              saveAsImage: {
                title:'下载'
              }
            },
          },
          /*legend: {
              data: [date]
          },*/
          grid: {
            left: '4%',
            right: '4%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value}%',
              textStyle: {
                //color: '#fff',
                fontWeight: '80'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['拌和站', '路基路面', '桥梁工程', '软基处理'],
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 0,
              margin: 10,
              inside: false,
              textStyle: {
                //color: '#fff',
                fontWeight: '50'
              }
            }
          },
          series: [{
            type: 'bar',
            barWidth:'50%',
            label: {
              normal: {
                show: true,
                 formatter: '{c}%',
                /*formatter: function(v) {
                  var val = v.data;
                  if (val == 0) {
                    return '';
                  }
                  return val;
                },*/
                color: '#fff'
              }
            },
            data: [66, 33, 44, 55]
          }]
        }, //施工进度图表
        info:{}, //项目信息
        organTypeList:{}, //单位信息
        lists:{},
        deviceTotal:"", //设备总数，
        videoTotal:'', //影像总数，
        documentTotal:'', // 文档总数
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
      }
    },
    created(){
      const loading=this.$loading({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.2)'
      });

      let id=this.$store.state.project.projectId;
      let project_id=sessionStorage.getItem('projectId');
      let tenant=this.$store.state.project.tenant;

      //设备总数获取
      deviceList.list({'project_id':project_id}).then(res=>{
        console.log(res);
        if(res.success){
          loading.close();
          this.deviceTotal=res.result.total;
        }else{
          loading.close();
        }
      });
      //影像总数
      media.list().then(res=>{
        if(res.success){
          loading.close();
          this.videoTotal=res.result.total
        }else{
          loading.close();
        }
      });
      //文档总数
      document.list({ project_id:sessionStorage.getItem('projectId')}).then(res=>{
        console.log(res.result.total);
        if(res.success){
          this.documentTotal=res.result.total;
          loading.close();
        }else{
          loading.close();
        }
      });

      project.info({'project_id':id,'tenant':tenant}).then(res=>{
        //console.log(res);
        if(res.success){
          loading.close();
          this.info=res.result;
          this.organTypeList=res.result.organTypeList;
        }else{
          loading.close();
        }
      })
    },
    mounted(){

    },
    methods:{
      enlarge(){
        this.$router.push('/device/deviceMap');
      }
    }
  }
</script>

<style scoped lang="scss">

  .echarts {
    width: 100%;
    height: 100%;
  }
  .p-box{
    height: 50%;
    display: flex;
    .p-info{
      display: flex;
      flex-flow: wrap;
      padding: 20px;
      width: 410px;
      height:calc(100% - 40px);
      min-height: 335px;
      background: #ffffff;
      margin-right: 20px;
      .i-name{
        font-size:18px;
        color:rgba(51,51,51,1);
        font-weight: 800;
        .d-content{
          cursor: pointer;
        }
      }
      .i-time{
        margin-top: 6%;
        color: #666666;
        width: 100%;
        .t-title{
          font-weight: bold;
        }
        .t-date{
          font-family:"微软雅黑";
          font-size: 14px;
        }
      }
      .i-statistics{
        width: 100%;
        padding: 0 5% 0 0;
        margin-top: 5%;
        display: flex;
        justify-content: space-around;
        .s-data{
          cursor: pointer;
          .d-num{
            text-align: center;
            font-size: 32px;
            color: #24BCF7;
            font-weight: bold;
          }
          .d-name{
            margin-top: 10px;
            font-size: 12px;
            color: #666666;
          }
        }
      }
      .i-box {
        margin-top: 8%;
        background: #ffffff;
        display: flex;
        //justify-content: space-between;
        flex-flow: wrap;
        .c-info{
          width: 195px;
          margin: 3% 5px 0 0;
          cursor: pointer;
          display: flex;

          .c-icon{
            padding-top: 3px;
            margin-right: 10px;
            color: #787F87;
          }
          p{
            width: 160px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            margin-top: 3px;
            font-size:12px;
            color:rgba(102,102,102,1);
            line-height:17px;
          }
        }
        .c-infoM{
          margin-bottom: 24px;
        }
      }
    }
    .d-map{
      width: calc( 100% - 470px );
      height:100%;
      min-height: 375px;
      background: #ffffff;
      position: relative;
      .m-searchBox{
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        text-align: center;
        background: #ffffff;
        box-shadow:0px -1px 0px 0px rgba(0,0,0,0.02),0px 3px 6px 0px rgba(0,0,0,0.2);
        position: absolute;
        top:15px;
        right: 15px;
        cursor: pointer;
      }
    }
  }
  .a-box{
    height: calc(50% - 20px);
    display: flex;
    margin-top: 20px;
    .p-info{
      padding: 20px;
      width: 410px;
      height:calc(100% - 40px);
      background: #ffffff;
      margin-right: 20px;

    }
    .d-map{
      padding: 20px;
      width: calc( 100% - 510px ) ;
      height:calc(100% - 40px);
      background: #ffffff;
    }
  }
</style>
