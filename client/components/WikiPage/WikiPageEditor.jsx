import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import {
	MegadraftEditor,
	editorStateFromRaw,
	editorStateToJSON,
} from 'megadraft'

import 'megadraft/lib/styles/megadraft.scss'

export default class WikiPageEditor extends PureComponent {
	constructor(props) {
		super(props)
		this.state = { editorState: editorStateFromRaw(props.content) }
		this.onChange = this.onChange.bind(this)
	}

	onChange(editorState) {
		this.setState(
			{ editorState },
			() => this.props.onChange(editorStateToJSON(editorState))
		)
	}

	render() {
		return (
			<MegadraftEditor
				editorState={this.state.editorState}
				onChange={this.onChange}
			/>
		)
	}
}

WikiPageEditor.propTypes = {
	content: PropTypes.object,
	onChange: PropTypes.func,
}

WikiPageEditor.defaultProps = {
	content: {},
	onChange: () => {},
}
