import React from 'react'
import Spinner from '../common/spinner/spinner'

function withSuspence<WCP>(WrappedComponent: React.ComponentType<WCP>) {
	return (props: WCP) => {
		return (
			<React.Suspense fallback={<Spinner />}>
				<WrappedComponent {...props} />
			</React.Suspense>
		)
	}
}

export default withSuspence
