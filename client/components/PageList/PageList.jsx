import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import Loader from '~/components/Loader'

import './PageList.sass'

export default class PageList extends PureComponent {
	render() {
		if (this.props.loading) return <Loader />

		return (
			<ul className="page-list">
				{this.props.pages.map(page => (
					<li className="page-list__item" key={page.slug}>
						<Link className="page-list__link" to={'/' + page.slug}>
							{page.title}
						</Link>
					</li>
				))}
			</ul>
		)
	}
}

PageList.propTypes = {
	loading: PropTypes.bool,
	pages: PropTypes.array,
}

PageList.defaultProps = {
	loading: true,
	pages: [],
}
