<template>
  <div>
    <ul class="p-box">
      <li v-for="(list,index) in lists">
        <div class="b-box"></div>
        <div class="v-name">
          <div class="v-title">高新科技园区建筑建设标段</div>
          <div class="v-time">2018-5-21</div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "pData",
  data(){
    return{
      lists:[
        {'name':'qwe'},
        {'name':'qwe'},
        {'name':'qwe'},
        {'name':'qwe'},
        {'name':'qwe'},
        {'name':'qwe'},
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .p-box{
    display: flex;
    flex-flow:row wrap;
    li{
      border: 20px solid #ffffff;
      margin: 0 20px 20px 0;
      .b-box{
        width: 350px;
        height: 210px;
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
