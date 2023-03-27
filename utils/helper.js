// 将URL参数分割为对象键值对
export const getParam = () => {
  let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  let curParam = routes[routes.length - 1].options; //获取路由参数
	console.log('curParam', curParam);
  // 把参数保存为对像
  let obj = {}
  for (let key in curParam) {
    obj[key] = curParam[key]
  }
  return obj
}

export const parseUrl = () => {
	const routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	console.log(routes)
	const url = routes[routes.length - 1].$page; //获取路由参数
	console.log(url)
	const [path, queryStr] = url.fullPath.split('?'); 
	const query = {};
	const strArr = queryStr.split('&');
	strArr.forEach(i => {
			const p = i.split('=');
			query[p[0]] = p[1];
	})
	return query;
}