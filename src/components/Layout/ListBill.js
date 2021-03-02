import React, { Component } from "react";
import { ClockHistory } from 'react-bootstrap-icons';
import {Modal , Button , Form } from "react-bootstrap";
import axios from 'axios';
import BillService from "../../services/bill";
import Table from 'react-bootstrap/Table';
import firebase from 'firebase';
require('firebase/auth');

const url_getbill = "http://localhost:5000/api/bills/";

class ListBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
        };      
    }
    componentDidMount() {
        axios.get(url_getbill)
            .then(res => {
                const bills = res.data.bills;
                this.setState({bills})
            })
            .catch(error => console.log(error));
    }

    deleteBill(id)
    {
        const isDelete = window.confirm("Comfirm delete this bill ?");
        if (!isDelete) return;
        BillService.delete(id).then(
          (res) => this.componentDidMount(),
          (err) => console.log(err)
        );
    }
  

    render() {
        const { showBill, handleClose } = this.props;
        const { bills } = this.state;
        return (
            <div>
                <Modal id="modal" class="modal" size="lg" show={showBill} onHide={() => handleClose()}>
                    <Form id="history-form">
                        <Modal.Header id="modal_header" closeButton>
                            <Modal.Title style={{ marginLeft: '180px' }}>LIST BILL</Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="modal_body1">
                            <Table>
                              <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Hotel</th>
                                    <th>Room</th>
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
                                        <td><Button variant="secondary" size="sm" 
                                            onClick={(e) => this.deleteBill(bill._id, e)}>Delete</Button></td>
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
export default ListBill;