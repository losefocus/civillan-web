<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-main style="height: 100%">
        <div class="cp-logo"></div>
      </el-main>
      <el-aside width="32%">
        <p class="user-title">用户登录</p>
        <p class="cp-system">工程施工实时监控系统</p>

        <form action="" @submit.prevent="submit">
          <div class="log-spacing">
            <label for="username">账号</label>
          </div>
          <input type="text" id="username" autocomplete placeholder="请输入账号" v-model="userInfo.username" @input="getUser(userInfo.username)" :class={fail:isFail,success:isSuccess}>
          <p class="initColor" :class={fail:isFail,success:isSuccess}>{{validateRules}}</p>
          <div class="log-spacing">
            <label for="password">密码</label>
          </div>
          <input type="password" id="password" autocomplete placeholder="请输入密码" v-model="userInfo.password" @input="getPassword(userInfo.password)">
          <p class="initColor" :class={fail:isFail1,success:isSuccess1}>{{validateRules1}}</p>
          <div class="log-spacing">
            <el-checkbox v-model="userInfo.checked">自动登录</el-checkbox>
          </div>
          <div class="log-spacing">
            <button type="submit" id="log-submit">登录</button>
            <span class="log-forget" @click="getCookie()">忘记密码?</span>
          </div>
        </form>

        <p class="cp-code">浙ICP备1500号 Copyright © 2018浙江智握领程科技股份有限公司 版权所有V1.01.</p>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import { mapActions , mapState} from 'vuex'
  import login from '@/api/userCenter/login'
  export default {
    data() {
      return {
        userInfo:{
          checked:false
        },
        validateRules:'',
        validateRules1:'',
        isFail:false,
        isSuccess:false,
        isFail1:false,
        isSuccess1:false
      };
    },
    created(){
    },
    mounted() {
      document.body.onkeydown = this.keyDown;
    },
    computed: {
      ...mapState({token:state=>state.login.token})
    },
    methods: {
      ...mapActions('token',['incrementToken']),

      keyDown(e) {
        //console.log(e.code)
        if (e.code == 'Enter') {
          console.log(this);
          this.submit();
          //this.$options.methods.submitForm('loginForm')
        }
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
        if(this.isSuccess&&this.isSuccess1){
          var that=this;
          console.log(this.userInfo);
          login.login(this.userInfo).then((res) => {
            console.log(res);
            let wsUrl=JSON.parse(res.result.wsUrl);
            console.log(res.result);
            if(that.userInfo.checked){
              sessionStorage.setItem('token',res.result.token);
              sessionStorage.setItem('wsUrl',wsUrl.result);
              that.$cookies.set('token',res.result.token,60 * 60 * 24 * 31);
              that.$cookies.set('wsUrl',wsUrl.result,60 * 60 * 24 * 31);
              that.$store.dispatch('incrementToken',res.result.token);
              that.$router.push('/');
            }else{
              sessionStorage.setItem('token',res.result.token);
              sessionStorage.setItem('wsUrl',wsUrl.result);
              that.$cookies.remove('token');
              that.$store.dispatch('incrementToken',res.result.token);
              that.$router.push('/');
            }
          }).catch(err => {
            console.log(err)
          });
        }else {
          console.log('密码账号错误');
        }
        //this.$cookie.set('user.info',JSON.stringify(this.userInfo),{ expires: '60s'});
      },
      getCookie:function () {
        console.log(this.$cookie.get('token'));
      }
    }
  }
</script>

<style scoped lang="scss">
  $percent:100%;
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
  .el-main{
    padding: 50px 70px;
    background: url("../../static/img/login/group.png") no-repeat;
    background-size: cover;
    .cp-logo{
      width: 200px;
      height: 45px;
      background: red;
      background: url("../../static/img/login/logo.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .el-aside{
    padding: 7% 4% 0;
    .user-title{
      font-size: 32px;
      font-weight: bold;
    }
    .cp-system{
      font-size: 20px;
      margin-top: 5%;
      color: #535353;
      margin-bottom: 30%;
    }
    .log-spacing{
      margin-top: 20px;
    }
    label{
      font-weight: bold;
      height:24px;
      font-size:20px;
      color: #333333;
      line-height:23px;
    }
    .stateLine{
      width: 330px;
      border-bottom: 1px solid #DCE0E6;
    }
    input{
      margin-top: 20px;
      outline: medium;
      border: none;
      height: 30px;
      line-height: 30px;
      font-size: 17px;
      width: 330px;
      color: #666666;
      background-image: none;
    }
    form p{
      width: 330px;
      height: 20px;
      line-height: 20px;
    }
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset;
    }
    #log-submit{
      width: 200px;
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
      margin-left: 60px;
      font-size:14px;
      color:rgba(248,89,89,1);
      cursor: pointer;
    }
    .cp-code{
      margin-top: 40%;
      font-size: 12px;
      color: #8A96A0;
    }
  }
  @media screen and (max-width: 1600px) {
    .el-aside{
      padding: 3% 4% 0;
      .user-title{
        font-size: 28px;
      }
      .cp-system{
        font-size: 18px;
        margin-bottom: 30%;
      }
      .log-spacing{
        margin-top: 20px;
      }
      label{
        font-weight: bold;
        height:24px;
        font-size:20px;
        color: #333333;
        line-height:23px;
      }
      .stateLine{
        width: 280px;
        border-bottom: 1px solid #DCE0E6;
      }
      input{
        margin-top: 10px;
        outline: medium;
        border: none;
        height: 30px;
        line-height: 30px;
        font-size: 17px;
        width: 280px;
        color: #666666;
        background-image: none;
      }
      form p{
        width: 280px;
        height: 20px;
        line-height: 20px;
      }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset;
      }
      #log-submit{
        width: 140px;
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
        margin-left: 60px;
        font-size:14px;
        color:rgba(248,89,89,1);
        cursor: pointer;
      }
      .cp-code{
        margin-top: 28%;
        font-size: 12px;
        color: #8A96A0;
        text-align: center;
      }
    }
  }
</style>
