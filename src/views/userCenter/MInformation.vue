<template>
  <div style="width: 100%;height: 100%;background: #ffffff;overflow: hidden;">
    <div class="m-box">
      <!--<div class="m-return" @click="getReturn">返回</div>-->
      <el-form :model="userInfo" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-upload
          :data="params"
          class="avatar-uploader"
          :headers="header"
          name="uploadFile"
          action="/foreground/project_file/upload_avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="用户名" prop="name" size="small">
          <el-input v-model="userInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" size="small">
          <el-input v-model="userInfo.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" size="small">
          <el-input type="password" v-model="userInfo.password" auto-complete="off" @input="changePass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" size="small">
          <el-input type="password" v-model="checkPass" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" size="small">提交</el-button>
          <!--<el-button @click="resetForm('ruleForm2')">返回</el-button>-->
          <el-button @click="getReturn" size="small">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Bus from '@/common/eventBus.js'
  import user from '@/api/userCenter/header.js'
export default {
  name: "MInformation",
  props:['userInfo'],
  data() {
    var username = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号码'));
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的电话号码'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        name: '',
        phone:'',
        password: '',
        checkPass: '',
      },
      rules2: {
        name: [
          { validator: username, trigger: 'blur' }
        ],
        phone: [
          { validator: phone, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
      checkPass:'',
      avatarUrl:'',
      avatarPath:'',
      avatarBaseUrl:'',
      header:{token:this.$cookies.get('token')},
      params:{component :'project',project_id:0},
    };
  },
  mounted(){
    this.avatarUrl=this.userInfo.avatarBaseUrl+this.userInfo.avatarPath;
    this.avatarPath =this.userInfo.avatarPath;
    this.avatarBaseUrl =this.userInfo.avatarBaseUrl;
    this.checkPass=this.userInfo.password
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          delete this.userInfo.checkPass;
          this.userInfo.avatarPath=this.avatarPath;
          this.userInfo.avatarBaseUrl=this.avatarBaseUrl;
          console.log(this.userInfo);
          user.edit(this.userInfo).then(res=>{
            if(res.success){
              Bus.$emit('msg',false);
              this.$message.success('修改成功')
            }else{

            }
          }).catch(e=>{

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getReturn(){
      Bus.$emit('msg',false)
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.avatarUrl = URL.createObjectURL(file.raw);
      this.avatarPath =res.result.path;
      this.avatarBaseUrl =res.result.baseUrl;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    changePass(val){
      this.checkPass=''
    }
  },
  watch:{

  }
}
</script>

<style scoped lang="scss">
  .m-box{
    margin: 50px auto;
    width: 400px;
    position: relative;
    .m-return{
      cursor: pointer;
      position: absolute;
      right: -100px;
      top:-50px;
    }
  }

</style>
