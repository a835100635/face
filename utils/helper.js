// 将URL参数分割为对象键值对
export const getParam = () => {
  let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  console.log(routes)
  let curParam = routes[routes.length - 1].options; //获取路由参数
  // 把参数保存为对像
  let obj = {}
  for (let key in curParam) {
    obj[key] = curParam[key]
  }
  return obj
}