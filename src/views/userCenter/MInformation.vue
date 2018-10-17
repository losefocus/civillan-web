<template>
  <div style="width: 100%;height: 100%;background: #ffffff;overflow: hidden;">
    <div class="m-box">
      <!--<div class="m-return" @click="getReturn">返回</div>-->
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <!--<el-form-item label="机构" prop="name">
          <el-input v-model="ruleForm2.name"></el-input>
        </el-form-item>-->
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm2.phone"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱">
          <el-input v-model="ruleForm2.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <!--<el-button @click="resetForm('ruleForm2')">返回</el-button>-->
          <el-button @click="getReturn">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Bus from '@/common/eventBus.js'
export default {
  name: "MInformation",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入机构名'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号码'));
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!myreg.test(value)) {
        callback(new Error('请输入正确的电话号码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        name: '',
        phone:'',
        email:''
      },
      rules2: {
        name: [
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getReturn(){
      console.log('okk');
      Bus.$emit('msg',false)
    }
  }
}
</script>

<style scoped lang="scss">
  .m-box{
    margin: 100px auto;
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
