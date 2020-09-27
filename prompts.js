// module.exports=[
//     {
//         name:'application',
//         type:'list',
//         message:'请选择你要生成的项目类型',
//         choices:[
//             {name:'pc',value:'pc'},
//             {name:'mobile',value:'mobile'}
//         ],
//         defalut:'mobile-web'
//     }
// ]
module.exports = [
    {
      name: "wechartEnv",
      type: "confirm",
      message: `是否需要在微信环境中进行使用`
    },
    {
      name: "deployDir",
      type: "input",
      message: `请输入测试环境及生产环境的部署路经,如: xxx,或 xxx/xxx`
    }
  ];
  