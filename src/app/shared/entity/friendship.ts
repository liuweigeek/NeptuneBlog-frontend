import { User } from './user';

export interface Friendship {

    /**
     * 关注人ID
     */
    sourceId?: number;

    /**
     * 被关注人ID
     */
    targetId?: number;

    /**
     * 关注人
     */
    sourceUser?: User;

    /**
     * 被关注人
     */
    targetUser?: User;

    /**
     * 关注时间
     */
    followDate?: Date;

    /**
     * 关注来源
     */
    followFrom?: string;

}
