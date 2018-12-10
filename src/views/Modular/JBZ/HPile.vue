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
          <el-button type="primary" icon="el-icon-upload2" size="mini" :disabled="isExport">导出</el-button>
          <el-dropdown-menu slot="dropdown" >
            <a id="simulation" href=""></a>
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
    <table cellspacing="0" cellpadding="0" border="1" id="statisticsTable" v-show="false">
      <thead>
      <tr>
        <td class="tHead" colspan="8">水泥土搅拌桩施工现场统计报表</td>
      </tr>
      <tr>
        <td colspan="8">工程名称：<span>{{statisticsReport.projectName}}</span></td>
      </tr>
      <tr>
        <td colspan="4">施工单位：<span>{{statisticsReport.ConstructionUnit}}</span></td>
        <td colspan="4">桩机编号：<span>{{statisticsReport.machine_key}}</span></td>
      </tr>
      <tr>
        <td colspan="2">开始时间：</td>
        <td colspan="2">{{ statisticsReport.begin_time }}</td>
        <td colspan="2">结束时间：</td>
        <td colspan="2">{{ statisticsReport.end_time }}</td>
      </tr>

            </thead>
      <tbody>
      <tr v-for="item in statisticsData">
        <td v-for="i in item">{{i}}&nbsp;</td>
      </tr>
      </tbody>
      <tfoot v-if="isAll">
      <tr>
        <td colspan="2">累计根数（根）：</td>
        <td colspan="2">{{recordSum.total_pile_num}}</td>
        <td colspan="2">累计延米数（m）：</td>
        <td colspan="2">{{statisticsReport.allDepth | formatZ}}</td>
      </tr>
      <tr>
        <td colspan="2">累计浆量（L）：</td>
        <td colspan="2">{{recordSum.total_cumulative_pulp | formatZ}}</td>
        <td colspan="2">累计灰量（kg）：</td>
        <td colspan="2">{{recordSum.total_cumulative_ash | formatZ}}</td>
      </tr>
      <tr>
        <td colspan="2">平均浆量（L）：</td>
        <td colspan="2">{{recordSum.total_cumulative_pulp/statisticsReport.allDepth | formatZ}}</td>
        <td colspan="2">平均灰量（kg）：</td>
        <td colspan="2">{{recordSum.total_cumulative_ash/statisticsReport.allDepth | formatZ}}</td>
      </tr>
      <tr>
        <td colspan="2">操作人员：</td>
        <td colspan="2"></td>
        <td colspan="2">技术人员：</td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td colspan="2">现场监理：</td>
        <td colspan="2"></td>
        <td colspan="2">打印时间：</td>
        <td colspan="2"></td>
      </tr>
      </tfoot>
      <tfoot v-else>
      <tr>
        <td colspan="2">累计根数（根）：</td>
        <td colspan="2">{{statisticsReport.total}}</td>
        <td colspan="2">累计延米数（m）：</td>
        <td colspan="2">{{statisticsReport.allDepth | formatZ}}</td>
      </tr>
      <tr>
        <td colspan="2">累计浆量（L）：</td>
        <td colspan="2">{{statisticsReport.cumulative_pulp | formatZ}}</td>
        <td colspan="2">累计灰量（kg）：</td>
        <td colspan="2">{{statisticsReport.cumulative_ash | formatZ}}</td>
      </tr>
      <tr>
        <td colspan="2">平均浆量（L）：</td>
        <td colspan="2">{{statisticsReport.average_pulp}}</td>
        <td colspan="2">平均灰量（kg）：</td>
        <td colspan="2">{{statisticsReport.average_ash}}</td>
      </tr>
      <tr>
        <td colspan="2">操作人员：</td>
        <td colspan="2"></td>
        <td colspan="2">技术人员：</td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td colspan="2">现场监理：</td>
        <td colspan="2"></td>
        <td colspan="2">打印时间：</td>
        <td colspan="2"></td>
      </tr>
      </tfoot>
    </table>

    <el-table
      id="history-table"
      v-loading="loading"
      ref="multipleSelection"
      :data="tableData"
      style="width: 100%"
      align="center"
      :highlight-current-row=true
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <table cellspacing="0" cellpadding="0" border="1" id="tableToExcel" v-show="false">
            <thead>
            <tr>
              <td class="tHead" colspan="8">水泥土搅拌桩施工现场原始记录表</td>
            </tr>
            <tr>
              <td colspan="8">工程名称：<span>{{recordReport.projectName}}</span></td>
            </tr>
            <tr>
              <td colspan="4">施工单位：<span>{{recordReport.ConstructionUnit}}</span></td>
              <td colspan="4">桩机编号：<span>{{props.row.machine_key}}</span></td>
            </tr>
            <tr>
              <td colspan="4">里程桩号：{{props.row.pile_describe}}</td>
              <td colspan="2">桩坐标：</td>
              <td>{{props.row.hole_longitude}}</td>
              <td>{{props.row.hole_rlatitude}}</td>
            </tr>
            <tr>
              <td colspan="2">设计总桩长(m)：</td>
              <td colspan="2">8.00</td>
              <td colspan="2">水灰比：</td>
              <td colspan="2">{{props.row.water_cement_ratio}}</td>
            </tr>
            <tr>
              <td colspan="2">水泥掺量（kg/m）:</td>
              <td colspan="2">65.0</td>
              <td colspan="2">桩间距(m)：</td>
              <td colspan="2">1.1-1.4</td>
            </tr>
            <tr>
              <td colspan="2">提钻速度（cm/min）:</td>
              <td colspan="2">120.0</td>
              <td colspan="2">下钻速度（cm/min）:</td>
              <td colspan="2">100.0</td>
            </tr>
            <tr>
              <td colspan="2">桩径（cm):</td>
              <td colspan="2">65.0</td>
              <td colspan="2">空搅深度（m）：</td>
              <td colspan="2">10.0</td>
            </tr>
            <tr>
              <td colspan="2">开始时间：</td>
              <td colspan="2">{{ recordReport.begin_time }}</td>
              <td colspan="2">结束时间：</td>
              <td colspan="2">{{ recordReport.end_time }}</td>
            </tr>

            </thead>
            <tbody>
            <tr>
              <td>深度(m)</td>
              <td>段浆量（L/m）</td>
              <td>段灰量（kg/m）</td>
              <td>段密度（g/cm3）</td>
              <td>段电流（A）</td>
              <td>段喷压（MPa）</td>
              <td>速率（cm/min）</td>
              <td>状态</td>
            </tr>
            <tr v-for="item in props.row.data" :key="item">
              <td>{{item.p_deep / 100  | formatZ}}&nbsp;</td>
              <td>{{item.p_pulp  | formatZ}}&nbsp;</td>
              <td>{{item.p_total_ash  | formatZ}}&nbsp;</td>
              <td>{{item.p_density  | formatZ}}&nbsp;</td>
              <td>{{item.p_current  | formatZ}}&nbsp;</td>
              <td>{{item.p_pressure  | formatZ}}&nbsp;</td>
              <td>{{Math.abs(Math.round(item.p_down_speed))}}&nbsp;</td>
        <td>
          <span v-if="item.p_down_speed >= 0">下钻</span>
          <span v-else>提钻</span>
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="2">成桩总时间(s)：</td>
        <td colspan="2">{{recordReport.p_allTime}}</td>
        <td colspan="2">最大斜度：</td>
        <td colspan="2">{{props.row.max_slope | formatZ}}&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2">往复深度1（m）:</td>
        <td colspan="2">65.0</td>
        <td colspan="2">往复深度2（m）:</td>
        <td colspan="2">1.1-1.4</td>
      </tr>
      <tr>
        <td colspan="2">累计浆量（L）：</td>
        <td colspan="2">{{props.row.cumulative_pulp | formatZ}}&nbsp;</td>
        <td colspan="2">累计灰量（kg）：</td>
        <td colspan="2">{{props.row.cumulative_ash | formatZ}}&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2">最大电流（A）:</td>
        <td colspan="2">{{props.row.max_current | formatZ}}&nbsp;</td>
        <td colspan="2">平均灰量（kg/m）： </td>
        <td colspan="2">{{props.row.average_ash | formatZ}}&nbsp;0</td>
      </tr>
      <tr>
        <td colspan="2">最大提速（cm/min）：</td>
        <td colspan="2">{{Math.abs(Math.round(props.row.max_up_speed))}}&nbsp;</td>
        <td colspan="2">最大钻速（cm/min）：</td>
        <td colspan="2">{{Math.abs(Math.round(props.row.max_down_speed))}}&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2">操作人员：</td>
        <td colspan="2"></td>
        <td colspan="2">技术人员：</td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td colspan="2">现场监理：</td>
        <td colspan="2"></td>
        <td colspan="2">打印时间：</td>
        <td colspan="2"></td>
      </tr>
      </tfoot>
    </table>

    <div  class="expand_head">
      <ul class="expand_tab">
        <li class="expand_list_tab" :class="{Action:isActive==1}" @click="isActive=1">段数据列表</li>
        <li class="expand_overview_tab" :class="{Action:isActive==2}" @click="getChart(props.row)">图表曲线</li>
      </ul>
      <div class="exportExcel" :download="filename" id="excelOut" @click="recordExcel">记录报表下载</div>
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
          {{ props.row.p_pulp | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        label="段灰量（kg）"
        align="center">
        <template slot-scope="props">
          {{ props.row.p_total_ash | formatZ}}
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
          {{ props.row.p_current | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="段密度（g/cm³）">
        <template slot-scope="props">
          {{ props.row.p_density | formatZ}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="段喷压（MPa）">
        <template slot-scope="props">
          {{ props.row.p_pressure | formatZ}}
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
        <span class="s-total">kg/m</span>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="m-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="listCurrentChange"
        :current-page="10"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
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
          projectId:this.$cookies.get('projectId'),
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
        deviceType:'', //设备类型

        deviceInfo:[], //设备信息

        recordReport:{ //记录报表数据
          filename:'', // 数据报表导出文件名
          ConstructionUnit:'', // 建设单位
          end_time:'', //结束时间
          begin_time:'', //开始时间
          projectName:'', //项目名称
          p_allTime:'', //成桩总时间
        },
        statisticsReport:{ //记录报表数据
          ConstructionUnit:'', // 建设单位
          end_time:'', //结束时间
          begin_time:'', //开始时间
          projectName:'', //项目名称
          p_allTime:'', //成桩总时间
          machine_key:'',//桩机号
        },
        idTmr:null,
        statisticsData:[], //统计表格的数据

        isExport:true, //导出按钮禁用控制

        isAll:false,//导出的全部还是局部
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
      this.getDevice();
      this.deviceEnd();
      this.getPostData();
      this.getDeviceList(this.device_data);
      this.getList(this.post_data);
      this.getRecords(this.post_data);
      this.getStatistics();
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

      //判断是否是设备  导出按钮限制
      getDevice(){
        if(this.isDevice){
          this.isExport=false
        }
      },
      //是否打开模态框
      isFullScreen(val){
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
            projectId:this.$cookies.get('projectId'),
          };
          this.$store.dispatch('incrementTab',true);
          sessionStorage.setItem('replayData',JSON.stringify(post_data));
          this.$store.dispatch('incrementHistory',data.device_key);
          deviceList.list({key:data.device_key}).then(res=>{
            sessionStorage.setItem('deviceInfo',JSON.stringify(res.result.items[0]));
          });
          //是否是设备
          if(this.isDevice){
            Bus.$emit('changeTab',true);
          }else{
            this.dialogVisible=true;
          }
        }).catch(e=>{

        });

      },

      //导出标记或全部的选择
      handleExport(command){
        if(command=='1'){
          this.importExcel();
        }else if(command=='2'){
          this.importExcelAll();
        }
      },

      //统计报表一些数据
      getStatistics(){
        //项目信息的数据处理
        let projectInfo=JSON.parse(sessionStorage.getItem('projectInfo'));
        this.statisticsReport.projectName=projectInfo.name;
        projectInfo.organTypeList.forEach(item=>{
          if(item.alias=='worker'){
            this.statisticsReport.ConstructionUnit=item.organList[0].name
          }
        });
      },

      //excel导出统计报表选项
      importExcel() {
        this.isAll=false;
        require.ensure([], () => {
          if(this.multipleSelection.length!==0){
            for(name in this.newData){
              if(this.newData[name].checked){
                this.tableHeader.push(this.newData[name].title);
                this.tableName.push(name)
              }
            }

            let tHeader = this.tableHeader; //将对应的属性名转换成中文
            let filterVal = this.tableName; //table表格中对应的属性名
            let list=[];
            let allDepth=0; //总桩长
            let cumulative_pulp=0; //累计浆量
            let cumulative_ash=0; //累计灰量
            this.multipleSelection.forEach(e=>{
              let obj = {};

              for(let i=0;i<filterVal.length;i++){
                let key=filterVal[i];
                let lists=e[filterVal[i]];

                if(key=='begin_time'||key=='end_time'){
                  let date = new Date(lists*1000);
                  lists=formatDate(date, 'MM-dd hh:mm')
                }else if(key=='pile_describe'||key=='rate'){
                  lists=Math.abs(lists);
                }else if(key=='depth'){
                  allDepth+=lists
                }else if(key=='cumulative_pulp'){
                  cumulative_pulp+=lists
                }else if(key=='cumulative_ash'){
                  cumulative_ash+=lists
                }else if(key=='max_up_speed'||key=='max_down_speed'){
                  lists=Math.abs(lists);
                }else{
                  lists=Number(lists).toFixed(2)
                }
                obj[filterVal[i]] = lists;
              }

              list.push(obj);
            });

            this.statisticsReport.allDepth=allDepth;
            this.statisticsReport.total=list.length;
            this.statisticsReport.cumulative_pulp=cumulative_pulp;
            this.statisticsReport.cumulative_ash=cumulative_ash;
            this.statisticsReport.average_pulp=Number(cumulative_pulp/allDepth).toFixed(2);
            this.statisticsReport.average_ash=Number(cumulative_ash/allDepth).toFixed(2);



            const data = this.formatJson(filterVal, list);
            data.unshift(tHeader);
            this.statisticsData=data;
            this.statisticsReport.begin_time=list[list.length-1].begin_time;
            this.statisticsReport.end_time=list[0].end_time;
            this.statisticsReport.machine_key=this.multipleSelection[0].machine_key;

            setTimeout(()=>{
              this.copyExcel('statisticsTable',this.statisticsReport.begin_time+'_统计报表')
            },200);

            //引用赋值  用完清空
            this.tableHeader=[];
            this.tableName=[];
            list=[];
          }else{
            this.$message.error('请先选择需要导出的项目！')
          }
        })
      },

      //excel导出统计报表全部
      importExcelAll(){
        this.isAll=true;
        this.post_data.page_size=9999999;
        history.list(this.post_data).then(res=>{
          if(res.success){
            for(name in this.newData){
              if(this.newData[name].checked){
                this.tableHeader.push(this.newData[name].title);
                this.tableName.push(name)
              }
            }
            let tHeader = this.tableHeader; //将对应的属性名转换成中文
            let filterVal = this.tableName; //table表格中对应的属性名
            let list=[];
            let allDepth=0; //总桩长
            res.result.items.forEach(e=>{
              let obj = {};
              for(let i=0;i<filterVal.length;i++){
                let key=filterVal[i];
                let lists=e[filterVal[i]];
                if(key=='begin_time'||key=='end_time'){
                  let date = new Date(lists*1000);
                  lists=formatDate(date, 'yyyy-MM-dd hh:mm:ss')
                }else if(key=='pile_describe'||key=='rate'||key=='machine_key'){

                }else if(key=='depth'){
                  allDepth+=lists
                }else if(key=='max_up_speed'||key=='max_down_speed'){
                  lists=Math.abs(lists);
                }else{
                  lists=Number(lists).toFixed(2)
                }
                obj[filterVal[i]] = lists;
              }
              list.push(obj);
            });

            this.statisticsReport.allDepth=allDepth;


            const data = this.formatJson(filterVal, list);
            //export_json_to_excel(tHeader, data, '数据报表');
            data.unshift(tHeader);
            this.statisticsData=data;
            this.statisticsReport.begin_time=list[list.length-1].begin_time;
            this.statisticsReport.end_time=list[0].begin_time;
            this.statisticsReport.machine_key=res.result.items[0].machine_key;

            //引用赋值  用完清空
            this.tableHeader=[];
            this.tableName=[];

            list=[];
            setTimeout(()=>{
              this.copyExcel('statisticsTable',this.statisticsReport.begin_time+'_统计报表')
            },200);

          }else {
            _this.$message.error(res.message);
          }
        }).catch(err => {
        });
      },

      //导出记录报表
      recordExcel(){
        this.tableToExcel('tableToExcel', this.recordReport.filename)
      },
      //展开某行的事件
      handleExpandChange(row,expandedRows){

        if(expandedRows.length>1){
          expandedRows.shift();
        }
        //设计参数的数据处理
        this.getConfig(row.device_key);
        deviceList.list({key:row.device_key}).then(res=>{
          this.deviceInfo=res.result.items[0]
        });

        //项目信息的数据处理
        let projectInfo=JSON.parse(sessionStorage.getItem('projectInfo'));
        this.recordReport.projectName=projectInfo.name;
        projectInfo.organTypeList.forEach(item=>{
          if(item.alias=='worker'){
            this.recordReport.ConstructionUnit=item.organList[0].name
          }
        });

        //表内数据的处理
        let begin_time = new Date(row.begin_time*1000);
        let end_time = new Date(row.end_time*1000);
        this.recordReport.filename=row.pile_describe+'_原始记录表';
        this.recordReport.end_time=formatDate(end_time, 'yyyy-MM-dd hh:mm:ss');
        this.recordReport.begin_time=formatDate(begin_time, 'yyyy-MM-dd hh:mm:ss');


        //成桩总时间
        let num=0;
        row.data.forEach(item=>{
          num+=item.p_time
        });
        this.recordReport.p_allTime=num;
        this.isActive=1;
      },

      //表格导出的封装
      tableToExcel(tableid, sheetName) {
        let uri = 'data:application/vnd.ms-excel;base64,';
        let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
          'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
          + '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
          + '</x:ExcelWorkbook></xml><![endif]-->' +
          ' <style type="text/css">' +
          'table td {' +
          'height: 30px;' +
          'font-family: 宋体;' +
          'font-size: 16px;' +
          'text-align: left;' +
          'border: 0.5px solid #000000;' +
          ' }' +
          'table .tHead {' +
          'font-size: 24px;' +
          'text-align:center;' +
          'font-weight: bold;' +
          'height: 40px;' +
          ' }' +
          'table tfoot tr{' +
          'height: 30px;' +
          ' }' +
          'table tbody td{' +
          'text-align: center;' +
          'height: 20px;' +
          ' }' +
          '</style>' +
          '</head><body ><table class="excelTable">{table}</table></body></html>';
        if (!tableid.nodeType) tableid = document.getElementById(tableid);
        let ctx;
        if(tableid){
          ctx = {worksheet: sheetName || 'Worksheet', table: tableid.innerHTML};
          document.getElementById('simulation').href = uri + this.base64(this.format(template, ctx));
          document.getElementById('simulation').download = sheetName + ".xls";//自定义文件名
          document.getElementById('simulation').click();
        }
      },
      //整个表格拷贝到EXCEL中
      copyExcel(tableid, sheetName) {
        if(this.getExplorer()=='ie') {
          let curTbl = document.getElementById(tableid);
          let oXL = new ActiveXObject("Excel.Application");
          //创建AX对象excel
          let oWB = oXL.Workbooks.Add();
          //获取workbook对象
          let xlsheet = oWB.Worksheets(1);
          //激活当前sheet
          let sel = document.body.createTextRange();
          sel.moveToElementText(curTbl);
          //把表格中的内容移到TextRange中
          sel.select;
          //全选TextRange中内容
          sel.execCommand("Copy");
          //复制TextRange中内容
          xlsheet.Paste();
          //粘贴到活动的EXCEL中
          oXL.Visible = true;
          //设置excel可见属性

          try {
            let fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
          } catch (e) {
            print("Nested catch caught " + e);
          } finally {
            oWB.SaveAs(fname);

            oWB.Close(savechanges = false);
            //xls.visible = false;
            oXL.Quit();
            oXL = null;
            //结束excel进程，退出完成
            //window.setInterval("Cleanup();",1);
            this.idTmr = window.setInterval("Cleanup();", 1);
          }
        } else {
          this.tableToExcel(tableid, sheetName)
        }
      },
      Cleanup() {
        window.clearInterval(this.idTmr);
        CollectGarbage();
      },
      //浏览器的兼容
      getExplorer() {
        var explorer = window.navigator.userAgent ;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
          return 'ie';
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
          return 'Firefox';
        }
        //Chrome
        else if(explorer.indexOf("Chrome") >= 0){
          return 'Chrome';
        }
        //Opera
        else if(explorer.indexOf("Opera") >= 0){
          return 'Opera';
        }
        //Safari
        else if(explorer.indexOf("Safari") >= 0){
          return 'Safari';
        }
      },
      base64 (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format (s, c) {
        return s.replace(/{(\w+)}/g,
          function (m, p) {
            return c[p];
          });
      },


      //导出封装方法
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      Cleanup() {
        window.clearInterval(idTmr);
        CollectGarbage();
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


      //获取时间筛选的区间
      getTime(data){
        if(data){
          this.post_data.start=data[0]/1000;
          this.post_data.end=data[1]/1000;
        }else{
          this.post_data.start='';
          this.post_data.end='';
        }
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
      //获取全部历史数据列表
      getList(post_data) {
        this.loading=true;
        history.list(post_data).then(res=>{
          if(res.success){
            this.total=res.result.total;
            this.tableData=res.result.items;
            this.tableData.forEach(function (item) {
              item.data.forEach(list=>{
                for(let key in list){
                  if( key == 'p_deep'){
                    list[key]=Math.round(list[key])
                  }
                }
                list.p_ash=list.p_pulp*list.p_density/(1+item.water_cement_ratio);
              })
            });
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

      //数组分组 groupBy
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
      getRecords(post_data){
        history.records(post_data).then(res=>{
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

      //查询列表
      query(){
        this.post_data.page_index=1;
        this.getList(this.post_data);
        this.getRecords(this.post_data)
      },

      //重置请求参数
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
        this.getList(this.post_data);
        this.getRecords(this.post_data);
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
      },
      device(val, oldVal){
        if(val){
          if(!this.isDevice){
            this.isExport=false;
          }
        }else{
          this.isExport=true;
        }
      },
    },
  }
</script>
<style lang="scss" scoped>

  #tableToExcel td {
    font-size: 14px;
    width: 200px;
    height: 30px;
    font-family: 宋体;
  }
  #tableToExcel tbody td{
    text-align: center;
  }
  #tableToExcel .tHead {
    font-size: 30px;
    font-weight: bold;
    height: 50px;
    text-align: center;
  }
  #statisticsTable td {
    font-size: 14px;
    width: 200px;
    height: 30px;
    font-family: 宋体;
  }
  #statisticsTable tbody td{
    text-align: center;
  }
  #statisticsTable .tHead {
    font-size: 30px;
    font-weight: bold;
    height: 50px;
    text-align: center;
  }

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
      height: 50px;
      text-align: center;
      .s-total{
        display: inline-block;
        overflow: hidden;
        height: 50px;
        font-size: 12px;
        color:rgba(102,102,102,1);
      }
      .s-num{
        display: inline-block;
        max-width: 120px;
        height: 50px;
        overflow: hidden;
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
      color: #666666;
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
