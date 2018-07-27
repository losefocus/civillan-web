<template>
  <div>
    <waterfall
      :line-gap="380"
      :min-line-gap="300"
      :max-line-gap="380"
      :single-max-width="380"
      :watch="items">
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="(item, index) in items"
        :width="240"
        :height="320"
        :order="index"
        :key="item.id"
        move-class="item-move"
      >
        <div class="item pj-box" :style="item.style" :index="item.id" @click="jump(item.name,item.id)">
          <div class="pj-img" :style="{ 'background-image': 'url(' + item.thumbnailBaseUrl+item.thumbnailPath+ ')','background-repeat':'no-repeat','background-size':'100% 100%' }">
            <div class="pj-mask" >
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="pj-data">
            <ul>
              <li class="equipment">设备</li>
              <li class="online">在线</li>
              <li class="statistics">统计</li>
            </ul>
            <ul v-for="(list,index) in item.projectDevices" :key="index">
              <li class="equipment">{{list.name}}</li>
              <li class="online1">{{list.b}}</li>
              <li class="statistics">{{list.c}}</li>
            </ul>
          </div>
        </div>
      </waterfall-slot>
    </waterfall>
    <div class="p-box">
      <div class="p-item" >
        <h1>{{ info.name }}</h1>
        <div class="pj-details">
          <el-popover
            placement="right-start"
            trigger="hover"
            width="400"
            :key="index"
          >
            <p>{{ info.comment }}</p>
            <p class="d-content" slot="reference">{{ info.comment }}</p>
          </el-popover>
        </div>
      </div>
      <div class="p-item">
        <div class="t-limit">
          <h1 class="t-title">项目工期</h1>
          <el-progress type="circle" :percentage="20" width="120" color="#F03E41"></el-progress>
          <p class="t-interval">{{ info.beginAt*1000 | formatDate }} 至 {{info.endAt*1000 | formatDate}}</p>
        </div>
      </div>

      <div class="i-box p-item" style="width: 400px;">
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
            <h2>{{list.name}}</h2>
            <p>{{list.organList[0].name}}</p>
          </div>
        </el-popover>
      </div>

      <div class="p-item"><div id="AMap"></div></div>
    </div>
  </div>
</template>

<script>
  import deviceGrouping from '@/api/project/deviceGrouping'
  import project from '@/api/userCenter/project'
  import {formatDate} from '@/common/formatDate.js';


  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import Bus from '@/common/eventBus'
  export default {
    name: "project",
    components: {
      Waterfall,
      WaterfallSlot
    },
    data () {
      return {
        line: 'v',
        items:[],
        info:{},
        isBusy: false,
        map:null,
        position:null,
        organTypeList:null
      };
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
      }
    },
    mounted(){
      this.init();

    },
    created(){
      let id=this.$store.state.project.projectId;
      let tenant=this.$store.state.project.tenant;
      deviceGrouping.list({'project_id':id,'tenant':tenant,'sort_by':'sort','direction':'asc'}).then(res=>{
        console.log(res);
        this.items=res.result.items;
        /*this.$nextTick(()=>{
          this.isShow=true
        })*/
      });

      project.info({'project_id':id,'tenant':tenant}).then(res=>{
        console.log(res);
        this.info=res.result;
        let a=res.result.position;
        let iPosition=a.split(',');
        console.log(iPosition);
        this.organTypeList=res.result.organTypeList;

        let marker = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: iPosition
        });
        this.map.setZoomAndCenter(14,iPosition);
        marker.setMap(this.map);
        //this.map.setFitView();
      })
    },
    methods: {
      init:function () {
        // let infoPosition=this.info.position.split(',');
        // console.log(infoPosition);
        this.map = new AMap.Map('AMap', {
          zoom: 10
        });

      },
      jump(title,id){
        this.$router.push('/project/softBase');
        Bus.$emit('Title',title);
        sessionStorage.setItem('group_id',id)
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-main{
    padding: 30px 0 0 30px;
  }
  .item-move {
    transition: all .4s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .4s cubic-bezier(.55,0,.1,1);
  }
  .item {
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 10px;
    right: 10px;
    bottom: 30px;
    font-size: 0.9em;
    color: #666666;
    box-shadow:0 5px 7px 0 rgba(144,164,183,0.3);
    cursor: pointer;
    .pj-img{
      width: 100%;
      height: 160px;
      line-height: 160px;
      color: #ffffff;
      text-align: center;
      font-size: 26px;
      .pj-mask{
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.4);
      }
    }
    .pj-data {
      ul{
        font-weight: bold;
        font-size: 14px;
        padding-left: 25px;
        height: 15px;
        margin-top: 6%;
        clear: both;
      }
    }
    .equipment{
      width: 48%;
      padding-right: 2%;
      float: left;
      color: #666666;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap;
    }
    .online{
      width: 25%;
      float: left;
      color: #666666;
    }
    .online1{
      width: 25%;
      float: left;
      color: #333333;
    }
    .statistics{
      width: 25%;
      float: left;
      color: #666666;
    }
  }
  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }

  .p-box {
    margin: 10px;
    padding: 20px 20px 0 20px;
    background: #ffffff;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    //flex-flow: wrap;

    .p-item{
      margin-bottom: 30px;
      width: 21%;
      padding: 0 1%;
    }
    .pj-details{
      margin-top: 16px;
      width:285px;
      height:120px;
      font-size:12px;
      color:rgba(153,153,153,1);
      line-height:24px;
      .d-content{
        text-overflow:ellipsis;
        overflow: hidden;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:5; //指定显示多少行
      }
    }
    .t-limit{
      text-align: center;
      .t-title{
        margin-bottom: 5px;
      }
      .t-interval{
        font-size: 14px;
        color: #666666;
      }
    }
    .i-box{
      display: flex;
      //justify-content: space-between;
      flex-wrap:wrap;
      .c-info{
        width: 175px;
        margin: 0 5px 0 5px;
        cursor: pointer;
        p{
          width: 150px;
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
      .l-man{
        margin-right: 12px;
      }
    }


    #AMap{
      width: 100%;
      height: 180px;
    }
  }
</style>
