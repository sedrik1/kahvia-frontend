import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { SliceState } from 'utils/sliceStates'

type RoastDegree = string[]

type Coffee = {
	id: number | undefined
	name: string | undefined
	weight: number | undefined
	price: number | undefined
	roastDegree: RoastDegree
}

interface CoffeeState {
	coffees: Coffee[] | null
	state: SliceState
}

const initialState: CoffeeState = {
	coffees: null,
	state: 'idle'
}

type NewCoffeeResponse = Coffee[] | undefined

type NewCoffeeRequest = {
	name: string
	weight: number
	price: number
	roastDegree: RoastDegree
}

const addNewCoffee = createAsyncThunk<NewCoffeeResponse, NewCoffeeRequest>(
	'add/new/coffee',
	async ({ name, weight, price, roastDegree }: NewCoffeeRequest) => {
		const response = await axios.post<NewCoffeeResponse>(
			`http://127.0.0.1:3002/coffee/addCoffee/`,
			{
				name,
				weight,
				price,
				roastDegree: roastDegree.toString(),
				userCode: localStorage.getItem('userCode')
			}
		)
		try {
			return response.data
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			// eslint-disable-next-line no-console
			console.log(error)
			return undefined
		}
	}
)

type DeleteCoffeeRequest = { id: number | undefined; userCode: string | null }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteCoffee = createAsyncThunk<any, DeleteCoffeeRequest>(
	'delete/coffee',
	async ({ id, userCode }: DeleteCoffeeRequest) => {
		if (!id || !userCode) return
		const response = await axios.post(
			`http://127.0.0.1:3002/coffee/deleteCoffee/`,
			{ id, userCode }
		)
		try {
			return response.data
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			// eslint-disable-next-line no-console
			console.log(error)
			return undefined
		}
	}
)

type FetchCoffeeResponse = Omit<Coffee, 'roastDegree'> & { roastDegree: string }
type FetchCoffeeRequest = { userCode: string | null }

const fetchCoffees = createAsyncThunk<
	FetchCoffeeResponse[],
	FetchCoffeeRequest
>('fetch/coffees', async ({ userCode }: FetchCoffeeRequest) => {
	const response = await axios.post<FetchCoffeeResponse[]>(
		`http://127.0.0.1:3002/coffee/fetchCoffees/`,
		{ userCode }
	)
	try {
		return response.data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		// eslint-disable-next-line no-console
		console.log(error)
		return []
	}
})

const coffeeSlice = createSlice({
	name: 'coffeeSlice',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addNewCoffee.rejected, state => {
				state.state = 'rejected'
			})
			.addCase(addNewCoffee.pending, state => {
				state.state = 'pending'
			})
			.addCase(addNewCoffee.fulfilled, state => {
				state.state = 'idle'
			})
			.addCase(deleteCoffee.rejected, state => {
				state.state = 'rejected'
			})
			.addCase(deleteCoffee.pending, state => {
				state.state = 'pending'
			})
			.addCase(deleteCoffee.fulfilled, state => {
				state.state = 'idle'
			})
			.addCase(fetchCoffees.rejected, state => {
				state.state = 'rejected'
			})
			.addCase(fetchCoffees.pending, state => {
				state.state = 'pending'
			})
			.addCase(fetchCoffees.fulfilled, (state, { payload }) => {
				const load = payload.map(coffee => {
					return {
						...coffee,
						roastDegree: coffee.roastDegree.toString().split(',')
					}
				})
				state.coffees = load as Coffee[]
				state.state = 'idle'
			})
	}
})

export default coffeeSlice.reducer
export { addNewCoffee, fetchCoffees, deleteCoffee }

export type { Coffee, RoastDegree, NewCoffeeRequest, CoffeeState }
