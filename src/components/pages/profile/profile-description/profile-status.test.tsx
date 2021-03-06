import React from 'react'
import { create, act } from 'react-test-renderer'
import ProfileStatus from './profile-status'

describe('ProfileStatus', () => {
	test('status from props should be in the state', () => {
		const component = create(<ProfileStatus status="Kalen" isMyPage={true} updateUserStatus={() => {}} />)
		const root = component.root
		act(() => root.props.status)
		expect(root.props.status).toBe('Kalen')
	})
})
