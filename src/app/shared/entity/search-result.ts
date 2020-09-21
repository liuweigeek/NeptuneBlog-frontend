import { User } from './user';
import { Tweet } from './tweet';

export interface SearchResult {

    users: User[];

    tweets: Tweet[];
}
