<template>
  <div>
    <el-container>
      <el-main>
        <div class="cp-logo"></div>
      </el-main>
      <el-aside width="32%">
        <p class="user-title">用户登录</p>
        <p class="cp-system">工程施工实时监控系统</p>

        <form action="" @submit.prevent="submit">
          <div class="log-spacing">
            <label for="username">账号</label>
          </div>
          <input type="text" id="username" placeholder="请输入账号" v-model="userInfo.username" @blur="getUser(userInfo.username)" :class={fail:isFail,success:isSuccess}>
          <p :class={fail:isFail,success:isSuccess}>{{validateRules}}</p>
          <div class="log-spacing">
            <label for="password">密码</label>
          </div>
          <input type="password" id="password" placeholder="请输入密码" v-model.lazy="userInfo.password" @blur="getPassword(userInfo.password)">
          <p :class={fail:isFail1,success:isSuccess1}>{{validateRules1}}</p>
          <div class="log-spacing">
            <el-checkbox v-model="userInfo.checked">记住密码</el-checkbox>
          </div>
          <div class="log-spacing">
            <button type="submit" id="log-submit">登录</button>
            <span class="log-forget" @click="getCookie()" v-model="checked">忘记密码?</span>
          </div>
        </form>

        <p class="cp-code">浙ICP备1500号 Copyright © 2018浙江智握领程科技股份有限公司 版权所有V1.01.</p>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import { mapActions , mapState} from 'vuex'
  export default {
    data() {
      return {
        userInfo:{},
        validateRules:'',
        validateRules1:'',
        isFail:false,
        isSuccess:false,
        isFail1:false,
        isSuccess1:false,
        checked:false
      };
    },
    mounted() {
      document.body.onkeydown = this.keyDown
    },
    computed: {
      ...mapState(['isLogin'])
    },
    methods: {
      ...mapActions(['incrementLogin']),
      keyDown(e) {
        //console.log(e.code)
        if (e.code == 'Enter') {
          console.log(this);
          this.getPassword();
          this.getUser();
          this.submit()
          //this.$options.methods.submitForm('loginForm')
        }
      },
      getUser(u){
        if(/^\s*$/g.test(u)||u==""||u==undefined){
          console.log(u);
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
          console.log('成功')
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
        if(this.isSuccess1&&this.isSuccess){
          console.log(this.userInfo);
          var that=this;
          this.$api.login.login(this.userInfo).then((res) => {
            if(this){

            }
            //that.$store.dispatch('incrementLogin',1);
            //that.$store.dispatch('incrementToken',res.result.token);
            //that.$router.push('/');
            console.log(res);
          },(e)=>{
            console.log(e)
          });
        }else {
          console.log('密码账号错误')
        }
        //this.$cookie.set('user.info',JSON.stringify(this.userInfo),{ expires: '60s'});
      },
      getCookie:function () {
        console.log(this.$cookie.get('user.info'));
      }
    }
  }
</script>

<style scoped lang="scss">
  $percent:100%;

  .fail{
    border-top: 1px solid red;
    font-size: 12px;
    color : red
  }
  .success{
    border-top: 1px solid greenyellow;
    font-size: 12px;
    color : red
  }
    /*头部*/
  .el-main{
    height: 973px;
    padding: 50px 70px;
    background: url("../../static/img/login/group.png") no-repeat;
    .cp-logo{
      width: 200px;
      height: 45px;
      background: red;
      background: url("../../static/img/login/logo.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .el-aside{
    padding: 120px 80px 0;
    .user-title{
      font-size: 32px;
      font-weight: bold;
    }
    .cp-system{
      font-size: 20px;
      margin-top: 20px;
      color: #535353;
      margin-bottom: 120px;
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
    }
    .log-forget{
      margin-left: 60px;
      font-size:14px;
      color:rgba(248,89,89,1);
    }
    .cp-code{
      margin-top: 240px;
      font-size: 12px;
      color: #8A96A0;
    }
  }
</style>
