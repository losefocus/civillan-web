<template>
  <div style="width: 100%;height: 100%;">
    <div class="noData" v-if="noData">
      <div>
        <div class="iconfont icon-zanwushuju2"></div>
        <div class="d-title">
          暂无记录
        </div>
      </div>
    </div>
    <waterfall
      style="margin-left: -10px;width: calc( 100% + 20px)"
      v-else="noData"
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
        <div class="item p-box" :style="item.style" :index="item.id">
          <div class="p-body" @click="photoViewer">
            <div class="viewer"></div>
            <div class="b-box"  :style="{'backgroundImage':'url('+ item.thumbnailFileBaseUrl+item.thumbnailFilePath+')'}"></div>
            <div class="v-name">
              <div class="v-title">{{ item.name }}</div>
              <div class="v-time">{{ item.createdAt*1000 |  formatDate}}</div>
            </div>
          </div>
        </div>
      </waterfall-slot>
    </waterfall>

    <el-dialog
      :visible.sync="dialogVisible"
      width="70%"
    >
      <p-viewer></p-viewer>
    </el-dialog>
  </div>

</template>


<script>
  import pViewer from '@/views/video/photoViewer'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import {formatDate} from '@/common/formatDate.js';
  import media from '@/api/video/media'
  export default {
    components:{
      pViewer,
      Waterfall,
      WaterfallSlot,

    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss'); //yyyy-MM-dd hh:mm
      }
    },
    data(){
      return{
        noData:true,
        loading:null,
        lists:[],
        dialogVisible:false,
        post_data:{
          page_index:1,
          page_size:10,
          type:3,
          project_id:this.$cookies.get('projectId')
        },
        total:0,
      }
    },
    created(){
      this.getList(this.post_data)
    },
    methods: {
      //打开模态框
      photoViewer(){
        this.dialogVisible=true
      },
      //获取列表
      getList(post_data){
        this.loading=this.$loading({
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.2)'
        });
        media.list(post_data).then(res=>{
          if(res.success){
            if(res.result.items.length>0){
              this.total=res.result.total;
              this.noData=false;
              this.lists=res.result.items;
              this.loading.close();
            }else{
              this.noData=true;
              this.loading.close();
            }
          }else{
            this.$message.error(res.message);
            this.loading.close();
          }
        }).catch(e=>{
          this.loading.close();
        })
      },
      handleSizeChange(size){
        this.post_data.page_size=size;
        this.getList(this.post_data);
      },
      listCurrentChange(currentPage){
        this.post_data.page_index = currentPage;
        this.getList(this.post_data);
      },
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
      position: relative;
      cursor: pointer;
      background: #ffffff;
      border: 10px solid #ffffff;
      .viewer{
        top:0;
        right: -10px;
        width: 120px;
        height: 120px;
        background: url("viewer.png") no-repeat;
        position: absolute;
      }
      .b-box{
        width: 100%;
        height: 85%;
        //background: url("../../assets/project/pData.png") no-repeat;
        background-size: 100% 100%;
      }
      .v-name{
        background: #ffffff;
        width: 100%;
        margin-top: 3%;
        height: 12%;
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
  .m-pagination{
    padding: 20px;
    text-align: center;
    //background: #ffffff;
  }

</style>
