// 本地缓存token名称
export const TOKEN_NAME = 'face_access_token';
// 是否登录
export const HAS_LOGIN_NAME = 'face_has_login';
// 用户信息
export const USER_INFO_NAME = 'face_user_info';

// baseUrl
// export const BASEURL = '/face';
export const BASEURL = '';

// http 状态
export const HTTP_STATUS = {
	// 成功
	SUCCESS: 200,
	// 失败
	ERROR: -1000
};

// 题目类型
export const TOPIC_TYPE = {
	// 选择
	SELECT: 1,
	// 判断
	JUDGE: 3,
	// 填空
	VACANT: 2,
	// 开放
	OPEN: 4
};

// 学习类型
export const LEARNING_TYPE = {
	// 查看
	VIEW: 0,
	// 考试
	TEST: 1
}

// 查看类型
export const CHECK_TYPE = {
	// 查看
	READ: 0,
	// 考试
	TEST: 1,
	// 完整
	ALL: 2
}

// 点赞状态
export const LIKE_STATUS = {
	LIKE: 'LIKE',
	DISLIKE: 'DISLIKE'
}

// 点赞类型
export const LIKE_TYPE = {
	// 题目
	TOPIC: 'topic',
	// 评论
	COMMENT: 'comment'
}

// 七牛云访问地址
export const QINIU_URL = 'http://ru5yq3b1p.hn-bkt.clouddn.com/';