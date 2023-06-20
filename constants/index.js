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

// 分类类型
export const CATEGORY_TYPES = {
	// 前端
	FRONT_END: {
		label: '前端',
		value: 1,
	},
	// 后端
	BACK_END: {
		label: '后端',
		value: 2,
	},
	// 测试
	TEST: {
		label: '测试',
		value: 3,
	},
	// 数据库
	DATABASE: {
		label: '数据库',
		value: 4,
	},
	// 云计算
	CLOUD_COMPUTING: {
		label: '云计算',
		value: 5,
	},
	// 运维
	OPERATION_AND_MAINTENANCE: {
		label: '运维',
		value: 6,
	},
	// 大数据
	BIG_DATA: {
		label: '大数据',
		value: 7,
	},
	// 人工智能
	ARTIFICIAL_INTELLIGENCE: {
		label: '人工智能',
		value: 8,
	},
	// 区块链
	BLOCK_CHAIN: {
		label: '区块链',
		value: 9,
	},
	// 物联网
	INTERNET_OF_THINGS: {
		label: '物联网',
		value: 10,
	},
	// 游戏开发
	GAME_DEVELOPMENT: {
		label: '游戏开发',
		value: 11,
	},
	// 安全
	SECURITY: {
		label: '安全',
		value: 12,
	},
	// 资源
	RESOURCE: {
		label: '资源',
		value: 13,
    // 特殊分类
    special: true
	},
	// 资讯
	INFORMATION: {
		label: '资讯',
		value: 14,
    // 特殊分类
    special: true
	},
	// 其他
	OTHER: {
		label: '其他',
		value: -1,
	},
}