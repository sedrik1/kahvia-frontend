import { useEffect, useState } from 'react'
import './App.css'
import styled from 'styled-components'
import { useAppSelector } from 'app/hooks'
import { CoffeeDetails, NewCoffee } from 'features/coffee/components/'
import WindowSize from 'utils/WindowSize'
import GenerateUserCode from 'utils/GenerateUserCode'
import { useAppDispatch } from 'app/hooks'
import { fetchCoffees } from 'features/coffee/coffeeSlice'
import AcceptCookies from 'components/AcceptCookies'

const App = () => {
	const dispatch = useAppDispatch()
	const [acceptCookies, setAcceptCookies] = useState(
		localStorage.getItem('acceptCookies')
	)
	useEffect(() => {
		if (acceptCookies) {
			if (!localStorage.getItem('userCode')) {
				localStorage.setItem('userCode', GenerateUserCode())
			} else {
				dispatch(fetchCoffees({ userCode: localStorage.getItem('userCode') }))
			}
		}
	}, [acceptCookies])

	const coffees = useAppSelector(state => state.coffee.coffees)

	const { width } = WindowSize()

	return (
		<StyledMain screenWidth={width}>
			<StyledHeader>
				<h2>Ihan kaffel</h2>
				<h4>"Ku ruumis on rituratu, niin kaffekupist on hyvä apu."</h4>
			</StyledHeader>
			{!acceptCookies ? (
				<AcceptCookies setStateCookies={setAcceptCookies} />
			) : (
				<>
					<section>
						<StyledAside screenWidth={width}>
							<NewCoffee />
						</StyledAside>

						{coffees && coffees.length > 0 ? (
							<CoffeeDetails />
						) : (
							<h1 style={{ margin: 'auto' }}>Ei kahvia(!)</h1>
						)}
					</section>
				</>
			)}
		</StyledMain>
	)
}

const StyledHeader = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	font-family: 'Calibri';
	& > * {
		margin: 0;
	}
	h4 {
		font-style: italic;
	}
`

const StyledAside = styled.aside<{ screenWidth: number }>`
	font-family: 'Calibri Light';
	font-size: 14px;
	width: 13rem;
	display: flex;

	align-self: ${({ screenWidth }) =>
		screenWidth > 775 ? undefined : 'center'};
	flex-direction: ${({ screenWidth }) =>
		screenWidth > 775 ? 'row' : 'column'};
	span {
		margin: 10px 0 0;
		width: fit-content;
	}
	form {
		width: 95%;
		display: flex;
		flex-direction: column;
		justify-content: ${({ screenWidth }) =>
			screenWidth > 775 ? undefined : 'space-evenly'};

		padding: 0 10px 10px 0;
		label {
			margin: 12px 0 0;
		}
		button {
			margin-top: 12px;
		}
		input[type='range'] {
			width: 95%;
		}
	}
`
const StyledMain = styled.main<{ screenWidth: number }>`
	display: flex;
	flex-direction: column;
	max-width: ${({ screenWidth }) => (screenWidth > 775 ? '80%' : '100%')};
	margin: ${({ screenWidth }) => (screenWidth > 775 ? '10px auto' : '1px')};
	padding: 10px;
	h4 {
		margin: 0;
	}
	section {
		margin-top: 2rem;
		display: flex;
		flex-direction: ${({ screenWidth }) =>
			screenWidth > 775 ? 'row' : 'column'};
		justify-content: space-between;
	}
`

export default App
