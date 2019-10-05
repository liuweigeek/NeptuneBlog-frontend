export interface User {
    /**
     * Id
     */
    id?: string;

    /**
     * 邮箱地址
     */
    email?: string;

    /**
     * 用户名
     */
    username?: string;

    /**
     * 真实姓名
     */
    realName?: string;

    /**
     * 头像URL
     */
    avatar?: string;

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
    sex?: number;

    /**
     * 注册时间
     */
    registerDate?: Date;

    /**
     * 最近登录时间
     */
    loginDate?: Date;

    /**
     * 语言
     */
    langKey?: string;

    /**
     * 登录Token信息
     */
    token?: string;
}
