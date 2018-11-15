<template>
  <div style="height: 100%">
    <el-container style="height: 100%;">
      <div class="l-bg" :style="{backgroundImage: 'url(' + groupImg + ')' }">
        <div class="cp-logo" :style="{backgroundImage: 'url(' + logoImg + ')' }"></div>
      </div>
      <div class="l-side" @keyup.enter.native="keyDown">
        <p class="user-title">用户登录</p>
        <p class="cp-system">工程信息化智慧云平台</p>

        <form action="" @submit.prevent="submit">
          <div class="log-spacing l-label">
            <label for="username">公司代号</label>
          </div>
          <input type="text" id="domain" autocomplete placeholder="请输入公司代号" v-model="userInfo.domain" @input="getDomain(userInfo.domain)" :class={fail:isFail2,success:isSuccess2}>
          <p class="initColor" :class={fail:isFail2,success:isSuccess2}></p>
          <div class="log-spacing l-label">
            <label for="username">账号</label>
          </div>
          <input type="text" id="username" autocomplete placeholder="请输入账号" v-model="userInfo.username" @input="getUser(userInfo.username)" :class={fail:isFail,success:isSuccess}>
          <p class="initColor" :class={fail:isFail,success:isSuccess}>{{validateRules}}</p>
          <div class="log-spacing l-label">
            <label for="password">密码</label>
          </div>
          <input type="password" id="password" autocomplete placeholder="请输入密码" v-model="userInfo.password" @input="getPassword(userInfo.password)">
          <p class="initColor" :class={fail:isFail1,success:isSuccess1}>{{validateRules1}}</p>
          <div class="log-spacing">
            <el-checkbox v-model="userInfo.checked">自动登录</el-checkbox>
          </div>
          <div class="log-spacing l-submit">
            <button type="submit" id="log-submit">登录</button>
            <span class="log-forget" @click="getCookie()">忘记密码?</span>
          </div>
        </form>
        <p class="cp-code">Copyright 2018 智握领程 版权所有.</p>
      </div>
    </el-container>
  </div>
</template>

<script>
  import { mapActions , mapState} from 'vuex'
  import login from '@/api/userCenter/login'
  import group from '@/assets/login/group.jpg'
  import logo from '@/assets/login/logo.png'
  export default {
    data() {
      return {
        userInfo:{
          checked:false
        },
        groupImg:group,
        logoImg:logo,
        validateRules:'',
        validateRules1:'',
        validateRules2:'',
        isFail:false,
        isSuccess:false,
        isFail1:false,
        isSuccess1:false,
        isFail2:false,
        isSuccess2:false,
        isBrowser:false,
      };
    },
    created(){
    },
    mounted() {
    },
    computed: {
      ...mapState({token:state=>state.login.token})
    },
    methods: {
      ...mapActions('token',['incrementToken']),

      keyDown() {
          this.submit();
      },
      getUser(u){
        if(/^\s*$/g.test(u)||u==""||u==undefined){
          this.validateRules='用户名不能为空';
          this.isFail=true;
          this.isSuccess=false;
        }else if(!/^[0-9a-zA-Z_]{1,}$/.test(u)){
          this.validateRules='用户名只能包含数字，字母或下划线';
          this.isFail=true;
          this.isSuccess=false;
        }else{
          this.validateRules='';
          this.isSuccess=true;
          this.isFail=false;
        }
      },
      getDomain(u){
        if(/^\s*$/g.test(u)||u==""||u==undefined){
          this.validateRules2='代号不能为空';
          this.isFail2=true;
          this.isSuccess2=false;
        }else{
          this.validateRules='';
          this.isSuccess2=true;
          this.isFail2=false;
        }
      },
      getPassword:function(p){
        let reg = /^\s*$/g;
        if(reg.test(p)||p==""||p==undefined){
          this.validateRules1='用户名不能为空';
          this.isFail1=true;
          this.isSuccess1=false;
        }else if(p.length<0||p.length>20){
          this.validateRules1='密码的长度必须为6-20位之间';
          this.isFail1=true;
          this.isSuccess1=false;
        }else {
          this.validateRules1='';
          this.isFail1=false;
          this.isSuccess1=true;
        }
      },
      submit:function(){
        const loading=this.$loading({
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.2)'
        });
        if(this.isSuccess2){
          this.isFail2=false;
          this.isSuccess2=true;
          if(this.isSuccess&&this.isSuccess1&&this.isSuccess2){
            let that=this;
            login.login(this.userInfo).then((res) => {
              if(res.success==false){
                loading.close();
                that.$message.error(res.message)
              }else{
                let wsUrl=JSON.parse(res.result.wsUrl);
                if(that.userInfo.checked){
                  //sessionStorage.setItem('token',res.result.token);
                  //sessionStorage.setItem('wsUrl',wsUrl.result);
                  that.$cookies.set('token',res.result.token,60 * 60 * 24 * 31);
                  that.$cookies.set('wsUrl',wsUrl.result,60 * 60 * 24 * 31);
                  that.$cookies.set('checked',that.userInfo.checked,60 * 60 * 24 * 31);
                  that.$store.dispatch('incrementToken',res.result.token);
                  that.$router.push('/');
                  that.$message.success('登陆成功');
                  loading.close();
                }else{
                  that.$cookies.set('token',res.result.token);
                  that.$cookies.set('wsUrl',wsUrl.result);
                  that.$cookies.set('checked',that.userInfo.checked);
                  //sessionStorage.setItem('token',res.result.token);
                  //sessionStorage.setItem('wsUrl',wsUrl.result);
                  //that.$cookies.remove('token');
                  that.$store.dispatch('incrementToken',res.result.token);
                  that.$router.push('/');
                  that.$message.success('登陆成功');
                  loading.close();
                }
              }
            }).catch(err => {
              console.log(err);
              loading.close();
            });
          }else {
            loading.close();
            this.$message.error('密码账号错误');
          }
        }else{
          this.isFail2=true;
          this.isSuccess2=false;
          this.$message.error('公司代号错误');
          loading.close();
        }
        //this.$cookie.set('user.info',JSON.stringify(this.userInfo),{ expires: '60s'});
      },
      getCookie:function () {

      }
    }
  }
</script>

<style scoped lang="scss">
  $percent:100%;
  .b-tips{
    width: 100%;
    text-align: center;
    font-size: 20px;
    padding-top: 50px;
  }
  .b-IconBox{
    width: 100%;
    padding: 50px 0;
    text-align: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
    .b-Icon{
      width: 100px;
      height: 100px;
    }
  }
  .initColor{
    border-top:2px solid rgba(220,224,230,1);
  }
  .fail{
    border-top: 2px solid #F03E41;
    font-size: 12px;
    color : #F03E41
  }
  .success{

    border-top: 2px solid #0FA2FF;
    font-size: 12px;
    color : #0FA2FF
  }

  /*头部*/
  .l-bg{
    float: left;
    width: calc(65% - 140px);
    height: calc(100% - 100px);
    padding: 50px 70px;
    background-size: cover;
    .cp-logo{
      width: 200px;
      height: 45px;
      background-size: 100% 100%;
    }
  }
  .l-side{

    width: 27%;
    height: 79%;
    //min-height: 645px;
    float: left;
    padding: 5% 4% 0;
    .user-title{
      height: 6%;
      font-size: 32px;
      font-weight: bold;
    }
    .cp-system{
      height: 4%;
      font-size: 20px;
      margin: 5% 0 15%;
      color: #535353;
    }
    .log-spacing{
      height: 5%;
      margin-top: 8%;
    }
    label{
      font-weight: bold;
      height:3%;
      font-size:20px;
      color: #333333;
      line-height:23px;
    }
    .stateLine{
      width: 100%;
      border-bottom: 1px solid #DCE0E6;
    }
    input{
      margin-top: 5%;
      outline: medium;
      border: none;
      height: 8%;
      //line-height: 30px;
      font-size: 17px;
      width: 100%;
      color: #666666;
      background-image: none;
    }
    form p{
      width: 100%;
      height: 5%;
      line-height: 20px;
    }
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset;
    }
    #log-submit{
      width: 60%;
      height: 40px;
      background: #F31A1A;
      color: #ffffff;
      outline: medium;
      border: none;
      box-shadow: 0 6px 15px rgba(243,26,26,0.4);
      border-radius:6px;
      cursor: pointer;
    }
    .log-forget{
      width: 30%;
      margin-left: 10%;
      font-size:14px;
      color:rgba(248,89,89,1);
      cursor: pointer;
    }
    .cp-code{
      width: 100%;
      text-align: center;
      margin-top: 20%;
      font-size: 12px;
      color: #8A96A0;
    }
  }

  @media screen and (min-width: 1200px) and (max-width: 1600px)  {
    .l-side{
      height: calc(100% - 80px);
      padding: 40px 4%;
      overflow: auto;
      //position: relative;
      .user-title{
        font-size: 25px;
      }
      .cp-system{
        font-size: 18px;
        margin-bottom: 20%;
      }

      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset;
      }
      .cp-code{
        width: 100%;
        margin-top: 10%;
        font-size: 12px;
        color: #8A96A0;
        text-align: center;
      }
    }
  }
  @media screen and (max-width: 1199px){
    .el-container{
      position: relative;
    }
    .l-bg{
      float: left;
      width: calc(100% - 140px);
      height: calc(100% - 100px);
    }
    .l-side{
      padding: 20px 5% 0;
      width: 450px !important;
      height: 400px !important;
      min-height: 400px;
      position: absolute;
      left:0;
      top: 100px;
      bottom: 0;
      right: 0;
      margin: auto;
      background: #ffffff;
      opacity: .8;
      .user-title{
        width: 100%;
        text-align: center;
        font-size: 26px;
      }
      .cp-system{
        width: 100%;
        text-align: center;
        font-size: 16px;
        margin-top: 3%;
        margin-bottom: 2%;
      }
      .log-spacing{
        margin-top: 10px;
      }
      label{
        font-weight: bold;
        height:24px;
        font-size:14px;
        color: #333333;
        line-height:23px;
      }
      .l-label{
        width: 20%;
        font-size: 12px;
        display: inline-block;
      }
      .stateLine{
        width: 100%;
        border-bottom: 1px solid #DCE0E6;
      }
      input{
        margin-top: 10px;
        outline: medium;
        border: none;
        height: 30px;
        line-height: 30px;
        font-size: 17px;
        width: 78%;
        color: #666666;
        background-image: none;
      }
      form p{
        width: 100%;
        height: 20px;
        line-height: 20px;
      }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset;
      }
      .l-submit{
        width: 100%;
        text-align: center;
      }
      #log-submit{
        width: 100%;
        height: 35px;
        background: #F31A1A;
        color: #ffffff;
        outline: medium;
        border: none;
        box-shadow: 0 6px 15px rgba(243,26,26,0.4);
        border-radius:6px;
        cursor: pointer;
      }
      .log-forget{
        width: 100%;
        display: block;
        margin: 15px 0 0 0 ;
        text-align: center;
        font-size:12px;
        color:rgba(248,89,89,1);
        cursor: pointer;
      }
      .cp-code{
        display: none;
      }
    }
  }
</style>
