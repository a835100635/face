"use strict";
const getParam = () => {
  let routes = getCurrentPages();
  console.log(routes);
  let curParam = routes[routes.length - 1].options;
  let obj = {};
  for (let key in curParam) {
    obj[key] = curParam[key];
  }
  return obj;
};
exports.getParam = getParam;
