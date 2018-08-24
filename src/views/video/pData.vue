<template>
  <div>
    <waterfall
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
          <div class="p-body" @click="getBig(item)">
            <div class="b-box" :style="{'background':'url('+ item.thumbnailFileBaseUrl+item.thumbnailFilePath+')'}"></div>
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
      <div class="b-picture" :style="{'background':'url('+ bigPictureUrl+')'}"></div>
    </el-dialog>
  </div>
</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import media from '@/api/video/media'
  import {formatDate} from '@/common/formatDate.js';
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
      post_data:{
        page_index:1,
        page_size:10,
        type:1
      },
      dialogVisible:false,
      loading:null,
      bigPictureUrl:null,
    }
  },
  created(){
    this.getList(this.post_data)
  },
  methods:{
    //展开模态框
    getBig(item){
      this.dialogVisible=true;
      this.bigPictureUrl=item.thumbnailFileBaseUrl+item.thumbnailFilePath
    },
    //获取数据列表
    getList(post_data){
      this.loading=this.$loading({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.2)'
      });
      media.list(post_data).then(res=>{
        if(res.success){
          this.lists=res.result.items;
          this.loading.close()
        }else{
          this.$message.error(res.message);
          this.loading.close()
        }
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
  waterfall-slot{
    background: black;
  }
  .item {
    position: absolute;
    top: 25px;
    left: 0;
    right: 50px;
    bottom: 25px;
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
      width: 100%;
      height: 100%;
      border: 20px solid #ffffff;
      .b-box{
        height: 85%;
        //background: url("../../assets/project/pData.png") no-repeat;
        background-size: cover;
      }
      .v-name{
        background: #ffffff;
        height: 12%;
        padding-top: 3%;
        text-align: center;
        display: flex;
        justify-content: space-between;
        .v-title{
          color:rgba(51,51,51,1);
          font-size: 12px;
        }
        .v-time{
          font-size: 12px;
        }
      }
    }
  }
  .b-picture{
    width: 100%;
    height: 600px;
  }
</style>
