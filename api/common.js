import store from '../store/index.js';

const api = 'http://localhost:8621';
// 上传文件
export const uploadFile = (tempFilePaths) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${api}/api/upload`,
      filePath: tempFilePaths,
      name: 'file',
      header: {
        'X-ProductName': 'Face',
        'X-Face-Token': store.getters.accessToken,
        'Content-Type': 'application/octet-stream'
      },
      success: (res) => {
        const { data } = res;
        resolve(JSON.parse(data));
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}