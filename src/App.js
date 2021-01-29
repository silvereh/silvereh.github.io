import {
	Route,
	NavLink,
	HashRouter
} from "react-router-dom";

import LogoIcon from './assets/icons/logo.js';
import HomeIcon from './assets/icons/home.js';
import AboutIcon from './assets/icons/about.js';
import PortfolioIcon from './assets/icons/portfolio.js';
import BlogIcon from './assets/icons/blog.js';
import ContactIcon from './assets/icons/contact.js';
import GithubIcon from './assets/icons/github.js';
import LinkedinIcon from './assets/icons/linkedin.js';

import './App.scss';
import './Shooting-stars.scss';

const Header = () => {
	return (
		<header className="App-header">
			<div className="App-links">
				<a href="#" className="App-logo"><LogoIcon /></a>
				<a href="#" className="App-icon App-github"><GithubIcon /></a>
				<a href="#" className="App-icon App-linkedin"><LinkedinIcon /></a>
			</div>
			<nav className="App-nav">
				<a href="#" className="App-icon App-home"><HomeIcon /></a>
				<a href="#" className="App-icon App-about"><AboutIcon /></a>
				<a href="#" className="App-icon App-portfolio"><PortfolioIcon /></a>
				<a href="#" className="App-icon App-blog"><BlogIcon /></a>
				<a href="#" className="App-icon App-contact"><ContactIcon /></a>
			</nav>
		</header>
	);
}

const App = () => {
	return (
		<div className="App">
			<Header />
			<div class="night">
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
			</div>
			<div class="night">
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
			</div>
			<div class="night">
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
			</div>
			<div class="night">
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
				<div class="shooting_star"></div>
			</div>
		</div>
	);
}

export default App;
