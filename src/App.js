import Scrollspy from 'react-scrollspy'

import LogoIcon from './assets/icons/logo.js';
import HomeIcon from './assets/icons/home.js';
import AboutIcon from './assets/icons/about.js';
import PortfolioIcon from './assets/icons/portfolio.js';
import BlogIcon from './assets/icons/blog.js';
import ContactIcon from './assets/icons/contact.js';
import GithubIcon from './assets/icons/github.js';
import LinkedinIcon from './assets/icons/linkedin.js';

import Home from './content/Home.js';
import About from './content/About.js';

import './App.scss';

const Header = () => {
	return (
		<header className="App-header">
			<div className="App-links">
				<a className="App-logo" href="/"><LogoIcon /></a>
				<a className="App-icon App-github" href="https://github.com/silvereh" target="_blank"><GithubIcon /></a>
				<a className="App-icon App-linkedin" href="https://www.linkedin.com/in/sheraudeau/" target="_blank"><LinkedinIcon /></a>
			</div>
			<Scrollspy className="App-nav" id="App-nav" items={['home', 'about']} currentClassName="active">
				<li className="App-icon App-home"><a href="#home"><HomeIcon /></a></li>
				<li className="App-icon App-about"><a href="#about"><AboutIcon /></a></li>
				<li className="App-icon App-portfolio"><a href="#portfolio"><PortfolioIcon /></a></li>
				<li className="App-icon App-blog"><a href="#blog"><BlogIcon /></a></li>
				<li className="App-icon App-contact"><a href="#contact"><ContactIcon /></a></li>
			</Scrollspy>
		</header>
	);
}

const App = () => {
	return (
		<div className="App">
			<Header />
			<div className="App-content">
				<Home />
				<About />
			</div>
		</div>
	);
}

export default App;
