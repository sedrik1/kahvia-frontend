import { FC } from 'react'
import { Field, Form, Formik } from 'formik'
import {
	addNewCoffee,
	fetchCoffees,
	NewCoffeeRequest
} from 'features/coffee/coffeeSlice'
import { useAppDispatch } from 'app/hooks'

const initialValues: NewCoffeeRequest = {
	name: '',
	weight: 500,
	price: 1,
	roastDegree: ['3']
}

const NewCoffee: FC = () => {
	const dispatch = useAppDispatch()
	return (
		<div>
			<span>Lisää uusi kahvi</span>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, { setSubmitting, setStatus, resetForm }) => {
					try {
						setSubmitting(true)
						dispatch(addNewCoffee(values))
							.then(() => {
								dispatch(
									fetchCoffees({
										userCode: localStorage.getItem('userCode')
									})
								)
							})
							.finally(() => {
								setSubmitting(false)
							})
						setStatus({ success: true })
						resetForm({ values: initialValues })
					} catch (error) {
						setStatus({ success: false })
					}
				}}
			>
				{props => (
					<Form>
						<label htmlFor="name">Nimi</label>
						<input
							required
							placeholder="Kahvin nimi"
							type="text"
							id="name"
							name="name"
							onChange={props.handleChange}
							value={props.values.name}
						/>
						<label htmlFor="price">Hinta (euroina)</label>
						<input
							required
							placeholder="Kahvin hinta"
							type="number"
							id="price"
							name="price"
							onChange={props.handleChange}
							value={props.values.price}
						/>
						<label htmlFor="weight">Paino (grammoina)</label>
						<input
							required
							placeholder="500"
							type="number"
							id="weight"
							name="weight"
							min={1}
							onChange={props.handleChange}
							value={props.values.weight}
						/>

						<div style={{ margin: '10px 0 5px' }} id="checkbox-group">
							Paahtoaste
						</div>
						<div
							style={{ margin: 'auto' }}
							role="group"
							aria-labelledby="checkbox-group"
						>
							<label>
								<Field type="checkbox" name="roastDegree" value="1" />1
							</label>
							<label>
								<Field type="checkbox" name="roastDegree" value="2" />2
							</label>
							<label>
								<Field type="checkbox" name="roastDegree" value="3" />3
							</label>
							<label>
								<Field type="checkbox" name="roastDegree" value="4" />4
							</label>
							<label>
								<Field type="checkbox" name="roastDegree" value="5" />5
							</label>
						</div>

						<button type="submit">Lisää kahvi</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default NewCoffee
