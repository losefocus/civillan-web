<template>
  <div style="padding-left: 3%">
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
            <ul v-for="(list,index) in item.lists" :key="index">
              <li class="equipment">{{list.a}}</li>
              <li class="online">{{list.b}}</li>
              <li class="statistics">{{list.c}}</li>
            </ul>
          </div>
        </div>
      </waterfall-slot>
    </waterfall>
    <div class="p-box">
      <div class="p-item" style="width: 300px;margin-bottom: 30px;">
        <h1>{{ info.name }}</h1>
        <div class="pj-details">
          <p>{{ info.comment }}</p>
        </div>
      </div>
      <div class="p-item" style="width: 200px;margin-bottom: 30px;">
        <div class="t-limit">
          <el-progress type="circle" :percentage="20" color="#F03E41"></el-progress>
          <p class="t-interval">{{ info.beginAt*1000 | formatDate }} 至 {{info.endAt*1000 | formatDate}}</p>
        </div>
      </div>

      <div class="i-box p-item" style="margin-bottom: 30px;">
        <div style="width: 150px">
          <div class="c-info c-infoM">
            <h2>业主单位</h2>
            <p>浙江科技有限公司</p>
            <p><span class="l-man">张三</span><span>180420302112</span></p>
          </div>
          <div class="c-info">
            <h2>监理单位</h2>
            <p>杭州市城管局</p>
            <p><span class="l-man">张三</span><span>180420302112</span></p>
          </div>
        </div>
        <div style="width:150px">
          <div class="c-info c-infoM">
            <h2>建设单位</h2>
            <p>浙江科技有限公司</p>
            <p><span class="l-man">张三</span><span>180420302112</span></p>
          </div>
          <div class="c-info">
            <h2>设计单位</h2>
            <p>杭州市城管局</p>
            <p><span class="l-man">张三</span><span>180420302112</span></p>
          </div>
        </div>
      </div>

      <div class="p-item" style="width: 250px;margin-bottom: 30px;"><div id="AMap"></div></div>
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
        map:null
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
        //console.log(res);
        this.info=res.result;
        let marker = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [116.405467, 39.907761]
        });
        marker.setMap(this.map);
      })
    },
    methods: {
      init:function () {

        // let infoPosition=this.info.position.split(',');
        // console.log(infoPosition);
        this.map = new AMap.Map('AMap', {
          center: [116.397428, 39.90923],
          zoom: 12
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

  .el-mian{

  }
  .item-move {
    transition: all .4s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .4s cubic-bezier(.55,0,.1,1);
  }
  .item {
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 30px;
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
      width: 50%;
      float: left;
      color: #666666;
    }
    .online{
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
    width: 94%;
    padding: 30px 30px 0  30px;
    background: #ffffff;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    flex-flow:row  wrap;

    .pj-details{
      margin-top: 16px;
      width:285px;
      height:120px;
      font-size:12px;
      color:rgba(153,153,153,1);
      line-height:24px;
    }
    .t-limit{
      text-align: center;
      .t-title{
        position: absolute;
        left:10px;
        top:10px;
      }
      .t-interval{
        font-size: 14px;
        color: #666666;
      }
    }
    .i-box{
      display: flex;
      justify-content: space-between;
      .c-info{
        p{
          margin-top: 8px;
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
