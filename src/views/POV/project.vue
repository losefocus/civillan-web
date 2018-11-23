<template>
  <div class="n-box">
    <ul class="p-box" style="background: #f5f5f9">
      <li class="p-info">
        <div class="i-name">
          {{ info.name }}
        </div>
        <div class="i-time">
          <span class="t-title">项目工期：</span>
          <span class="t-date">{{ info.beginAt*1000 | formatDate }} 至 {{info.endAt*1000 | formatDate}}</span>
        </div>
        <div class="i-statistics" v-if="info.comment">
          {{ info.comment }}
        </div>
        <div class="i-statistics" v-else>
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
        <el-carousel trigger="click"  style="height: 100%;">
          <el-carousel-item v-for="item in mediaList" :key="item">
            <div class="pj-title" style="width: 100%;height: 100%;" :style="{'background-image': 'url(' + item.thumbnailFileBaseUrl+item.thumbnailFilePath+ ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center'}"></div>
          </el-carousel-item>
        </el-carousel>
      </li>
    </ul>
    <ul class="a-box">
      <ul class="b-group">
        <li class="g-list" v-for="item in groupList" :key="item"  @click="JumpRouter">
          <div class="m-name">
            <p>{{item.name}}</p>
            <img class="i-jump" :src="jumpIn">
          </div>
          <div :style="{'background-image': 'url(' + item.thumbnailBaseUrl+item.thumbnailPath+ ')','background-repeat':'no-repeat','background-size':'100%','width':'100%','height':'230px'}"></div>
          <div class="m-info">
            <div class="t-progress">
              形象进度
            </div>
            <el-progress :percentage="70" color="#24BCF7"></el-progress>
            <ul class="b-Statistics">
              <li class="s-list">
                <p class="l-name">在线设备</p>
                <div class="n-body">
                  <span class="d-online">90</span>
                  <span class="d-total">/</span>
                  <span class="d-total">100</span>
                </div>
              </li>
              <li class="s-list" >
                <p class="l-name">预警次数</p>
                <div class="n-body">
                  <span class="n-alarm">90</span>
                </div>
              </li>
              <div style="clear: both"></div>
            </ul>
          </div>

        </li>
      </ul>
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
  import deviceGrouping from '@/api/project/deviceGrouping'
  import jumpIn from '@/assets/project/jumpIn.png'

  import Bus from '@/common/eventBus'
  export default {
    name: "project",
    components:{
      dMap
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
      this.getGroupList(id);
      this.getInfo(id,tenant);
      this.getDeviceType();
    },
    methods:{
      enlarge(){
        this.$router.push('/device/deviceMap');
      },
      /*getDeviceTotal(id){
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
      },*/
      //跳转路由
      JumpRouter(){
        this.$router.push('/device')
      },
      //获取类型列表数据
      getGroupList(id){
        //this.allListQuery.tenant=this.$cookies.get('tenant');
        deviceGrouping.list({project_id:id}).then(res => {
          console.log(res);
          this.groupList=res.result.items;
        })
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
    min-height: 850px;
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

  .p-box{
    width: 450px;
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
        margin-top: 5%;
        color: #666666;
        width: 100%;
        font-weight: bold;
        font-size: 14px;
      }
      .i-statistics{
        width: 100%;
        padding: 0 5% 0 0;
        margin-top: 8%;
        overflow: hidden;
        text-overflow:ellipsis;//值为clip表示剪切，ellipsis时为显示省略号
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:4; //指定显示多少行
        line-height: 30px;
        color:#999999;
        font-size: 14px;
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
    };
    .p-info:last-child{
      width: 450px;
      height: calc(100% - 440px);
      padding: 0;
      margin-top: 20px;
    }
  }
  .a-box{
    float: left;
    width: calc(100% - 470px);
    height: 100%;
    margin-left: 20px;
    overflow: auto;
    .b-group{
      .g-list{
        cursor: pointer;
        float: left;
        width: 260px;
        min-width: 220px;
        margin-left: 21px;
        height: 420px;
        background: #ffffff;
        margin-bottom: 20px;
        position: relative;
        .m-name{
          position: absolute;
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
          }
          .b-Statistics{
            margin-top: 20px;
            .s-list{
              width: 50%;
              float: left;
            }
          }
        }
      }
    }
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
