<template>
<div>
  <div class="m-box">
    <div class="m-handle">
      <div class="a-read">全部标记已读</div>
      <div class="m-delete">
        <i class="iconfont icon-delete"></i>
        <span>删除</span>
      </div>
    </div>
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="a"
          width="120">
        </el-table-column>
        <el-table-column
          prop="b">
        </el-table-column>
        <el-table-column
          prop="c"
          width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="iconfont" :class="{'icon-read':scope.row.isRead,'icon-unRead':!scope.row.isRead}"></i>
            <span style="font-size: 12px;color: #666666;margin-left: 8px;">{{ scope.row.isRead ? '已读' : '未读'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="d"
          width="120">
        </el-table-column>
      </el-table>
    </template>
    <div class="m-pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

  </div>


</div>
</template>

<script>
export default {
  name: "message",
  data(){
    return {
      currentPage:5,
      tableData3: [{
        a: '标题标题',
        b: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        isRead: false,
        d: '2016-05-02'
      }, {
        a: '标题标题',
        b: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        isRead: true,
        d: '2016-05-02'
      }, {
        a: '标题标题',
        b: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        isRead: false,
        d: '2016-05-02'
      },{
        a: '标题标题',
        b: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        isRead: true,
        d: '2016-05-02'
      }, {
        a: '标题标题',
        b: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        isRead: false,
        d: '2016-05-02'
      }, {
        a: '标题标题',
        b: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        isRead: true,
        d: '2016-05-02'
      }, {
        a: '标题标题',
        b: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        isRead: false,
        d: '2016-05-02'
      }, {
        a: '标题标题',
        b: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        isRead: false,
        d: '2016-05-02'
      }, {
        a: '标题标题',
        b: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        isRead: false,
        d: '2016-05-02'
      }, {
        a: '标题标题',
        b: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        isRead: false,
        d: '2016-05-02'
      }],
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    }
  }
}
</script>

<style scoped lang="scss">
  .m-box{
    height: 640px;
    background-color: #ffffff;
    overflow:auto;
    position: relative;
  }
  .icon-unRead{
    color: #71E2ED;
    font-size: 12px;
  }
  .icon-read{
    font-size: 16px;
  }
  .m-handle{
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 999;
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
    }
  }
  .m-pagination{
    margin: 30px 0 30px 0;
    text-align: center;
  }
</style>
