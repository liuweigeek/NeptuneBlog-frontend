/**
 * 关系类型
 */
export enum UserConnection {

    /**
     * following
     */
    FOLLOWING = 'following',
    /**
     * following requested
     */
    FOLLOWING_REQUESTED = 'followingRequested',
    /**
     * followed by
     */
    FOLLOWED_BY = 'followedBy',
    /**
     * none
     */
    NONE = 'none',
    /**
     * blocking
     */
    BLOCKING = 'blocking',
    /**
     * muting
     */
    MUTING = 'muting'


}
