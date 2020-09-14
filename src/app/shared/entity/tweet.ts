import { User } from './user';

export interface Tweet {

    /**
     * ID
     */
    id: number;

    /**
     * 发送人
     */
    author: User;

    /**
     * 发送内容
     */
    text: string;

    /**
     * 发送设备
     */
    source: string;

    /**
     * 发送时间
     */
    createAt: Date;

    /**
     * 对话ID，如果当前Tweet是一条回复，则指向另一条Tweet
     */
    conversationId: number;

    /**
     * 如果当前Tweet是一条回复，则该字段指向原Tweet的Author ID
     */
    inReplyToUserId: number;

    referencedTweet: Tweet;

    /**
     * 转发数
     */
    publicMetrics: PublicMetrics;

}

export interface PublicMetrics {

    retweetCount: number;

    quoteCount: number;

    replyCount: number;

    likeCount: number;
}
