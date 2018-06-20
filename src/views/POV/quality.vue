<template>
  <div>
    <!-- 标题和控制栏 -->
    <div class="control-box">
      <el-row>
        <el-col :span="17">
          <div class="grid-content bg-purple">
            <div class="hd">
              <div class="inline-block">
                <el-dropdown class="inline-block">
                  <span class="el-dropdown-link">
                    全部设备<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown class="inline-block">
                  <span class="el-dropdown-link">
                    全部桩<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown class="inline-block">
                  <span class="el-dropdown-link">
                    最近一周<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-date-picker
                  class="inline-block"
                  size="small"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" size="small">查询</el-button>
                <el-button type="warning" size="small">重置</el-button>
                <!--<el-button v-popover:popover>focus 激活</el-button>-->
                <el-button type="text" @click="dialogVisible = true">编辑</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple icons">
            <el-button-group class="right">
              <el-button icon="el-icon-circle-plus-outline" >添加</el-button>
              <el-button icon="el-icon-share" >下载Excel文件 </el-button>
              <el-button icon="el-icon-upload2" @click="downloadFile(excelData)" >导出</el-button>
              <el-button icon="el-icon-download" @click="uploadFile()" >导入</el-button>
            </el-button-group>
          </div>
        </el-col>
      </el-row>
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
        label="日积分"
        prop="a">
      </el-table-column>
      <el-table-column
        label="根均得分"
        prop="b">
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
        label="工作小计（kg)"
        prop="g">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "QualityAssessment",
    data(){
      return{
        tableData5: [{
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
    }
  }
</script>

<style scoped lang="scss">
  .control-box{
    padding: 20px 30px;
    background: #fff;
    border-bottom:1px solid rgba(235,237,248,1);
    margin-bottom: 30px;
    .title{
      font-size: 24px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
</style>


