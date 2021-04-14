import React, { Component } from "react";
import "./Layout.css";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import TaskDataService from "../../services/task.service";
import BookingDataService from "../../services/bookinghanoi";
import TripadvisorDataService from "../../services/tripadvisorhanoi";
import RunningModal from "../Modal/RunningModal";
import Checkbox from './Checkbox';

const items = [
    'Name',
    'District',
    'Place',
    'Image',
    'Review',
    'Convenient',
    'Roomtype',
    'Comment'
];
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            runData: '1',
            cityName: ''
        }
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    componentDidUpdate() {
        if (this.state.runData !== '1') {
            this.setDataDraft();
            this.setState({
                openModal: false,
                runData: '1',
            });
        }
    }

    setDataDraft = async () => {
        console.log(document.getElementById('cityName').value);
    }

    handleStart = async () => {
        let run;
        this.setState({
            openModal: true,
        });
        const cityName = document.getElementById('cityName').value;
        if (cityName === 'tripadvisor.com.vn'){
            run = await (await TripadvisorDataService.run()).data;
        } else if (cityName === 'booking.com'){
            run = await (await BookingDataService.run()).data;
        }
        // const run = await (await TaskDataService.run()).data;
        await this.setState({
            runData: run,
            cityName
        });
    }

    handleMergeData = async () => {
        const dataBooking = await (await BookingDataService.getAll()).data.bookinghanoi;
        const dataTripadvisor = await (await TripadvisorDataService.getAll()).data.tripadvisorhanoi;
        const listName = dataTripadvisor.map(dataTripadvisor => dataTripadvisor.name);
        for (var i = 0; i < dataBooking.length; i++) {
            if (listName.includes(dataBooking[i].name)) {
                await TripadvisorDataService.updateDataHotel(dataBooking[i].name, dataBooking[i].roomtype, dataBooking[i].comment);
            }
        }
        const number = dataTripadvisor.length;
        return window.alert(`Crawl thành công, dữ liệu hiện tại có ${number} bản ghi`);
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
    }

    createCheckbox = label => (
        <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
    )

    createCheckboxes = () => (
        items.map(this.createCheckbox)
    )

    render() {
        const { openModal } = this.state;
        return (
            <div>
                <RunningModal
                    showModal={openModal}
                />
                <Form className="form" >
                    <Form.Label className="form-label">Lựa chọn trang web để thu thập dữ liệu: </Form.Label>
                    <Form.Control as="select" id="cityName" className="form-control">
                        <option>tripadvisor.com.vn</option>
                        <option>booking.com</option>
                        <option>ivivu.com</option>
                        <option>agoda.com</option>
                    </Form.Control>
                    <Form.Label className="form-label">Các tiêu chí muốn thu thập: </Form.Label>
                    <div className="col-sm-12">
                        <form onSubmit={this.handleStart}>
                            {this.createCheckboxes()}
                            {/* <Button variant="primary" className="button-start" type="submit">Start</Button> */}
                        </form>
                    </div>
                    <Button variant="primary" className="button-start" onClick={this.handleStart}>Start</Button>
                </Form>
            </div>
        );
    }
}
export default Body;