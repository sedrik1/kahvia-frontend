import { useEffect, useState } from 'react'

interface WindowSize {
	width: number
	height: number
}

const windowSizeDefault: WindowSize = {
	width: 0,
	height: 0
}

const WindowSize = () => {
	const [size, setSize] = useState<WindowSize>(windowSizeDefault)
	useEffect(() => {
		const updateSize = () =>
			setSize({ width: window.innerWidth, height: window.innerHeight })
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [])
	return size
}

export default WindowSize
