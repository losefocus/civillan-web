<template>
  <div style="height: 100%">
    <div class="j-box">
      <div class="j-table">
        <div class="j-Import">导入</div>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%;padding-top: 2%">
            <el-table-column
              prop="a"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="b"
              label="标识">
            </el-table-column>
            <el-table-column
              prop="c"
              label="排序">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">复制</el-button>
                <el-button
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="j-add">
        <div class="a-title">添加作业</div>
        <div class="a-body">
          <div class="a-info">
            <el-input placeholder="名称" size="mini" style="margin: 0 5px 0 0"></el-input>
            <el-input placeholder="标识" size="mini" style="margin: 0 5px"></el-input>
            <el-input placeholder="排序" size="mini" style="margin: 0 0 0 5px"></el-input>
          </div>
          <div class="c-content">作业内容</div>
          <div class="c-body">
            <div class="c-add">
              <el-select v-model="value" size="mini" placeholder="项目" style="margin: 0 5px 0 5px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
              <el-input style="width: 45%" placeholder="值" size="mini"></el-input>
              <el-button size="mini" style="margin: 0 5px 0 5px;width: 45%;">添加</el-button>
            </div>
            <el-table
              :data="tableData1"
              style="width: 100%"
              :show-header="false"
              size="mini"
              cell-class-name="config-table"
            >
              <el-table-column
                prop="a">
              </el-table-column>
              <el-table-column
                prop="b">
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small">修改</el-button>
                  <el-button type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, tableData1)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="a-preservation">
          <el-button type="info" size="medium" style="width: 30%">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "JConfig",
    data(){
      return{
        formInline: {
          user: '',
          region: ''
        },
        options: [{
          value: '1',
          label: '设计桩长'
        }, {
          value: '2',
          label: '设计灰量'
        }, {
          value: '3',
          label: '设计最大提速'
        }, {
          value: '4',
          label: '设计最小提速'
        }, {
          value: '4',
          label: '设计最大钻速'
        }, {
          value: '4',
          label: '设计最小钻速'
        }],
        value: '',
        tableData: [
          {
          a: '一号桩',
          b: '1-01',
          c: '1'
        }, {
          a: '二号桩',
          b: '2-02',
          c: '2'
        }, {
          a: '三号桩',
          b: '3-03',
          c: '3'
        }, {
          a: '四号桩',
          b: '4-04',
          c: '4'
        }],
        tableData1:[
          {
            a: '设计桩长',
            b: '9.54'
          }, {
            a: '设计灰量',
            b: '57.38'
          }, {
            a: '设计最大提速',
            b: '80'
          }, {
            a: '设计最小提速',
            b: '110'
          }, {
            a: '设计最大钻速',
            b: '90'
          }, {
            a: '设计最小钻速',
            b: '120'
          }]
      }
    },
    methods:{
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
<style scoped lang="scss">

 .j-box{
   height: 100%;
   display: flex;
   justify-content: space-between;
   .j-table{
     width: 61%;
     height: 90%;
     padding: 2% 2%;
     background: #ffffff;
     .j-Import{
       width:80px;
       height:24px;
       line-height: 26px;
       color: #ffffff;
       text-align: center;
       background:rgba(79,80,89,1);
       border-radius:2px;
       cursor: pointer;
     }
   }
   .j-add{
     height: 90%;
     padding: 2% 2%;
     width: 30%;
     background: #ffffff;
     position: relative;
     .a-title{
       width:81px;
       height:28px;
       font-size:20px;
       font-weight: bold;
       color:rgba(51,51,51,1);
       line-height:28px;
     }
     .a-body{
       width: 100%;
       .a-info{
         margin-top: 5%;
         width: 100%;
         display: flex;
         justify-content: space-between;
       }
       .c-content{
         margin-top: 5%;
         font-size:16px;
         font-weight: bold;
         font-family:PingFangSC-Medium;
         color:rgba(51,51,51,1);
       }
       .c-body{
         margin-top: 5%;
         .c-add{
           display: flex;
           justify-content: space-between;
           width: 98%;
           padding: 10px 1%;
           background:rgba(239,240,242,1);
         }
       }
     }
     .a-preservation{
       width:95%;
       text-align: center;
       position: absolute;
       bottom: 5%
     }
   }
 }
</style>
