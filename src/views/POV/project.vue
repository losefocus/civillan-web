<template>
  <div class="n-box">
    <ul class="p-box" style="background: #f5f5f9">
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
              <p class="d-name">现场设备</p>
            </router-link>
          </li>
          <li class="s-data">
            <router-link to="#">
              <p class="d-num">{{ userTotal }}</p>
              <p class="d-name">施工人员</p>
            </router-link>
          </li>
          <li class="s-data">
            <router-link to="video">
              <p class="d-num">{{ videoTotal }}</p>
              <p class="d-name">影像资料</p>
            </router-link>
          </li>
          <li class="s-data">
            <router-link to="document">
              <p class="d-num">{{ documentTotal }}</p>
              <p class="d-name">文档资料</p>
            </router-link>
          </li>
          <div class="clear"></div>
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
        <d-map :searchStyle="searchStyle" :typeStyle="typeStyle" :newStyle="newStyle"></d-map>
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
  import header from '@/api/userCenter/header'
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
        loading:null,
        polar1:{
          title : {
            text: '报警统计',
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
              name:'报警类型',
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
        searchStyle:{ //搜索框的位置
          top:'0',
          right:'85px',
        },
        typeStyle:{ //类型过滤的位置
          top:'0',
          left:'0',
        },
        newStyle:{
          padding:0,
          height:'100%',
          width:'100%'
        },
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
        userTotal:'',
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
    },
    mounted(){
      this.loading=this.$loading({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.2)'
      });

      let id=this.$cookies.get('projectId');
      let tenant=this.$cookies.get('tenant');

      this.getDeviceTotal(id);
      this.getMediaTotal();
      this.getDocumentTotal(id);
      this.getInfo(id,tenant);
      this.getPersonnel(id);
    },
    methods:{
      enlarge(){
        this.$router.push('/device/deviceMap');
      },
      getDeviceTotal(id){
        //设备总数获取
        deviceList.list({'project_id':id}).then(res=>{
          if(res.success){
            this.loading.close();
            this.deviceTotal=res.result.total;
          }else{
            this.loading.close();
          }
        }).catch(err => {
          this.loading.close();
        });
      },
      getMediaTotal(){
        //影像总数
        media.list().then(res=>{
          if(res.success){
            this.loading.close();
            this.videoTotal=res.result.total
          }else{
            this.loading.close();
          }
        }).catch(err => {
          this.loading.close();
        });
      },
      getDocumentTotal(id){
        //文档总数
        document.list({ project_id:id}).then(res=>{
          if(res.success){
            this.documentTotal=res.result.total;
            this.loading.close();
          }else{
            this.loading.close();
          }
        }).catch(err => {
          this.loading.close();
        });
      },
      getInfo(id,tenant){
        project.info({'project_id':id,'tenant':tenant}).then(res=>{
          if(res.success){
            this.info=res.result;
            this.organTypeList=res.result.organTypeList;
            this.loading.close();
          }else{
            this.loading.close();
          }
        }).catch(err => {
          this.loading.close();
        });
      },
      getPersonnel(id){
        //人员总数
        header.list({'project_id':id}).then(res=>{
          if(res.success){
            this.userTotal=res.result.total;
            this.loading.close();
          }else{
            this.loading.close();
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">

  .echarts {
    width: 100%;
    height: 100%;
  }
  .clear{
    clear: both;
  }
  .n-box{
    height: calc(100% - 40px);
    width:calc(100% - 40px);
    min-height: 756px;
    padding: 20px;
    background: #f5f5f9;
  }
  .p-box{
    height: calc(50% - 10px);
    .p-info{
      float: left;
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


      .s-data{
          float: left;
          margin:0 6%;
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
      .s-data:last-child{
        margin-right: 0 !important;
      }
      .i-box {
        margin-top: 8%;
        background: #ffffff;
        .c-info{
          float: left;
          width: 195px;
          margin: 3% 5px 0 0;
          cursor: pointer;
          display: flex;

          .c-icon{
            float: left;
            padding-top: 6px;
            margin-right: 10px;
            color: #787F87;
          }
          p{
            float: left;
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
      float: left;
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
    height: calc(50% - 10px);
    margin-top: 20px;
    .p-info{
      float: left;
      padding: 20px;
      width: 410px;
      height:calc(100% - 40px);
      background: #ffffff;
      margin-right: 20px;
    }
    .d-map{
      float: left;
      padding: 20px;
      width: calc( 100% - 510px ) ;
      height:calc(100% - 40px);
      background: #ffffff;
    }
  }
</style>
