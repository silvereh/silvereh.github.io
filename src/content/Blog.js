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
const patternEN = /\/en\//g;


export class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		};
		(async () => {
			try {
				let parser = new Parser();
				let feed = await parser.parseURL(proxy + feedUrl);
				this.setState({ items: feed.items });
			}
			catch (error) {
				console.log (error);
			}
		})();
	}

	render() {
		return (
			<section className="Blog" id="blog">
				<div className="Blog-content">
					<h2>Articles</h2>
					<p>Here are some blog articles I have written and published:</p>
					<div id="Blog-articles">
						{
							this.state.items.map(item => {
								let matches = item.link.match(patternEN);
								if (matches) {
									return (
										<div className="Blog-article">
											<h3 className="Blog-article-title">
												<a href="{item.link.replace('https://silvereh.github.io/blog/blog/', 'https://silvereh.github.io/blog/')}">{item.title}</a>
											</h3>
											<small className="Blog-article-date">{new Date(item.pubDate).toLocaleDateString("en-US", dateOptions)}</small>
											<p className="Blog-article-excerpt">{item.contentSnippet.substring(0, excerptLength) + "..."}</p>
										</div>
									);
								}
							})
						}
					</div>
				</div>
			</section>
		);
	}
}
