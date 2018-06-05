<template>
  <div>
    <div class="pj-img"></div>
    <div class="pj-name">杭州高新战略科技城区项目</div>
    <ul class="nav-box" >
      <li v-for="(list,index) in lists" >
        <router-link :to="list.path">
          <div class="nav-link" :class="{active:index==isActive}" @click="checkedItem(index,list.name)">
             <div class="nav-icon">
               <i :class="list.icon"></i>
             </div>
             <div class="link-title">{{ list.name }}</div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import Bus from '@/assets/eventBus'
export default {
  name: "zNav",
  data(){
   return{
     isActive:-1,
     lists:[
       {
         name:'项目总成',
         icon:'el-icon-view',
         path:'/ProjectOverview'
       },
       {
         name:'统计分析',
         icon:'el-icon-message',
         path:'/analysis'
       },{
         name:'历史数据',
         icon:'el-icon-service',
         path:'/historical'
       },{
         name:'报警查询',
         icon:'el-icon-menu',
         path:'/alarm'
       },{
         name:'视频监控',
         icon:'el-icon-upload',
         path:'/video'
       },
       {
         name:'文档资料',
         icon:'el-icon-date',
         path:'/document'
       },{
         name:'质量评估',
         icon:'el-icon-sold-out',
         path:'/quality'
       },{
         name:'作业成效',
         icon:'el-icon-star-on',
         path:'/operational'
       }
     ]
   }
  },
  created(){
    this.isActive=0;
  },
  methods:{
    checkedItem(index,title){
      this.isActive=index;
      Bus.$emit('changeTitle',title);
    }
  }
}
</script>

<style scoped lang="scss">
  .pj-img{
    width: 100%;
    height: 100px;
    background: #000000;
  }
  .pj-name{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #000000;
    color: #ffffff;
    font-size: 14px;
  }

  .nav-box{
    width: 100%;
    li{
      float: left;
      width: 80px;
      height: 80px;
      background: #ffffff;
      margin: 30px 0 0 30px;
      border: 1px solid #E6EAEE;
      border-radius: 6px;
      a{
        text-decoration: none;
        color: #000000;
      }
      .nav-link{
        border-radius: 6px;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #4F5059;
        .nav-icon{
          padding-top: 15px;
          text-align: center;
          i{
            font-size: 25px;
          }
        }
        .link-title{
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }
  }
  .active{
    background: #F31A1A;
    color: #ffffff !important;
  }
</style>
