<template>
	<div class="main-content">
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"margin":"0 0 20px"}' :inline="true" :model="searchForm">
				<el-row :style='{"flexWrap":"wrap","justifyContent":"center","display":"flex"}' >
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#333","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">课程名称</label>
						<el-input v-model="searchForm.kechengmingcheng" placeholder="课程名称" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#333","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">姓名</label>
						<el-input v-model="searchForm.xingming" placeholder="姓名" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}' class="select" label="成绩" prop="chengji">
						<label :style='{"margin":"0 10px 0 0","color":"#333","display":"inline-block","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">成绩</label>
						<el-select  @change="chengjiChange" clearable v-model="searchForm.chengji" placeholder="请选择成绩">
							<el-option v-for="(item,index) in chengjiOptions" v-bind:key="index" :label="item" :value="item"></el-option>
						</el-select>
					</div>
					<el-button :style='{"border":"1px solid #999","cursor":"pointer","padding":"0 24px","boxShadow":"1px 2px 4px #ccc","outline":"none","color":"#333","borderRadius":"4px","background":"linear-gradient(150deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%)","width":"80px","fontSize":"14px","height":"40px"}' type="success" @click="search()">查询</el-button>
				</el-row>

				<el-row :style='{"margin":"20px 0","display":"flex"}'>
					<el-button :style='{"border":"1px solid #999","cursor":"pointer","padding":"0 12px","boxShadow":"inset 0px 0px 32px 0px #eee","margin":"0 10px 0 0","color":"#000","minWidth":"80px","outline":"none","borderRadius":"4px","background":"linear-gradient(320deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%)","width":"auto","fontSize":"14px","height":"36px"}' v-if="isAuth('kechengchengji','新增')" type="success" @click="addOrUpdateHandler()">新增</el-button>
					<el-button :style='{"border":"1px solid #eb8787","cursor":"pointer","padding":"0 12px","boxShadow":"inset 0px 0px 32px 0px #f0d2d2","margin":"0 10px 0 0","color":"#c00","minWidth":"80px","outline":"none","borderRadius":"4px","background":"linear-gradient(240deg, rgba(255,168,153,1) 0%, rgba(247,249,251,1) 50%, rgba(249,156,141,1) 100%)","width":"auto","fontSize":"14px","height":"36px"}' v-if="isAuth('kechengchengji','删除')" :disabled="dataListSelections.length <= 0" type="danger" @click="deleteHandler()">删除</el-button>


					<download-excel v-if="isAuth('kechengchengji','导出')" class="export-excel-wrapper" :data = "dataList" :fields = "json_fields" name = "课程成绩.xls">
						<!-- 导出excel -->
						<el-button :style='{"border":"1px solid #60e669","cursor":"pointer","padding":"0 12px","boxShadow":"inset 0px 0px 32px 0px #d2f0d4","margin":"0 10px 0 0","color":"#06c614","minWidth":"80px","outline":"none","borderRadius":"4px","background":"linear-gradient(240deg, rgba(212,254,215,1) 0%, rgba(249,252,254,1) 50%, rgba(212,254,215,1) 100%)","width":"auto","fontSize":"14px","height":"36px"}' type="danger">导出</el-button>
					</download-excel>
					<el-button :style='{"border":"1px solid #60e669","cursor":"pointer","padding":"0 12px","boxShadow":"inset 0px 0px 32px 0px #d2f0d4","margin":"0 10px 0 0","color":"#06c614","minWidth":"80px","outline":"none","borderRadius":"4px","background":"linear-gradient(240deg, rgba(212,254,215,1) 0%, rgba(249,252,254,1) 50%, rgba(212,254,215,1) 100%)","width":"auto","fontSize":"14px","height":"36px"}' v-if="isAuth('kechengchengji','打印')" type="success" @click="printJson">打印</el-button>


					<el-button :style='{"border":"1px solid #60e669","cursor":"pointer","padding":"0 12px","boxShadow":"inset 0px 0px 32px 0px #d2f0d4","margin":"0 10px 0 0","color":"#06c614","minWidth":"80px","outline":"none","borderRadius":"4px","background":"linear-gradient(240deg, rgba(212,254,215,1) 0%, rgba(249,252,254,1) 50%, rgba(212,254,215,1) 100%)","width":"auto","fontSize":"14px","height":"36px"}' v-if="isAuth('kechengchengji','分数统计')" type="warning" @click="chartDialog1()">分数统计</el-button>
					<el-button :style='{"border":"1px solid #60e669","cursor":"pointer","padding":"0 12px","boxShadow":"inset 0px 0px 32px 0px #d2f0d4","margin":"0 10px 0 0","color":"#06c614","minWidth":"80px","outline":"none","borderRadius":"4px","background":"linear-gradient(240deg, rgba(212,254,215,1) 0%, rgba(249,252,254,1) 50%, rgba(212,254,215,1) 100%)","width":"auto","fontSize":"14px","height":"36px"}' v-if="isAuth('kechengchengji','成绩统计')" type="warning" @click="chartDialog2()">成绩统计</el-button>
				</el-row>
			</el-form>
			
			<!-- <div> -->
				<el-table class="tables"
					:stripe='true'
					:style='{"padding":"0","borderColor":"#bbb #999 #999 #999","margin":"0 0 20px","borderRadius":"0px","borderWidth":"4px 0 1px 1px","background":"rgba(255,255,255,.6)","width":"100%","borderStyle":"solid"}' 
					v-if="isAuth('kechengchengji','查看')"
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='false' label="索引" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='false'  
						prop="kechengmingcheng"
					label="课程名称">
						<template slot-scope="scope">
							{{scope.row.kechengmingcheng}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="xuehao"
					label="学号">
						<template slot-scope="scope">
							{{scope.row.xuehao}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="xingming"
					label="姓名">
						<template slot-scope="scope">
							{{scope.row.xingming}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="banji"
					label="班级">
						<template slot-scope="scope">
							{{scope.row.banji}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="fenshu"
					label="分数">
						<template slot-scope="scope">
							{{scope.row.fenshu}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="chengji"
					label="成绩">
						<template slot-scope="scope">
							{{scope.row.chengji}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="fabushijian"
					label="发布时间">
						<template slot-scope="scope">
							{{scope.row.fabushijian}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="gonghao"
					label="工号">
						<template slot-scope="scope">
							{{scope.row.gonghao}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="jiaoshixingming"
					label="教师姓名">
						<template slot-scope="scope">
							{{scope.row.jiaoshixingming}}
						</template>
					</el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button :style='{"border":"1px solid #7fbeef","cursor":"pointer","padding":"0 16px","margin":"3px 6px 3px 0","outline":"none","color":"#1e98f5","borderRadius":"4px","background":"linear-gradient(150deg, rgba(218,239,255,1) 0%, rgba(247,249,251,1) 50%, rgba(214,237,255,1) 100%)","width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('kechengchengji','查看')" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
							<el-button :style='{"border":"1px solid #60e669","cursor":"pointer","padding":"0 16px","margin":"3px 6px 3px 0","outline":"none","color":"#3CB371","borderRadius":"4px","background":"linear-gradient(240deg, rgba(212,254,215,1) 0%, rgba(249,252,254,1) 50%, rgba(212,254,215,1) 100%)","width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('kechengchengji','修改')" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>





							<el-button :style='{"border":"1px solid #eb8787","cursor":"pointer","padding":"0 16px","margin":"3px 6px 3px 0","outline":"none","color":"#c00","borderRadius":"4px","background":"linear-gradient(240deg, rgba(255,168,153,1) 0%, rgba(247,249,251,1) 50%, rgba(249,156,141,1) 100%)","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('kechengchengji','删除') " type="danger" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="sizeChangeHandle"
					@current-change="currentChangeHandle"
					:current-page="pageIndex"
					background
					:page-sizes="[10, 20, 30, 50]"
					:page-size="pageSize"
					:layout="layouts.join()"
					:total="totalPage"
					prev-text="<"
					next-text=">"
					:hide-on-single-page="true"
					:style='{"width":"100%","padding":"0","margin":"20px 0 0","whiteSpace":"nowrap","color":"#eee","fontWeight":"500"}'
				></el-pagination>
			<!-- </div> -->
		</template>
		
		<!-- 添加/修改页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>





		<el-dialog
		  title="分数统计"
		  :visible.sync="chartVisiable1"
		  width="800">
			<div id="fenshuChart1" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog1">返回</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="成绩统计"
		  :visible.sync="chartVisiable2"
		  width="800">
			<div id="chengjiChart2" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog2">返回</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      form:{},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      chartVisiable: false,
      chartVisiable1: false,
      chartVisiable2: false,
      chartVisiable3: false,
      chartVisiable4: false,
      chartVisiable5: false,
      addOrUpdateFlag:false,
      layouts: ["total","prev","pager","next","sizes","jumper"],

//导出excel
      json_fields: {
      "课程名称": "kechengmingcheng",    //常规字段
      "学号": "xuehao",    //常规字段
      "姓名": "xingming",    //常规字段
      "班级": "banji",    //常规字段
      "分数": "fenshu",    //常规字段
      "成绩": "chengji",    //常规字段
      "发布时间": "fabushijian",    //常规字段
      "工号": "gonghao",    //常规字段
      "教师姓名": "jiaoshixingming",    //常规字段
      "跨表用户id": "crossuserid",    //常规字段
      "跨表主键id": "crossrefid",    //常规字段
      },
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]

    };
  },
  created() {
    this.init();
    this.getDataList();
    this.contentStyleChange()
  },
  mounted() {
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
    }
  },
  components: {
    AddOrUpdate,
  },
  methods: {

    contentStyleChange() {
      this.contentPageStyleChange()
    },
    // 分页
    contentPageStyleChange(){
      let arr = []

      // if(this.contents.pageTotal) arr.push('total')
      // if(this.contents.pageSizes) arr.push('sizes')
      // if(this.contents.pagePrevNext){
      //   arr.push('prev')
      //   if(this.contents.pagePager) arr.push('pager')
      //   arr.push('next')
      // }
      // if(this.contents.pageJumper) arr.push('jumper')
      // this.layouts = arr.join()
      // this.contents.pageEachNum = 10
    },



//统计接口
    chartDialog1() {
      this.chartVisiable1 = !this.chartVisiable1;
      this.$nextTick(()=>{

        var fenshuChart1 = echarts.init(document.getElementById("fenshuChart1"),'vintage');
        this.$http({
            url: "kechengchengji/sectionStat/fenshu",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].fenshu);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].fenshu
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '分数统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                fenshuChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    fenshuChart1.resize();
                };
            }
        });
      })
    },

//统计接口
    chartDialog2() {
      this.chartVisiable2 = !this.chartVisiable2;
      this.$nextTick(()=>{

        var chengjiChart2 = echarts.init(document.getElementById("chengjiChart2"),'vintage');
        this.$http({
            url: "kechengchengji/group/chengji",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].chengji);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].chengji
                    })
                }
                var option = {};
                option = {
                        title: {
                            text: '成绩统计',
                            left: 'center'
                        },
                        legend: {
                          orient: 'vertical',
                          left: 'left'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: pArray,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                };
                // 使用刚指定的配置项和数据显示图表。
                chengjiChart2.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    chengjiChart2.resize();
                };
            }
        });
      })
    },




    init () {
          this.chengjiOptions = "优秀,良好,及格,不及格".split(',')
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
      }
           if(this.searchForm.kechengmingcheng!='' && this.searchForm.kechengmingcheng!=undefined){
            params['kechengmingcheng'] = '%' + this.searchForm.kechengmingcheng + '%'
          }
           if(this.searchForm.xingming!='' && this.searchForm.xingming!=undefined){
            params['xingming'] = '%' + this.searchForm.xingming + '%'
          }
           if(this.searchForm.chengji!='' && this.searchForm.chengji!=undefined){
            params['chengji'] = this.searchForm.chengji
          }
      this.$http({
        url: "kechengchengji/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 下载
    download(file){
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "kechengchengji/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },


    async printJson() {
      //通过getdata调用后台接口获取数据封装到res
      this.list = this.dataList;
      let data = []
      for (let i=0; i < this.list.length; i++) {
          data.push({
          kechengmingcheng: this.list[i].kechengmingcheng,
          xuehao: this.list[i].xuehao,
          xingming: this.list[i].xingming,
          banji: this.list[i].banji,
          fenshu: this.list[i].fenshu,
          chengji: this.list[i].chengji,
          fabushijian: this.list[i].fabushijian,
          gonghao: this.list[i].gonghao,
          jiaoshixingming: this.list[i].jiaoshixingming,
          crossuserid: this.list[i].crossuserid,
          crossrefid: this.list[i].crossrefid,
        })
      }
      printJS({
        printable: data,
        properties: [
	  {
		field: 'kechengmingcheng',
		displayName: '课程名称',
		columnSize: 1
	  },
	  {
		field: 'xuehao',
		displayName: '学号',
		columnSize: 1
	  },
	  {
		field: 'xingming',
		displayName: '姓名',
		columnSize: 1
	  },
	  {
		field: 'banji',
		displayName: '班级',
		columnSize: 1
	  },
	  {
		field: 'fenshu',
		displayName: '分数',
		columnSize: 1
	  },
	  {
		field: 'chengji',
		displayName: '成绩',
		columnSize: 1
	  },
	  {
		field: 'fabushijian',
		displayName: '发布时间',
		columnSize: 1
	  },
	  {
		field: 'gonghao',
		displayName: '工号',
		columnSize: 1
	  },
	  {
		field: 'jiaoshixingming',
		displayName: '教师姓名',
		columnSize: 1
	  },
	  {
		field: 'crossuserid',
		displayName: '跨表用户id',
		columnSize: 1
	  },
	  {
		field: 'crossrefid',
		displayName: '跨表主键id',
		columnSize: 1
	  },
        ],
        type: 'json',
        header: '课程成绩',
        // 样式设置
        gridStyle: 'border: 2px solid #3971A5;',
        gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;'
      })
    },
  }

};
</script>
<style lang="scss" scoped>
	//导出excel
	.export-excel-wrapper{
		display: inline-block;
	}
	
	.center-form-pv {
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	.el-input {
	  width: auto;
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 1px solid #999;
				border-radius: 4px;
				padding: 0 12px;
				box-shadow: 0 0 0px rgba(64, 158, 255, .5);
				outline: none;
				color: #333;
				background: linear-gradient(150deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%);
				width: 178px;
				font-size: 14px;
				height: 41px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 1px solid #999;
				border-radius: 4px;
				padding: 0 10px;
				box-shadow: 0 0 0px rgba(64, 158, 255, .5);
				outline: none;
				color: #333;
				background: linear-gradient(150deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%);
				width: 178px;
				font-size: 14px;
				height: 41px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 1px solid #999;
				border-radius: 4px;
				padding: 0 10px 0 30px;
				box-shadow: 0 0 0px rgba(64, 158, 255, .5);
				outline: none;
				color: #333;
				background: linear-gradient(150deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%);
				width: 178px;
				font-size: 14px;
				height: 41px;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: #999;
				font-weight: 500;
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 10px;
				color: #000;
				background: linear-gradient(60deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%);
				border-color: #999;
				border-width: 0 2px 1px 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 10px;
				word-wrap: normal;
				word-break: break-all;
				white-space: normal;
				font-weight: bold;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}

	
	.el-table /deep/ .el-table__body-wrapper tbody {
				border: 0;
				width: 100%;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr {
				border: 0;
				background: none;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 12px 0;
				color: #666;
				background: none;
				border-color: #999;
				border-width: 0 2px 1px 0;
				border-style: solid;
				text-align: left;
			}
	
		.el-table /deep/ .el-table__body-wrapper tbody tr.el-table__row--striped td {
		background: rgba(200,200,200,.1);
	}
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 12px 0;
				color: #666;
				background: rgba(88,131,205,.2);
				border-color: #999;
				border-width: 0 2px 1px 0;
				border-style: solid;
				text-align: left;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 12px 0;
				color: #666;
				background: none;
				border-color: #999;
				border-width: 0 2px 1px 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 10px;
				overflow: hidden;
				word-break: break-all;
				white-space: normal;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: #333;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: linear-gradient(150deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%);
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: linear-gradient(240deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%);
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #333;
				background: linear-gradient(150deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%);
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0;
				margin: 0 5px;
				color: #333;
				background: linear-gradient(150deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%);
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}

	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
			}

	.main-content .el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #333;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(179,187,203,1) 100%);
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #333;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(90,133,207,1) 100%);
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				padding: 0 4px;
				margin: 0 5px;
				color: #333;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(90,133,207,1) 100%);
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				width: 100px;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 0px solid #DCDFE6;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: #333;
				display: inline-block;
				font-size: 13px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: linear-gradient(150deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%);
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #333;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: #333;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				display: inline-block;
				width: 50px;
				font-size: 14px;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 0px solid #DCDFE6;
				cursor: pointer;
				padding: 0 3px;
				color: #333;
				display: inline-block;
				font-size: 14px;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: linear-gradient(240deg, rgba(187,194,208,1) 0%, rgba(247,249,251,1) 50%, rgba(179,187,203,1) 100%);
				width: 100%;
				text-align: center;
				height: 28px;
			}
</style>
