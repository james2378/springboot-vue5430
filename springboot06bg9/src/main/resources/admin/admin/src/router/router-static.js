import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
import adminexam from '@/views/modules/exampaperlist/exam'
    import examfailrecord from '@/views/modules/examfailrecord/list'
    import xuesheng from '@/views/modules/xuesheng/list'
    import examquestion from '@/views/modules/examquestion/list'
    import kechengchengji from '@/views/modules/kechengchengji/list'
    import jiaoshi from '@/views/modules/jiaoshi/list'
    import exampaper from '@/views/modules/exampaper/list'
    import kechengxinxi from '@/views/modules/kechengxinxi/list'
    import zonghesuzhi from '@/views/modules/zonghesuzhi/list'
    import gonggaotongzhi from '@/views/modules/gonggaotongzhi/list'
    import kechengleixing from '@/views/modules/kechengleixing/list'
    import exampaperlist from '@/views/modules/exampaperlist/list'
    import xueshengkaoqin from '@/views/modules/xueshengkaoqin/list'
    import examrecord from '@/views/modules/examrecord/list'
    import xuankexinxi from '@/views/modules/xuankexinxi/list'
    import biyexinxi from '@/views/modules/biyexinxi/list'


//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '系统首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '系统首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/examfailrecord',
        name: '错题本',
        component: examfailrecord
      }
      ,{
	path: '/xuesheng',
        name: '学生',
        component: xuesheng
      }
      ,{
	path: '/examquestion',
        name: '试题管理',
        component: examquestion
      }
      ,{
	path: '/kechengchengji',
        name: '课程成绩',
        component: kechengchengji
      }
      ,{
	path: '/jiaoshi',
        name: '教师',
        component: jiaoshi
      }
      ,{
	path: '/exampaper',
        name: '试卷管理',
        component: exampaper
      }
      ,{
	path: '/kechengxinxi',
        name: '课程信息',
        component: kechengxinxi
      }
      ,{
	path: '/zonghesuzhi',
        name: '综合素质',
        component: zonghesuzhi
      }
      ,{
	path: '/gonggaotongzhi',
        name: '公告通知',
        component: gonggaotongzhi
      }
      ,{
	path: '/kechengleixing',
        name: '课程类型',
        component: kechengleixing
      }
      ,{
	path: '/exampaperlist',
        name: '试卷列表',
        component: exampaperlist
      }
      ,{
	path: '/xueshengkaoqin',
        name: '学生考勤',
        component: xueshengkaoqin
      }
      ,{
	path: '/examrecord',
        name: '考试记录',
        component: examrecord
      }
      ,{
	path: '/xuankexinxi',
        name: '选课信息',
        component: xuankexinxi
      }
      ,{
	path: '/biyexinxi',
        name: '毕业信息',
        component: biyexinxi
      }
    ]
  },
  {
    path: '/adminexam',
    name: 'adminexam',
    component: adminexam,
    meta: {icon:'', title:'adminexam'}
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '系统首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
