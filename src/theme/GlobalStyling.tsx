import { createGlobalStyle } from 'styled-components'

const GlobalStyling = createGlobalStyle`
    * {
	    @import url('https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;700&display=swap');
	    margin: 0;
	    padding: 0;
	    font-family: 'Maven Pro', sans-serif;
    }
    body {
	    font-size: 16px;
    }
    button {
	    font-family: inherit;
    }
    ul {
	    list-style: none;
    }
`

export default GlobalStyling
