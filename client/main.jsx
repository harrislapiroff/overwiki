import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'


render(
	<div>
		<Router>
			<Route path="/">
				<h1>Welcome to Overwiki!</h1>
			</Route>
		</Router>
	</div>
, document.getElementById('app'))
