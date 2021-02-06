import React from 'react';
import Parser from 'rss-parser';

import './Blog.scss';

const feedUrl = '/blog/feed-en.rss';
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
		let articleCount = 0;
		return (
			<section className="Blog" id="blog">
				<div className="Blog-content">
					<h2>Last Published Articles</h2>
					<div id="Blog-articles">
						{
							this.state.items.map(item => {
								if (articleCount < 3) {
									articleCount ++;
									const articleDate = new Date(item.pubDate).toLocaleDateString("en-US", dateOptions);
									return (
										<div className="Blog-article">
											<h3 className="Blog-article-title">
												<a href={item.link}>{item.title}</a>
											</h3>
											<p className="Blog-article-date">{articleDate}</p>
											<p className="Blog-article-excerpt">{item.contentSnippet}</p>
										</div>
									);
								}
							})
						}
					</div>
					<a className="btn" href="https://silvereh.github.io/blog">Read more articles</a>
				</div>
			</section>
		);
	}
}
