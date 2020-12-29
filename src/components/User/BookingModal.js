import React, { Component } from "react";
import { Modal, Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./User.css";

class BookingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFullscreen: false,
		};
	}

	handleSubmit = async () => {
		console.log(1);
	}

	render() {
		const { showModal, handleClose, data } = this.props;
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
									<FormControl id="name" placeholder="NGUYEN VAN A" />
								</FormGroup>
							</Form>
                            <Form inline>
								<FormGroup>
									<FormLabel className="modal-label">Email:</FormLabel>
									<FormControl type="email" />
								</FormGroup>
							</Form>
                            <Form inline>
								<FormGroup>
									<FormLabel className="modal-label">Số điện thoại:</FormLabel>
									<FormControl id="name" placeholder="0123456789" />
								</FormGroup>
							</Form>
                            <Form inline>
								<FormGroup>
									<FormLabel className="modal-label">Lọai phòng:</FormLabel>
									<FormControl as="select" onChange={this.handleFolderChange}>
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