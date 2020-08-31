import React from 'react'

type PropsType = {
	children: React.ReactNode,
}

const Wrapper = React.forwardRef<HTMLDivElement, PropsType>(({ ...props }, ref) => {
	return <div ref={ref} {...props} />
})

export default Wrapper
