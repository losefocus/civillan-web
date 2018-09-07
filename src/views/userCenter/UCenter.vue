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
          <div class="u-information">
            <div>联系方式</div>
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
            <div class="i-company">
              <span class="iconfont icon-company"></span>
              <div class="i-context" v-if="isCompany">
                <p>{{ projectOrgan }}</p>
              </div>
              <input class="i-modify" v-model="projectOrgan" type="text" v-else="isCompany" v-focus>
              <i class="iconfont icon-modify" @click="edit('company')" v-if="isCompany"></i>
              <i class="iconfont icon-wancheng" @click="update('company')" v-else="isCompany"></i>
            </div>

            <!--电话号码-->
            <div class="i-company">
              <i class="iconfont icon-phone"></i>
              <div class="i-context"  v-if="isPhone">
                <p>{{ userInfo.phone }}</p>
              </div>
              <input class="i-modify" type="text" v-else="isPhone" v-focus>
              <i class="iconfont icon-modify" @click="edit('phone')" v-if="isPhone"></i>
              <i class="iconfont icon-wancheng" @click="update('phone')" v-else="isPhone"></i>
            </div>



            <!--添加联系方式-->
            <div class="i-company" v-for="(list,index) in contactList" :key="index">
              <span style="margin-right: 21px" class="iconfont" :class="{'icon-WeChat':list.type=='wechat','icon-mail':list.type=='email','icon-sms':list.type=='sms'}"></span>
              <input class="i-modify" type="text" v-if="list.flag" v-model="content" v-focus>
              <div class="i-context"  v-else>
                <p style="width: 140px;">{{ list.value }}</p>
              </div>
              <i class="iconfont icon-wancheng" @click="addContact(list,index)" v-if="list.flag"></i>
              <i class="iconfont icon-modify" @click="editContact(list,index)" v-else></i>
              <i class="iconfont icon-delete" @click="deleteContact(list)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import user from '@/api/userCenter/header'
  import contact from '@/api/userCenter/contact'
  import dictionary from '@/api/common/dictionary'
  import no_photo from '@/assets/header/no_photo.png'
  import userInfo from '@/assets/userinfo/userInfo.png'
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
    }
  },
  created(){
    this.getContactInformation()
  },
  mounted(){
    this.getContentList();
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
      this.loading=this.$loading({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.2)'
      });
      let userId=sessionStorage.getItem('token').substring(0,2);
      user.userInfo({project_user_id:userId}).then(res=>{
        //console.log(res);
        if(res.success){
          this.userInfo = res.result;
          this.role=res.result.userRole[0].projectRole.role;
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
          //this.contactSelect=res.result;
          let lists=res.result;

          this.contactSelect=this.array_diff(lists,this.contactList)
        }
      })
    },
    getContentList(){
      contact.list().then(res=>{
        console.log(res);
        this.contactList=res.result.items;
        let array = [];
        this.contactList.forEach(item=>{
          item.flag=false;
          let obj = Object.assign({},item);
          array.push(obj)
        });
        this.contactList = array
      })
    },

    array_diff(a, b) {
      for (var i = 0; i < b.length; i++) {
        for (var j = 0; j < a.length; j++) {
          if (a[j].value == b[i].type) {
            a.splice(j, 1);
            j = j - 1;
          }
        }
      }
      return a;
    },
    handleCommand(command) {
      let obj = Object.assign({},command);
      obj.flag = true;
      delete obj.id
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
      let post_data = {}

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
          .icon-wancheng{
            cursor: pointer;
            font-size: 18px;
            color: #13ce66;
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
