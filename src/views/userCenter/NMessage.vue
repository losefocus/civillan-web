<template>
<div>
  <div class="m-box">
    <div class="m-handle">
      <el-button type="info" plain  size="mini" @click="readChoice">标记为已读</el-button>
      <el-button type="info" plain @click="readAll" size="mini">全部标记已读</el-button>
      <el-button type="info" plain  size="mini" icon="el-icon-delete" @click="deleteChoice">删除</el-button>
      <el-button type="info" plain  size="mini" icon="el-icon-delete" @click="deleteAll">清空</el-button>
      <!--<div class="a-read" @click="readAll">全部标记已读</div>
      <div class="m-delete" @click="deleteAll">
        <i class="iconfont icon-delete"></i>
        <span>清空</span>
      </div>-->
    </div>
    <template>
      <el-table
        v-loading="loading"
        ref="multipleSelection"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="内容：">
                <span>{{ props.row.message }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createAt*1000 | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <i class="iconfont" :class="{'icon-read':scope.row.status==2,'icon-unRead':scope.row.status==1}"></i>
            <span style="font-size: 12px;color: #666666;margin-left: 8px;">{{ scope.row.status ==2? '已读' : '未读'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="d"
          label="操作">
          <template slot-scope="scope">
            <i class="iconfont  icon-delete" @click="deleteOne(scope.row.id)"></i>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <div class="m-pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total='total'>
      </el-pagination>
    </div>
  </div>


</div>
</template>

<script>
  import message from '@/api/userCenter/message'
  import {formatDate} from '@/common/formatDate.js'
  export default {
  name: "message",
  data(){
    return {
      loading:false,
      currentPage:1,
      pageSize:7,
      tableData: [],
      total:0,
      multipleSelection:[],
      selectData:[],
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
    }
  },
  mounted(){
    this.getList(this.currentPage,this.pageSize)
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getList(val,this.pageSize)
    },
    handleSelectionChange(data) {
      //console.log(data);
      this.selectData=[];
      for(let i=0;i<data.length;i++){
        this.selectData.push(data[i].id)
      }
      console.log(this.selectData)
    },
    readAll(){ //标记全部
      message.signAllRead().then(res=>{
        if(res.success){
          this.getList(this.currentPage,this.pageSize)
        }else{
          console.log('标记失败')
        }
      });
    },
    readChoice(){
      //console.log(this.selectData)
      let ids = this.selectData.join(',');
      if(this.selectData.length==0){
        this.$message.warning('未选中任何消息')
      }else{
        message.signRead({'ids':ids}).then(res=>{
          if(res.success){
            this.getList(this.currentPage,this.pageSize)
          }else{
            console.log('标记失败')
          }
        });
      }

    },
    deleteOne(id){ //删除单个消息
      console.log(id);
      message.delete({"id":id}).then(res=>{
        if(res.success){
          this.getList(this.currentPage,this.pageSize)
        }else{
          console.log('删除失败')
        }
      });
    },
    deleteAll(){ //清空
      message.emptyMessage({}).then(res=>{
        console.log(res);
        if(res.success){
          this.getList(1,7)
        }else{
          console.log('清空失败')
        }
      });
      console.log('delete')
    },
    deleteChoice(){
      console.log(this.selectData);
      if(this.selectData.length==0){
        this.$message.warning('未选中任何消息')
      }else{
        let ids = this.selectData.join(',');

        message.delete({'ids': ids}).then(res=>{
          console.log(res);
          if(res.success){
            this.getList(1,7)
          }else{
            console.log('删除失败')
          }
        });
      }

    },
    getList(currentPage,pageSize){  //获取消息列表
      this.loading=true;
      message.list({'page_index':currentPage,'page_size':pageSize}).then(res=>{
        console.log(res);
        this.tableData=res.result.items;
        this.total=res.result.total;
        this.loading=false;
      }).catch(err => {
        this.loading=false;
        console.log(err)
      })
    }
  },
  props: ['dialogTop'],

}
</script>
<style scoped lang="scss">
  .m-box{
    height: 100%;
    background-color: #ffffff;
    overflow:auto;
    position: relative;
  }
  .m-box::-webkit-scrollbar {/*滚动条整体样式*/
    width:4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
    background: #ffffff;

  }
  .m-box::-webkit-scrollbar-button{
    background: rgba(0,0,0,0.2);
  }
  .m-box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .m-box::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  .icon-unRead{
    color: #71E2ED;
    font-size: 12px;
  }
  .icon-read{
    font-size: 16px;
  }
  .m-handle{
    border-bottom: 1px solid rgba(151,151,151,0.4);
    padding: 15px;
    .a-read{
      display: inline-block;
      vertical-align: middle;
      width:88px;
      height:25px;
      line-height: 25px;
      text-align: center;
      font-size: 12px;
      border-radius:4px;
      color: #666666;
      border:1px solid rgba(221,224,227,1);
      cursor: pointer;
    }
    .m-delete{
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      width:78px;
      height:25px;
      line-height: 25px;
      font-size: 12px;
      border-radius:4px;
      border:1px solid rgba(221,224,227,1);
      cursor: pointer;
    }
  }
  .m-pagination{
    margin: 20px 0 10px 0;
    text-align: center;
  }
  .icon-delete{
    cursor: pointer;
  }
</style>
