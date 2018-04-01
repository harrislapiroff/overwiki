import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

export default class WikiPageFooter extends PureComponent {
	render() {
		const {
			editing,
			pristine,
			saving,
			pageUrl,
			editUrl,
		} = this.props

		return (
			<div className="wiki-page__footer">
				<div className="wiki-page__footer-status">
					{editing ? (
						<Fragment>
							{!pristine && !saving && 'Unsaved.'}
							{saving && 'Saving...'}
							{pristine && 'Saved.'}
						</Fragment>
					) : (
						<Fragment>
							PAGE DETAILS GO HERE SOMEDAY SOON
						</Fragment>
					)}
				</div>
				<div className="wiki-page__footer-controls">
					<div className="flip-button-container">
						<TransitionGroup>
							{editing ? (
								<CSSTransition classNames="flip-button" key='editing' timeout={250}>
									<Link
										to={pageUrl}
										className="flip-button button button--blue"
										disabled={saving}
									>Done</Link>
								</CSSTransition>
							) : (
								<CSSTransition classNames="flip-button" key='not-editing' timeout={250}>
									<Link
										to={editUrl}
										className="flip-button button button--o-gray"
									>Edit</Link>
								</CSSTransition>
							)}
						</TransitionGroup>
					</div>
				</div>
			</div>
		)
	}
}

WikiPageFooter.propTypes = {
	editing: PropTypes.bool,
	pristine: PropTypes.bool,
	saving: PropTypes.bool,
	pageUrl: PropTypes.string,
	editUrl: PropTypes.string,
}
