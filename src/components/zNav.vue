<template>
  <div>
    <transition name="fade" mode="out-in">
      <el-aside :width='isCollapse'>
        <transition name="fade">
          <div class="pj-img" v-if="imgShow">
            <div class="pj-title">
              <p>
                杭州高新战略科技城区项目
              </p>
            </div>
          </div>
        </transition>

        <ul class="nav-box">
          <li v-for="(list,index) in lists" class="nav-list" :class="{liActive:imgShow==false}">
            <router-link :to="list.path">
              <div class="nav-link" :class="{active:index==isActive}" @click="checkedItem(index,list.name)">
                <div class="nav-icon">
                  <i :class="list.icon"></i>
                </div>
                <div class="link-title" v-if="imgShow">{{ list.name }}</div>
              </div>
            </router-link>
          </li>
        </ul>
        <div id="resize" @click="collapse()" :class="isCollapseIcom"></div>
      </el-aside>
    </transition>
  </div>
</template>

<script>
  import Bus from '@/assets/eventBus'
export default {
  name: "zNav",
  data(){
   return{
     isActive:-1,
     imgShow:true,
     isCollapse:'245px',
     isCollapseIcom:'navClose',
     navIndex:'',
     lists:[
       {
         name:'项目总览',
         icon:'el-icon-view',
         path:'/ProjectOverview',
         children:[
           {
             name:'设备监控',
             path:'/project/classification'
           },{
             path:'/project/softBase',
             name:'软基处理'
           }
         ]
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
       },{
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
  mounted(){
    this.isActive=sessionStorage.getItem('isActive') || 0
  },
  methods:{
    checkedItem(index,title){
      this.isActive=index;
      Bus.$emit('changeTitle',title);
      sessionStorage.setItem('isActive',this.isActive);

    },
    collapse:function () {
      this.imgShow=!this.imgShow;
      if(this.isCollapse=='245px'){
        this.isCollapse='90px';
        this.isCollapseIcom='navOpen'
      }else{
        this.isCollapse='245px';
        this.isCollapseIcom='navClose'
      }
      Bus.$emit('changeWidth');
    }
  },
  watch: {
    $route(){
      this.lists.forEach((item,i)=>{
        if(item.path==this.$route.path){
          this.isActive=i;
        }
        this.lists[0].children.forEach((child,c)=>{
          if(child.path==this.$route.path){
            this.isActive=0
          }
        })
      })
    }
  },
}
</script>

<style scoped lang="scss">
  .el-aside{
    width: 245px;
    height: 100%;
    position: relative;
    transition: 0.4s all ease;
    #resize{
      transition: 0.4s all ease;
      position: absolute;
      top: 800px;
      right: 30px;
      cursor: pointer;
      width: 24px;
      height: 21px;
    }
  }
  .fade-enter-active,.fade-leave-active{
    transition: 0.6s all ease;
  }
  .fade-enter-active{
     opacity: 1;
     height: 130px;
  }
  .fade-leave-active{
     opacity: 0;
     height: 0;
  }
  .fade-enter,.fade-leave{
     opacity: 0;
     height: 0;
  }




  .pj-img{
    position: relative;
    width: 100%;
    background: url(../assets/Nav/projectLogo.png);
    background-size: cover;
    text-align: center;
    color: #ffffff;
    transition: 0.6s all ease;
    overflow: hidden;
    .pj-title{
      width: 100%;
      height: 130px;
      position: relative;
      p{
        width: 100%;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        background:rgba(0,0,0,0.8);
        position: absolute;
        bottom: 0;
      }
    }
  }
  .nav-box{
    width: 100%;
    position: relative;
    .nav-list{
      transition: 0.6s all ease;
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
        transition: 0.6s all ease;
        color: #4F5059;
        overflow: hidden;
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
    };

    .liActive{
      width: 50px;
      height: 50px;
      margin: 20px 0 0 20px;
      transition: 0.6s all ease;
      border: none;
    }
  }
  .active{
    background: #F31A1A;
    color: #ffffff !important;
    transition: 0.6s all ease;
  }
  .navOpen{
    background: url("../assets/Nav/navOpen.png");
  }
  .navClose{
    background: url("../assets/Nav/navClose.png");
  }

</style>
