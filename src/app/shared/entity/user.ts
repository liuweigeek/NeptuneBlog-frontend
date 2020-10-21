export interface User {
    /**
     * Id
     */
    id?: number;

    /**
     * 邮箱地址
     */
    email: string;

    /**
     * 用户名
     */
    username: string;

    /**
     * 昵称
     */
    name: string;

    /**
     * 小尺寸头像
     */
    smallAvatar?: string;

    /**
     * 正常尺寸头像
     */
    mediumAvatar?: string;

    /**
     * 大尺寸头像
     */
    largeAvatar?: string;

    /**
     * 密码
     */
    password?: string;

    /**
     * 出生日期
     */
    birthday?: Date;

    /**
     * 性别
     */
    gender?: string;

    /**
     * 注册时间
     */
    createAt?: Date;

    /**
     * 语言
     */
    lang?: string;

    /**
     * 登录Token信息
     */
    token?: string;

    /**
     * 正在关注用户数量
     */
    followingCount?: number;

    /**
     * 关注者数量
     */
    followersCount?: number;

    /**
     * 关注状态
     */
    connections?: string[];
}
