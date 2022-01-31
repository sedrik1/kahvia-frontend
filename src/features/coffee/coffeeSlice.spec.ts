import coffeeReducer from './coffeeSlice'

describe('coffee reducer', () => {
	it('should be the initial state', () => {
		expect(coffeeReducer(undefined, { type: 'unknown' })).toEqual({
			coffees: null,
			state: 'idle'
		})
	})
})
