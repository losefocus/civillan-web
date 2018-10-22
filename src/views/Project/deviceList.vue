<template>
  <div class="n-box">
    <ul class="a-box">
      <li v-for="(list,index) in navList" :key="index" @click="changeTab(list,index)" :class="{active:index==isActive}">
        {{list.name}}
      </li>
    </ul>
    <div class="noData" v-if="noData">
      <div style="display: table-cell;vertical-align: middle;">
        <div class="iconfont icon-zanwushuju2"></div>
        <div class="d-title">
          暂无记录
        </div>
      </div>
    </div>
    <waterfall
      style="margin-left: -10px;width: calc( 100% + 20px)"
      v-else="noData"
      :line-gap="320"
      :min-line-gap="250"
      :max-line-gap="350"
      :single-max-width="350"
      :watch="items">
      <waterfall-slot
        v-for="(item, index) in items"
        :width="210"
        :height="210"
        :order="index"
        :key="item.id"
        move-class="item-move"
      >
        <div class="item pj-box" :style="item.style" :index="item.id" @click="getDetails(item,index)">
          <!--:class="{'r-state1':item.status==0,'r-state2':item.status==1,'r-state3':item.status==2}"-->
          <div class="r-state" :class="{'r-state1':item.status==0,'r-state2':item.status==1,'r-state3':item.status==2,'r-state4':item.status==3}">
            {{ deviceStatus.get(item.status) }}
          </div>
          <div class="d-name">
            <span>{{item.name}}</span>
          </div>
          <div class="d-title">
            <span v-if="item.product">{{item.product.alias}}</span>
            <span v-else>-</span>
            <!--<span v-if="item.device_type=='双头搅拌桩'">双头搅拌桩</span>
            <span v-if="item.device_type=='高压旋桩'">高压旋桩</span>-->
          </div>
          <ul class="d-info">
            <li class="d-img"><img :src="item.thumbnailBaseUrl+item.thumbnailPath"></li>
            <li class="d-statistics">
              <div class="d-date">段浆量：10L</div>
              <div class="d-progress">
                <el-progress :percentage="30" color="#999999" :show-text='false'></el-progress>
              </div>

              <div class="d-date">段灰量：20KG</div>
              <div>
                <el-progress  :percentage="80" color="#999999" :show-text='false'></el-progress>
              </div>
            </li>
          </ul>
        </div>
      </waterfall-slot>
    </waterfall>
    <div class="m-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="listCurrentChange"
        :current-page="post_data.page_index"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :total='total'>
      </el-pagination>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :fullscreen="dialogFullscreen"
      top="7vh"
      style="min-width: 1024px;"
      @close="closeDialog"
    >
      <new-running @changeIcon="isFullscreen" v-if="dialogVisible" :style="dialogHeight" :deviceType="deviceType"></new-running>
    </el-dialog>
  </div>
</template>

<script>
  import dictionary from '@/api/common/dictionary'
  import deviceGrouping from '@/api/project/deviceGrouping'
  import deviceList from '@/api/project/deviceList'
  import deviceData from '@/api/device/deviceData'


  import SAnalysis from '@/views/softBase/SAnalysis'
  import RState from '@/views/softBase/RState'
  import FConcrete from '@/views/FConcrete/FConcrete'
  import AQuery from '@/views/softBase/AQuery'
  import HData from '@/views/softBase/HData'
  import NRecord from '@/views/softBase/NRecord'
  import newRunning from '@/views/softBase/newRunning.vue'

  import Bus from '@/common/eventBus'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  export default {
    name: "device",
    components: {
      Waterfall,
      WaterfallSlot,
      SAnalysis,
      RState,
      AQuery,
      HData,
      NRecord,
      FConcrete,
      newRunning
    },
    data () {
      return {
        isActive:'',
        noData:false,
        navList:[],
        loading:null,
        isShow:true,
        dialogVisible: false,
        dialogWidth:'70%',
        dialogHeight:{
          height:'700px'
        },
        dialogFullscreen:false,
        changeIcon:true,
        radio:"",
        line: 'v',
        items: [],
        group_id:0,
        deviceKey:'',
        deviceName:'',
        deviceType:'',
        tIndex:0,
        currentView:'RState',
        isBusy: false,
        deviceStatus:null,
        deviceStatusLists:[
          {id:0,name:'故障中'},
          {id:1,name:'运行中'},
          {id:2,name:'已断线'},
          {id:3,name:'已离线'},
        ],
        post_data:{
          group_id:'',
          page_index:1,
          page_size:10,
        },
        total:0,
      };
    },

    created(){
      this.deviceStatus = new Map();
      for (let i=0; i<this.deviceStatusLists.length; i++) {
        this.deviceStatus.set(this.deviceStatusLists[i].id,this.deviceStatusLists[i].name)
      }

      let id=this.$cookies.get('projectId');
      let tenant=this.$cookies.get('tenant');
      this.getGroup(id,tenant)
    },

    methods: {
      getGroup(id,tenant){
        deviceGrouping.list({'project_id':id,'tenant':tenant,'sort_by':'sort','direction':'asc'}).then(res=>{
          if(res.success){
            this.navList=res.result.items;
            let allDevice={
              name:'全部设备',
              id:'',
            };
            this.navList.unshift(allDevice);
            this.post_data.group_id=this.navList[0].id;
            console.log( this.navList);
            this.getList();

            this.$nextTick(()=>{
              this.isShow=true
            });
          }else{
            this.$message.error(res.message);
          }
        }).catch(e=>{

        });
      },
      changeTab(list,index){ //切换tab
        this.isActive=index;
        this.post_data={
          group_id:list.id,
          page_index:1,
          page_size:10,
        };
        this.getList()
      },
      radioEvent(){
        this.dialogVisible = false;
      },
      getDetails(item,index){ //获取详情
        //console.log(item.type);
        this.deviceType=item.type;
        this.dialogVisible=true;
        this.deviceName=item.name;
        console.log(item.key);
        sessionStorage.setItem('deviceType',item.type);
        sessionStorage.setItem('deviceKey',item.key);
        this.deviceKey=item.key;
      },
      isFullscreen(val){ //是否打开模态框
        //console.log(val);
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
      changeScreen(data){
        //this.changeIcon=data;
        //this.isFullscreen();
      },
      getList(){
        this.loading=this.$loading({
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.2)'
        });
        deviceList.list(this.post_data).then(res=>{
          if(res.success){
            console.log(res);
            if(res.result.items.length>0){
              this.noData=false;
              res.result.items.forEach(item=>{
                item.status=3;
              });
              this.items=res.result.items;
              this.total=res.result.total;
              console.log(res.result.items);
              for(let i=0;i<this.items.length;i++){
                deviceData.list({key:this.items[i].key}).then(res =>{
                  if(res.success){
                    this.items[i].status=1
                  }else{
                    this.items[i].status=3
                  }
                }).catch(e=>{
                })
              }
              this.loading.close();
            }else{
              this.noData=true;
              this.loading.close();
            }
          }else{
            this.loading.close();
          }
          this.loading.close();
        }).catch(e=>{
          this.loading.close();
        })
      },
      handleSizeChange(size){
        this.post_data.page_size=size;
        this.getList();
      },
      listCurrentChange(currentPage){
        this.post_data.page_index = currentPage;
        this.getList();
      },
      closeDialog(){
        //console.log('关闭弹窗');
        this.tIndex=0
      }
    }
  }
</script>
<style scoped lang="scss">
  .n-box{
    width: calc(100% - 40px);
    height: auto;
    padding: 20px;
    background: #f5f5f9;
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
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }

  .noData{
    width: 100%;
    height: calc(100% - 95px);
    font-size: 30px;
    font-weight: bold;
    margin-top: 10%;
    display: table;
    text-align: center;
    .icon-zanwushuju2{
      font-size: 80px;
      color: #cccccc;
    }
    .d-title{
      margin-top: 10px;
      font-size: 28px;
      color: #cccccc;
    }
  }

  waterfall-slot{
    background: black;
  }
  .item {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    font-size: 0.9em;
    box-shadow:0 5px 7px 0 rgba(144,164,183,0.3);
    cursor: pointer;
    .equipment{
      width: 50%;

      float: left;
    }
    .online{
      width: 25%;
      float: left;
    }
    .statistics{
      width: 25%;
      float: left;
    }
  }
  .pj-box{
    background: #ffffff;
    padding-left: 25px;
    .r-state{
      padding: 2px 15px;
      color: #ffffff;
      border-radius: 15px 0 0 15px;
      margin-top: 20px;
      background: #24BCF7;
      float: right;
      text-align: right;
      .r-stateText{
        color: #fff;
        font-size: 0.2em;
        margin: 6% 3%;
      }
    }

    .r-state1{background: #D44848;}
    .r-state2{background: #24BCF7;}
    .r-state3{background: #808080;}
    .r-state4{background: #DADADA;}

    .d-name{
      color: #333333;
      margin-top: 20px;
      font-size: 16px;
      font-weight: bold;
    }
    .d-title{
      margin-top: 6px;
      color: #999999;
      font-size: 12px;
    }
    .d-info{
      margin-top: 16%;
      width: 100%;
      height: 50%;
      .d-img{
        float: left;
        width: 25%;
        height: 90%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .d-statistics{
        float: left;
        width: 50%;
        padding-top: 12%;
        height: 85%;
        margin-left: 18%;
        .d-date{
          font-size: 10px;
          margin-bottom: 6%;
        }
        .d-progress{
          width: 100%;
          margin-bottom: 18%;
        }
      }
      .d-type1{background: url(../../assets/device/mixingPile.png)no-repeat center;background-size: cover;}
      .d-type2{background: url(../../assets/device/dHMixing.png)no-repeat center;background-size: cover;}
      .d-type3{background: url(../../assets/device/highPressureJet.png)no-repeat center;background-size: cover;}
    }
  }


  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }
  .m-pagination{
    padding: 20px;
    text-align: center;
    //background: #ffffff;
  }
</style>

