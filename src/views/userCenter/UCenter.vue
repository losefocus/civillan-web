<template>
  <div>
    <div style="height: 100%">
      <div class="u-box">
        <div class="u-header" :style="{backgroundImage: 'url(' + userBg + ')'}">
          <div class="u-info">
            <img :src="avatarUrl" alt="头像">
            <div class="u-name">
              <p class="n-text">{{userInfo.name}}</p>
              <p class="n-num">{{userInfo.username}}</p>
            </div>
            <div class="u-jurisdiction">
              <p class="j-title">{{ role }}</p>
              <p class="j-password">修改密码</p>
            </div>
          </div>
        </div>
        <div class="u-body">
          <p class="u-information">联系方式</p>

          <!--机构名称-->
          <div class="i-box">
            <div class="i-company">
              <i class="iconfont icon-company"></i>
              <div class="i-context" v-if="isCompany1">
                <p>{{ projectOrgan }}</p>
              </div>
              <input class="i-modify" type="text" v-else="isCompany1" v-focus>
              <i class="iconfont icon-modify" @click="modify1()"></i>
            </div>

            <!--电话号码-->
            <div class="i-company">
              <i class="iconfont icon-phone"></i>
              <div class="i-context"  v-if="isCompany3">
                <p>{{ userInfo.phone }}</p>
              </div>
              <input class="i-modify" type="text" v-else="isCompany3" v-focus>
              <i class="iconfont icon-modify" @click="modify3()"></i>
            </div>

            <!--联系方式-->
            <div class="i-company">
              <i class="iconfont icon-WeChat"></i>
              <div class="i-context"  v-if="isCompany2">
                <p>wx199299</p>
              </div>
              <input class="i-modify" type="text" v-else="isCompany2" v-focus>
              <i class="iconfont icon-modify" @click="modify2()"></i>
            </div>

            <div class="i-company" >
              <i class="iconfont icon-mail"></i>
              <div class="i-context"  v-if="isCompany4">
                <p>18989477589@163.com</p>
              </div>
              <input class="i-modify" type="text" v-else="isCompany4" v-focus>
              <i class="iconfont icon-modify" @click="modify4()"></i>
            </div>

            <div class="i-company" >
              <i class="iconfont icon-mail"></i>
              <div class="i-context"  v-if="isCompany5">
                <p>18989477589@163.com</p>
              </div>
              <input class="i-modify" type="text" v-else="isCompany5" v-focus>
              <i class="iconfont icon-modify" @click="modify5()"></i>
            </div>

            <div class="i-company" >
              <i class="iconfont icon-mail"></i>
              <div class="i-context"  v-if="isCompany5">
                <p>18989477589@163.com</p>
              </div>
              <input class="i-modify" type="text" v-else="isCompany5" v-focus>
              <i class="iconfont icon-modify" @click="modify5()"></i>
            </div>

          </div>
          <div class="u-submit">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import user from '@/api/userCenter/header'
  import no_photo from '@/assets/header/no_photo.png'
  import userInfo from '@/assets/userinfo/userInfo.png'
export default {
  data(){
    return{
      userBg:userInfo,
      isCompany1:true,
      isCompany2:true,
      isCompany3:true,
      isCompany4:true,
      isCompany5:true,
      userInfo:{},
      role:'',
      projectOrgan:{},
      avatarUrl:'', //头像路径
    }
  },
  mounted(){
    this.getInformation();
  },
  directives: {
    focus: {
      // 当绑定元素插入到 DOM 中。
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
    }
  },
  methods:{
    getInformation(){
      let userId=sessionStorage.getItem('token').substring(0,2);
      user.userInfo({project_user_id:userId}).then(res=>{
        //console.log(res);
        this.userInfo = res.result;
        this.role=res.result.userRole[0].projectRole.role;
        this.projectOrgan=res.result.projectOrgan.name;
        if(res.result.avatarBaseUr&&res.result.avatarPath){
          this.avatarUrl=res.result.avatarBaseUrl+res.result.avatarPath;
        }else{
          this.avatarUrl=no_photo
        }
      })
    },
    modify1(){
      this.isCompany1=!this.isCompany1
    },
    modify2(){
      this.isCompany2=!this.isCompany2
    },
    modify3(){
      this.isCompany3=!this.isCompany3
    },
    modify4(){
      this.isCompany4=!this.isCompany4
    },
    modify5(){
      this.isCompany5=!this.isCompany5
    }
  }
}
</script>

<style scoped lang="scss">
  .u-box{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    overflow: hidden;
    .u-header{
      width:100%;
      height:40%;
      background-size: cover;
      overflow: hidden;
      border-radius:3px 3px 0 0;
      display: flex;
      justify-content:center;
      align-items:Center;
      .u-info{
        height: 35%;
        width: 280px;
        display: flex;
        justify-content: space-around;
        img{
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        .u-name{
          line-height: 40px;
          .n-text{
            font-size:22px;
            color:#ffffff;
          }
          .n-num{
            font-size:14px;
            color:#ffffff;
          }
        }
        .u-jurisdiction{
          line-height: 67px;
          .j-title{
            padding:0 5px;
            height:18px;
            background:rgba(111,221,232,1);
            border-radius:4px;
            color: #ffffff;
            line-height: 18px;
            text-align: center;
            font-size: 12px;
            margin-top: 10px;
          }
          .j-password{
            font-size: 12px;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
    }
    .u-body{
      width: 450px;
      margin: 0 auto;
      .u-information{
        margin-top: 10%;
        font-size:14px;
        color:rgba(102,102,102,1);
      }
      .i-box{
        margin-top: 5%;
        height: auto;
        display: flex;
        justify-content: space-between;
        flex-flow:row  wrap;
        i{
          color: #999999;
          font-size: 18px;
        }
        .i-company{
          width: 45%;
          height: 40px;
          line-height: 40px;

          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(218,218,218,1);
          .i-context{
            width: 150px;
            p{
              width: 150px;
              text-align: left;
              font-size: 14px;
              color: #666666;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
          .i-modify{
            width: 150px;
            border: none;
            outline: medium;
          }
          .icon-modify{
            cursor: pointer;
          }
        }
      }
      .u-submit{
        width:160px;
        height:30px;
        color: #ffffff;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        background:rgba(102,102,102,1);
        border-radius:6px;
        margin: 6% auto;
        cursor: pointer;
      }
    }

  }
</style>
