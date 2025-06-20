const base = {
    get() {
        return {
            url : "http://localhost:8080/springboot06bg9/",
            name: "springboot06bg9",
            // 退出到首页链接
            indexUrl: ''
        };
    },
    getProjectName(){
        return {
            projectName: "学生信息管理系统"
        } 
    }
}
export default base
