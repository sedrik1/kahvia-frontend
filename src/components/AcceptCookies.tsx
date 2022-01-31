import { Dispatch, FC, SetStateAction, useState } from 'react'
import styled from 'styled-components'
const AcceptCookies: FC<{
	setStateCookies: Dispatch<SetStateAction<string | null>>
}> = ({ setStateCookies }) => {
	const [hidePopup, setHidePopup] = useState(false)
	return (
		<StyledPopup hide={hidePopup}>
			<div>
				<p>
					Sivuston moitteeton toiminnallisuus vaatii välttämättömien evästeiden
					hyväksymistä.
				</p>
				<p>
					Sivusto ei kerää dataa kävijöistä. Ainoat evästeet ovat käyttäjäkoodin
					luonti ja evästeiden hyväksyntä.
				</p>
				<button
					onClick={() => {
						localStorage.setItem('acceptCookies', 'accepted')
						setHidePopup(true)
						setStateCookies(localStorage.getItem('acceptCookies'))
					}}
				>
					Hyväksy evästeet
				</button>
			</div>
		</StyledPopup>
	)
}

const StyledPopup = styled.div<{ hide: boolean }>`
	display: ${({ hide }) => (hide ? 'none' : undefined)};
	font-family: inherit;
	margin: 1rem auto;
	padding: 10px;
	width: 250px;
	z-index: 1;
	border: 1px solid #000;
	border-radius: 5px;
	div {
		display: flex;
		flex-direction: column;
		align-self: center;
	}
`

export default AcceptCookies
