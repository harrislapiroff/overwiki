import axios from 'axios'
import Cookie from 'js-cookie'
import React, { PureComponent } from 'react'
import throttle from 'lodash/throttle'

import Loader from '~/components/Loader'
import WikiPageEditor from '~/components/WikiPage/WikiPageEditor'
import WikiPageFooter from '~/components/WikiPage/WikiPageFooter'
import WikiPageTitle from '~/components/WikiPage/WikiPageTitle'

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
		this.patchTitle = throttle(this.patchTitle, 1000).bind(this)
		this.getSlug = this.getSlug.bind(this)
		this.handleDataLoaded = this.handleDataLoaded.bind(this)
		this.handleEditorChange = this.handleEditorChange.bind(this)
		this.handleTitleChange = this.handleTitleChange.bind(this)
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

	/** Patch title to the API */
	patchTitle(title) {
		const csrfToken = Cookie.get('csrftoken')
		const headers = csrfToken ? { 'X-CSRFToken': csrfToken } : {}
		this.setState({ saving: true })
		axios.patch(
			`${window.apiRoot}pages/${this.getSlug()}/`,
			{ title },
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

	handleTitleChange(newTitle) {
		this.setState(
			{ pristine: false },
			this.patchTitle(newTitle)
		)
	}

	render() {
		if (this.state.loading) return <Loader />

		const { page, saving, pristine } = this.state
		const editing = this.props.match.params.action === 'edit'
		const location = this.props.location

		return (
			<div className="wiki-page">
				<WikiPageTitle
					title={page.title}
					editing={editing}
					onChange={this.handleTitleChange}
				/>
				<div className="wiki-page__body">
					<WikiPageEditor
						content={JSON.parse(page.content)}
						onChange={editing ? this.handleEditorChange : () => {}}
						readOnly={!editing}
					/>
				</div>
				<WikiPageFooter
					editing={editing}
					saving={saving}
					pristine={pristine}
					pageUrl={`/${page.slug}`}
					editUrl={`/${page.slug}/edit`}
				/>
			</div>
		)
	}

}
