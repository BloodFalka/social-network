import { AppStateType } from '../store'

export const selectPosts = (state: AppStateType) => state.postsPage.posts
