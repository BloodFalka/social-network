import { APIResponseType, ResultCodesEnum } from './../../api/api'
import { followAPI } from './../../api/followAPI'
import { setFollow, setUnfollow, actions } from './users-reducer'

jest.mock('../../api/followAPI')
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(()=>{
	dispatchMock.mockClear()
	getStateMock.mockClear()
	followAPIMock.follow.mockClear()
	followAPIMock.unfollow.mockClear()
})

const result: APIResponseType = {
	resultCode: ResultCodesEnum.Succes,
	messages: [],
	data: {},
}

followAPIMock.follow.mockReturnValue(Promise.resolve(result))
followAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test('success follow thunk', async () => {
	const thunk = setFollow(1)

	await thunk(dispatchMock, getStateMock, {})

	expect(dispatchMock).toBeCalledTimes(3)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1))
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test('success unfollow thunk', async () => {
	const thunk = setUnfollow(1)

	await thunk(dispatchMock, getStateMock, {})

	expect(dispatchMock).toBeCalledTimes(3)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(1))
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
