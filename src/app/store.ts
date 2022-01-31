import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import coffeeSlice from 'features/coffee/coffeeSlice'

export const store = configureStore({
	reducer: {
		coffee: coffeeSlice
	}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
