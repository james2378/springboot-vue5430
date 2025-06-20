<template>
	<div class="addEdit-block" style="width: 100%;">
		<el-form
			:style='{"padding":"30px","boxShadow":"0 0px 0px #999","borderRadius":"6px","flexWrap":"wrap","background":"none","display":"flex"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="80px"
		>
			<template >
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="就业企业" prop="jiuyeqiye">
					<el-input v-model="ruleForm.jiuyeqiye" placeholder="就业企业" clearable  :readonly="ro.jiuyeqiye"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' v-else class="input" label="就业企业" prop="jiuyeqiye">
					<el-input v-model="ruleForm.jiuyeqiye" placeholder="就业企业" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="就业地点" prop="jiuyedidian">
					<el-input v-model="ruleForm.jiuyedidian" placeholder="就业地点" clearable  :readonly="ro.jiuyedidian"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' v-else class="input" label="就业地点" prop="jiuyedidian">
					<el-input v-model="ruleForm.jiuyedidian" placeholder="就业地点" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="select" v-if="type!='info'" label="工号" prop="gonghao">
					<el-select :disabled="ro.gonghao" @change="gonghaoChange" v-model="ruleForm.gonghao" placeholder="请选择工号">
						<el-option
							v-for="(item,index) in gonghaoOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="input" v-else-if="ruleForm.gonghao" label="工号" prop="gonghao">
					<el-input v-model="ruleForm.gonghao" placeholder="工号" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="教师姓名" prop="jiaoshixingming">
					<el-input v-model="ruleForm.jiaoshixingming" placeholder="教师姓名" clearable  :readonly="ro.jiaoshixingming"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' v-else class="input" label="教师姓名" prop="jiaoshixingming">
					<el-input v-model="ruleForm.jiaoshixingming" placeholder="教师姓名" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="就业时间" prop="jiuyeshijian">
					<el-input v-model="ruleForm.jiuyeshijian" placeholder="就业时间" clearable  :readonly="ro.jiuyeshijian"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' v-else class="input" label="就业时间" prop="jiuyeshijian">
					<el-input v-model="ruleForm.jiuyeshijian" placeholder="就业时间" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="就业方向" prop="jiuyefangxiang">
					<el-input v-model="ruleForm.jiuyefangxiang" placeholder="就业方向" clearable  :readonly="ro.jiuyefangxiang"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' v-else class="input" label="就业方向" prop="jiuyefangxiang">
					<el-input v-model="ruleForm.jiuyefangxiang" placeholder="就业方向" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="离校时间" prop="lixiaoshijian">
					<el-input v-model="ruleForm.lixiaoshijian" placeholder="离校时间" clearable  :readonly="ro.lixiaoshijian"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' v-else class="input" label="离校时间" prop="lixiaoshijian">
					<el-input v-model="ruleForm.lixiaoshijian" placeholder="离校时间" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="学号" prop="xuehao">
					<el-input v-model="ruleForm.xuehao" placeholder="学号" clearable  :readonly="ro.xuehao"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' v-else class="input" label="学号" prop="xuehao">
					<el-input v-model="ruleForm.xuehao" placeholder="学号" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="姓名" prop="xingming">
					<el-input v-model="ruleForm.xingming" placeholder="姓名" clearable  :readonly="ro.xingming"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' v-else class="input" label="姓名" prop="xingming">
					<el-input v-model="ruleForm.xingming" placeholder="姓名" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="手机" prop="shouji">
					<el-input v-model="ruleForm.shouji" placeholder="手机" clearable  :readonly="ro.shouji"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' v-else class="input" label="手机" prop="shouji">
					<el-input v-model="ruleForm.shouji" placeholder="手机" readonly></el-input>
				</el-form-item>
			</template>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' class="textarea" v-if="type!='info'" label="信息备注" prop="xinxibeizhu">
					<el-input
					  style="min-width: 200px; max-width: 600px;"
					  type="textarea"
					  :rows="8"
					  placeholder="信息备注"
					  v-model="ruleForm.xinxibeizhu" >
					</el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 20px 0"}' v-else-if="ruleForm.xinxibeizhu" label="信息备注" prop="xinxibeizhu">
					<span :style='{"fontSize":"14px","lineHeight":"40px","color":"#333","fontWeight":"500","display":"inline-block"}'>{{ruleForm.xinxibeizhu}}</span>
				</el-form-item>
			<el-form-item :style='{"padding":"0","margin":"0"}' class="btn">
				<el-button :style='{"border":"1px solid #40ecde","cursor":"pointer","padding":"0 20px","boxShadow":"0 2px 6px rgba(100, 100,100, .2)","margin":"0 20px 0 0","color":"#333","minWidth":"90px","outline":"none","borderRadius":"20%","background":"radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(208,255,251,1) 100%)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}'  v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
				<el-button :style='{"border":"1px solid #999","cursor":"pointer","padding":"0 30px","boxShadow":"0 2px 6px rgba(100, 100,100, .2)","margin":"0","color":"#333","outline":"none","borderRadius":"20%","background":"radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(218,226,240,1) 100%)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
				<el-button :style='{"border":"1px solid #999","cursor":"pointer","padding":"0 30px","boxShadow":"0 2px 6px rgba(100, 100,100, .2)","margin":"0","color":"#333","outline":"none","borderRadius":"20%","background":"radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(218,226,240,1) 100%)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isURL(value)) {
				callback(new Error("请输入正确的URL地址"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("请输入正确的手机号码"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("请输入正确的邮箱地址"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
			type: '',
			
			
			ro:{
				jiuyeqiye : false,
				jiuyedidian : false,
				gonghao : false,
				jiaoshixingming : false,
				jiuyeshijian : false,
				jiuyefangxiang : false,
				lixiaoshijian : false,
				xinxibeizhu : false,
				xuehao : false,
				xingming : false,
				shouji : false,
			},
			
			
			ruleForm: {
				jiuyeqiye: '',
				jiuyedidian: '',
				gonghao: '',
				jiaoshixingming: '',
				jiuyeshijian: '',
				jiuyefangxiang: '',
				lixiaoshijian: '',
				xinxibeizhu: '',
				xuehao: '',
				xingming: '',
				shouji: '',
			},
		
			gonghaoOptions: [],
			
			rules: {
				jiuyeqiye: [
				],
				jiuyedidian: [
				],
				gonghao: [
					{ required: true, message: '工号不能为空', trigger: 'blur' },
				],
				jiaoshixingming: [
				],
				jiuyeshijian: [
				],
				jiuyefangxiang: [
				],
				lixiaoshijian: [
				],
				xinxibeizhu: [
				],
				xuehao: [
				],
				xingming: [
				],
				shouji: [
					{ validator: validateMobile, trigger: 'blur' },
				],
			}
		};
	},
	props: ["parent"],
	computed: {



	},
	created() {
	},
	methods: {
		
		// 下载
		download(file){
			window.open(`${file}`)
		},
		// 初始化
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
				for (var o in obj){
						if(o=='jiuyeqiye'){
							this.ruleForm.jiuyeqiye = obj[o];
							this.ro.jiuyeqiye = true;
							continue;
						}
						if(o=='jiuyedidian'){
							this.ruleForm.jiuyedidian = obj[o];
							this.ro.jiuyedidian = true;
							continue;
						}
						if(o=='gonghao'){
							this.ruleForm.gonghao = obj[o];
							this.ro.gonghao = true;
							continue;
						}
						if(o=='jiaoshixingming'){
							this.ruleForm.jiaoshixingming = obj[o];
							this.ro.jiaoshixingming = true;
							continue;
						}
						if(o=='jiuyeshijian'){
							this.ruleForm.jiuyeshijian = obj[o];
							this.ro.jiuyeshijian = true;
							continue;
						}
						if(o=='jiuyefangxiang'){
							this.ruleForm.jiuyefangxiang = obj[o];
							this.ro.jiuyefangxiang = true;
							continue;
						}
						if(o=='lixiaoshijian'){
							this.ruleForm.lixiaoshijian = obj[o];
							this.ro.lixiaoshijian = true;
							continue;
						}
						if(o=='xinxibeizhu'){
							this.ruleForm.xinxibeizhu = obj[o];
							this.ro.xinxibeizhu = true;
							continue;
						}
						if(o=='xuehao'){
							this.ruleForm.xuehao = obj[o];
							this.ro.xuehao = true;
							continue;
						}
						if(o=='xingming'){
							this.ruleForm.xingming = obj[o];
							this.ro.xingming = true;
							continue;
						}
						if(o=='shouji'){
							this.ruleForm.shouji = obj[o];
							this.ro.shouji = true;
							continue;
						}
				}
				











			}
			
			
			// 获取用户信息
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					
					var json = data.data;
					if(this.$storage.get("role")!="管理员") {
						this.ro.jiaoshixingming = true;
					}
					if(((json.xuehao!=''&&json.xuehao) || json.xuehao==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.xuehao = json.xuehao
						this.ro.xuehao = true;
					}
					if(((json.xingming!=''&&json.xingming) || json.xingming==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.xingming = json.xingming
						this.ro.xingming = true;
					}
					if(((json.shouji!=''&&json.shouji) || json.shouji==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.shouji = json.shouji
						this.ro.shouji = true;
					}
				} else {
					this.$message.error(data.msg);
				}
			});
			
            this.$http({
				url: `option/jiaoshi/gonghao`,
				method: "get"
            }).then(({ data }) => {
				if (data && data.code === 0) {
					this.gonghaoOptions = data.data;
				} else {
					this.$message.error(data.msg);
				}
            });
			
		},
			// 下二随
			gonghaoChange () {
				this.$http({
					url: `follow/jiaoshi/gonghao?columnValue=`+ this.ruleForm.gonghao,
					method: "get"
				}).then(({ data }) => {
					if (data && data.code === 0) {
						if(data.data.jiaoshixingming){
							this.ruleForm.jiaoshixingming = data.data.jiaoshixingming
						}
					} else {
						this.$message.error(data.msg);
					}
				});
			},
    // 多级联动参数

    info(id) {
      this.$http({
        url: `biyexinxi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {























var objcross = this.$storage.getObj('crossObj');

      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
		 if(crossrefid && crossuserid) {
			 this.ruleForm.crossuserid = crossuserid;
			 this.ruleForm.crossrefid = crossrefid;
			let params = { 
				page: 1, 
				limit: 10, 
				crossuserid:this.ruleForm.crossuserid,
				crossrefid:this.ruleForm.crossrefid,
			} 
			this.$http({ 
				url: "biyexinxi/page", 
				method: "get", 
				params: params 
			}).then(({ 
				data 
			}) => { 
				if (data && data.code === 0) { 
				       if(data.data.total>=crossoptnum) {
					     this.$message.error(this.$storage.get('tips'));
					       return false;
				       } else {
					 this.$http({
					   url: `biyexinxi/${!this.ruleForm.id ? "save" : "update"}`,
					   method: "post",
					   data: this.ruleForm
					 }).then(({ data }) => {
					   if (data && data.code === 0) {
					     this.$message({
					       message: "操作成功",
					       type: "success",
					       duration: 1500,
					       onClose: () => {
						 this.parent.showFlag = true;
						 this.parent.addOrUpdateFlag = false;
						 this.parent.biyexinxiCrossAddOrUpdateFlag = false;
						 this.parent.search();
						 this.parent.contentStyleChange();
					       }
					     });
					   } else {
					     this.$message.error(data.msg);
					   }
					 });

				       }
				} else { 
				} 
			});
		 } else {
			 this.$http({
			   url: `biyexinxi/${!this.ruleForm.id ? "save" : "update"}`,
			   method: "post",
			   data: this.ruleForm
			 }).then(({ data }) => {
			   if (data && data.code === 0) {
			     this.$message({
			       message: "操作成功",
			       type: "success",
			       duration: 1500,
			       onClose: () => {
				 this.parent.showFlag = true;
				 this.parent.addOrUpdateFlag = false;
				 this.parent.biyexinxiCrossAddOrUpdateFlag = false;
				 this.parent.search();
				 this.parent.contentStyleChange();
			       }
			     });
			   } else {
			     this.$message.error(data.msg);
			   }
			 });
		 }
         }
       });
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.biyexinxiCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  text-shadow: 0 1px 10px #fff;
	  	  color: #666;
	  	  width: 80px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 80px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border: 1px solid #aaa;
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  box-shadow: 0 0 0px #4b681d;
	  	  outline: none;
	  	  color: #666;
	  	  background: linear-gradient(150deg, rgba(216,223,236,1) 0%, rgba(247,249,251,1) 50%, rgba(210,217,230,1) 100%);
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 1px solid #aaa;
	  	  border-radius: 4px;
	  	  padding: 0 10px;
	  	  box-shadow: 0 0 0px #4b681d;
	  	  outline: none;
	  	  color: #666;
	  	  background: linear-gradient(200deg, rgba(216,223,236,1) 0%, rgba(247,249,251,1) 50%, rgba(210,217,230,1) 100%);
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 1px solid #aaa;
	  	  border-radius: 4px;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 0 0 0px #4b681d;
	  	  outline: none;
	  	  color: #666;
	  	  background: linear-gradient(150deg, rgba(216,223,236,1) 0%, rgba(247,249,251,1) 50%, rgba(210,217,230,1) 100%);
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  	  border: 1px solid #aaa;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #aaa;
	  	  background: linear-gradient(200deg, rgba(216,223,236,1) 0%, rgba(247,249,251,1) 50%, rgba(210,217,230,1) 100%);
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 1px solid #aaa;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #aaa;
	  	  background: linear-gradient(200deg, rgba(216,223,236,1) 0%, rgba(247,249,251,1) 50%, rgba(210,217,230,1) 100%);
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 1px solid #aaa;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #aaa;
	  	  background: linear-gradient(200deg, rgba(216,223,236,1) 0%, rgba(247,249,251,1) 50%, rgba(210,217,230,1) 100%);
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 1px solid #aaa;
	  	  border-radius: 4px;
	  	  padding: 12px;
	  	  box-shadow: 0 0 0px #4b681d;
	  	  outline: none;
	  	  color: #666;
	  	  background: linear-gradient(150deg, rgba(216,223,236,1) 0%, rgba(247,249,251,1) 50%, rgba(210,217,230,1) 100%);
	  	  width: 400px;
	  	  font-size: 14px;
	  	  min-height: 120px;
	  	  height: auto;
	  	}
</style>
