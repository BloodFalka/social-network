import React from 'react'
import { create, act } from 'react-test-renderer'
import ProfileStatus from './profile-status.tsx'

describe('ProfileStatus', () => {
	test('status from props should be in the state', () => {
		const component = create(<ProfileStatus status="Kalen" />)
		const root = component.root
		act(() => root.props)
		expect(root.props.status).toBe('Kalen')
	})
})
