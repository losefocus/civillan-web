<template>
  <div>
    <ul class="p-box">
      <li @click="photoViewer" v-for="(list,index) in lists">
        <div class="viewer"></div>
        <div class="b-box"></div>
        <div class="v-name">
          <div class="v-title">高新科技园区建筑建设标段</div>
          <div class="v-time">2018-5-21</div>
        </div>
      </li>

    </ul>

    <el-dialog
      :visible.sync="dialogVisible"
      width="70%"
      style="height: 700px"
    >
      <p-viewer></p-viewer>
    </el-dialog>
  </div>

</template>


<script>
  import pViewer from '@/views/video/photoViewer'
  export default {
    components:{
      pViewer
    },
    data(){
      return{
        lists:[
          {'name':'1'},
          {'name':'2'},
          {'name':'3'},
          {'name':'4'},
          {'name':'5'},
          {'name':'6'},
        ],
        dialogVisible:false
      }
    },

    methods: {
      photoViewer(){
        this.dialogVisible=true
      }
    }
  }
</script>

<style scoped lang="scss">

  .p-box{
    display: flex;
    flex-flow:row wrap;
    li{
      position: relative;
      cursor: pointer;
      border: 20px solid #ffffff;
      margin: 0 20px 20px 0;
      .viewer{
        top:0;
        right: -10px;
        width: 120px;
        height: 120px;
        background: url("viewer.png") no-repeat;
        position: absolute;
      }
      .b-box{
        height: 180px;
        background: url("../../assets/project/pData.png") no-repeat;
        background-size: cover;

        min-width:300px;
        max-width:400px;
      }
      .v-name{
        background: #ffffff;
        width: 100%;
        height: 25px;
        text-align: center;
        line-height: 45px;
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

</style>
