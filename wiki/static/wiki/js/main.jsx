/* jshint esversion: 6 */

let PageListNav = React.createClass({
	getInitialState: function () {
		return {data: []}
	},
	componentDidMount: function () {
		axios.get(this.props.url).then(response => {
			this.setState({data: response.data})
		})
	},
	render: function () {
		let ListItemNodes = this.state.data.map(function (page) {
			return (
				<li>
					<a href="/{page.slug}/">{page.title}</a>
				</li>
			)
		})
		return (
			<nav className="p-a-1">
				<ul className="list-unstyled">
					{ListItemNodes}
				</ul>
			</nav>
		)
	}
})

let Sidebar = React.createClass({
	render: function () {
		return (
			<div className="site-layout-sidebar">
				<PageListNav url="/api/pages" />
			</div>
		)
	}
})

let Main = React.createClass({
	render: function () {
		return (
			<div className="site-layout-main" />
		)
	}
})

let Layout = React.createClass({
	render: function () {
		return (
			<div className="site-layout">
				<Sidebar />
				<Main />
			</div>
		)
	}
})

ReactDOM.render(
	<Layout />,
	document.getElementById("app")
)
