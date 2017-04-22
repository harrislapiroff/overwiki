import React, { PureComponent } from 'react'
import { MegadraftEditor, editorStateFromRaw } from 'megadraft'

import 'megadraft/lib/styles/megadraft.scss'

export default class WikiPageEditor extends PureComponent {
	constructor(...args) {
		super(...args)
		this.state = { editorState: editorStateFromRaw(null) }
		this.onChange = this.onChange.bind(this)
	}

	onChange(editorState) {
		this.setState({ editorState })
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
