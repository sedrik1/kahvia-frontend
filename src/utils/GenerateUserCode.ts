const fisherYatesShuffle = (code: string[]) => {
	code.forEach((_, index) => {
		const shuffler = Math.floor(Math.random() * index)
		const temp = code[index]
		code[index] = code[shuffler]
		code[shuffler] = temp
	})
	return code.join('')
}

const GenerateUserCode = () => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
	characters[18] = Math.floor(Math.random() * 1000000).toString()
	return `${fisherYatesShuffle(characters)}`
}

export default GenerateUserCode
