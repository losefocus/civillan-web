<template>
  <div class="n-box">
    <ul class="p-box" style="background: #f5f5f9">
      <li class="p-info" v-if="info">
        <div class="i-name">
          {{ info.name }}
        </div>
        <div class="i-time">
          <span class="t-title">项目工期：</span>
          <span class="t-date" v-if="info.beginAt">{{ info.beginAt*1000 | formatDate }} 至 {{info.endAt*1000 | formatDate}}</span>
        </div>
        <div class="i-statistics" v-if="info.comment">
          {{ info.comment }}
        </div>
        <div class="i-noStatistics" v-else>
          暂无简介
        </div>
        <div class="i-box p-item" style="width: 100%;">
          <el-popover
            placement="right"
            trigger="click"
            v-for="(list,index) in organTypeList"
            :key="index"
          >
            <p style="line-height: 30px" v-if="list.organList.length>0">{{list.organList[0].name}}</p>
            <p style="line-height: 30px" v-if="list.organList.length>0">{{list.organList[0].address}}</p>
            <p v-else>无</p>
            <p style="line-height: 30px" v-if="list.organList.length>0"><span style="margin-right: 20px">{{list.organList[0].contact}}</span> <span>{{list.organList[0].phone}}</span></p>
            <div class="c-info c-infoM" slot="reference">
              <div class="c-icon">
                <span class="iconfont icon-house"></span>
              </div>

              <div>
                <h2>{{list.name}}</h2>
                <p v-if="list.organList.length>0">{{list.organList[0].name}}</p>
              </div>

            </div>
          </el-popover>
        </div>
      </li>
      <li class="p-info">
        <el-carousel trigger="click"  style="height: 100%;" indicator-position="none"  arrow="always">
          <el-carousel-item v-for="item in mediaList" :key="item">
            <div class="pj-title" style="width: 100%;height: 100%;" :style="{'background-image': 'url(' + item.thumbnailFileBaseUrl+item.thumbnailFilePath+ ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center'}"></div>
          </el-carousel-item>
        </el-carousel>
      </li>
    </ul>

    <div class="b-Roll">
      <waterfall
        line = 'v'
        :fixed-height="true"
        class="a-box"
        :line-gap="300"
        :min-line-gap="250"
        :max-line-gap="320"
        :single-max-width="330"
        :watch="items">
        <waterfall-slot
          v-for="(item, index) in groupList"
          :width="210"
          :height="422"
          :order="index"
          :key="item.id"
          move-class="item-move"
        >
          <div class="item" :key="item" >
            <div class="m-name" @click="JumpRouter(item)" v-if="item.status!=3" :class="{'noClick':item.status==3}">
              <p>{{item.name}}</p>
              <img class="i-jump" :src="jumpIn">
            </div>
            <div class="m-name1" v-if="item.status==3">
              <p>{{item.name}}</p>
              <img class="i-jump" :src="jumpIn">
            </div>
            <div :class="{'g-gray':item.code=='SPAF'||item.code=='GLXT'}" :style="{'background-image': 'url(' + item.thumbnailBaseUrl+item.thumbnailPath+ ')','background-repeat':'no-repeat','background-size':'100% 100%','width':'100%','height':'230px'}"></div>
            <div class="m-info">
              <div class="t-progress"  v-if="item.code=='RJCL'||item.code=='LJLM'||item.code=='QLGC'||item.code=='SDGC'||item.code=='QTGC'">
                形象进度
              </div>
              <el-progress v-if="item.code=='RJCL'||item.code=='LJLM'||item.code=='QLGC'||item.code=='SDGC'||item.code=='QTGC'" :percentage="70" color="#24BCF7"></el-progress>
              <div class="n-open" v-if="item.code=='GLXT'">未开通</div>
              <ul v-else class="b-Statistics">
                <li class="s-list">
                  <p class="l-name">在线设备</p>
                  <div class="n-body">
                    <span class="d-online">{{item.statistics}}</span>
                    <span class="d-total">/</span>
                    <span class="d-total">100</span>
                  </div>
                </li>
                <li class="l-line"></li>
                <li class="a-list" >
                  <p class="l-name">预警次数</p>
                  <div class="n-body">
                    <span class="n-alarm">{{item.alarm}}</span>
                  </div>
                </li>
                <div style="clear: both"></div>
              </ul>
            </div>
          </div>
        </waterfall-slot>
      </waterfall>
    </div>
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
  import deviceGrouping from '@/api/project/deviceGrouping'
  import jumpIn from '@/assets/project/jumpIn.png'

  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  export default {
    name: "project",
    components:{
      dMap,
      Waterfall,
      WaterfallSlot
    },
    data(){
      return{
        loading:null,
        jumpIn:jumpIn,
        info:{}, //项目信息
        organTypeList:{}, //单位信息
        userTotal:'',
        lists:{},
        allListQuery:{ //类型select列表请求参数
          page_index: 1,
          page_size: 999,
          direction:'asc',
          sort_by:'sort'
        },
        deviceList:[],
        mediaList:[],
        media_data:{
          page_index:1,
          page_size:10,
          type:1,
          project_id:this.$cookies.get('projectId')
        },
        group_post:{
          page_index:1,
          page_size:999,
          parent_id:0,
          project_id:this.$cookies.get('projectId'),
          direction:'asc',
          sort_by:'sort'
        },
        groupList:[],
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
      this.getMediaTotal();
      this.getGroupList();
      this.getInfo(id,tenant);
    },
    methods:{
      //跳转路由
      JumpRouter(data){
        this.$router.push('/device');
        sessionStorage.setItem('groupId',data.id);
        sessionStorage.setItem('groupName',data.name)
      },
      sum (m,n){
         let num = Math.floor(Math.random()*(m - n) + n);
         return num;
      },

      //获取类型列表数据
      getGroupList(){
        //this.allListQuery.tenant=this.$cookies.get('tenant');
        deviceGrouping.list(this.group_post).then(res => {
          if(res.success){
            res.result.items.forEach(item=>{
              item.statistics=this.sum(1,100);
              item.alarm=this.sum(1,100)
            });
            this.groupList=res.result.items;
          }else{
            this.loading.close();
          }
        }).catch(err => {
          this.loading.close();
        });
      },
      getMediaTotal(){
        //影像总数
        media.list(this.media_data).then(res=>{
          if(res.success){
            this.loading.close();
            this.mediaList=res.result.items
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
    }
  }
</script>

<style scoped lang="scss">
  .n-open{
    text-align: center;
    line-height: 150px;
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:800;
    color:rgba(153,153,153,1);
  }
  .g-gray {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);

    filter: grayscale(100%);

    filter: gray;
  }
  .noClick{
    cursor: default;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
  .clear{
    clear: both;
  }
  .n-box{
    height: 825px;
    padding: 20px;
    background: #f5f5f9;
  }
  .el-carousel__item div {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
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
    .m-name{
      position: absolute;
      width: calc(100% - 60px);
      padding: 30px;
      height: 170px;
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
      background: rgba(0,0,0,0.5);
      cursor: pointer;
      .i-jump{
        width: 38px;
        margin-top: 30px;
      }
    }
    .m-name1{
      position: absolute;
      z-index: 9999;
      width: calc(100% - 60px);
      padding: 30px;
      height: 170px;
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
      background: rgba(0,0,0,0.5);
      .i-jump{
        width: 38px;
        margin-top: 30px;
      }
    }
    img{
      width: 100%;
    }
    .m-info{
      padding: 20px;
      .t-progress{
        font-size: 14px;
        color: #666666;
        margin-bottom: 5px;
      }
      .b-Statistics{
        margin-top: 25px;
        .s-list,.a-list{
          width: 50%;
          float: left;
          .l-name{
            color:#666666;
            font-size: 14px;
          }
          .n-body{
            margin-top: 10px;
            .d-online,.n-alarm{
              font-size: 32px;
              font-weight: bold;
              color:#24BCF7;
            }
            .n-alarm{
              color:#666666;
            }
          }
          .d-total{
            color:#666666;
            font-size: 14px;
          }
        }
        .a-list{
          width: 30%;
          padding-left: calc(20% - 2px);
        }
        .l-line{
          height: 50px;
          margin-top: 10px;
          float: left;
          border-left: 2px solid #F1F1F1;
        }
      }
    }
  }
  .item:hover>.m-name{
    background: rgba(36,188,247,0.5);
  }

  .p-box{
    width: 440px;
    margin-left: 10px;
    height: 100%;
    float: left;
    .p-info{
      padding: 20px;
      width: 410px;
      height:calc(50% - 50px);
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
        margin-top: 15px;
        color: #666666;
        width: 100%;
        font-weight: bold;
        font-size: 14px;
      }
      .i-statistics{
        width: 100%;
        height: 150px;
        padding: 0 5% 0 0;
        margin-top: 20px;
        overflow: hidden;
        display: -webkit-box;//对象作为弹性伸缩盒子模型显示
        -webkit-box-orient: vertical;//设置或检索伸缩盒对象的子元素的排列方式
        -webkit-line-clamp: 6;//溢出省略的界限
        line-height: 25px;
        color:#999999;
        font-size: 14px;
      }
      .i-noStatistics{
        width: 100%;
        height: 150px;
        line-height: 50px;
        color:#999999;
        font-size: 14px;
      }
      .s-data:last-child{
        margin-right: 0 !important;
      }
      .i-box {
        margin-top: 10px;
        background: #ffffff;
        .c-info{
          float: left;
          width: 195px;
          margin: 10px 5px 0 0;
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
          margin-bottom: 20px;
        }
      }
    };
    .p-info:last-child{
      width: 450px;
      height: calc(100% - 425px);
      padding: 0;
      margin-top: 20px;
    }
  }
  .a-box{
    float: left;
    width: calc(100% - 470px);
    height: calc(100% + 25px);
    margin:-10px 0 0 20px;
    overflow: auto;
  }
  .a-box::-webkit-scrollbar {/*滚动条整体样式*/
    width:4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
    background: #ffffff;
  }
  .a-box::-webkit-scrollbar-button{
    background: rgba(0,0,0,0.2);
  }
  .a-box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .a-box::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }

</style>
