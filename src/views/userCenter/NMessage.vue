<template>
<div>
  <div style="height: 640px;background-color: #ffffff;
    overflow: hidden;position: relative">
    <div class="m-handle">

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
          prop="a">
        </el-table-column>
        <el-table-column
          prop="b">
        </el-table-column>
        <el-table-column
          prop="c"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="iconfont" :class="{'icon-read':scope.row.isRead,'icon-unRead':!scope.row.isRead}"></i>
            <span style="font-size: 12px;color: #666666;margin-left: 8px;">{{ scope.row.isRead ? '已读' : '未读'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="d">
        </el-table-column>
      </el-table>
    </template>
  </div>

</div>
</template>

<script>
export default {
  name: "message",
  data(){
    return {
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
  .icon-unRead{
    color: #71E2ED;
    font-size: 12px;
  }
  .icon-read{
    font-size: 16px;
  }
</style>
