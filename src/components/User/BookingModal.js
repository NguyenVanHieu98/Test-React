import React, { Component } from "react";
import { Modal, Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./User.css";
import firebase from 'firebase/app';
import 'firebase/auth';
import BillService from "../../services/bill";

class BookingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFullscreen: false,
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { data } = this.props;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const hotel = data.name;
		const room = document.getElementById('room').value;
		const dateTime = document.getElementById('time').value.split('T', 2);
		const date = dateTime[0];
		const time = dateTime[1];
		await BillService.createBill(name, email, phone, hotel, room, date, time); 
		this.props.handleClose();
	}

	render() {
		const { showModal, handleClose, data } = this.props;
		const users = firebase.auth().currentUser;
		
		return (
			<div className="modal">
				<Modal show={showModal} size="lg">
					<div className="modal-form" >
						<form className="form-custom">
							<Modal.Header>
								<Modal.Title>Vui lòng để lại thông tin liên hệ !</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<div class="row form_control">
									<div class="col-lg-4">
										<FormLabel className="modal-label">Họ tên:</FormLabel>
									</div>
									<div class="col-lg-8">
										<FormControl id="name" value={users && users.displayName} class="pull-right"/>
									</div>
								</div>
								<div class="row form_control">
									<div class="col-lg-4">
										<FormLabel className="modal-label">Email:</FormLabel>
									</div>
									<div class="col-lg-8">
										<FormControl id="email" value={users && users.email} type="email" class="pull-right"/>
									</div>
								</div>
								<div class="row form_control">
									<div class="col-lg-4">
										<FormLabel className="modal-label">Số điện thoại:</FormLabel>
									</div>
									<div class="col-lg-8">
										<FormControl id="phone" value={users && users.phoneNumber} class="pull-right"/>
									</div>
								</div>
								<div class="row form_control">
									<div class="col-lg-4">
										<FormLabel className="modal-label">Loại phòng:</FormLabel>
									</div>
									<div class="col-lg-8">
										<FormControl as="select" id="room" onChange={this.handleFolderChange} class="pull-right">
											{data.roomtype && data.roomtype.map((roomtype, i) => <option value={(roomtype)} >{roomtype}</option>)}
										</FormControl>
									</div>
								</div>
								<div class="row form_control">
									<div class="col-lg-4">
										<FormLabel className="modal-label">Thời gian:</FormLabel>
									</div>
									<div class="col-lg-8">
										<FormControl id="time" type="datetime-local" class="pull-right" />
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" className="button-apply" onClick={this.handleSubmit}>OK</Button>
								<Button variant="secondary" onClick={handleClose} className="button-close">Cancel</Button>
							</Modal.Footer>
						</form>
					</div>
				</Modal>
			</div>
		);
	}
}

export default BookingModal;