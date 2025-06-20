<template>
<div class="content">
	<div class="text" :style='{"margin":"100px auto","fontSize":"32px","color":"rgb(51, 51, 51)","textAlign":"center","background":"url() no-repeat center top","fontWeight":"bold"}'>欢迎使用 {{this.$project.projectName}}</div>
    <div class="cardView">
        <div class="cards" :style='{"margin":"0 0 20px 0","alignItems":"center","justifyContent":"center","display":"flex"}'>
			<div :style='{"border":"1px solid #ccc","margin":"0 10px","borderRadius":"4px","background":"rgba(255,255,255,.6)","display":"flex"}' v-if="isAuth('kechengxinxi','首页总数')">
				<div :style='{"borderColor":"#ddd","borderRadius":"4px 0px 0px 4px","background":"rgba(245,245,245,.6)","borderWidth":"0 1px 0 0","width":"80px","borderStyle":"solid","height":"80px"}'></div>
				<div :style='{"alignItems":"center","borderRadius":"0px 4px 4px 0px","flexDirection":"column","background":"none","display":"flex","width":"160px","justifyContent":"center"}'>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"20px","color":"#666","fontWeight":"bold","height":"24px"}'>{{kechengxinxiCount}}</div>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"14px","color":"#666","height":"24px"}'>课程信息总数</div>
				</div>
			</div>
			<div :style='{"border":"1px solid #ccc","margin":"0 10px","borderRadius":"4px","background":"rgba(255,255,255,.6)","display":"flex"}' v-if="isAuth('xuankexinxi','首页总数')">
				<div :style='{"borderColor":"#ddd","borderRadius":"4px 0px 0px 4px","background":"rgba(245,245,245,.6)","borderWidth":"0 1px 0 0","width":"80px","borderStyle":"solid","height":"80px"}'></div>
				<div :style='{"alignItems":"center","borderRadius":"0px 4px 4px 0px","flexDirection":"column","background":"none","display":"flex","width":"160px","justifyContent":"center"}'>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"20px","color":"#666","fontWeight":"bold","height":"24px"}'>{{xuankexinxiCount}}</div>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"14px","color":"#666","height":"24px"}'>选课信息总数</div>
				</div>
			</div>
			<div :style='{"border":"1px solid #ccc","margin":"0 10px","borderRadius":"4px","background":"rgba(255,255,255,.6)","display":"flex"}' v-if="isAuth('kechengchengji','首页总数')">
				<div :style='{"borderColor":"#ddd","borderRadius":"4px 0px 0px 4px","background":"rgba(245,245,245,.6)","borderWidth":"0 1px 0 0","width":"80px","borderStyle":"solid","height":"80px"}'></div>
				<div :style='{"alignItems":"center","borderRadius":"0px 4px 4px 0px","flexDirection":"column","background":"none","display":"flex","width":"160px","justifyContent":"center"}'>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"20px","color":"#666","fontWeight":"bold","height":"24px"}'>{{kechengchengjiCount}}</div>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"14px","color":"#666","height":"24px"}'>课程成绩总数</div>
				</div>
			</div>
			<div :style='{"border":"1px solid #ccc","margin":"0 10px","borderRadius":"4px","background":"rgba(255,255,255,.6)","display":"flex"}' v-if="isAuth('xueshengkaoqin','首页总数')">
				<div :style='{"borderColor":"#ddd","borderRadius":"4px 0px 0px 4px","background":"rgba(245,245,245,.6)","borderWidth":"0 1px 0 0","width":"80px","borderStyle":"solid","height":"80px"}'></div>
				<div :style='{"alignItems":"center","borderRadius":"0px 4px 4px 0px","flexDirection":"column","background":"none","display":"flex","width":"160px","justifyContent":"center"}'>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"20px","color":"#666","fontWeight":"bold","height":"24px"}'>{{xueshengkaoqinCount}}</div>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"14px","color":"#666","height":"24px"}'>学生考勤总数</div>
				</div>
			</div>
        </div>
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
            <el-card style="width: 20%;margin: 0 10px;" v-if="isAuth('kechengxinxi','首页统计')">
                <div id="kechengxinxiChart1" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 20%;margin: 0 10px;" v-if="isAuth('xuankexinxi','首页统计')">
                <div id="xuankexinxiChart1" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 20%;margin: 0 10px;" v-if="isAuth('kechengchengji','首页统计')">
                <div id="kechengchengjiChart1" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 20%;margin: 0 10px;" v-if="isAuth('kechengchengji','首页统计')">
                <div id="kechengchengjiChart2" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 20%;margin: 0 10px;" v-if="isAuth('xueshengkaoqin','首页统计')">
                <div id="xueshengkaoqinChart1" style="width:100%;height:400px;"></div>
            </el-card>
        </div>
    </div>
</div>
</template>
<script>
//5
import router from '@/router/router-static'
import * as echarts from 'echarts'
export default {
	data() {
		return {
            kechengxinxiCount: 0,
            xuankexinxiCount: 0,
            kechengchengjiCount: 0,
            xueshengkaoqinCount: 0,
		};
	},
  mounted(){
    this.init();
    this.getkechengxinxiCount();
    this.kechengxinxiChat1();
    this.getxuankexinxiCount();
    this.xuankexinxiChat1();
    this.getkechengchengjiCount();
    this.kechengchengjiChat1();
    this.kechengchengjiChat2();
    this.getxueshengkaoqinCount();
    this.xueshengkaoqinChat1();
  },
  methods:{
    init(){
        if(this.$storage.get('Token')){
        this.$http({
            url: `${this.$storage.get('sessionTable')}/session`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code != 0) {
            router.push({ name: 'login' })
            }
        });
        }else{
            router.push({ name: 'login' })
        }
    },
    getkechengxinxiCount() {
        this.$http({
            url: `kechengxinxi/count`,
            method: "get"
        }).then(({
            data
        }) => {
            if (data && data.code == 0) {
                this.kechengxinxiCount = data.data
            }
        })
    },

    kechengxinxiChat1() {
      this.$nextTick(()=>{

        var kechengxinxiChart1 = echarts.init(document.getElementById("kechengxinxiChart1"),'vintage');
        this.$http({
            url: "kechengxinxi/group/kechengleixing",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].kechengleixing);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].kechengleixing
                    })
                }
                var option = {};
                option = {
                        title: {
                            text: '课程类型统计',
                            left: 'center'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: ['25%', '55%'],
                                roseType: 'area',
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
                kechengxinxiChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    kechengxinxiChart1.resize();
                };
            }
        });
      })
    },






    getxuankexinxiCount() {
        this.$http({
            url: `xuankexinxi/count`,
            method: "get"
        }).then(({
            data
        }) => {
            if (data && data.code == 0) {
                this.xuankexinxiCount = data.data
            }
        })
    },

    xuankexinxiChat1() {
      this.$nextTick(()=>{

        var xuankexinxiChart1 = echarts.init(document.getElementById("xuankexinxiChart1"),'roma');
        this.$http({
            url: "xuankexinxi/group/kechengmingcheng",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].kechengmingcheng);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].kechengmingcheng
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '选课人数统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'line',
                        areaStyle: {}
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                xuankexinxiChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    xuankexinxiChart1.resize();
                };
            }
        });
      })
    },






    getkechengchengjiCount() {
        this.$http({
            url: `kechengchengji/count`,
            method: "get"
        }).then(({
            data
        }) => {
            if (data && data.code == 0) {
                this.kechengchengjiCount = data.data
            }
        })
    },

    kechengchengjiChat1() {
      this.$nextTick(()=>{

        var kechengchengjiChart1 = echarts.init(document.getElementById("kechengchengjiChart1"),'vintage');
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
                kechengchengjiChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    kechengchengjiChart1.resize();
                };
            }
        });
      })
    },

    kechengchengjiChat2() {
      this.$nextTick(()=>{

        var kechengchengjiChart2 = echarts.init(document.getElementById("kechengchengjiChart2"),'vintage');
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
                kechengchengjiChart2.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    kechengchengjiChart2.resize();
                };
            }
        });
      })
    },





    getxueshengkaoqinCount() {
        this.$http({
            url: `xueshengkaoqin/count`,
            method: "get"
        }).then(({
            data
        }) => {
            if (data && data.code == 0) {
                this.xueshengkaoqinCount = data.data
            }
        })
    },

    xueshengkaoqinChat1() {
      this.$nextTick(()=>{

        var xueshengkaoqinChart1 = echarts.init(document.getElementById("xueshengkaoqinChart1"),'roma');
        this.$http({
            url: "xueshengkaoqin/typeStat/kaoqinzhuangkuang/xingming",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis1 = [];
                let yAxis2 = [];
                let yAxis3 = [];
                let yAxis4 = [];
                let yAxis5 = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].xingming);
                    yAxis1.push(parseFloat((res[i].正常)));
                    yAxis2.push(parseFloat((res[i].迟到)));
                    yAxis3.push(parseFloat((res[i].早退)));
                    yAxis4.push(parseFloat((res[i].旷课)));
                    yAxis5.push(parseFloat((res[i].请假)));
                    pArray.push({
                        name: res[i].kaoqinzhuangkuang
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '考勤统计',
                        left: 'center'
                    },
                    legend: {
                      data: [
                        '正常',
                        '迟到',
                        '早退',
                        '旷课',
                        '请假',
                        ],
                      left: 'center',
                      bottom: 10,     
                    },
                    tooltip: {
                      trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                    {
                        name: '正常',
                        data: yAxis1,
                        type: 'bar'
                    },
                    {
                        name: '迟到',
                        data: yAxis2,
                        type: 'bar'
                    },
                    {
                        name: '早退',
                        data: yAxis3,
                        type: 'bar'
                    },
                    {
                        name: '旷课',
                        data: yAxis4,
                        type: 'bar'
                    },
                    {
                        name: '请假',
                        data: yAxis5,
                        type: 'bar'
                    },
                    ],
                };
                // 使用刚指定的配置项和数据显示图表。
                xueshengkaoqinChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    xueshengkaoqinChart1.resize();
                };
            }
        });
      })
    },






  }
};
</script>
<style lang="scss" scoped>
    .cardView {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .cards {
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 10px;
            justify-content: center;
            .card {
                width: calc(25% - 20px);
                margin: 0 10px;
                /deep/.el-card__body{
                    padding: 0;
                }
            }
        }
    }
</style>
