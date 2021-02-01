import React from 'react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';

import SendIcon from '../assets/icons/send.js';

import './Contact.scss';

const userId = "user_vH0shKpUnfOOEMuGVcFH9";
init(userId);
export class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			from_name: '',
			from_email: '',
			message: ''
		}
	}
	formHandler = (event) => {
		event.preventDefault();
		const templateID = 'template_z33fh8f';
		this.sendMessage(templateID, {
			from_name: this.state.from_name,
			from_email: this.state.from_email,
			message: this.state.message
		});
	}
	changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
	}
	sendMessage = (templateID, variables) => {
		emailjs.send('default_service', templateID, variables, userId)
			.then(res => {
				alert('Email sent successfully');
			})
			.catch(err => {
				console.error('An error occured. Here are some details. ', err);
			});
	}
	render() {
		return (
			<section className="Contact" id="contact">
				<h2>Contact Me</h2>
				<p>It will be my greatest pleasure to hear from you.</p>
				<p>Whether you have a project I can help you with or you want to give me feedback on this site, let's chat!</p>
				<form className="Contact-form">
					<input className="Contact-field" type="text" name="from_name" id="from_name" value={ this.state.from_name } onChange={ this.changeHandler } placeholder="Your name" />
					<input className="Contact-field" type="text" name="from_email" id="from_email" value={ this.state.from_email } onChange={ this.changeHandler } placeholder="Your email" />
					<textarea className="Contact-field" name="message" id="message" value={ this.state.message } onChange={ this.changeHandler } placeholder="Type your message here." cols="30" rows="10" />
					<button className="Contact-send" onClick={ this.formHandler }><SendIcon /><span className="sr-only">Send Message</span></button>
				</form>
				<p>Alternatively, you can shoot me an email at <a href="mailto:silvere.heraudeau@gmail.com">silvere.heraudeau@gmail.com</a>.</p>
			</section>
		);
	}
}
