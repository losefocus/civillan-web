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
        <div class="t-workSchedule">
          作业进度
        </div>
        <el-carousel  indicator-position="outside" :autoplay="false" trigger="click" style="height: calc(100% - 40px);">
          <el-carousel-item v-for="(items,index) in deviceList" :key="index">
            <ul style="width: 100%;height: 100%">
              <li class="b-device" v-for="(item,i) in items" :key="i">
                <div class="d-name">{{item.name}}</div>
                <ul class="d-progress">
                  <li class="p-title"><span>进度</span></li>
                  <li class="p-progress">
                    <el-progress :percentage="70" :show-text="false"></el-progress>
                  </li>
                  <div style="clear: both"></div>
                </ul>
                <ul class="d-Statistics">
                  <li class="s-body">
                    <div class="s-title">作业总数</div>
                    <div class="s-num">300</div>
                  </li>
                  <li class="s-body">
                    <div class="s-title">已完成</div>
                    <div class="s-num">200</div>
                  </li>
                  <li class="s-body">
                    <div class="s-title">剩余</div>
                    <div class="s-num">100</div>
                  </li>
                  <li class="s-body">
                    <div class="s-title">合格率</div>
                    <div class="s-num">60</div>
                  </li>
                </ul>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </li>
    </ul>
  </div>
</template>

<script>
  import deviceList from '@/api/project/deviceList'
  import header from '@/api/userCenter/header'
  import document from '@/api/project/document'
  import media from '@/api/video/media'
  import dMap from '@/views/Project/deviceMap.vue'
  import project from '@/api/userCenter/project'
  import {formatDate} from '@/common/formatDate.js';
  import categories from '@/api/configure/categories'

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
            text: '报警分布',
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
              radius : '45%',
              center: ['50%', '55%'],
              avoidLabelOverlap: true,
              labelLine: {
                normal: {
                  show: true
                }
              },
              data:[
                {value:1563, name:'搅拌桩故障'},
                {value:310, name:'泡沫混凝土故障'},
                {value:234, name:'喷淋故障'},
                {value:1244, name:'预应力张拉故障'},
                {value:548, name:'预应力压浆故障'},
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
        allListQuery:{ //类型select列表请求参数
          page_index: 1,
          page_size: 999,
          direction:'asc',
          sort_by:'sort'
        },
        deviceList:[],
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
      this.getDeviceType();
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
      },
      getDeviceType(){
        categories.list(this.allListQuery).then(res => {
          let items = res.result.items;
          let allData = []; //用来装处理完的数组
          let currData = []; //子数组用来存分割完的数据
          //循环需要处理的数组
          for(var i = 0; i < items.length; i++) {
            //将chartArr[i]添加到子数组
            currData.push(items[i]);
            //在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
            if((i != 0 && (i + 1) % 4 == 0) || i == items.length - 1) {
              //把currData加到allData里
              allData.push(currData);
              //在这里清空currData
              currData = [];
            }
          }
          this.deviceList=allData
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  /*.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }*/
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
      box-shadow:0px 3px 4px 0px rgba(144,164,183,0.2);
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
      box-shadow:0px 3px 4px 0px rgba(144,164,183,0.2);
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
      box-shadow:0px 3px 4px 0px rgba(144,164,183,0.2);
    }
    .d-map{
      box-shadow:0px 3px 4px 0px rgba(144,164,183,0.2);
      float: left;
      padding: 20px;
      width: calc( 100% - 510px ) ;
      height:calc(100% - 40px);
      background: #ffffff;
      .t-workSchedule{
        width:100%;
        height: 40px;
        font-weight: bold;
        font-size: 18px;
      }
      .b-device{
        margin-top: 10px;
        width: 22%;
        height: calc(98% - 60px);
        background: #6fdde8;
        float: left;
        margin-right: 1%;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 8px 0px rgba(144,164,183,0.5);
        padding:20px 1%;
        .d-name{
          font-size: 18px;
          font-weight: bold;
          margin-left: 10%;
        }
        .d-progress{
          margin-top: 10%;
          margin-left: 10%;
          .p-title{
            width: 20%;
            font-size: 12px;
            float: left;
          }
          .p-progress{
            padding-top: 4%;
            width: 70%;
            float: left;
          }
        }
        .d-Statistics{
          text-align: center;
          .s-body{
            width: 50%;
            float: left;
            margin-top: 15%;
            .s-title{
              font-size: 14px;
              color:#666666;
            }
            .s-num{
              margin-top: 8%;
              font-weight: bold;
              font-size: 20px;
              color: #333333;
            }
          }
        }
      }
      .b-device:first-child{
        margin-left: 0.5%;
      }
      .b-device:last-child{
        margin-right: 0;
      }
    }
  }
</style>
