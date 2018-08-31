<template>
  <div style="height: 94%">
    <div class="j-box">
      <div class="j-table">
        <div class="i-box">
          <div class="j-Import" @click="importExcel()">导出</div>
        </div>
        <template>
          <el-table
            :data="lists"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            v-loading="listLoading"
            style="width: 100%;padding-top: 2%">
            <el-table-column
              type="selection"
              width="30">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="key"
              label="标识"
              >
            </el-table-column>
            <el-table-column
              label="类型"
              width="100">
              <template slot-scope="scope">
                <span style="white-space:nowrap;">{{ typeMap.get(scope.row.typeId) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="sort"
              label="排序"
              width="50">
            </el-table-column>
            <el-table-column
              width="180"
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  plain
                  @click="copyObj(scope.row)">复制</el-button>
                <el-button
                  size="mini"
                  plain
                  @click="updataObj(scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  plain
                  @click="deleteObj(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="post_data.page_index"  :page-size="post_data.page_size" layout="total,  prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="j-add">
        <div class="a-title"><h3>{{(flag == 'add')?'添加':'修改'}}配置</h3></div>
        <div class="a-body">
          <el-form class="a-info" :rules="rules" :model="form" ref="form">
            <el-form-item class="i-content" prop="typeId">
              <el-select v-model="form.typeId" size="mini" placeholder="类型" @change="changeType">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
             </el-form-item>
            <el-form-item class="i-content" prop="name">
              <el-input v-model="form.name" placeholder="名称" size="mini" ></el-input>
            </el-form-item>
            <el-form-item class="i-content" prop="key">
              <el-input v-model="form.key" placeholder="标识" size="mini"></el-input>
            </el-form-item>
            <el-form-item class="i-content">
              <el-input v-model="form.sort" placeholder="排序" size="mini"></el-input>
            </el-form-item>
          </el-form>
          <div class="c-content">设计参数</div>
          <div class="c-body">
            <el-form class="c-add" ref="content_form">
              <el-select v-model="content_form.name"  size="mini" placeholder="项目" style="margin: 0 5px 0 5px">
                <el-option
                  v-for="item in paramsOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input v-model="content_form.value" style="width: 45%" placeholder="值" size="mini"></el-input>
              <el-button size="mini" style="margin: 0 5px 0 5px;width: 45%;" @click="addContent">添加</el-button>
            </el-form>
            <el-table class="config_content" :data="config_content" border max-height="250" :show-header="false" style="width:100%;border-radius: 4px;margin:10px 0 20px 0;">
              <el-table-column prop="name" align="center" label="配置项">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="value" align="center" label="值">
                <template slot-scope="scope">
                  <span v-if="!scope.row.flag">{{scope.row.value}}</span>
                  <input v-else  v-model="tempValue" autofocus style="height:20px;width:50px;border-radius: 4px;border: 1px solid #dcdfe6;text-align: center">
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="90">
                <template slot-scope="scope" >
                  <a v-if="!scope.row.flag" size="mini" type="" plain @click="editContent(scope.$index, config_content)" style="width:30px;cursor:pointer;">修改</a>
                  <a v-else size="mini" type="" plain @click="conformContent(scope.$index, config_content)" style="width:30px;cursor:pointer;">确定</a>
                  <a size="mini" type="" plain @click="deleteContent(scope.$index, config_content)" style="width:30px;cursor:pointer;">删除</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="a-preservation">
          <el-button v-if="flag == 'add'" type="primary" :loading="createLoading" @click="submitForm()" size="small" style="width:85px;">添加</el-button>
          <el-button v-else type="primary" :loading="createLoading" @click="updataForm('form')" size="small" style="width:85px;">修改</el-button>
          <el-button type="info" @click="cancel('form')" size="small" style="width:85px;">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/api/configure/config'
  import categories from '@/api/configure/categories'
  export default {
    name: "configure",
    data(){
      let validataName = (rule, value, callback) => {
        if(value === '' || value== undefined){
          callback(new Error('请输入名称'));
        }else{
          callback()
        }
      };
      let validataTypeId = (rule, value, callback) => {
        if(value === '' || value== undefined){
          callback(new Error('请选择类型'));
        }else{
          callback()
        }
      };
      let validataKey = (rule, value, callback) => {
        if(value === '' || value== undefined){
          callback(new Error('请输入标识'));
        }else{
          callback()
        }
      };
      return{
        rules: { //添加作业表单验证
          name: [
            {  validator: validataName, trigger: 'blur' }
          ],
          typeId: [
            {  validator: validataTypeId, trigger: 'change' }
          ],
          key: [
            {  validator: validataKey, trigger: 'change' }
          ],
        },
        form:{ //配置作业的参数
          name:'',
          key:'',
          sort:'',
          typeId:'',
          content:'',
          status:1,
        },
        multipleTable:[],//列表select复选框
        typeOptions:[],//类型select列表
        allListQuery:{ //类型select列表请求参数
          page_index: 1,
          page_size: 999
        },
        content_form:{ //设计参数
          label:'',
          name:'',
          value:'',
          flag:false
        },
        paramsOption:[],//项目select列表请求参数
        paramsList:[],//项目select列表
        config_content:[],
        tempValue:null,
        lastIndex:null,
        createLoading:false,
        flag:'add',
        typeMap:{},
        listLoading:false,
        lists: [], //主列表
        total:0,
        post_data:{ //主列表请求参数
          page_index:1,
          page_size:10
        }
      }
    },
    created(){
      this.getCategoryList();
      this.getParamsList();
    },
    mounted(){
      this.getList(this.post_data)
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //导出excel
      importExcel() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel');　　//引入文件　　　　
          const tHeader = ['名称', '标识', '类型','配置项']; //将对应的属性名转换成中文
          const filterVal = ['name', 'key', 'type','content'];//table表格中对应的属性名
          if(this.multipleSelection){
            let list = this.multipleSelection.map(item => {
              return { name: item.name, key: item.key , type: this.typeMap.get(item.typeId) , content: item.content };
            });
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, 'excel文件');
          }else{
            this.$message.error('请先选择配置项！')
          }
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },

      //作业配置列表
      getList(post_data){
        this.listLoading = true
        this.post_data.sort_by = 'sort';
        this.post_data.direction = 'asc';
        config.list(post_data).then(res=>{
          this.lists=res.result.items;
          this.total = res.result.total;
          this.listLoading = false
        })
      },
      handleFilter(){
        if(this.post_data.name == '') delete this.post_data.name;
        this.post_data.page_index = 1;
        this.getList()
      },
      handleSizeChange(val) {
        this.post_data.page_size = val;
        this.getList(this.post_data);
      },
      handleCurrentChange(val) {
        this.post_data.page_index = val;
        this.getList(this.post_data);
      },
      //获取类型列表数据
      getCategoryList(){
        categories.list(this.allListQuery).then(res => {
          let list = res.result.items;
          this.typeOptions = list.map(item => {
            return { value: item.id, label: item.name };
          });
          this.typeMap = new Map();
          for (let i=0; i<list.length; i++) {
            this.typeMap.set(list[i].id,list[i].name)
          }
        })
      },
      //设计参数项目列表数据
      getParamsList(){
        categories.params(this.allListQuery).then(res => {
          let list = res.result.items;
          console.log(res);
          this.paramsList = list.map(item => {
            return { value: item.code, label: item.label,categoryId:item.categoryId};
          });
        })
      },
      changeType(val){ //切换类型
        this.content_form={
          label:'',
          name:'',
          value:'',
          flag:false
        };
        this.paramsOption = this.paramsList.filter(list => {
          return list.categoryId == val
        })
      },
      changeParams(val){
        this.content_form.label = val.split(',')[0]
        this.content_form.name = val.split(',')[1]
      },
      submitForm(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            console.log('okkkk');
            this.createLoading = true;
            let data = Object.assign({},this.form);
            data.projectId = parseFloat(sessionStorage.getItem('projectId'));
            data.typeId = parseFloat(data.typeId);
            data.sort = parseFloat(data.sort);
            this.config_content.forEach(ele => {
              delete ele.flag
            });
            data.content = JSON.stringify(this.config_content);
            config.add(data).then(res => {
              console.log(res);
              this.getList();
              this.cancel();
              this.createLoading = false;
            }).catch(e=>{
              this.createLoading = false;
            })
          }else{
            this.createLoading = false;
          }
        })

      },
      updataForm(formName){
        this.$refs.form.validate((valid) => {
          if (valid) {
            console.log('aaaaa');
            this.createLoading = true;
            let data = Object.assign({},this.form);

            this.config_content.forEach(ele => {
              delete ele.flag
            });
            data.content = JSON.stringify(this.config_content);
            this.createLoading = true;
            config.edit(data).then(res => {
              this.createLoading = false;
              this.getList();
              this.cancel()
            });
            console.log('成功')
          }else{
            this.createLoading = false;
          }
        })


      },
      cancel(){
        this.flag = 'add';
        this.createLoading = false;
        this.resetTemp();
        this.$parent.$parent.cardVisibel = false
      },
      resetTemp() {
        this.form = {
          name:'',
          key:'',
          sort:'',
          typeId:'',
          content:'',
          status:1
        };
        this.$refs.form.resetFields();
        this.config_content = [];
        this.paramsOption = [];
        this.content_form={
          label:'',
          name:'',
          value:'',
          flag:false
        }
      },
      addContent(){
        this.config_content.unshift(Object.assign({}, this.content_form));
        this.content_form = {
          label:'',
          name:'',
          value:'',
          flag:false
        };
         this.$refs.content_form.resetFields()
      },
      editContent(index,rows){
        if(this.lastIndex!=null)rows[this.lastIndex].flag = false;
        rows[index].flag = true;
        this.tempValue = rows[index].value;
        this.lastIndex = index
      },
      conformContent(index,rows){
        rows[index].value = this.tempValue;
        rows[index].flag = false
      },
      deleteContent(index,rows){
        rows.splice(index, 1);
      },

      //列表删除行
      deleteObj(row){
        this.$confirm(
          "此操作将永久删除该配置(配置名:" + row.name + "), 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          console.log(row.id);
          config.delete({"project_work_config_id":row.id}).then(res => {
            this.getList(this.post_data);
            //this.alertNotify('删除')
          })
        })
      },
      updataObj(row){
        this.cardVisibel = true;
        this.flag = 'updata';
        this.form = Object.assign({},row);

        console.log(row.content);
        let contents = JSON.parse(row.content);
        contents.forEach(ele => {
          ele.flag = false
        });
        this.config_content = contents;
        this.changeType(row.typeId)
      },
      copyObj(row){
        this.cardVisibel = true
        this.flag = 'add'
        this.form = Object.assign({},row);
        delete this.form.id

        let contents = JSON.parse(row.content)
        contents.forEach(ele => {
          ele.flag = false
        });
        this.config_content = contents;
        this.changeType(row.typeId)
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
      width: 51%;
      height: 90%;
      padding: 2% 2%;
      background: #ffffff;
      .i-box{
        display: flex;
        .j-Import{
          width:80px;
          height:24px;
          line-height: 26px;
          margin-right: 10px;
          color: #ffffff;
          text-align: center;
          background:rgba(79,80,89,1);
          border-radius:2px;
          cursor: pointer;
        }
      }
    }
    .pagination-container{
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
    .j-add{
      height: 90%;
      padding: 2% 2%;
      width: 40%;
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
          .i-content{
            margin: 0 5px;
          }
        }
        .c-content{
          margin-top: 5%;
          font-size:16px;
          font-weight: bold;
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
        margin-top: 30px;
      }
    }
  }
</style>
