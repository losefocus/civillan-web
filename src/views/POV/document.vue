<template>
  <div class="n-box">
    <div class="c-box">
      <div class="c-query">
        <el-input v-model="searchName" size="mini" style="margin: 0 5px;width: 20%;float: left;" placeholder="请输入内容"></el-input>
        <el-date-picker
          size="mini"
          v-model="value7"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2" style="margin: 0 5px;width: 40%;float: left;">
        </el-date-picker>
        <div class="c-button">
          <el-button type="info" size="mini">查询</el-button>
        </div>
        <div class="c-button">
          <el-button type="info" size="mini">重置</el-button>
        </div>
      </div>
      <div class="c-handle">
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="Refresh()">刷新</el-button>
        <el-button type="primary" icon="el-icon-upload2" size="mini" @click="upload()">上传</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题">
      </el-table-column>
      <el-table-column
        align="center"
        label="上传时间">
        <template slot-scope="props">
          {{ props.row.createdAt*1000 | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="userName"
        label="上传用户">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">
            下载
          </el-button>
          <el-button
            size="mini"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="m-pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="post_data.page_index"
        layout="total, prev, pager, next, jumper"
        :total='total'>
      </el-pagination>
    </div>


    <el-dialog :visible.sync="configTemplateVisible" @close="close" width='400px'>
      <div class="clearfix">
        <div style="font-size: 16px;padding: 14px 20px;font-weight: bold;">
          上传
        </div>
        <div style="width: 100%;text-align: center">
          <el-input v-model="title" placeholder="请输入文档标题" size="small" style="width: 90%;"></el-input>
        </div>
        <el-upload
          class="upload-demo"
          ref="upload"
          :headers="headers"
          action="/foreground/project_file/upload"
          :limit="999"
          :data="params"
          name="uploadFile"
          multiple
          :show-file-list ="false"
          :before-upload='beforeUpload'
          :on-success="uploadSuccess"
          :auto-upload="true">
          <el-button slot="trigger" size="small" :loading="uploading" type="primary" style="width:360px;margin:10px 20px;">选择文件</el-button>
          <el-button size="small" type="success" style="width:360px;margin:0 0 20px 20px;" @click="confirmUpload">确认上传</el-button>
        </el-upload>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import document from '@/api/project/document'
  import {formatDate} from '@/common/formatDate.js';
  export default {
    data() {
      return {
        total:0,
        loading:false,
        post_data:{
          project_id:this.$cookies.get('projectId'),
          page_index:1,
          page_size:10,
        },
        tableData: [],
        multipleSelection: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: '',
        value:'',
        searchName:'',
        configTemplateVisible:false,
        headers:{token:this.$cookies.get('token')},
        params:{component :'project',project_id:this.$cookies.get('projectId')},
        uploading:false,
        documentUrl:'',
        title:'',
        filePath:'',
        fileBaseUrl:'',
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss'); //yyyy-MM-dd hh:mm
      }
    },
    mounted(){
      this.post_data.project_id=this.$cookies.get('projectId');
      this.getList(this.post_data)
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange: function(currentPage){
      },
      Refresh(){
        this.getList(this.post_data);
      },
      //删除文件
      handleDelete(index, row){
        document.delete({'project_file_id':row.id}).then(res=>{
          if(res.success){
            this.getList(this.post_data);
            this.$message.success('删除成功');
          }else{
            this.$message.error(res.message);
            this.loading=false;
          }
        }).catch(err => {
          this.loading=false;
        })
      },
      //下载文件
      handleEdit(index, row) {
        window.location.href=row.fileBaseUrl+row.filePath
      },
      //导出文件
      //导出excel
      upload(){
        this.configTemplateVisible=true
      },
      confirmUpload(){
        let post_data={
          name:this.title,
          filePath:this.filePath,
          fileBaseUrl:this.fileBaseUrl,
          projectId:Number(this.$cookies.get('projectId')),
          status:1,
          comment:'',
        };
        if(this.title){
          if(this.filePath||this.fileBaseUrl){
            document.add(post_data).then(res=>{
              if(res.success){
                this.$message.success('上传成功');
                this.configTemplateVisible=false;
                this.getList(this.post_data);
              }
            })
          }else {
            this.$message.error('请选择上传文件')
          }
        }else{
          this.$message.error('请输入文档标题')
        }

      },
      beforeUpload(file){
        this.uploading=true;
        const isJPG = file.type === 'application/vnd.ms-excel';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传文件只能是 CSV 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
      uploadSuccess(res, file) {
        this.uploading=false;
        this.filePath =res.result.path;
        this.fileBaseUrl =res.result.baseUrl;
      },

      getList(postData){
        this.loading=true;
        document.list(postData).then(res=>{
          if(res.success){
            this.total=res.result.total;
            this.tableData=res.result.items;
            this.loading=false
          }else{
            this.$message.error(res.message);
            this.loading=false
          }
        }).catch(err => {
          this.loading=false;
        })
      },
      close(){
        this.title='';
        this.filePath='';
        this.fileBaseUrl='';
      }
    }
  }
</script>

<style scoped lang="scss">
  .n-box{
    padding: 20px;
    height: calc(100% - 100px);
    background: #f5f5f9;
  }
  .m-pagination{
    padding: 20px;
    text-align: center;
    background: #ffffff;
  }
  .c-box{
    //margin-top: 15px;
    padding: 0 2% 20px;
    border:1px solid rgba(230,234,238,1);
    background: #fff;
    overflow: hidden;
    .c-handle{
      margin-top: 20px;
      float: right;
      div{
        width: 51px;
        line-height: 27px;
        margin-left: 10px;
        text-align: right;
        cursor: pointer;
        span{
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
    .c-query{
      width: 625px;
      margin-top: 20px;
      margin-right: 30px;
      float: left;
      .c-button{
        float: left;
        margin:0 3px;
      }
      .el-dropdown-link{
        cursor: pointer;
        width: 140px;
        height: 20px;
        .c-title{
          font-size: 12px;
          color: #666666;
        }

        .el-icon--right{
          margin-left: 10px;
          font-size: 18px;
          color: #4F5059;
        }
      }
    }
  };
  .c-box1{
    flex-wrap:wrap;
  }
  .upload-demo{
    width: 100%;
    //text-align: center;
  }
</style>
