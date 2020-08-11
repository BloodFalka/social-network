import React from 'react';
import Spinner from '../common/spinner/spinner';

const withSuspence = (Component) => {
	return (props) => {
		return (
			<React.Suspense fallback={<Spinner />}>
				<Component {...props} />
			</React.Suspense>
		);
	};
};

export default withSuspence;
