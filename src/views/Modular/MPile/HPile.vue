<template>
  <div class="h-box" :style="newStyle">
    <!-- 标题和控制栏 -->

    <div class="c-box" :class="{'c-box1':isDevice}">
      <div  v-if="isDevice" :class="{'c-device':'isDevice'}">
        <div>
          <img :src="tPile" style="width: 25px;height: 25px;float: left;margin-right: 15px;margin-top: 3px">
        </div>
        <div class="n-pile">
          <span><span>设备名称：</span><span style="font-size: 18px;font-weight: bold">{{ pile_describe }}</span></span>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="c-query">
        <el-select v-show="!isDevice" v-model="device"  filterable :filter-method="deviceSearch" placeholder="选择设备" size="mini"  style="margin: 0 5px 0 0;width: 150px;float: left;" clearable @change="deviceChange" @visible-change="visibleChange">
          <el-option
            v-for="(item,index) in deviceSelect"
            :key="item.key+item.id"
            :label="item.name"
            :value="item.key">
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

        <div v-if="isDevice" style="float: left">
          <el-input style="width: 120px" v-model="post_data.pileId" placeholder="请输入桩号" size="mini"></el-input>
        </div>

        <el-select v-model="value2" placeholder="评分等级" size="mini" @change="deviceChange1" style="margin: 0 5px;width: 105px;float: left;">
          <el-option
            v-for="item in deviceSelect2"
            :key="item.name"
            :label="item.name"
            :value="item.value2">
          </el-option>
        </el-select>
        <el-date-picker
          size="mini"
          v-model="value7"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getTime(value7)"
          style="margin: 0 5px;width: 315px;float: left;"
          align="center">
        </el-date-picker>
        <div class="c-button">
          <el-button type="info" size="mini" @click="query">查询</el-button>
        </div>
        <div class="c-button">
          <el-button type="info" size="mini" @click="Refresh">重置</el-button>
        </div>
      </div>
      <div class="c-handle">
        <el-dropdown placement="bottom-end" trigger="click" @command="handleExport">
          <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="1">导出标记项目</el-dropdown-item>
            <el-dropdown-item command="2">导出全部项目</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button style="margin-left: 10px" type="primary" icon="el-icon-refresh" size="mini" @click="Refresh">刷新</el-button>
        <el-popover
          placement="bottom"
          trigger="click">
          <div class="t-rows">
            <el-dropdown-item style="width: 90px;" v-for="(row,index) in newData" :key="index"><el-checkbox v-model="row.checked">{{row.title}}</el-checkbox></el-dropdown-item>
          </div>
          <el-button slot="reference" type="primary" icon="el-icon-caret-bottom" size="mini">选择列</el-button>
        </el-popover>
      </div>
    </div>
    <el-table
      v-loading="loading"
      ref="multipleSelection"
      :data="tableData"
      style="width: 100%"
      align="center"
      :highlight-current-row=true
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div  class="expand_head">
            <ul class="expand_tab">
              <li class="expand_list_tab" :class="{Action:isActive==1}" @click="isActive=1">段数据列表</li>
              <li class="expand_overview_tab" :class="{Action:isActive==2}" @click="getChart(props.row)">图表曲线</li>
            </ul>
            <div class="exportExcel" @click="expandExcel(props.row.data)">导出</div>
          </div>

          <el-table
            v-if="isActive==1"
            header-cell-class-name="history-header"
            header-row-class-name="h-header"
            header-align="center"
            border
            max-height="500"
            :data="props.row.data"
            style="width: 100%">
            <el-table-column
              align="center"
              prop="part_id"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              align="center"
              label="段浆量（L）">
              <template slot-scope="props">
                {{ props.row.p_pulp | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              label="段灰量（kg）"
              align="center">
              <template slot-scope="props">
                {{ props.row.p_total_ash | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="段深度（m）">
              <template slot-scope="props">
                {{ props.row.p_deep / 100 | formatZ}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="段电流（A）">
              <template slot-scope="props">
                {{ props.row.p_current | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="段密度（g/cm³）">
              <template slot-scope="props">
                {{ props.row.p_density | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="段喷压（MPa）">
              <template slot-scope="props">
                {{ props.row.p_pressure | formatP}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="速度（cm/min）">
              <template slot-scope="props">
                {{ Math.abs(props.row.p_down_speed) | formatZ}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="段时长（s）">
              <template slot-scope="props">
                {{ Math.abs(props.row.p_time)}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="状态">
              <template slot-scope="props">
                <span v-if="props.row.p_down_speed >= 0">下钻</span>
                <span v-else>提钻</span>
              </template>
            </el-table-column>
          </el-table>
          <div v-else>
            <ul class="expand_charts">
              <li  v-if="isActive==2"><chart :options="option1" :auto-resize=true></chart></li>
              <li  v-if="isActive==2" style="margin-left: 20px"><chart :options="option2" :auto-resize=true></chart></li>
              <li  v-if="isActive==2" style="margin-top: 20px"><chart :options="option3" :auto-resize=true></chart></li>
              <li  v-if="isActive==2" style="margin: 20px 0 0 20px"><chart :options="option4" :auto-resize=true></chart></li>
            </ul>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        min-width="30">
      </el-table-column>
      <el-table-column
        v-if="newData.pile_describe.checked"
        label="桩号"
        min-width="150">
        <template slot-scope="props">
          <span>{{props.row.pile_describe}}</span>
          <span>[</span>
          <el-popover
            placement="right-start"
            title="作业设计参数"
            trigger="click"
            >
            <div v-if="noConfig" style="color:#999999">未找到当前作业的设计参数</div>
            <ul v-else v-for="(list,index) in config_data" :key="index">
              <li><span class="c-name">{{list.name}}</span> : <span class="c-key">{{list.value}}</span></li>
            </ul>

            <span class="c-parameter"  slot="reference"   @click="getConfig(props.row.pile_describe)">参数</span>
          </el-popover>
          <span>|</span>
          <span  slot="reference"  @click="playback(props.row)" class="c-parameter">回放</span>
          <span>]</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.machine_key.checked"
        label="桩机号"
        align="center"
        min-width="100">
        <template slot-scope="props">
          {{props.row.machine_key}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.begin_time.checked"
        min-width="85"
        label="开始时间"
        align="center"
      >
        <template slot-scope="props">
          {{ props.row.begin_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.end_time.checked"
        min-width="85"
        label="结束时间"
        align="center"
      >
        <template slot-scope="props">
          {{ props.row.end_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.depth.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="实际桩长(m)">
        <template slot-scope="props">
          {{ props.row.depth | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.water_cement_ratio.checked"
        :show-overflow-tooltip=true
        min-width="50"
        align="center"
        label="水灰比">
        <template slot-scope="scope">
          {{scope.row.water_cement_ratio | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.re_depth.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="复搅深度(m)">
        <template slot-scope="scope">
          {{scope.row.re_depth | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.cumulative_ash.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="累计灰量(kg)">
        <template slot-scope="props">
          {{ props.row.cumulative_ash | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.cumulative_pulp.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="累计浆量(L)">
        <template slot-scope="props">
          {{ props.row.cumulative_pulp | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.max_current.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="最大电流(A)">
        <template slot-scope="props">
          {{ props.row.max_current | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        v-if="newData.down_speed.checked"
        :show-overflow-tooltip=true
        min-width="120"
        label="平均下钻速度(cm/min)">
        <template slot-scope="props">
          {{ props.row.down_speed | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.up_speed.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="120"
        label="平均提钻速度(cm/min)">
        <template slot-scope="props">
          {{ props.row.up_speed | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.average_pulp.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="平均浆量(L)">
        <template slot-scope="props">
          {{ props.row.average_pulp | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.average_ash.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="平均灰量(kg)">
        <template slot-scope="props">
          {{ props.row.average_ash | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.average_current.checked"
        :show-overflow-tooltip=true
        align="center"
        label="平均电流(A)"
        min-width="80"
        prop="average_current">
        <template slot-scope="props">
          {{ props.row.average_current | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.max_down_speed.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="110"
        label="最大提速(cm/min)">
        <template slot-scope="props">
          {{ Math.abs(Math.ceil(props.row.max_down_speed))}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.max_up_speed.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="110"
        label="最大提速(cm/min)">
        <template slot-scope="props">
          {{  Math.abs(Math.ceil(props.row.max_up_speed))}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.max_slope.checked"
        :show-overflow-tooltip=true
        min-width="60"
        align="center"
        label="最大斜度">
        <template slot-scope="props">
          {{ props.row.max_slope | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.sprayed_time.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="喷浆时间(s)">
        <template slot-scope="props">
          {{ props.row.sprayed_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.t_type_length.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="扩大头桩长(m)"
        prop="t_type_length">
      </el-table-column>
      <el-table-column
        v-if="newData.t_type_slurry.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="扩大头浆量(L)">
        <template slot-scope="props">
          {{ props.row.t_type_slurry | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.bottom_part_slurry.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="80"
        label="下部桩浆量(L)">
        <template slot-scope="props">
          {{ props.row.bottom_part_slurry | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.t_type_ash.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="85"
        label="扩大桩灰量(kg)">
        <template slot-scope="props">
          {{ props.row.t_type_ash | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.bottom_part_ash.checked"
        :show-overflow-tooltip=true
        align="center"
        min-width="85"
        label="下部桩灰量(kg)">
        <template slot-scope="props">
          {{ props.row.bottom_part_ash | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="newData.rate.checked"
        :show-overflow-tooltip=true
        min-width="60"
        align="center"
        label="评分值"
        prop="rate">
      </el-table-column>
    </el-table>
    <div class="s-box">
      <div class="s-body">
        <span class="s-total">总桩数</span>
        <span class="s-num" v-if="recordSum">{{recordSum.total_pile_num}}</span>
        <span class="s-num" v-else>0</span>
        <span class="s-total">根</span>
      </div>
      <div class="s-body">
        <span class="s-total">总桩长</span>
        <span class="s-num" v-if="recordSum">{{recordSum.total_depth | formatZ}}</span>
        <span class="s-num" v-else>0</span>
        <span class="s-total">m</span>
      </div>
      <div class="s-body">
        <span class="s-total">总浆量</span>
        <span class="s-num" v-if="recordSum">{{recordSum.total_cumulative_pulp | formatZ}}</span>
        <span class="s-num" v-else>0</span>
        <span class="s-total">L</span>
      </div>
      <div class="s-body">
        <span class="s-total">总灰量</span>
        <span class="s-num" v-if="recordSum">{{recordSum.total_cumulative_ash | formatZ}}</span>
        <span class="s-num" v-else>0</span>
        <span class="s-total">kg</span>
      </div>
      <div class="s-body">
        <span class="s-total">平均掺量</span>
        <span class="s-num" v-if="recordSum">{{(recordSum.total_cumulative_ash/recordSum.total_depth) | formatZ}}</span>
        <span class="s-num" v-else>0</span>
        <span class="s-total">kg</span>
      </div>
    </div>
    <div class="m-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="listCurrentChange"
        :current-page="post_data.page_index"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="post_data.page_size"
        :total='total'>
      </el-pagination>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :fullscreen="dialogFullScreen"
      top="7vh"
      style="min-width: 1024px;"
    >
      <h-running @changeIcon="isFullScreen" v-if="dialogVisible" :style="dialogHeight" :deviceType="deviceType" :dialogFullScreen="dialogFullScreen"></h-running>
    </el-dialog>
  </div>
</template>

<script>
  import history from '@/api/project/history'
  import deviceList from '@/api/project/deviceList'
  import deviceConfig from '@/api/device/deviceConfig.js'
  import {formatDate} from '@/common/formatDate.js';
  import nPile from '@/assets/device/n-pile.png';
  import tPile from '@/assets/device/t-pile.png';

  import Bus from '@/common/eventBus'
  import { mapActions , mapState} from 'vuex'
  import HRunning from '@/views/softBase/HRunning.vue'
  export default {
    components:{
      HRunning
    },
    data() {
      return {
        nPile:nPile,
        tPile:tPile,

        loading: true,
        isActive:1,
        isCollapse:true, //是否展开nav
        currentPage:1, //当前页
        pagesize:20, //条数
        total:0, //总数
        dialogVisible: false, //模态框
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
        },  //时间筛选
        deviceSelect1:[
          {value1:1,name:'一号桩'},
          {value1:2,name:'二号桩'},
          {value1:3,name:'三号桩'},
          {value1:4,name:'四号桩'},
          {value1:5,name:'五号桩'},
        ], //全部桩筛选
        value1:'', // 全部桩选定值
        value2:'',// 评分等级选定值
        deviceSelect2:[
          {value2:[80,100],name:'A (80-100)'},
          {value2:[70,80],name:'B (70-80)'},
          {value2:[60,70],name:'C (60-70)'},
          {value2:[50,60],name:'D (50-60)'},
          {value2:[40,50],name:'E (40-50)'},
        ],// 评分等级选定值
        value7:'',// 时间选定值

        device:'',// 全部设备选定值
        //deviceKey:'',// 设备key值
        tableData: [],// 列表数据
        input9: '',

        multipleSelection:[],

        //选择列
        newData:{
          //pile_id:{title:'桩号',checked:true},
          pile_describe:{title:'桩号',checked:true},
          machine_key:{title:'桩机号',checked:false},
          begin_time:{title:'开始时间',checked:true},
          end_time:{title:'结束时间',checked:true},
          depth:{title:'实际桩长',checked:true},
          re_depth:{title:'复搅深度',checked:false},
          water_cement_ratio:{title:'水灰比',checked:true},
          cumulative_ash:{title:'累计灰量',checked:true},
          cumulative_pulp:{title:'累计浆量',checked:true},
          max_current:{title:'最大钻杆电流',checked:true},
          down_speed:{title:'平均下钻速度',checked:false},
          up_speed:{title:'平均提钻速度',checked:false},
          average_pulp:{title:'平均浆量',checked:false},
          average_ash:{title:'平均灰量',checked:false},
          average_current:{title:'平均电流',checked:false},
          max_down_speed:{title:'最大钻速',checked:true},
          max_up_speed:{title:'最大提速',checked:true},
          max_slope:{title:'最大斜度',checked:true},
          sprayed_time:{title:'喷浆时间',checked:false},
          t_type_length:{title:'扩大头桩长',checked:false},
          t_type_slurry:{title:'扩大头浆量',checked:false},
          bottom_part_slurry:{title:'扩大桩灰量',checked:false},
          t_type_ash:{title:'下部桩浆量',checked:false},
          bottom_part_ash:{title:'下部桩灰量',checked:false},
          rate:{title:'评分',checked:true},
        },
        tableHeader:[],
        tableName:[],
        deviceSelect:[],// 全部设备select的列表
        recordSum:[],// 统计总数
        post_data:{ // 请求数据
          key:'',
          page_index:1,
          page_size:10,
          start:'',
          end:'',
          maxScore:'',
          minScore:'',
          pileId:'',
        },
        device_data:{//全部设备select列表
          page_index:1,
          page_size:5,
          name:''
        },
        deviceTotal:0,
        deviceName:'',

        option1:{
          title: {
            text: '流量、速度变化曲线',
            top:'3%',
            left:'3%',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {type: 'cross'}
          },
          legend: {
            data:['流量(L/min)','速度(cm/min)'],
            align:'right',
            right:'3%',
            top:'5%',
          },
          grid:{
            top:'25%',
            bottom:'10%',
          },
          xAxis: [
            {
              type: 'category',
              data: []
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '流量(L/min)',
              min: 0,
              max:50,
              //interval: 5,
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '速度(cm/min)',
              min: 0,
              max:999.99,
              //interval: 5,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name:'流量(L/min)',
              type:'line',
              //yAxisIndex: 1,
              data:[]
            },
            {
              name:'速度(cm/min)',
              type:'line',
              yAxisIndex: 1,
              data:[]
            }
          ]
        },
        option2:{
          title: {
            text: '深度曲线',
            top:'3%',
            left:'3%',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            align:'right',
            right:'3%',
            top:'5%',
          },
          grid: {
            top:'25%',
            right:'5%',
            bottom:'10%',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine:{
              onZero: false,
            },
            position:'top',
            data: []
          },
          yAxis: {
            type: 'value',
            name: '深度(m)',
            inverse:true,
            min:0,
            max:30,
          },
          series: [
            {
              name:'深度(m)',
              type:'line',
              data:[]
            },
          ]
        },
        option3:{
          title: {
            text: '钻杆电流曲线',
            top:'3%',
            left:'3%',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            align:'right',
            right:'3%',
            top:'5%',
          },
          grid: {
            top:'25%',
            right:'5%',
            bottom:'10%',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine:{
              onZero: false,
            },
            data: []
          },
          yAxis: {
            type: 'value',

            name:'电流(A)',
            min:0,
            max:150,
          },
          series: [
            {
              name:'电流(A)',
              type:'line',
              data:[]
            },
          ]
        },
        option4:{
          title: {
            text: '浆量、深度分布曲线',
            top:'3%',
            left:'3%',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer:{
              type: 'line',
              axis: 'y'
            },
            formatter:function (params) {
              var res='<div><p>深度(米)：'+params[0].data[1]+'</p></div>';
              for(var i=0;i<params.length;i++){
                res+='<div>'+'<div style="width: 10px;height: 10px;border-radius: 50%;display: inline-block;background: '+params[i].color+';"></div>'+'<p style="display: inline-block;margin-left: 10px;font-size: 12px;">'+params[i].seriesName+'：'+params[i].data[0]+'</p>'+'</div>'
              }
              return res;
            }
          },
          legend: {
            align:'right',
            right:'3%',
            top:'5%',
          },
          grid: {
            top:'25%',
            right:'10%',
            bottom:'10%',
          },
          xAxis: {
            name:'浆量',
            nameTextStyle:{
              align:'left',
              verticalAlign:'top',
            },
            position:'top',
            axisLine:{
              onZero: false,
            },
            type: 'value',
            boundaryGap: false,
            //data: []
          },
          yAxis: {
            type: 'value',
            name: '深度(m)',
            inverse:true,
          },
          series: [
            {
              name:'浆量(L/0.25m)',
              type:'line',
              data:[]
            },
          ]
        },

        expandTable:[],

        chartTime:[],

        noConfig:false,

        config_data:[],
        pile_describe:'',

        key:'',

        dialogVisible: false,
        dialogWidth:'70%',
        dialogHeight:{
          height:'700px'
        },
        dialogFullScreen:false,
        changeIcon:true,
        deviceType:'',
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time*1000);
        return formatDate(date, 'MM-dd hh:mm'); //yyyy-MM-dd hh:mm
      }
    },
    props:['isShow','newStyle','deviceKey','isDevice'],
    computed: {
      ...mapState({changeTab:state=>state.project.changeTab}),
      ...mapState({token:state=>state.project.historyKey}),
      ...mapState({token:state=>state.project.backTab})
    },
    created(){
      this.deviceEnd();
      this.getPostData();
      this.getDeviceList(this.device_data);
      this.getList(this.post_data);
      this.getRecords();
      Bus.$on('isCollapse',res=>{
        this.isCollapse=res
      })
    },
    mounted(){
      this.$bus.on('allEnd',res=>{
        this.dialogVisible=res;
      });
    },
    beforeDestroy(){

    },

    methods: {
      ...mapActions('historyKey',['incrementHistory']),
      ...mapActions('changeTab',['incrementTab']),
      ...mapActions('backTab',['incrementBack']),

      isFullScreen(val){ //是否打开模态框
        if(!val){
          this.dialogWidth='100%';
          this.dialogHeight={
            height:'calc(100% - 65px)'
          };
          this.changeIcon=!this.changeIcon;
          this.dialogFullScreen=true;
        }else{
          this.dialogWidth='70%';
          this.dialogHeight={
            height:'700px'
          };
          this.changeIcon=!this.changeIcon;
          this.dialogFullScreen=false;
        }
      },
      //回放结束处理
      deviceEnd(){
        if(this.$store.state.project.changeTab){
          let post_Data=JSON.parse(sessionStorage.getItem('replayData'));
          this.post_data.page_index=post_Data.page_index;
          this.getList(this.post_data);
        }
      },
      //组件销毁时 使结束状态重置
      changeBack(){
        this.$store.dispatch('incrementBack',false);
      },

      //是否是设备 列表请求参数
      getPostData(){
        let deviceInfo=JSON.parse(sessionStorage.getItem('deviceInfo'));
        this.deviceName=sessionStorage.getItem('deviceName');
        if(this.isDevice){
          this.pile_describe=deviceInfo.name;
          this.key=deviceInfo.key;
          this.post_data.key=deviceInfo.key;
        }
      },

      //回放
      playback(data){
        deviceList.list({key:data.device_key}).then(res=>{
          this.deviceType=res.result.items[0].type;
          let post_data={
            key:data.device_key,
            type:res.result.items[0].type,
            pileId:data.pile_describe,
            page_index:this.post_data.page_index,
          };
          this.$store.dispatch('incrementTab',true);
          sessionStorage.setItem('replayData',JSON.stringify(post_data));
          //是否是设备
          if(this.isDevice){
            Bus.$emit('changeTab',true);
            this.$store.dispatch('incrementHistory',data.device_key);
          }else{
            this.dialogVisible=true;
            this.$store.dispatch('incrementHistory',data.device_key);
          }
        }).catch(e=>{

        });

      },

      handleExport(command){
        if(command=='1'){
          this.importExcel();
        }else if(command=='2'){
          this.importExcelAll();
        }
      },

      //excel导出
      importExcel() {
        require.ensure([], () => {
          if(this.multipleSelection.length!==0){
            for(name in this.newData){
              if(this.newData[name].checked==true){
                this.tableHeader.push(this.newData[name].title);
                this.tableName.push(name)
              }
            }
            const { export_json_to_excel } = require('@/vendor/Export2Excel');//引入文件
            let tHeader = this.tableHeader; //将对应的属性名转换成中文
            let filterVal = this.tableName; //table表格中对应的属性名
            let list=[];
            let obj = {};
            this.multipleSelection.forEach(e=>{
              for(let i=0;i<filterVal.length;i++){
                obj[filterVal[i]] = e[filterVal[i]]
              }
              list.push(obj);
            });
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '数据报表');

            //引用赋值  用完清空
            this.tableHeader=[];
            this.tableName=[];
            list=[];
          }else{
            this.$message.error('请先选择需要导出的项目！')
          }
        })
      },
      //excel导出全部
      importExcelAll(){
        history.list({page_index:1,page_size:100,key:''}).then(res=>{
          if(res.success){
            for(name in this.newData){
              this.tableHeader.push(this.newData[name].title);
              this.tableName.push(name)
            }
            const { export_json_to_excel } = require('@/vendor/Export2Excel');//引入文件
            let tHeader = this.tableHeader; //将对应的属性名转换成中文
            let filterVal = this.tableName; //table表格中对应的属性名
            let list=[];
            let obj = {};
            res.result.items.forEach(e=>{
              for(let i=0;i<filterVal.length;i++){
                obj[filterVal[i]] = e[filterVal[i]]
              }
              list.push(obj);
            });
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '数据报表');

            //引用赋值  用完清空
            this.tableHeader=[];
            this.tableName=[];
            list=[];
          }else {
            _this.$message.error(res.message);
          }
        }).catch(err => {
        });
      },
      //excel导出子数据
      expandExcel(data){
        /*let expandData=data;
        require.ensure([], () => {
          if(data.length!==0){
            const { export_json_to_excel } = require('@/vendor/Export2Excel');//引入文件
            let tHeader = ['段浆量(L/m)','段灰量(L/m)','段深度(cm)','段电流(A)','段密度(g/cm3)','段喷压(pa)','钻速(cm/min)']; //将对应的属性名转换成中文
            let filterVal = ['p_pulp','p_ash','p_deep','p_current','p_density','p_pressure','p_down_speed']; //table表格中对应的属性名
            let list=[];
            let obj = {};
            //console.log(expandData);
            expandData.forEach(e=>{
              for(let i=0;i<filterVal.length;i++){
                //console.log(e[filterVal[i]]);
                obj[filterVal[i]] = e[filterVal[i]]
              }
              //console.log(obj);
              list.push(obj);
            });
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '数据报表');
          }else{
            //this.$message.error('请先选择需要导出的项目！')
          }
        })*/
      },

      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },

      Cleanup() {
        window.clearInterval(idTmr);
        CollectGarbage();
      },
      tableToExcel() {
        var uri = 'data:application/vnd.ms-excel;base64,',
          template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
          base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
          format = function (s, c) {
            return s.replace(/{(\w+)}/g,
              function (m, p) {
                return c[p];
              })
          }
        return function (table, name) {
          if (!table.nodeType) table = document.getElementById(table);
          var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
          window.location.href = uri + base64(format(template, ctx))
        }
      },

      //获取作业配置参数
      getConfig(config){
        deviceConfig.list({'key':config}).then(res=>{
          if(res.result!=undefined){
            this.noConfig=false;
            this.config_data=JSON.parse(res.result.content);
          }else{
            this.noConfig=true;
          }
        })
      },
      //获取时间
      getTime(data){
        if(data){
          this.post_data.start=data[0]/1000;
          this.post_data.end=data[1]/1000;
        }else{
          this.post_data.start='';
          this.post_data.end='';
        }
      },

      handleExpandChange(){
        this.isActive=1
      },
      //类型改变
      deviceChange(val){
        this.post_data.key=val;
        this.getList(this.post_data);
        this.getRecords(val)
      },
      deviceChange1(val){
        this.post_data.minScore=val[0];
        this.post_data.maxScore=val[1];
      },
      handleCommand(command) { //
        this.$message(command);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //列表改变每页显示的条数
      handleSizeChange: function (size) {
        this.post_data.page_size=size;
        this.getList(this.post_data);
      },

      //列表改变当前页
      handleCurrentChange: function(currentPage){
        this.device_data.page_index = currentPage;
        this.getList(this.post_data);
      },
      //列表改变当前页
      listCurrentChange: function(currentPage){
        this.post_data.page_index = currentPage;
        this.getList(this.post_data);
      },
      //获取列表
      getList(post_data) {
        this.loading=true;
        history.list(post_data).then(res=>{
          if(res.success){
            this.total=res.result.total;
            this.tableData=res.result.items;
            /*_this.tableData.forEach(function (item) {
              item.data.forEach(list=>{
                list.p_ash=list.p_pulp*list.p_density/(1+item.water_cement_ratio);
              })
            });*/
            this.loading=false
          }else {
            this.$message.error(res.message);
            this.loading=false
          }
        }).catch(err => {
          this.loading=false;
        });
      },

      //打开子列表图表
      getChart(lists){
        this.isActive=2;
        this.option1.xAxis[0].data=[];
        this.option2.xAxis.data=[];
        this.option3.xAxis.data=[];
        this.option4.xAxis.data=[];

        this.option1.series[0].data=[];
        this.option1.series[1].data=[];

        this.option2.series[0].data=[];
        this.option3.series[0].data=[];
        this.option4.series[0].data=[];

        let beginTime=lists.begin_time;

        //数组分组
        let sorted = this.groupBy(lists.data, function(item){
          return [item.p_deep];
        });
        let deepPulp=[];
        sorted.forEach(item=>{
          if(item.length==1){
            deepPulp.push([item[0].p_pulp,item[0].p_deep/100]);
          }else{
            let num=0;
            item.forEach(i=>{
                num+=i.p_pulp;
            });
            num=num.toFixed(2);
            deepPulp.push([num,item[0].p_deep/100]);
          }
        });


        lists.data.forEach(item=>{
          beginTime+=item.p_time;
          this.option1.xAxis[0].data.push(this.timestampToTime(parseInt(beginTime)));
          this.option1.series[0].data.push(Number(item.p_pulp));
          this.option1.series[1].data.push(parseInt(Math.abs(item.p_down_speed)));

          this.option2.xAxis.data.push(this.timestampToTime(parseInt(beginTime)));
          this.option2.series[0].data.push(parseInt(item.p_deep)/100);

          this.option3.xAxis.data.push(this.timestampToTime(parseInt(beginTime)));
          this.option3.series[0].data.push(parseInt(item.p_current));

          //this.option4.xAxis.data=pulpArr;
          this.option4.series[0].data=deepPulp;
        })
      },

      groupBy( array , f ) {
        let groups = {};
        array.forEach( function( o ) {
          let group = JSON.stringify( f(o) );
          groups[group] = groups[group] || [];
          groups[group].push( o );
        });
        return Object.keys(groups).map( function( group ) {
          return groups[group];
        });
      },

      //时间戳转化日期
      timestampToTime(timestamp){
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds()<10 ? '0'+ date.getSeconds() : date.getSeconds();
        return h+m+s;
      },

      //统计总数
      getRecords(){
        history.records(this.post_data).then(res=>{
          this.recordSum=res.result[0];
        })
      },

      //全部设备select当前页
      deviceCurrentChange:function(currentPage){
        this.device_data.page_index=currentPage;
        this.getDeviceList(this.device_data);
      },
      //全部设备select搜索框
      deviceSearch(query){
        this.device=query;
        this.device_data.name=query;
        this.getDeviceList(this.device_data);
      },
      //全部设备的列表
      getDeviceList(post_data){
        let _this=this;
        deviceList.list(post_data).then(res=>{
          _this.deviceSelect=res.result.items;
          _this.deviceTotal=res.result.total;
        });
      },
      visibleChange(val){
        if(val){
          this.device_data={
            page_index:1,
            page_size:5,
            name:''
          };
          this.getDeviceList(this.device_data)
        }
      },

      query(){
        this.post_data.page_index=1;
        this.getList(this.post_data);
        this.getRecords(this.post_data)
      },
      Refresh(){
        this.value2='';
        this.value7='';
        this.post_data={ // 请求数据
          key:this.key,
          page_index:1,
          page_size:10,
          start:'',
          end:'',
          maxScore:'',
          minScore:'',
          pileId:'',
        };
        this.getList(this.post_data)
      }
    },
    watch:{
      deviceKey:{
        handler(val, oldVal){
          this.post_data.key=val;
          this.getList(this.post_data)
        },
      },
      isShow:{
        handler(val, oldVal){
        },
      }
    },
  }
</script>
<style lang="scss" scoped>
  .h-box{
    background: #f5f5f9;
  }
  .t-rows{
    width:260px;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between
  }
  .c-box{

    padding: 20px;
    border:1px solid rgba(230,234,238,1);
    background: #fff;
    overflow: hidden;
    .c-device{
      margin: 0 0 20px 0;
    }
    .t-pile{

    }
    .n-pile{
      float: left;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      margin-right: 20px;
    }
    .c-handle{
      float: right;
      div{
        float: left;
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
      width: 695px;
      overflow: hidden;
      float: left;
      .c-button{
        float: left;
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
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    border-bottom: 2px solid #ebeef5;
    .s-body{
      float: left;
      width: 20%;
      text-align: center;
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
    padding: 10px;
    text-align: center;
    background: #ffffff;
  };
  .c-describe{
    //color: #1ab3e6;
    cursor: pointer;

  }
  .c-name{
    display: inline-block;
    width: 50px;
    vertical-align: top;
    font-size: 12px;
  }
  .c-key{
    display:inline-block;
    margin-left: 10px;
    vertical-align: top;
    width:95px;
    word-wrap:break-word;
    font-size: 12px;
  }
  .c-parameter{
    color: #1ab3e6;
    cursor: pointer;
    text-decoration:underline;
  }

  .expand_head{
    width: 100%;
    height: 36px;
    margin-bottom: 20px;
    .expand_tab{
      float: left;
      li{
        float: left;
        width:97px;
        height:36px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        border:1px solid rgba(225,225,227,0.8);
        background:rgba(255,255,255,1);
        border-radius:2px;
      }
      .Action{
        color: #F76A6A;
      }
    }
    .exportExcel{
      float: right;
      width:97px;
      height:36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      background:rgba(255,255,255,1);
      border-radius:2px;
    }
  }
  .expand_charts{
    width: 100%;
    height: 700px;
    li{
      float: left;
      width: calc(50% - 10px);
      height: calc(50% - 10px);
      background: #ffffff;
    }
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
