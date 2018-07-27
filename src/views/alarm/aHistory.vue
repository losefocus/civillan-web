<template>
  <div>
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-model="device" placeholder="报警编号" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;width: 16%;" clearable >
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-select v-model="device" placeholder="恢复状态" size="mini" @change="deviceChange" style="margin: 0 5px;width: 16%;">
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="value2"
          align="center"
          size="mini"
          type="date"
          placeholder="触发时间"
          :picker-options="pickerOptions1"
          style="margin: 0 5px;width: 26%">
        </el-date-picker>
        <el-date-picker
          v-model="value2"
          align="right"
          size="mini"
          type="date"
          placeholder="恢复时间"
          :picker-options="pickerOptions1"
          style="margin: 0 5px;width: 26%">
        </el-date-picker>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">查询</el-button>
        </div>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">重置</el-button>
        </div>
      </div>
      <div class="c-handle">
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="Refresh">刷新</el-button>
        <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
        <el-button type="primary" icon="el-icon-printer" size="mini">打印</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="a"
        label="报警内容">
      </el-table-column>
      <el-table-column
        prop="b"
        label="触发时间">
      </el-table-column>
      <el-table-column
        prop="c"
        label="恢复时间">
      </el-table-column>
      <el-table-column
        prop="d"
        label="恢复状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "aHistory",
    data() {
      return {
        multipleSelection: [],
        tableData: [
          {
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        }, {
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        }, {
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        }, {
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        },{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        },{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        },{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        },{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        },{
          a: '设备仪器故障出现短暂的报警',
          b: '2018-02-26 19:00',
          c: '2018-03-26 19:00',
          d: '已恢复',
        }],
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: '',
      }
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped lang="scss">
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
      width: 675px;
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
