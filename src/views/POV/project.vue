<template>
  <div style="height: 820px">
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
          <span class="">{{ info.beginAt*1000 | formatDate }} 至 {{info.endAt*1000 | formatDate}}</span>
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
        <div id="container" style="width: 100%;height: 100%">
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


  import deviceGrouping from '@/api/project/deviceGrouping'
  import project from '@/api/userCenter/project'
  import {formatDate} from '@/common/formatDate.js';
  export default {

    name: "project",
    data(){
      return{
        polar1:{
          title : {
            text: '统计分析',
            x:'left'
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
      let id=this.$store.state.project.projectId;
      let project_id=sessionStorage.getItem('projectId');
      let tenant=this.$store.state.project.tenant;

      //设备总数获取
      deviceList.list({'project_id':project_id}).then(res=>{
        console.log(res);
        if(res.success){
          this.deviceTotal=res.result.total;
        }else{
          //console.log("设备列表获取失败")
        }
      });
      //影像总数
      media.list().then(res=>{
        this.videoTotal=res.result.total
      });
      //文档总数
      document.list({ project_id:sessionStorage.getItem('projectId')}).then(res=>{
        console.log(res.result.total);
        this.documentTotal=res.result.total
      });

      project.info({'project_id':id,'tenant':tenant}).then(res=>{
        //console.log(res);
        this.info=res.result;
        this.organTypeList=res.result.organTypeList;
      })
    },
    mounted: function () {
      this.init()
    },
    methods:{
      init(){
        let project_id=sessionStorage.getItem('projectId')
        let map = new AMap.Map('container', {
          center: [116.397428, 39.90923],
          zoom: 5
        });
        /*AMap.plugin(['AMap.ToolBar', 'AMap.Scale','AMap.MapType'], function () {
          map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.Scale());
          map.addControl(new AMap.MapType(
            {defaultType:0,showTraffic:false,position:{top:'100px'}}
          ))
        });*/
        //获取设备列表
        let cluster, markers = [];
        let sts=[
          {
            url:marker,
            size:new AMap.Size(32,32),
            offset:new AMap.Pixel(-16,-30)
          },
          {
            url:stateMarker,
            size:new AMap.Size(32,32),
            offset:new AMap.Pixel(-16,-30)
          },
          {
            url:marker,
            size:new AMap.Size(48,48),
            offset:new AMap.Pixel(-24,-45),
            textColor:'#CC0066'
          }
        ];

        deviceList.list({'project_id':project_id}).then(res=>{
          if(res.success){
            var lists=res.result.items;
            JSON.stringify();
            for(var i=0;i<lists.length;i++){
              //console.log(lists[i]);
              if(lists[i].position){
                var marker=new AMap.Marker({
                  position:lists[i].position.split(','),
                  content: '<div style="background:url('+stateMarker+') no-repeat; height: 40px; width: 30px; border-radius: 12px; "></div>',
                  offset: new AMap.Pixel(-15,-15)
                });
                marker.on('click',function (e) {

                });
                // 设置label标签
                marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                  offset: new AMap.Pixel(-35, -25),//修改label相对于maker的位置
                  content: "<div style='background: rgba(102,208,110,1);width: 100px;height: 20px;line-height: 20px;text-align: center;color:#ffffff;'>"+lists[i].product.productCategory.name+"</div>"
                });
                markers.push(marker)
              }else{
                //console.log('没有经纬度')
              }
            }
          }
          //console.log(markers);
          AMap.plugin(["AMap.MarkerClusterer"],function() {
            var cluster = new AMap.MarkerClusterer(map,markers,{styles:sts});
            var a=function(e){
              //console.log('好的')
            };
            //cluster.on('click',a)
          });
          //this.items=res.result.items;

          /*this.items.forEach((item,i)=>{
            console.log(item.position.split(','));
            markers.push(new AMap.Marker({
              position:item.position,
              content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
              offset: new AMap.Pixel(-15,-15)
            }))
          });*/
        });
        //console.log(markers);
      },
    }
  }
</script>

<style scoped lang="scss">

  .echarts {
    width: 100%;
    height: 400px;
  }
  .p-box{
    display: flex;
    .p-info{
      padding: 20px;
      width: 410px;
      height:400px;
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
        margin-top: 40px;
        color: #666666;
        .t-title{
          font-weight: bold;
        }
      }
      .i-statistics{

        width: 100%;
        padding: 0 5% 0 0;
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
        .s-data{
          cursor: pointer;
          .d-num{
            text-align: center;
            font-size: 22px;
            color: #24BCF7;
          }
          .d-name{
            margin-top: 10px;
            font-size: 12px;
            color: #666666;
          }
        }
      }
      .i-box {
        margin-top: 30px;
        background: #ffffff;
        display: flex;
        //justify-content: space-between;
        flex-flow: wrap;
        .c-info{
          width: 195px;
          margin: 20px 5px 0 0;
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
      width: calc( 100% - 470px ) ;
      height:440px;
      background: #ffffff;
    }
  }
  .a-box{
    display: flex;
    margin-top: 20px;
    .p-info{
      padding: 20px;
      width: 410px;
      height:400px;
      background: #ffffff;
      margin-right: 20px;

    }
    .d-map{
      padding: 20px;
      width: calc( 100% - 510px ) ;
      height:400px;
      background: #ffffff;
    }
  }
</style>
