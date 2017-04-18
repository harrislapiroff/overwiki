import axios from 'axios'
import React, { PureComponent } from 'react'

import Loader from '~/components/Loader'

export default class WikiPage extends PureComponent {

	constructor(...args) {
		super(...args)
		this.state = {
			loading: true,
			page: null,
		}
	}

	handleDataLoaded(payload) {

	}

	render() {
		if (this.state.loading) return <Loader />
	}

}
