import React, { Component } from "react";
import { ClockHistory } from 'react-bootstrap-icons';
import {Modal , Button , Form } from "react-bootstrap";
import axios from 'axios';
import BillService from "../../services/bill";
import Table from 'react-bootstrap/Table';
import firebase from 'firebase';
require('firebase/auth');

const url_getbill = "http://localhost:5000/api/bills/0";
const url_send_mail = "http://localhost:3002/sendApply";

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
                const bills = res.data.bill;
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

    applyBill(id, data)
    {
        const isApply = window.confirm("Chấp nhận yêu cầu và gửi mail đến cho khách hàng ?");
        if (!isApply) return;
        data.status = '1'
        BillService.updateBill(id, data).then(
          (res) => {
            this.componentDidMount();
            axios({
                method: "POST",
                url: url_send_mail,
                data: {
                    name: data.name,
                    email: data.email,
                    hotel: data.hotel,
                    room: data.room,
                    date: data.date,
                    time: data.time
                }
            }).then((response) => {
                if (response.data.msg === 'success') {
                    alert("Gửi thông báo cho khách hàng thành công.");
                } else if (response.data.msg === 'fail') {
                    alert("Gửi thông báo cho khách hàng thất bại.")
                }
            })},
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
                            <Modal.Title style={{ marginLeft: '100px' }}>Danh sách đơn yêu cầu</Modal.Title>
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
                                    <th>Ngày nhận phòng</th>
                                    <th>Giờ nhận phòng</th>
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
                                        <td>{bill.time}</td>
                                        <td>
                                            <Button variant="secondary" size="sm" 
                                            onClick={(e) => this.deleteBill(bill._id, e)}>Delete</Button>
                                            <Button variant="primary" size="sm" style={{marginTop: '2px'}} 
                                            onClick={(e) => this.applyBill(bill._id, bill)}> Apply </Button>
                                        </td>
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