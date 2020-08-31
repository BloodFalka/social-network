import { AppStateType } from '../store'
import { FriendType } from '../../types/types'

export const selectFriends = (state: AppStateType): Array<FriendType> => state.friendsPage.friends
export const selectIsLoading = (state: AppStateType): boolean => state.friendsPage.isLoading
