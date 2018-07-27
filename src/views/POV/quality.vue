<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-model="device" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;width: 16%;" clearable >
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-select v-model="device" placeholder="全部桩" size="mini" @change="deviceChange" style="margin: 0 5px;width: 16%;">
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-select v-model="device" placeholder="评分等级" size="mini" @change="deviceChange" style="margin: 0 5px;width: 16%;">
          <el-option
            v-for="item in deviceSelect"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
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
          :picker-options="pickerOptions2" style="margin: 0 5px;width: 30%">
        </el-date-picker>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">查询</el-button>
        </div>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">重置</el-button>
        </div>
      </div>
      <div class="c-handle">
        <el-button type="primary" icon="el-icon-refresh" size="mini">刷新</el-button>
        <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
        <el-button type="primary" icon="el-icon-printer" size="mini">打印</el-button>
      </div>
    </div>
    <el-table
      :data="tableData5"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="序号"
        prop="id">
      </el-table-column>
      <el-table-column
        width="140"
        label="施工日期"
        prop="startTime">
      </el-table-column>
      <el-table-column
        width="140"
        label="完成根数"
        prop="endTime">
      </el-table-column>
      <el-table-column
        label="日桩长（m)"
        prop="c">
      </el-table-column>
      <el-table-column
        label="日注浆量（L）"
        prop="d">
      </el-table-column>
      <el-table-column
        label="日注灰量（kg)"
        prop="e">
      </el-table-column>
      <el-table-column
        label="成桩时间（min）"
        prop="f">
      </el-table-column>
      <el-table-column
        label="日成效"
        prop="g">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Bus from '@/common/eventBus'
  export default {
    name: "QualityAssessment",
    data(){
      return{
        isCollapse:true,
        tableData5: [
          {
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        }, {
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        }, {
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        }, {
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        },{
          id: '12987122',
          startTime:'2018-02-22 19:00',
          endTime:'2018-02-22 19:00',
          a: '6m',
          b: '20m',
          c: '20L',
          d: '20L',
          e: '20KG',
          f: '20KG',
          g: '20A',
          h: '20deg',
          i: '20min',
          j: 'A',
        }
        ]
      }
    },
    created(){
      Bus.$on('isCollapse',res=>{
        console.log(res);
        this.isCollapse=res
      })
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
  .m-pagination{
    padding: 20px;
    text-align: center;
    background: #ffffff;
  }
</style>


