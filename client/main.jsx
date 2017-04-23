import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import WikiPage from '~/components/WikiPage'

import './base.sass'
import './SidebarLayout.sass'

const appEl = document.getElementById('app')
window.apiRoot = appEl.dataset.apiWikiRoot


render((
	<div class="wiki-app">
		<Router>
			<div className="sidebar-layout">
				<div className="sidebar-layout--side">
				Sidebar
				</div>
				<div className="sidebar-layout--main">
					<Route exact path="/" component={WikiPage} />
					<Route path="/:slug" component={WikiPage} />
				</div>
			</div>
		</Router>
	</div>
), appEl)
