<template>
  <div style="height: 100%">
    <transition name="fade" mode="out-in">
      <div class="nav-bar">
        <transition name="fade">
          <div class="pj-img">
            <div class="pj-title" :style="{'background-image': 'url(' + projectLogo+ ')','background-repeat':'no-repeat','background-size':'100% 100%' }">
              <p>
                {{projectName}}
              </p>
            </div>
          </div>
        </transition>

        <ul class="nav-box">
          <li v-for="(list,index) in lists" class="nav-list">
            <router-link tag="div" :to="list.path" class="nav-link">
              <el-tooltip class="item" effect="dark" :content="list.name" placement="right" :disabled="isCollapse">
                  <div class="nav-icon">
                    <i class="iconfont" :class="list.icon"></i>
                  </div>
              </el-tooltip>
              <div class="link-title">{{ list.name }}</div>
            </router-link>
          </li>
        </ul>
        <div id="resize" @click="collapse()" :class="{'navOpen':!isCollapse,'navClose':isCollapse}" v-show="isShow"></div>
      </div>
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
         icon:'icon-project_new',
         path:'/project',
       },{
         name:'设备列表',
         icon:'icon-device_new',
         path:'/device'
       },{
         name:'数据报表',
         icon:'icon-history_new',
         path:'/historical'
       },{
         name:'统计分析',
         icon:'icon-statistics_new',
         path:'/analysis'
       },{
         name:'作业成效',
         icon:'icon-results_new',
         path:'/operational'
       },{
         name:'作业配置',
         icon:'icon-config_new',
         path:'/configure'
       },{
         name:'故障报警',
         icon:'icon-alarm_new',
         path:'/alarm'
       },{
         name:'质量评估',
         icon:'icon-assessment_new',
         path:'/quality'
       },{
         name:'现场影像',
         icon:'icon-video_new',
         path:'/video'
       },{
         name:'文档资料',
         icon:'icon-document_new',
         path:'/document'
       },
     ]
   }
  },
  created(){
    let id=this.$cookies.get('projectId');
    let tenant=this.$cookies.get('tenant');
    project.info({'project_id':id,'tenant':tenant}).then(res=>{
      this.projectName=res.result.name;
    });
    this.isActive=0;
    this.projectLogo=this.$cookies.get('projectLogo');
    let _this=this;
    let cWidth=document.body.clientWidth;
    if(cWidth<1450){
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
        _this.isCollapse=false;
        _this.changeWidth();
        _this.isShow=false;
      }else{
        _this.isCollapse=true;
        _this.changeWidth();
        _this.isShow=false;
      }
    };
  },
  mounted(){
    this.isActive=sessionStorage.getItem('isActive') || 0;
    this.changeWidth();
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
  .nav-bar{
    width: 245px;
    height: 100%;
    position: relative;
    transition: 0.4s all ease;
    overflow: auto;
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
  .nav-bar::-webkit-scrollbar {/*滚动条整体样式*/
    width:4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
    background: #ffffff;

  }
  .nav-bar::-webkit-scrollbar-button{
    background: rgba(0,0,0,0.2);
  }
  .nav-bar::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .nav-bar::-webkit-scrollbar-track {/*滚动条里面轨道*/
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
    display: block;
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
    //height: 100%;
    position: relative;
    //overflow: auto;
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
            font-size: 30px;
          }
        }
        .link-title{
          font-size: 14px;
          margin-top: 5px;
          display: block;
        }
      }
    };
    .nav-list:last-child{
      margin-bottom: 20px!important;
    }
    .liActive{
      width: 50px;
      height: 50px;
      margin: 20px 0 0 20px;
      transition: 0.6s all ease;
      border: none;
      .nav-icon{
        padding-top: 10px !important;
      }
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

  @media screen and (max-width: 1467px){
    .nav-bar{
      width: 90px;
      //overflow: auto;
      .pj-img{
        display: none;
      }
      .nav-box{
        width: 100%;
        position: relative;
        .nav-list{
          width: 50px;
          height: 50px;
          margin: 20px 0 0 20px;
          .nav-link{
            border-radius: 6px;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: 0.6s all ease;
            color: #4F5059;
            overflow: hidden;
            .nav-icon{
              padding-top: 10px !important;
            }
            .link-title{
              display: none;
            }
          }
        };
      }
    }
  }
</style>
