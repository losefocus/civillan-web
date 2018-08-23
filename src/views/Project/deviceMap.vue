<template>
<div style="width: 100%;height:100%;position: relative">
  <div class="m-screen">
    <div class="s-box">
      <input v-model="searchKey" id="deviceSearch" name="deviceSearch" type="text">
      <label for="deviceSearch" class="m-iconBox" @click="search()">
        <span class="el-icon-search"></span>
      </label>
    </div>
    <div class="s-box s-box1">
      <el-select size="small" v-model="productType" placeholder="按类型过滤" style="width: 120px">
        <el-option
          v-for="item in productLists"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
    </div>


  </div>
  <div id="container" style="width: 100%;height: 100%">
  </div>
  <el-dialog
    :visible.sync="dialogVisible"
    :width="dialogWidth"
    :fullscreen="dialogFullscreen"
    top="12vh"
    style="min-width: 1024px;"
  >
    <ul class="t-header">
      <li v-for="(tab,index) in tHeader" :key="index" @click="changeTab(index)" :class="{active:index==tIndex}"> {{tab.name}}</li>
      <div class="t-handle" v-show="isShow">
        <div @click="isFullscreen()"><i class="iconfont" :class="{'icon-dEnlarge':changeIcon==true,'icon-dNarrow':changeIcon==false}"></i></div>
      </div>
    </ul>
    <r-state :deviceName="deviceName"  v-if="dialogVisible" :is="currentView" keep-alive :device-key="deviceKey"  :dialogFullscreen="dialogFullscreen" class="t-Body" :style="dialogHeight" @dialogFullscreen="changeScreen"></r-state>
  </el-dialog>
</div>
</template>

<script>
  import deviceList from '@/api/project/deviceList'
  import marker from '@/assets/AMap/marker.png'
  import deviceMarker from '@/assets/device/deviceMarker.png'
  import devicePolymerization from '@/assets/device/devicePolymerization.png'
  import stateMarker from '@/assets/AMap/marker.png'


  import SAnalysis from '@/views/softBase/SAnalysis'
  import RState from '@/views/softBase/RState'
  import AQuery from '@/views/softBase/AQuery'
  import HData from '@/views/softBase/HData'
  import NRecord from '@/views/softBase/NRecord'
export default {
  name: "deviceMap",
  components:{
    SAnalysis,
    RState,
    AQuery,
    HData,
    NRecord,
  },
  data(){
    return{
      isActive:sessionStorage.getItem('aActive') || 0,
      navList:[],
      productLists:[],
      productType:'',
      isShow:true,
      dialogVisible: false,
      dialogWidth:'70%',
      dialogHeight:{
        height:'700px'
      },
      searchKey:'',
      dialogFullscreen:false,
      changeIcon:true,
      radio:"",
      line: 'v',
      items: [],
      group_id:0,
      deviceKey:'',
      deviceName:'',
      tHeader:[
        {name:'运行状况'},
        {name:'历史数据'},
        {name:'统计分析'},
        //{name:'通知记录'},
        {name:'故障报警'},
      ],
      tBody:[
        'RState',
        'HData',
        'SAnalysis',
        //'NRecord',
        'AQuery',
      ],
      tIndex:0,
      currentView:'RState',
      isBusy: false,
      post_data:{},
    }
  },
  mounted: function () {
    let project_id=sessionStorage.getItem('projectId');
    this.post_data.project_id=project_id;
    this.init(this.post_data)

  },
  methods:{
    init(post_data){
      let _this=this;

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
          url:devicePolymerization,
          size:new AMap.Size(24,34),
          offset:new AMap.Pixel(-16,-30),
          textColor:'#ffffff',
          textSize:16
        },
        {
          url:stateMarker,
          size:new AMap.Size(32,39),
          offset:new AMap.Pixel(-16,-30)
        },
        {
          url:marker,
          size:new AMap.Size(48,48),
          offset:new AMap.Pixel(-24,-45),
          textColor:'#CC0066'
        }
      ];

      deviceList.list(post_data).then(res=>{
        if(res.success){
          let lists=res.result.items;
          let infoWindow= new AMap.InfoWindow({offset: new AMap.Pixel(0, 5)});
          JSON.stringify();
          for(let i=0;i<lists.length;i++){
            //console.log(lists[i]);
            if(lists[i].position){
              let marker=new AMap.Marker({
                position:lists[i].position.split(','),
                content: '<div style="background:url('+deviceMarker+') no-repeat; height: 40px; width: 32px; border-radius: 12px; "></div>',
                offset: new AMap.Pixel(-15,-15),
                lists:lists[i]
              });

              marker.on('click',function (e) {
                console.log(e.target);
                let items=e.target.G.lists;
                let content='<div class="device_content">' +
                  '<div class="device_img" style="background: url('+items.thumbnailBaseUrl+items.thumbnailPath+') no-repeat;background-size: 100% 100%;"></div>'+
                  '<div class="device_info">' +
                  '<div class="device_name">'+items.name+'</div>'+
                  '<div class="device_company">'+items.comment+'</div>'+
                  '<div class="device_stateContent">'+
                  '<div class="device_state">下钻中</div>'+
                  '<a class="device_details">详情 ></a>'+
                  '</div>'+
                  '</div>'+
                  '</div>';
                AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
                  infoWindow = new SimpleInfoWindow({
                    infoBody: content,
                    //基点指向marker的头部位置
                    offset: new AMap.Pixel(-4, -10)
                  });

                  /*infoWindow.get$Container().on('click', function(event) {

                    alert('Click infoWindow');
                  });

                  infoWindow.get$InfoTitle().on('click', function(event) {

                    //阻止冒泡
                    event.stopPropagation();

                    alert('Click infoTitle');

                  });*/

                  infoWindow.get$InfoBody().on('click', '.device_details', function(event) {

                    //阻止冒泡
                    event.stopPropagation();

                    _this.dialogVisible=true;
                    _this.deviceName=items.name;
                    sessionStorage.setItem('deviceName',items.name);
                    _this.deviceKey=items.key;
                    console.log(items.name)

                  });
                  infoWindow.open(map, e.target.getPosition());
                });
                console.log(e.target.G.lists);

                //console.log(e.target.getPosition());
                //infoWindow.setContent(content);
                infoWindow.open(map, e.target.getPosition());
                map.setZoomAndCenter(14, e.target.getPosition());
              });


              // 设置label标签
              marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(-140, -25),//修改label相对于maker的位置
                content:"<div class='deviceLabelBox'>"+"<span class='deviceLabel'>"+lists[i].name+"</span>"+"</div>"
              });

              map.add(marker);
              map.setFitView();
              markers.push(marker)
            }else{
              //console.log('没有经纬度')
            }
          }
        }
        //console.log(markers);
        /*AMap.plugin(["AMap.MarkerClusterer"],function() {
          var cluster = new AMap.MarkerClusterer(map,markers,{styles:sts});
          console.log(cluster.getMaxZoom( ));
          var a=function(e){
            //console.log('好的')
          };
          cluster.on('click',a)
        });*/
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
    radioEvent(){
      this.dialogVisible = false;
    },
    search(){
      this.post_data.name=this.searchKey;
      this.init(this.post_data)
    },
    getDetails(item,index){ //获取详情
      this.dialogVisible=true;
      this.deviceName=item.name;
      sessionStorage.setItem('deviceName',item.name);
      this.deviceKey=item.key;
      console.log(item.name)
    },
    changeTab(i){ //模态框tab
      this.tIndex=i;
      this.currentView=this.tBody[i]
    },
    isFullscreen(){ //是否打开模态框
      console.log(this.changeIcon);
      if(this.changeIcon){
        this.dialogWidth='100%';
        this.dialogHeight={
          height:'87%'
        };
        this.dialogFullscreen=true;
        this.changeIcon=!this.changeIcon;
      }else{
        this.dialogWidth='70%';
        this.dialogHeight={
          height:'580px'
        };
        this.dialogFullscreen=false;
        this.changeIcon=!this.changeIcon
      }
    },
    changeScreen(data){
      console.log(data);
      this.changeIcon=data;
      this.isFullscreen();
    },
    close(){

    },
  }
}
</script>

<style scoped lang="scss">
  .m-screen{
    display: flex;
    justify-content: space-around;
    height: 30px;
    top: 30px;
    left: 10px;
    position: absolute;
    z-index: 9999;
    .s-box{
      box-shadow:0px -1px 0px 0px rgba(0,0,0,0.02),0px 3px 6px 0px rgba(0,0,0,0.2);
    }
    .s-box1{
      margin-left: 10px;
    }
    #deviceSearch{
      height: 30px;
      padding-left: 10px;
      border: none;
      vertical-align: top;
      outline: medium;
      border-radius: 4px 0 0 4px;

    }
    .m-iconBox{
      vertical-align: top;
      display: inline-block;
      background: #F31A1A;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 0 4px 4px 0;
      height: 30px;
      color: #ffffff;
      margin-left: -4px;

    }
  }
  #container{
    position: relative;

  }
  .t-header{
    height: 45px;
    background: #ffffff;
    li{
      cursor: pointer;
      float: left;
      width:160px;
      height:45px;
      text-align: center;
      line-height: 45px;
      font-size:14px;
      color:rgba(153,153,153,1);
    }
    .t-handle{
      float: right;
      width: 60px;
      height: 45px;
      line-height: 45px;
      margin-right: 30px;
      display: flex;
      justify-content: space-around;
    div{
      cursor: pointer;
    }
  }
  .active {
    background-color: #F85959;
    color: #ffffff;
  }
  }
  .t-Body{
    overflow: auto;
    padding: 1.5% 1%;
    background: #f5f5f9;
  }
</style>
