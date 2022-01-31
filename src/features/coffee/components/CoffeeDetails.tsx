import { FC } from 'react'
import { deleteCoffee, fetchCoffees } from 'features/coffee/coffeeSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'

const CoffeeDetails: FC = () => {
	const dispatch = useAppDispatch()
	const coffees = useAppSelector(state => state.coffee.coffees)

	return (
		<table>
			<thead>
				<tr>
					<th>Nimi</th>
					<th>Hinta</th>
					<th>Paino</th>
					<th>Paahtoaste</th>
					<th>Poista kahvi</th>
				</tr>
			</thead>
			<tbody>
				{coffees &&
					coffees.length > 0 &&
					coffees.map(({ id, name, weight, price, roastDegree }) => (
						<tr key={id}>
							<td>{name}</td>
							<td>{price} euroa</td>
							<td>{weight} grammaa</td>
							<td>{[...roastDegree].sort().join(', ')}</td>
							<td>
								<span
									title="Poista"
									onClick={() => {
										dispatch(
											deleteCoffee({
												id,
												userCode: localStorage.getItem('userCode')
											})
										).then(() => {
											dispatch(
												fetchCoffees({
													userCode: localStorage.getItem('userCode')
												})
											)
										})
									}}
								>
									❌
								</span>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	)
}

export default CoffeeDetails
