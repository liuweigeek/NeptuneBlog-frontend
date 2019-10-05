import { User } from './user';

export interface Post {

    id: string;

    author: User;

    userId: string;

    content: string;

    device: string;

    createDate: Date;

    updateDate: Date;

    reposts: number;

    comments: number;

    likes: number;
}
