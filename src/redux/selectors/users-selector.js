export const getUsers = (state) => {
	return state.searchPage.users;
};

export const getPageSize = (state) => {
	return state.searchPage.pageSize;
};

export const getTotalUsersCount = (state) => {
	return state.searchPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
	return state.searchPage.currentPage;
};

export const getIsLoading = (state) => {
	return state.searchPage.isLoading;
};

export const getIsFollowingProgress = (state) => {
	return state.searchPage.isFollowingProgress;
};

export const getIsError = (state) => {
	return state.searchPage.isError;
};
