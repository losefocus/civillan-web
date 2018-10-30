<template>
<div class="d-box" :style="newStyle">
  <div class="m-screen">
    <div class="s-box" :style="searchStyle">
      <input v-model="searchKey" placeholder="设备名称" id="deviceSearch" name="deviceSearch" type="text">
      <label for="deviceSearch" class="m-iconBox" @click="search()">
        <span class="el-icon-search"></span>
      </label>
    </div>
    <div class="s-box s-box1" :style="typeStyle">
      <el-select size="small" v-model="productType" placeholder="按设备类型过滤" style="width: 150px" @change="typeSelect">
        <el-option
          v-for="item in productLists"
          :key="item.id"
          :label="item.name"
          :value="item.code"
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
    top="7vh"
    @close="tIndex=0"
    style="min-width: 1024px;"
  >
    <new-running @changeIcon="isFullscreen" v-if="dialogVisible" :style="dialogHeight" :deviceType="deviceType"></new-running>
  </el-dialog>
</div>
</template>

<script>
  import deviceList from '@/api/project/deviceList'
  import offLineMarker from '@/assets/device/m-offLine.png'
  import runningMarker from '@/assets/device/m-running.png'
  import alarmMarker from '@/assets/device/m-alarm.png'

  import foamAlarm from '@/assets/device/foamAlarm.png'
  import foamOff from '@/assets/device/foamOff.png'
  import foamRunning from '@/assets/device/foamRunning.png'

  import curingFault from '@/assets/curing/curingFault.png'
  import curingOff from '@/assets/curing/curingOff.png'
  import curingRunning from '@/assets/curing/curingRunning.png'

  import tensileRunning from '@/assets/tensile/tensileRunning.png'
  import tensileOff from '@/assets/tensile/tensileOff.png'
  import tensileAlarm from '@/assets/tensile/tensileAlarm.png'

  import newRunning from '@/views/softBase/newRunning.vue'

  import SAnalysis from '@/views/softBase/SAnalysis'
  import RState from '@/views/softBase/RState'
  import FConcrete from '@/views/FConcrete/FConcrete'
  import AQuery from '@/views/softBase/AQuery'
  import HData from '@/views/softBase/HData'
  import NRecord from '@/views/softBase/NRecord'

  import deviceData from '@/api/device/deviceData'
  import categories from '@/api/configure/categories'
  import { mapActions , mapState} from 'vuex'
export default {
  name: "deviceMap",
  components:{
    SAnalysis,
    RState,
    FConcrete,
    AQuery,
    HData,
    NRecord,
    newRunning,
  },
  data(){
    return{
      loading:null,
      isClose:false,
      navList:[],
      productLists:[],
      productType:'',
      isShow:true,
      dialogVisible: false,
      dialogWidth:'75%',
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
      deviceType:'',
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
      post_data:{
        page_size:999,
      },
      allListQuery:{ //类型select列表请求参数
        page_index: 1,
        page_size: 999
      },
    }
  },
  props:[
    'searchStyle',
    'typeStyle',
    'newStyle'
  ],

  mounted: function () {
    let project_id=this.$cookies.get('projectId');
    this.post_data.project_id=project_id;
    this.init(this.post_data);
    this.getCategoryList();
  },
  computed: {
    ...mapState({token:state=>state.login.token})
  },
  methods:{
    ...mapActions('deviceKey',['incrementKey']),
    init(post_data){
      let _this=this;
      this.loading=this.$loading({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.2)'
      });
      let map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        zoom: 20
      });
      //获取设备列表
      let markers = [];
      let marker;
      deviceList.list(post_data).then(res=>{
        //接口成功
        if(res.success){
          if(res.result.total==0){
            //_this.$message.error('未搜索到任何设备！');
            _this.loading.close();
          }else{
            let lists=res.result.items;
            let infoWindow= new AMap.InfoWindow({offset: new AMap.Pixel(0, 5)});
            for(let i=0;i<lists.length;i++){
              //判断设备是否有经纬度
              if(lists[i].position){
                console.log(lists[i].status);
                //设备的运行状态
                let changeMarker = null;
                let changeBackground= null;
                let changeColor=null;
                if(lists[i].status=='11'){
                  changeBackground = 'runningBackground';
                  changeColor = 'runningColor';
                  if(lists[i].type=='PMHNT'){
                    changeMarker = foamRunning;
                  }else if(lists[i].type=='JBZ'){
                    changeMarker = runningMarker;
                  }else if(lists[i].type=='PLYH'){
                    changeMarker = curingRunning;
                  }else if(lists[i].type=='YYLZL'){
                    changeMarker = tensileRunning;
                  }
                }else if(lists[i].status=='21'){
                  changeBackground = 'alarmBackground';
                  changeColor = 'alarmColor';
                  if(lists[i].type=='PMHNT'){
                    changeMarker = foamAlarm;
                  }else if(lists[i].type=='JBZ'){
                    changeMarker = alarmMarker;
                  }else if(lists[i].type=='PLYH'){
                    changeMarker = curingFault;
                  }else if(lists[i].type=='YYLZL'){
                    changeMarker = tensileAlarm;
                  }
                }else{
                  changeBackground = 'noBackground';
                  changeColor = 'noColor';
                  if(lists[i].type=='PMHNT'){
                    changeMarker = foamOff;
                  }else if(lists[i].type=='JBZ'){
                    changeMarker = offLineMarker;
                  }else if(lists[i].type=='PLYH'){
                    changeMarker = curingOff;
                  }else if(lists[i].type=='YYLZL'){
                    changeMarker = tensileOff;
                  }
                }

                marker=new AMap.Marker({
                  position:lists[i].position.split(','),
                  content: '<div style="background:url('+changeMarker+') no-repeat; height: 43px; width: 32px; border-radius: 12px; "></div>',
                  offset: new AMap.Pixel(-15,-15),
                  lists:lists[i]
                });
                marker.on('click',function (e) {
                  let items=e.target.G.lists;

                  let content='<div class="info-container device_details">' +
                    '<div style=" position: relative; width: 200px;height: 150px;background: url(' +items.thumbnailBaseUrl+items.thumbnailPath+
                    ');background-size:100% 100%">' +
                    '</div>'+
                    '<div class="info-content">' +
                    '<div class="info-title1">' +items.name+
                    '</div>'+
                    '<div class='+changeColor+'></div>'+
                    '</div>'+
                    '</div>';
                  AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
                    infoWindow = new SimpleInfoWindow({
                      infoBody: content,
                      //基点指向marker的头部位置
                      offset: new AMap.Pixel(-1, -10)
                    });

                    infoWindow.get$InfoBody().on('click', '.device_details', function(event) {
                      _this.deviceType=lists[i].type;
                      //阻止冒泡
                      event.stopPropagation();
                      _this.dialogVisible=true;
                      _this.deviceName=items.name;
                      let deviceInfo=JSON.stringify(items);
                      sessionStorage.setItem('deviceInfo',deviceInfo);
                      _this.deviceKey=items.key;
                      _this.$store.dispatch('incrementKey',items.key);
                    });
                    infoWindow.open(map, e.target.getPosition());
                  });

                  //infoWindow.setContent(content);
                  infoWindow.open(map, e.target.getPosition());
                  map.setCenter(e.target.getPosition());
                });
                // 设置label标签
                marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                  offset: new AMap.Pixel(-135, -25),//修改label相对于maker的位置
                  content:"<div class='deviceLabelBox'>"+"<span class="+changeBackground+">"+lists[i].name+"</span>"+"</div>"
                });
                map.add(marker);
                map.setFitView();
                markers.push(marker);
                _this.loading.close();
              }else{
                _this.loading.close();
              }
            }
          }
          _this.loading.close();
        }else {
          _this.loading.close();
          that.$message.error(res.message)
        }
      }).catch(e=>{
        _this.loading.close();
      });
    },
    getCategoryList(){
      //this.allListQuery.tenant=this.$cookies.get('tenant');
      categories.list(this.allListQuery).then(res => {
        let list = res.result.items;
        this.productLists=res.result.items;
        this.typeOptions = list.map(item => {
          return { value: item.id, label: item.name };
        });
      })
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
      //sessionStorage.setItem('deviceName',item.name);
      sessionStorage.setItem('deviceKey',item.key);
      this.deviceKey=item.key;
    },
    changeTab(i){ //模态框tab
      this.tIndex=i;
      this.currentView=this.tBody[i]
    },
    isFullscreen(val){ //是否打开模态框
      if(!val){
        this.dialogWidth='100%';
        this.dialogHeight={
          height:'calc(100% - 65px)'
        };
        this.changeIcon=!this.changeIcon;
        this.dialogFullscreen=true;
      }else{
        this.dialogWidth='70%';
        this.dialogHeight={
          height:'700px'
        };
        this.changeIcon=!this.changeIcon
        this.dialogFullscreen=false;
      }
    },
    dialogClose(){
    },
    changeScreen(data){
      this.changeIcon=data;
      this.isFullscreen();
    },
    close(){

    },
    //类型筛选
    typeSelect(val){
      this.post_data.type=val;
      this.init(this.post_data)
    }
  }
}
</script>

<style scoped lang="scss">
  .d-box{
    width: calc(100% - 40px);
    height:calc(100% - 20px);
    padding: 20px;
    background: #f5f5f9;
  }
  .m-screen{
    top: 15px;
    left: 15px;
    position: relative;
    z-index: 99;
    .s-box{
      box-shadow:0px -1px 0px 0px rgba(0,0,0,0.02),0px 3px 6px 0px rgba(0,0,0,0.2);
      position: absolute;
    }
    .s-box1{
      margin-left: 10px;
      position: absolute;
    }
    #deviceSearch{
      height: 32px;
      font-size: 14px;
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
      width: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 0 4px 4px 0;
      height: 32px;
      color: #ffffff;
      margin-left: -4px;
      cursor: pointer;
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
    height: 100px;
    overflow: auto;
    padding: 10px;
    background: #f5f5f9;
  }
</style>
