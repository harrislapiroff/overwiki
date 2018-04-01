import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class WikiPageTitle extends PureComponent {
	render() {
		const {
			title,
			editing,
			onChange
		} = this.props

		return (
			<h1
				className="wiki-page__title"
				onChange={onChange}
			>
				{title}
			</h1>
		)
	}
}

WikiPageTitle.propTypes = {
	title: PropTypes.string.isRequired,
	editing: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
}
