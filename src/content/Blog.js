import React from 'react';
import Parser from 'rss-parser';

import './Blog.scss';

const feedUrl = '/blog/feed.xml';
const proxy = 'https://silvereh.github.io'

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
				const linkItem = 
					'<div className="Blog-article">' +
						'<h3 className="Blog-article-title"><a href="' + item.link + '">' + item.title + '</a></h3>' +
						'<small className="Blog-article-date">' + item.pubDate + '</small>' +
						'<p className="Blog-article-excerpt">' + item.contentSnippet + '</p>' +
					'</div>';
				console.log(item);
				document.getElementById('Blog-articles').append(linkItem);
			});
		})();
	}

	render() {

		return (
			<section className="Blog" id="blog">
				<div className="Blog-content">
					<h2>Articles</h2>
					<p>Here are some blog articles I have written and published:</p>
					<div id="Blog-articles"></div>
				</div>
			</section>
		);
	}
}
