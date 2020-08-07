import React, { Component } from 'react';
import Button from '../../../common/button';
import './profile-description.scss';
import { profileAPI } from '../../../../api';

class ProfileStatus extends Component {
	state = {
		editMode: false,
	};

	onStatusDoubleClick = () => {
		this.setState({
			editMode: true,
		});
	};

	onEditClick = () => {
		profileAPI.setStatus('ddd');
		this.setState({
			editMode: false,
		});
	};

	render() {
		return (
			<div className="status">
				{!this.state.editMode ? (
					<div className="status-text" onDoubleClick={this.onStatusDoubleClick}>
						{this.props.status}
					</div>
				) : (
					<div onBlur={this.onEditStatusBlur} className="status-edit">
						<input className="input" value={this.props.status} />
						<Button onClick={this.onEditClick} text="Edit" />
					</div>
				)}
			</div>
		);
	}
}

export default ProfileStatus;
