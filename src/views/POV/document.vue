<template>
  <div>
    <div class="c-box">
      <div class="c-query">
        <el-select placeholder="文档标题" size="mini" v-model="value" style="margin: 0 5px 0 0;width: 20%;" clearable >
        </el-select>
        <el-select placeholder="上传用户" size="mini" v-model="value" style="margin: 0 5px;width: 20%;">
        </el-select>
        <el-date-picker
          size="mini"
          v-model="value7"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2" style="margin: 0 5px;width: 40%">
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
        <el-button type="primary" icon="el-icon-upload2" size="mini" @click="importDocument()">导出</el-button>
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
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题">
      </el-table-column>
      <el-table-column
        label="上传时间">
        <template slot-scope="props">
          {{ props.row.createdAt*1000 | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="上传用户">
      </el-table-column>
      <el-table-column label="操作">
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
          project_id:"",
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

      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss'); //yyyy-MM-dd hh:mm
      }
    },
    mounted(){
      this.post_data.project_id=sessionStorage.getItem('projectId');
      this.getList(this.post_data)
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange: function(currentPage){
        console.log(currentPage);
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
          console.log(err)
        })
      },
      //下载文件
      handleEdit(index, row) {
        window.location.href=row.fileBaseUrl+row.filePath
      },
      //导出文件
      //导出excel
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss'); //yyyy-MM-dd hh:mm
      },
      importDocument() {
        if(this.multipleSelection.length!==0){
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/vendor/Export2Excel');　　//引入文件　　　　
            const tHeader = ['标题', '上传时间', '上传用户']; //将对应的属性名转换成中文
            const filterVal = ['name', 'time', 'type'];//table表格中对应的属性名
            if(this.multipleSelection){
              let list = this.multipleSelection.map(item => {
                return { name: item.name, time: this.formatDate(item.createdAt*1000) , type: '管理员'  };
              });
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, 'excel文件');
            }else{
              this.$message.error('请先选择配置项！')
            }
          })
        }else{
          this.$message.error('请选择你要下载的文件')
        }

      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      getList(postData){
        this.loading=true;
        document.list(postData).then(res=>{
          if(res.success){
            console.log(res);
            this.total=res.result.total;
            this.tableData=res.result.items;
            this.loading=false
          }else{
            this.$message.error(res.message);
            this.loading=false
          }
        }).catch(err => {
          this.loading=false;
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .m-pagination{
    padding: 20px;
    text-align: center;
    background: #ffffff;
  }
  .c-box{
    padding: 0 2% 20px;
    border:1px solid rgba(230,234,238,1);
    background: #fff;
    display: flex;
    justify-content: space-between;
    .c-handle{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
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
      display: flex;
      justify-content: space-between;
      .c-button{
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
</style>
