import React from 'react';
import ReactDOM from 'react-dom';
import Parser from 'rss-parser';

import './Blog.scss';

const feedUrl = '/blog/feed.xml';
const proxy = 'https://silvereh.github.io'
const dateOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric'
}
const excerptLength = 200;

export class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feed: ''
		};
		(async () => {
			let parser = new Parser();
			this.state.feed = await parser.parseURL(proxy + feedUrl);
			this.state.feed.items.forEach(item => {
				const linkItem = (
					<div className="Blog-article">
						<h3 className="Blog-article-title">
							<a href="{item.link.replace('https://silvereh.github.io/blog/blog/', 'https://silvereh.github.io/blog/')}">{item.title}</a>
						</h3>
						<small className="Blog-article-date">{new Date(item.pubDate).toLocaleDateString("en-US", dateOptions)}</small>
						<p className="Blog-article-excerpt">{item.contentSnippet.substring(0, excerptLength) + "..."}</p>
					</div>);
				console.log(item);
				ReactDOM.render(linkItem, document.getElementById('Blog-articles'));
			});
		})();
	}

	render() {
		// let date = new Date();
		return (
			<section className="Blog" id="blog">
				<div className="Blog-content">
					<h2>Articles</h2>
					<p>Here are some blog articles I have written and published:</p>
					<div id="Blog-articles">
					</div>
				</div>
			</section>
		);
	}
}
