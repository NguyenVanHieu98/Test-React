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
		await BillService.createBill(name, email, phone, hotel, room); 
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
								<Modal.Title className="modal-title">Vui lòng để lại thông tin liên hệ !</Modal.Title>
							</Modal.Header>
							<Modal.Body>
							<Form inline>
								<FormGroup>
									<FormLabel className="modal-label">Họ tên:</FormLabel>
									<FormControl id="name" value={users && users.displayName} placeholder="NGUYEN VAN A" />
								</FormGroup>
							</Form>
                            <Form inline>
								<FormGroup>
									<FormLabel className="modal-label">Email:</FormLabel>
									<FormControl id="email" value={users && users.email} type="email" />
								</FormGroup>
							</Form>
                            <Form inline>
								<FormGroup>
									<FormLabel className="modal-label">Số điện thoại:</FormLabel>
									<FormControl id="phone" value={users && users.phoneNumber} />
								</FormGroup>
							</Form>
                            <Form inline>
								<FormGroup>
									<FormLabel className="modal-label">Loại phòng:</FormLabel>
									<FormControl as="select" id="room" onChange={this.handleFolderChange}>
                                        {data.roomtype && data.roomtype.map((roomtype, i) => <option value={(roomtype)} >{roomtype}</option>)}
                                    </FormControl>
								</FormGroup>
							</Form>
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