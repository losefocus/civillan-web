<template>
  <div class="n-box" style="width: 100%;height: 100%;">
    <div class="noData" v-if="noData">
      <div>
        <div class="iconfont icon-zanwushuju2"></div>
        <div class="d-title">
          暂无记录
        </div>
      </div>
    </div>
    <!--<div >
      <ul id="galley">
        <li v-for="(item, index) in lists" :index="item.id" @click="getViewer">
          <img :src="item.thumbnailFileBaseUrl+item.thumbnailFilePath">
        </li>
      </ul>
    </div>-->
    <waterfall
      style="margin-left: -10px;width: calc( 100% + 20px)"
      v-else="noData"
      id="galley"
      :line-gap="350"
      :min-line-gap="350"
      :max-line-gap="450"
      :single-max-width="450"
      :watch="lists">
      <waterfall-slot
        v-for="(item, index) in lists"
        :width="450"
        :height="320"
        :order="index"
        :key="item.id"
        move-class="item-move"

      >
        <div  class="item p-box" :style="item.style" :index="item.id">
          <div class="p-body" >
            <img class="b-box" :src="item.thumbnailFileBaseUrl+item.thumbnailFilePath" @click="getViewer">
            <div class="v-name">
              <div class="v-title">{{ item.name }}</div>
              <div class="v-time">{{ item.createdAt*1000 |  formatDate}}</div>
            </div>
          </div>
        </div>
      </waterfall-slot>
    </waterfall>

    <div class="m-pagination" v-if="!noData">
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
  </div>
</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import media from '@/api/video/media'
  import {formatDate} from '@/common/formatDate.js';

  import Viewer from 'viewerjs';
  import '../../../node_modules/viewerjs/dist/viewer.css';
export default {
  name: "pData",
  components:{
    Waterfall,
    WaterfallSlot,
  },
  //时间格式过滤器
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss'); //yyyy-MM-dd hh:mm
    }
  },
  data(){
    return{
      lists:[],
      noData:true,
      post_data:{
        page_index:1,
        page_size:10,
        type:1,
        project_id:this.$cookies.get('projectId')
      },
      dialogVisible:false,
      loading:null,
      bigPictureUrl:null,
      viewer:null,
      total:0,
    }
  },
  created(){
    this.getList(this.post_data)
  },
  mounted(){

  },
  methods:{
    getViewer(){
      this.viewer = new Viewer(document.getElementById('galley'),{
        toolbar: {
          zoomIn: 4,
          zoomOut: 4,
          prev: 4,
          play: {
            show: 4,
            size: 'large',
          },
          next: 4,
          oneToOne: 4,
        },
      });
    },
    handleSizeChange(size){
      this.post_data.page_size=size;
      this.getList(this.post_data);
    },
    listCurrentChange(currentPage){
      this.post_data.page_index = currentPage;
      this.getList(this.post_data);
    },
    //展开模态框
    getBig(item){
      this.dialogVisible=true;
      this.bigPictureUrl=item.thumbnailFileBaseUrl+item.thumbnailFilePath;
    },
    //获取数据列表
    getList(post_data){
      this.loading=this.$loading({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.2)'
      });
      media.list(post_data).then(res=>{
        if(res.success){
          if(res.result.items.length>0){
            this.noData=false;
            this.lists=res.result.items;
            this.total=res.result.total;
            this.loading.close()
          }else{
            this.noData=true;
            this.loading.close()
          }
        }else{
          this.$message.error(res.message);
          this.loading.close()
        }
      }).catch(e=>{
        this.loading.close();
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .noData{
    width: 100%;
    height: 80%;
    font-size: 30px;
    font-weight: bold;
    padding-top: 20%;
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
    cursor: pointer;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    font-size: 0.9em;
    box-shadow:0 5px 7px 0 rgba(144,164,183,0.3);
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
  .p-box{
    .p-body{
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      border: 10px solid #ffffff;
      .b-box{
        width: 100%;
        height: 85%;
      }
      .v-name{
        background: #ffffff;
        height: 12%;
        padding-top: 3%;
        text-align: center;
        overflow: hidden;
        .v-title{
          float: left;
          color:rgba(51,51,51,1);
          font-size: 12px;
        }
        .v-time{
          float: right;
          font-size: 12px;
        }
      }
    }
  }
  .b-picture{
    width: 100%;
    height: 600px;
    background-size: 100% 100%;
  }


  pictures {
    width: 100%;
    height: 75vh;
    background: #cccccc;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow: auto;
  }

  .pictures li {
    /*float: left;*/
    margin: 10px;
    border: 1px solid #000;
    -webkit-box-shadow: 5px 5px 5px #000;
    -moz-box-shadow: 5px 5px 5px #000;
    box-shadow: 5px 5px 5px #000;

  }

  .pictures li img {
    height: 200px;
  }
  .m-pagination{
    padding: 20px;
    text-align: center;
    //background: #ffffff;
  }
</style>
