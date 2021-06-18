import React, { Component } from "react";
import { ClockHistory } from 'react-bootstrap-icons';
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';
import BillService from "../../services/bill";
import Table from 'react-bootstrap/Table';
import firebase from 'firebase';
require('firebase/auth');

const url_getbill = "http://localhost:5000/api/bills/1";

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
        };
    }
    componentDidMount() {
        axios.get(url_getbill)
            .then(res => {
                const bills = res.data.bill;
                this.setState({ bills })
            })
            .catch(error => console.log(error));
    }

    render() {
        const { showHistory, handleClose } = this.props;
        const { bills } = this.state;
        return (
            <div>
                <Modal id="modal" class="modal" size="lg" show={showHistory} onHide={() => handleClose()}>
                    <Form id="history-form">
                        <Modal.Header id="modal_header" closeButton>
                            <Modal.Title style={{ marginLeft: '140px' }}>Lịch sử</Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="modal_body1">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th>Email</th>
                                        <th>Số điện thoại</th>
                                        <th>Khách sạn</th>
                                        <th>Loại phòng</th>
                                        <th>Ngày cho thuê</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bills && bills.map((bill) => (
                                        <tr>
                                            <td>{bill.name}</td>
                                            <td>{bill.email}</td>
                                            <td>{bill.phone}</td>
                                            <td>{bill.hotel}</td>
                                            <td>{bill.room}</td>
                                            <td>{bill.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer id="modal_footer">
                            <Button variant="danger" onClick={() => handleClose()}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default History;