<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select style="width: 5%;float: left" v-if="isShow" v-model="deviceName" size="mini" disabled placeholder="请选择"></el-select>
        <el-select  v-else="!isShow" v-model="device" filterable :filter-method="deviceSearch" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;width: 15%;float: left;" clearable >
          <el-option
            v-for="(item,index) in deviceSelect"
            :key="index"
            :label="item.name"
            :value="index">
          </el-option>
          <el-pagination
            @current-change="deviceCurrentChange"
            small
            :pager-count="5"
            :current-page="device_data.page_index"
            :page-size="device_data.page_size"
            layout="prev, pager, next"
            :total="deviceTotal">
          </el-pagination>
        </el-select>

        <el-select  v-model="value1" placeholder="全部桩" size="mini" @change="deviceChange" style="margin: 0 5px;width: 15%;float: left;">
          <el-option
            v-for="item in deviceSelect1"
            :key="item.value1"
            :label="item.name"
            :value="item.value1">
          </el-option>
        </el-select>
        <el-select v-model="value2" placeholder="评分等级" size="mini" @change="deviceChange" style="margin: 0 5px;width: 15%;float: left;">
          <el-option
            v-for="item in deviceSelect2"
            :key="item.value2"
            :label="item.name"
            :value="item.value2">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="value7"
          size="mini"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2" style="margin: 0 5px;width: 30%;float: left;">
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
        align="center"
        width="80"
        label="序号"
        prop="id">
      </el-table-column>
      <el-table-column
        align="center"
        width="140"
        label="施工日期"
        prop="startTime">
      </el-table-column>
      <el-table-column
        align="center"
        width="140"
        label="完成根数"
        prop="endTime">
      </el-table-column>
      <el-table-column
        align="center"
        label="日桩长（m)"
        prop="c">
      </el-table-column>
      <el-table-column
        align="center"
        label="日注浆量（L）"
        prop="d">
      </el-table-column>
      <el-table-column
        align="center"
        label="日注灰量（kg)"
        prop="e">
      </el-table-column>
      <el-table-column
        align="center"
        label="成桩时间（min）"
        prop="f">
      </el-table-column>
      <el-table-column
        align="center"
        label="日成效"
        prop="g">
      </el-table-column>
    </el-table>
    <div class="m-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="listCurrentChange"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :total='total'>
      </el-pagination>
    </div>
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
          endTime:'5',
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
          endTime:'1',
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
          endTime:'2',
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
          endTime:'3',
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
          endTime:'4',
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
          endTime:'5',
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
          endTime:'3',
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
          endTime:'7',
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
          endTime:'8',
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
          endTime:'9',
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
          endTime:'3',
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
        ],
        device:'',
        deviceSelect:[
          {value1:1,name:'一号桩'},
          {value1:2,name:'二号桩'},
          {value1:3,name:'三号桩'},
          {value1:4,name:'四号桩'},
          {value1:5,name:'五号桩'},
        ],
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
        value7:'',
        total:0,
      }
    },
    created(){
      Bus.$on('isCollapse',res=>{
        console.log(res);
        this.isCollapse=res
      })
    },
    methods:{
      handleSizeChange: function (size) {  //列表改变每页显示的条数
        this.post_data.page_size=size;
        this.getList(this.post_data);
      },
      //列表改变当前页
      listCurrentChange: function(currentPage){
        this.post_data.page_index = currentPage;
        this.getList(this.post_data);
      },
    }

  }
</script>

<style scoped lang="scss">
  .c-box{
    margin-top: 15px;
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
      width: 675px;
      margin-top: 20px;
      margin-right: 30px;
      float: left;
      .c-button{
        float: right;
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


