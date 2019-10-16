export interface Post {

    /**
     * ID
     */
    id: string;

    /**
     * 发送人ID
     */
    userId: string;

    /**
     * 发送内容
     */
    content: string;

    /**
     * 发送设备
     */
    device: string;

    /**
     * 发送时间
     */
    createDate: Date;

    /**
     * 更新时间
     */
    updateDate: Date;

    /**
     * 转发数
     */
    forwards: number;

    /**
     * 评论数
     */
    comments: number;

    /**
     * 点赞数
     */
    likes: number;

    /**
     * 发送人Id
     */
    authorId: string;

    /**
     * 用户名
     */
    authorUsername: string;


    /**
     * 昵称
     */
    authorNickname: string;

    /**
     * 性别
     */
    authorSex: number;

    /**
     * 头像
     */
    authorAvatar: string;

}
