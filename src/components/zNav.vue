<template>
  <div>
    <transition name="fade" mode="out-in">
      <el-aside :width='navWidth'>
        <transition name="fade">
          <div class="pj-img" v-if="imgShow">
            <div class="pj-title" :style="{'background-image': 'url(' + projectLogo+ ')','background-repeat':'no-repeat','background-size':'100% 100%' }">
              <p>
                {{projectName}}
              </p>
            </div>
          </div>
        </transition>

        <ul class="nav-box">

          <li v-for="(list,index) in lists" class="nav-list" :class="{'liActive':!isCollapse}">
            <router-link :to="list.path">
              <el-tooltip class="item" effect="dark" :content="list.name" placement="right" :disabled="isCollapse">
                <div class="nav-link" :class="{active:index==isActive}" @click="checkedItem(index,list.name)">
                  <div class="nav-icon">
                    <i class="iconfont" :class="list.icon"></i>
                  </div>
                  <div class="link-title" v-if="isCollapse">{{ list.name }}</div>
                </div>
              </el-tooltip>
            </router-link>
          </li>
        </ul>
        <div id="resize" @click="collapse()" :class="{'navOpen':!isCollapse,'navClose':isCollapse}" v-show="isShow"></div>
      </el-aside>
    </transition>
  </div>
</template>

<script>
  import Bus from '@/common/eventBus'
  import project from '@/api/userCenter/project'
export default {
  name: "zNav",
  data(){
   return{
     isShow:'true',
     projectLogo:'',
     isActive:-1,
     imgShow:true,
     isCollapse:true,
     navWidth:"",
     isCollapseIcom:'navClose',
     navIndex:'',
     projectName:'',
     lists:[
       {
         name:'项目总览',
         icon:'icon-project',
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
         icon:'icon-analysis',
         path:'/analysis'
       },{
         name:'历史数据',
         icon:'icon-history',
         path:'/historical'
       },{
         name:'报警查询',
         icon:'icon-alarm',
         path:'/alarm'
       },{
         name:'视频监控',
         icon:'icon-video1',
         path:'/video'
       },{
         name:'文档资料',
         icon:'icon-document',
         path:'/document'
       },{
         name:'质量评估',
         icon:'icon-quality1',
         path:'/quality'
       },{
         name:'作业成效',
         icon:'icon-operational',
         path:'/operational'
       }
     ]
   }
  },
  created(){
    let id=this.$store.state.project.projectId;
    let tenant=this.$store.state.project.tenant;
    project.info({'project_id':id,'tenant':tenant}).then(res=>{
      console.log(res);
      this.projectName=res.result.name;
    });
    this.isActive=0;
    this.projectLogo=sessionStorage.getItem('projectLogo');
    let _this=this;
    let cWidth=document.body.clientWidth;
    if(cWidth<1450){
      //console.log(cWidth);
      _this.isCollapse=false;
      _this.changeWidth();
      _this.isShow=false;
    }else{
      _this.isCollapse=true;
      _this.changeWidth();
      _this.isShow=true;
    }
    window.onresize = function (){
      let clientWidth=document.body.clientWidth;
      if(clientWidth<=1450){
        //console.log(clientWidth);
        _this.isCollapse=false;
        _this.changeWidth();
        _this.isShow=false;
      }else{
        _this.isCollapse=true;
        _this.changeWidth();
        _this.isShow=true;
      }
    };
  },
  mounted(){
    this.isActive=sessionStorage.getItem('isActive') || 0;
    //console.log(this.isCollapse);
    this.changeWidth()
    //console.log(this.isActive)
  },
  methods:{
    changeWidth(){
      if(this.isCollapse==true){
        this.navWidth='245px';
        this.imgShow=true;
      }else{
        this.navWidth='90px';
        this.imgShow=false
      }
    },
    checkedItem(index,title){
      this.isActive=index;
      Bus.$emit('changeTitle',title);
      sessionStorage.setItem('isActive',this.isActive);
    },
    collapse:function () {
      this.imgShow=!this.imgShow;
      this.isCollapse=!this.isCollapse;
      Bus.$emit('isCollapse',this.isCollapse);
      sessionStorage.setItem('isCollapse',this.isCollapse);
      this.changeWidth()
    }
  },
  watch: {
    $route(){
      this.lists.forEach((item,i)=>{
        if(item.path==this.$route.path){
          this.isActive=i;
          console.log(this.isActive)
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
      top: 630px;
      right: 30px;
      cursor: pointer;
      width: 24px;
      height: 21px;
    }
  }
  .el-aside::-webkit-scrollbar {/*滚动条整体样式*/
    width:4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
    background: #ffffff;
  }
  .el-aside::-webkit-scrollbar-button{
    background: rgba(0,0,0,0.2);
  }
  .el-aside::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .el-aside::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
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
    //background: url(../assets/Nav/projectLogo.png);
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
          padding-top: 12px;
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
