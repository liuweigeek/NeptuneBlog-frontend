export interface UserRelationship {

    id?: number;

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
     * 关注时间
     */
    followDate?: Date;

    /**
     * 关注来源
     */
    followFrom?: string;

    /**
     * 关注状态
     */
    connections?: string[];
}
