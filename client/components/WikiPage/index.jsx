import axios from 'axios'
import Cookie from 'js-cookie'
import React, { PureComponent } from 'react'
import throttle from 'lodash/throttle'

import Loader from '~/components/Loader'
import WikiPageEditor from '~/components/WikiPage/WikiPageEditor'

import './WikiPage.sass'

export default class WikiPage extends PureComponent {

	constructor(...args) {
		super(...args)

		this.state = {
			loading: true,
			pristine: true,
			saving: false,
			page: null,
		}

		this.fetchData = this.fetchData.bind(this)
		this.patchData = throttle(this.patchData, 1000).bind(this)
		this.getSlug = this.getSlug.bind(this)
		this.handleDataLoaded = this.handleDataLoaded.bind(this)
		this.handleEditorChange = this.handleEditorChange.bind(this)
	}

	/** Fetch page data once the component mounts */
	componentDidMount() {
		this.fetchData()
	}

	/** Fetch new data if the slug changes */
	componentWillReceiveProps(newProps) {
		if (typeof newProps.slug !== 'undefined' && newProps.slug !== this.props.slug) {
			this.fetchData()
		}
	}

	/** Send a call to the API for the page data */
	fetchData() {
		this.setState(
			{ loading: true },
			() => axios.get(`${window.apiRoot}pages/${this.getSlug()}/`).then(this.handleDataLoaded)
		)
	}

	/** Patch updated content to the API */
	patchData(content) {
		const csrfToken = Cookie.get('csrftoken')
		const headers = csrfToken ? { 'X-CSRFToken': csrfToken } : {}
		this.setState({ saving: true })
		axios.patch(
			`${window.apiRoot}pages/${this.getSlug()}/`,
			{ content },
			{ headers },
		).then(
			this.setState.bind(this, { saving: false, pristine: true }, null)
		)
	}

	/** Return slug if one is set in the URL, otherwise 'home' */
	getSlug() {
		return this.props.match.params.slug || 'home'
	}

	/** Accept an axios payload to populate the state with page data */
	handleDataLoaded(payload) {
		this.setState({ page: payload.data, loading: false })
	}

	handleEditorChange(content) {
		this.setState(
			{ pristine: false },
			this.patchData(content)
		)
	}

	render() {
		if (this.state.loading) return <Loader />

		const { page, saving } = this.state

		return (
			<div className="wiki-page">
				<h1 className="wiki-page__title">{page.title}</h1>
				<div className="wiki-page__body">
					<WikiPageEditor
						content={JSON.parse(page.content)}
						onChange={this.handleEditorChange}
					/>
				</div>
				<div className="wiki-page__status">
					{!this.state.pristine && !this.state.saving && 'Unsaved.'}
					{this.state.saving && 'Saving...'}
					{this.state.pristine && 'Saved.'}
				</div>
			</div>
		)
	}

}
