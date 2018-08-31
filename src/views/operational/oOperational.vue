<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="c-box" :class="{'c-box1':isCollapse}">
      <div class="c-query">
        <el-select v-model="device" filterable :filter-method="deviceSearch" placeholder="全部设备" size="mini" @change="deviceChange" style="margin: 0 5px 0 0;" clearable >
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
        <el-select v-model="device" placeholder="记录检验标准" size="mini" @change="deviceChange" style="margin: 0 5px;">
        </el-select>
        <el-date-picker
          v-model="value1"
          size="mini"
          type="date"
          placeholder="选择日期">
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
      </div>
    </div>
    <el-table
      :data="tableData5"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="序号"
        prop="id">
      </el-table-column>
      <el-table-column
        width="300"
        label="桩机号（设备）"
        prop="startTime">
      </el-table-column>
      <el-table-column
        width="300"
        label="型号"
        prop="endTime">
      </el-table-column>
      <el-table-column
        label="桩基数量"
        prop="a">
      </el-table-column>
      <el-table-column
        label="施工总长（m)"
        prop="b">
      </el-table-column>
      <el-table-column
        label="总灰量（kg)"
        prop="c">
      </el-table-column>
      <el-table-column
        label="总浆量（L）"
        prop="d">
      </el-table-column>
      <el-table-column
        label="评级"
        prop="e">
      </el-table-column>
    </el-table>
    <div class="s-box">
      <div class="s-body">
        <span class="s-total">桩基总数</span>
        <span class="s-num">30</span>
      </div>
      <div class="s-body">
        <span class="s-total">施工总长</span>
        <span class="s-num">30</span>
        <span class="s-total">m</span>
      </div>
      <div class="s-body">
        <span class="s-total">总浆量</span>
        <span class="s-num">30</span>
        <span class="s-total">L</span>
      </div>
      <div class="s-body">
        <span class="s-total">总灰量</span>
        <span class="s-num">30</span>
        <span class="s-total">KG</span>
      </div>
      <div class="s-body">
        <span class="s-total">工程质量施工评价</span>
        <span class="s-num">90</span>
      </div>
    </div>
    <div class="m-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="listCurrentChange"
        :current-page="post_data.page_index"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :total='total'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import deviceList from '@/api/project/deviceList'
  import Bus from '@/common/eventBus'
  export default {
    name: "oAccumulative",
    data(){
      return{
        tableData5: [
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
          {
            id: '12987122',
            startTime:'nb-21搅拌桩',
            endTime:'2018-02-22 19:00',
            a: '6',
            b: '20',
            c: '20',
            d: '20',
            e: '20',
            f: '20',
            g: '20',
            h: '20',
            i: '20',
            j: 'A',
          },
        ],
        value1: '',
        isCollapse:true,
        post_data:{
          key:'',
          page_index:1,
          page_size:10,
        },
        device: '', //设备选定值
        deviceSelect: [], //设备select列表
        device_data: {//全部设备select列表
          page_index: 1,
          page_size: 5,
          name: ''
        },
        deviceTotal: 0,
        deviceName: ''
      }
    },
    created(){
      this.getDeviceList(this.device_data);
      Bus.$on('isCollapse',res=>{
        console.log(res);
        this.isCollapse=res
      })
    },
    methods: {
      displayScreening(){

      },
      handleExpandChange(row,expandedRows){
        console.log(expandedRows)
      },
      deviceChange(val){ //类型改变
        console.log(val);
        this.deviceKey=val;
      },
      handleCommand(command) { //
        this.$message(command);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange: function (size) {  //列表改变每页显示的条数
        this.post_data.page_size=size;
        this.getList(this.post_data);
      },

      handleCurrentChange: function(currentPage){ //列表改变当前页
        this.device_data.page_index = currentPage;
        this.getList(this.post_data);
      },
      getList:function (post_data) { //获取列表
        let _this=this;
        let tableList=[];
        history.list(post_data).then(res=>{
          if(res.result.items){
            //console.log(res.result);
            _this.total=res.result.total;
            res.result.items.forEach(function (item) {
              tableList.push(item._v);
            });
            _this.tableData=tableList;
            //_this.tableData.tableRows=_this.tableRows
            console.log(_this.tableData);
          }else {
            console.log('请求不成功')
          }
        })
      },

      deviceCurrentChange:function(currentPage){ //全部设备select当前页
        this.device_data.page_index=currentPage;
        this.getDeviceList(this.device_data);
      },
      deviceSearch(query){ //select搜索框
        this.device_data.name=query;
        this.getDeviceList(this.device_data);
      },
      getDeviceList(post_data){
        let _this=this;
        deviceList.list(post_data).then(res=>{
          console.log(res);
          _this.deviceSelect=res.result.items;
          _this.deviceTotal=res.result.total;
          console.log(_this.deviceTotal)
        });
      },
      query(){
        this.post_data.key=this.deviceKey;
        this.post_data.page_index=1;
        this.getList(this.post_data)
      },
      Refresh(){
        this.getList(this.post_data)
      }
    },
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
  .s-box{
    display: flex;
    justify-content: space-around;
    height: 60px;
    line-height: 60px;
    background: #ffffff;
    border-bottom: 2px solid #ebeef5;
    .s-body{
      margin-right: 10px;
      .s-total{
        font-size: 12px;
        color:rgba(102,102,102,1);
      }
      .s-num{
        margin: 0 5px;
        font-size:18px;
        font-weight: bold;
        color:rgba(51,51,51,1);
      }
    }
  }
  .m-pagination{
    padding: 20px;
    text-align: center;
    background: #ffffff;
  }
</style>
