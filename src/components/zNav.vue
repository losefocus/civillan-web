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
            <router-link tag="div" :to="list.path" class="nav-link">
              <el-tooltip class="item" effect="dark" :content="list.name" placement="right" :disabled="isCollapse">
                  <div class="nav-icon">
                    <i class="iconfont" :class="list.icon"></i>
                  </div>
              </el-tooltip>
              <div class="link-title" v-show="isCollapse">{{ list.name }}</div>
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
     isShow:false,
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
         path:'/project',
       },{
         name:'设备列表',
         icon:'icon-device',
         path:'/device'
       },{
         name:'数据报表',
         icon:'icon-history',
         path:'/historical'
       },{
         name:'统计分析',
         icon:'icon-analysis',
         path:'/analysis'
       },{
         name:'作业成效',
         icon:'icon-operational',
         path:'/operational'
       },{
         name:'作业配置',
         icon:'icon-config',
         path:'/configure'
       },{
         name:'故障报警',
         icon:'icon-alarm',
         path:'/alarm'
       },{
         name:'质量评估',
         icon:'icon-quality1',
         path:'/quality'
       },{
         name:'现场影像',
         icon:'icon-video1',
         path:'/video'
       },{
         name:'文档资料',
         icon:'icon-document',
         path:'/document'
       },
     ]
   }
  },
  created(){
    let id=this.$store.state.project.projectId;
    let tenant=this.$store.state.project.tenant;
    project.info({'project_id':id,'tenant':tenant}).then(res=>{
      //console.log(res);
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
      _this.isShow=false;
    }
    window.onresize = function (){
      let clientWidth=document.body.clientWidth;
      if(clientWidth<=1450){
        //console.log(clientWidth);
        _this.isCollapse=false;
        _this.changeWidth();
        _this.isShow=false;
      }else{
        console.log(_this.isCollapse);
        _this.isCollapse=true;
        _this.changeWidth();
        _this.isShow=false;
      }
    };
  },
  mounted(){
    this.isActive=sessionStorage.getItem('isActive') || 0;
    //console.log(this.isCollapse);
    this.changeWidth()
    //console.log(this.isActive)
    let _this=this;
    Bus.$on('isActive',function (res) {
      _this.isActive=res;
    })
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
  /*watch: {
    $route(to,from){
      //console.log(to.path)
      this.lists.forEach((item,i)=>{
        if(item.path==to.path){
          this.isActive=i;
          sessionStorage.setItem('isActive',this.isActive);
          //console.log(this.isActive)
        }
      })
    },
  },*/
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
        background:rgba(0,0,0,0.36);
        position: absolute;
        bottom: 0;
      }
    }
  }
  .nav-box{
    width: 100%;
    position: relative;
    .nav-list{
      cursor: pointer;
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
  .router-link-active{
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
