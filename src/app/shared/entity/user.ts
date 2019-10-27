export interface User {
  /**
   * Id
   */
  id: string;

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
  nickname: string;

  /**
   * 小尺寸头像
   */
  smallAvatar: string;

  /**
   * 正常尺寸头像
   */
  normalAvatar: string;

  /**
   * 大尺寸头像
   */
  largeAvatar: string;

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
  sex: number;

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

  /**
   * 关注状态
   */
  relation: number;

  /**
   * 正在关注用户数量
   */
  followingCount: number;

  /**
   * 关注者数量
   */
  followerCount: number;

}

/**
 * 关系类型
 */
export enum Relation {

  /**
   * 未关注
   */
  UN_FOLLOW = 0,

  /**
   * 正在关注
   */
  FOLLOWING = 1
}
