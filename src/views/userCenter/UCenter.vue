<template>
  <div>
    <div style="height: 100%">
      <div v-if="isModify" style="width: 100%;height: 100%;">
        <m-information></m-information>
      </div>

      <div class="u-box"  v-else>
        <div class="u-header" :style="{backgroundImage: 'url(' + userBg + ')'}">
          <div class="u-info">
            <div class="b-photo">
              <!--<img :src="avatarUrl" alt="头像">-->
              <el-upload
                :data="params"
                class="avatar-uploader"
                :headers="header"
                name="uploadFile"
                action="/foreground/project_file/add"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class=""></div>
            <div class="u-name">
              <p class="n-text">{{userInfo.name}}</p>
              <!--<p class="j-title">{{ role }}</p>-->
              <p class="j-title">{{ role }}</p>
            </div>
            <div class="u-jurisdiction">
              <!--电话号码-->
              <div class="i-company">
                <i class="iconfont icon-yonghu"></i>
                <div class="i-context">
                  <p>{{ userInfo.username }}</p>
                </div>
                <P style="float: left;cursor: pointer;">修改密码</P>
              </div>
              <div class="i-company">
                <span class="iconfont icon-company"></span>
                <div class="i-context">
                  <div>{{ projectOrgan }}</div>
                </div>
              </div>
              <div class="i-company">
                <i class="iconfont icon-phone"></i>
                <div class="i-context">
                  <div>{{ userInfo.phone }}</div>
                </div>
              </div>
              <div class="i-company">
                <i class="iconfont icon-mail"></i>
                <div class="i-context">
                  <div>{{ userInfo.phone }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="u-body">
          <div class="u-information">
            <div>扩展联系方式</div>
            <div>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link" style="cursor: pointer">
                  <i class="el-icon-circle-plus"></i><span style="margin-left: 10px">添加</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(list,index) in contactSelect" :key="index" :command="list">{{list.label}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>

          <!--机构名称-->
          <div class="i-box">
            <!--添加联系方式-->
            <div class="i-company" v-for="(list,index) in contactList" :key="index">
              <span style="margin-right: 10px;float: left">{{list.label}}</span>
              <input class="i-modify" type="text" v-if="list.flag" v-model="content" v-focus>
              <div class="i-context"  v-else>
                <p>{{ list.value }}</p>
              </div>
              <i class="iconfont icon-wancheng" @click="addContact(list,index)" v-if="list.flag"></i>
              <i class="iconfont icon-modify" @click="editContact(list,index)" v-else></i>
              <i class="iconfont icon-delete" @click="deleteContact(list)"></i>
            </div>
          </div>


        </div>
        <div class="m-formation">
          <el-button type="info" @click="modifyInformation">修改资料</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bus from '@/common/eventBus.js'
  import user from '@/api/userCenter/header'
  import contact from '@/api/userCenter/contact'
  import dictionary from '@/api/common/dictionary'
  import no_photo from '@/assets/header/no_photo.png'
  import userInfo from '@/assets/userinfo/userInfo.png'
  import MInformation from '@/views/userCenter/MInformation.vue'
export default {
  data(){
    return{
      userBg:userInfo,
      contactSelect:[],
      isCompany:true,
      isPhone:true,
      isCompany3:true,
      isCompany4:true,
      isCompany5:true,
      contactList:[],
      content:'',
      contactIndex:0,
      contactPostData:{},
      nameList:[],
      userInfo:{},
      role:'',
      projectOrgan:'',
      avatarUrl:'', //头像路径
      typeFont:'',
      header:{token:this.$cookies.get('token')},
      params:{component :'project',project_id:0},
      isModify:false
    }
  },
  components: {
    MInformation
  },
  created(){
    this.getContactInformation();
    this.getInformation();

  },
  mounted(){
    this.getContentList();
    Bus.$on('msg', (e) => {
      console.log('yes')
      this.isModify = e;
    })
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
      this.loading=this.$loading({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.2)'
      });
      let userId=sessionStorage.getItem('token').substring(0,2);
      user.userInfo({project_user_id:userId}).then(res=>{
        console.log(res);
        if(res.success){
          this.userInfo = res.result;
          this.role=res.result.userRole[0].projectRole.name;
          this.projectOrgan=res.result.projectOrgan.name;
          if(res.result.avatarBaseUr&&res.result.avatarPath){
            this.avatarUrl=res.result.avatarBaseUrl+res.result.avatarPath;
          }else{
            this.avatarUrl=no_photo
          }
          this.loading.close()
        }else{
          this.loading.close()
        }
      }).catch(e=>{
        this.loading.close()
      })
    },
    getContactInformation(){
      dictionary.list({'type':'contact'}).then(res=>{
        console.log(res);
        if(res.success){
          this.contactSelect=res.result;
          //let lists=res.result;
          //this.contactSelect=this.array_diff(lists,this.contactList)
        }
      })
    },
    getContentList(){
      contact.list().then(res=>{
        console.log(this.contactSelect);
        this.contactList=res.result.items;
      })
    },
    handleCommand(command) {
      console.log(command);
      let obj = Object.assign({},command);
      obj.flag = true;
      delete obj.id;
      this.typeFont=obj.value;
      this.contactList.push(obj);
    },

    edit(x){
      if(x=='company'){
        this.isCompany=!this.isCompany
      }else if(x=='phone'){
        this.isPhone=!this.isPhone
      }
    },
    update(x){
      if(x=='company'){
        this.isCompany=!this.isCompany
      }else if(x=='phone'){
        this.isPhone=!this.isPhone
      }
    },
    addContact(list,index){
      list.flag = false;
      let post_data = {};

      if(list.id){    //修改
        post_data=list;
        post_data.value = this.content;
        delete post_data.flag
      }else{      //添加
        post_data={
          'projectId':this.$cookies.get('projectId'),
          'userId':sessionStorage.getItem('token').substring(0,2),
          'type':list.value,
          'value':this.content,
          'status':1,
        }
      }
      contact.addContact(post_data).then(res=>{
        console.log(res);
        this.content = '';
        this.getContentList()
      });
      console.log(list);

      // list.flag=false;
    },
    editContact(list,index){
      console.log(index);
      this.content = list.value;
      list.flag=true;
    },
    deleteContact(list){
      if(list.id){
        contact.deleteContact({'project_user_contact_id':list.id}).then(res=>{
          console.log(res.message);
          this.getContentList();
          this.getInformation();
        })
      }else{
        this.contactList.pop()
      }

    },

    handleAvatarSuccess(res, file) {
      console.log(res);
      this.avatarUrl = URL.createObjectURL(file.raw);

    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    modifyInformation(){
      this.isModify=true
    }
  }
}
</script>

<style scoped lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .u-box{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    .u-header{
      width:100%;
      height:50%;
      background-size: cover;
      border-radius:3px 3px 0 0;
      position: relative;
      .u-info{
        height: calc(100% - 50px);
        width: 520px;
        position: absolute;
        left:50%;
        top:50%;
        margin-left:-260px;
        margin-top:-100px;
        text-align: center;
        .b-photo{
          width: 80px;
          height: 80px;
          margin: 0 auto;
          img{
            width: 80px;
            height: 80px;
            border-radius: 50%;

          }
        }

        .u-name{
          text-align: center;
          line-height: 35px;
          .n-text{
            font-size:22px;
            color:#ffffff;
          }
          .j-title{
            padding:0 5px;
            height:18px;
            width: auto;
            display: inline-block;
            background:#ffffff;
            border-radius:4px;
            color: #F85959;
            line-height: 18px;
            text-align: center;
            font-size: 12px;
            margin: 0 auto;
          }
        }
        .u-jurisdiction{
          width: 100%;
          margin-top: 5px;
          height: auto;
          i{
            font-size: 18px;
          }
          .i-company{
            color: #ffffff;
            width: 45%;
            height: 40px;
            line-height: 40px;

            float: left;
            //border-bottom: 1px solid rgba(218,218,218,1);
            .i-context{
              float: left;
              width: 150px;
              margin-left: 10px;
              p{
                width: 150px;
                text-align: left;
                font-size: 14px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              div{
                width: 210px;
                text-align: left;
                font-size: 14px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
            }
            .i-modify{
              float: left;
              width: 150px;
              border: none;
              outline: medium;
            }
            .icon-modify{
              float: left;
              cursor: pointer;
            }
            .icon-wancheng{
              float: left;
              cursor: pointer;
              font-size: 18px;
              color: #13ce66;
            }
            .iconfont{
              float: left;
              cursor: pointer;
            }
          }
          .i-company:nth-child(even){
            margin-left: 10%;
          }
        }
      }
    }
    .u-body{
      width: 520px;
      margin: 0 auto;
      .u-information{
        margin-top: 10%;
        border-left: 3px solid #999999;
        font-size:14px;
        padding-left: 15px;
        color:rgba(102,102,102,1);
        display: flex;
        justify-content: space-between;
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
          border-bottom: 1px solid rgba(218,218,218,1);
          .i-context{
            float: left;
            width: 155px;
            p{
              width: 120px;
              text-align: left;
              font-size: 14px;
              color: #666666;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
          .i-modify{
            width: 151px;
            border: none;
            outline: medium;
          }
          .icon-modify{

            cursor: pointer;
          }
          .icon-wancheng{
            cursor: pointer;
            font-size: 18px;
            color: #13ce66;
          }
          .iconfont{
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
  .m-formation{
    margin-top: 20px;
    text-align: center;
    width: 100%;
  }
</style>
