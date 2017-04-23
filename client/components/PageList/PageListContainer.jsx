import axios from 'axios'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import PageList from '~/components/PageList/PageList'

export default class PageListContainer extends PureComponent {
	constructor(...args) {
		super(...args)
		this.state = {
			loading: true,
			pages: [],
		}

		this.handleDataLoaded = this.handleDataLoaded.bind(this)
	}

	componentDidMount() {
		this.fetchData()
	}

	fetchData() {
		this.setState(
			{ loading: true },
			() => axios.get(`${window.apiRoot}pages/`).then(this.handleDataLoaded)
		)
	}

	handleDataLoaded(payload) {
		this.setState({
			pages: payload.data,
			loading: false,
		})
	}

	render() {
		return (
			<PageList
				{...this.props}
				{...this.state}
			/>
		)
	}
}
