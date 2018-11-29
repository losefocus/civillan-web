<template>
<div class="d-box" :style="newStyle">
  <ul class="a-box">
    <li v-for="(list,index) in navList" :key="index" @click="changeTab1(list,index)" :class="{active:index==isActive}">
      {{list.name}}
    </li>
  </ul>
  <div id="container" style="width: 100%;height: calc(100% - 60px)">
  </div>
  <el-dialog
    :visible.sync="dialogVisible"
    :width="dialogWidth"
    :fullscreen="dialogFullScreen"
    top="7vh"
    @close="tIndex=0"
    style="min-width: 1024px;"
  >
    <new-running @changeIcon="isFullscreen" v-if="dialogVisible" :style="dialogHeight" :deviceType="deviceType" :dialogFullScreen="dialogFullScreen"></new-running>
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

  import deviceGrouping from '@/api/project/deviceGrouping'
  import categories from '@/api/configure/categories'
  import { mapActions , mapState} from 'vuex'
export default {
  name: "deviceMap",
  components:{
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
      dialogFullScreen:false,
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
      isBusy: false,
      post_data:{
        project_id:this.$cookies.get('projectId'),
        group_id:sessionStorage.getItem('groupId'),
        page_index:1,
        page_size:10,
      },
      group_post:{
        page_index:1,
        page_size:10,
        parent_id:sessionStorage.getItem('groupId'),
        project_id:this.$cookies.get('projectId'),
        direction:'asc',
        sort_by:'sort'
      },
      navList:[],
      isActive:'',
    }
  },
  props:[
    'searchStyle',
    'typeStyle',
    'newStyle'
  ],

  created(){
    this.getGroup()
  },
  mounted() {
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
    getGroup(){
      deviceGrouping.list(this.group_post).then(res=>{
        if(res.success){
          this.navList=res.result.items;
          let allDevice={
            project_id:this.$cookies.get('projectId'),
            name:'全部',
            id:sessionStorage.getItem('groupId'),
          };
          this.navList.unshift(allDevice);
          this.init(this.post_data);

          this.$nextTick(()=>{
            this.isShow=true
          });
        }else{
          this.$message.error(res.message);
        }
      }).catch(e=>{

      });
    },
    changeTab1(list,index){ //切换tab
      this.isActive=index;
      this.post_data.group_id=list.id;
      this.init(this.post_data);
    },
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
      categories.list(this.allListQuery).then(res => {
        this.productLists=res.result.items;
        this.productLists.unshift({id:0,name:'全部类型',code:''});
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
        this.dialogFullScreen=true;
      }else{
        this.dialogWidth='70%';
        this.dialogHeight={
          height:'700px'
        };
        this.changeIcon=!this.changeIcon
        this.dialogFullScreen=false;
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
  .a-box{
    width: calc(100% - 20px);
    padding: 15px 0 0 20px;
    height: 50px;
    background: #ffffff;
    margin-bottom: 10px;
    li{
      font-size: 14px;
      cursor: pointer;
      float: left;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #FFFFFF;
      color: #cccccc;
      border:1px solid #cccccc;
      margin-left: -1px;
    }
    li:first-child{
      border-radius: 5px 0 0 5px;
    }
    li:last-child{
      border-radius: 0 5px 5px 0;
    }
    .active{
      background: #F76A6A;
      color: #ffffff;
      border:1px solid #F76A6A;
    }
    .active+li{
      border-left: none;
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
