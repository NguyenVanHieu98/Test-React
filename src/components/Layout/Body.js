import React, { Component } from "react";
import "./Layout.css";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import TaskDataService from "../../services/task.service";
import BookingDataService from "../../services/bookinghanoi";
import TripadvisorDataService from "../../services/tripadvisorhanoi";
import MyAppService from "../../services/myApp.service";
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
            this.setData();
            this.setState({
                openModal: false,
                runData: '1',
            });
        }
    }

    setData = async () => {
        let selectData = [];
        let data;
        let dataMyApp = await (await MyAppService.getAll()).data.myapp;
        let listName = dataMyApp.map(dataMyApp => dataMyApp.name);
        if (this.state.cityName === 'tripadvisor.com.vn') {
            data = await (await TripadvisorDataService.getAll()).data.tripadvisorhanoi;
        } else if (this.state.cityName === 'booking.com') {
            data = await (await BookingDataService.getAll()).data.bookinghanoi;
        }
        for (var i = 0; i < data.length; i++) {
            for (const checkbox of this.selectedCheckboxes) {
                selectData.push(checkbox);
            }
            const myData = await (await MyAppService.getDataByName(data[i].name)).data.myapp[0];
            console.log(myData);
            if (!selectData.includes('District')) {
                if (myData.district !== undefined) {
                    data[i].district = myData.district;
                } else {
                    data[i].district = null;
                }
            }
            if (!selectData.includes('Place')) {
                if (myData.place !== undefined) {
                    data[i].place = myData.place;
                } else {
                    data[i].place = null;
                }
            }
            if (!selectData.includes('Image')) {
                data[i].img = [];
            }
            if (!selectData.includes('Review')) {
                data[i].review = [];
            }
            if (!selectData.includes('Convenient')) {
                data[i].convenient = [];
            }
            if (!selectData.includes('Roomtype')) {
                data[i].roomtype = [];
            }
            if (!selectData.includes('Comment')) {
                data[i].comment = [];
            } else {
                for(var k = 0; k < data[i].comment.length; k++) {
                    data[i].comment[k] += '  ' + this.state.cityName
                }
                for (var j = 0; j < data[i].comment.length; j++) {
                    if (myData && myData.comment.includes(data[i].comment[j])) {
                        delete data[i].comment[j];  
                    }
                }
                console.log(data[i].comment);
            }
            if (listName.includes(data[i].name)) {
                await MyAppService.updateMyData(
                    data[i].name, 
                    data[i].district, 
                    data[i].place, 
                    data[i].img, 
                    data[i].review, 
                    data[i].convenient, 
                    data[i].roomtype, 
                    data[i].comment
                ); 
            } else {
                await MyAppService.createData(
                    data[i].name, 
                    data[i].district, 
                    data[i].place,
                    data[i].img,
                    data[i].review,
                    data[i].convenient,
                    data[i].roomtype,
                    data[i].comment
                );
            }
        }
    }

    handleStart = async () => {
        let run;
        this.setState({
            openModal: true,
        });
        const cityName = document.getElementById('cityName').value;
        if (cityName === 'tripadvisor.com.vn'){
            run = await (await TripadvisorDataService.tripadvisorCrawl()).data;
        } else if (cityName === 'booking.com'){
            run = await (await BookingDataService.bookingCrawl()).data;
        }
        // const run = await (await TaskDataService.run()).data;
        await this.setState({
            runData: run,
            cityName
        });
    }

    // handleMergeData = async () => {
    //     const dataBooking = await (await BookingDataService.getAll()).data.bookinghanoi;
    //     const dataTripadvisor = await (await TripadvisorDataService.getAll()).data.tripadvisorhanoi;
    //     const listName = dataTripadvisor.map(dataTripadvisor => dataTripadvisor.name);
    //     for (var i = 0; i < dataBooking.length; i++) {
    //         if (listName.includes(dataBooking[i].name)) {
    //             await TripadvisorDataService.updateDataHotel(dataBooking[i].name, dataBooking[i].roomtype, dataBooking[i].comment);
    //         }
    //     }
    //     const number = dataTripadvisor.length;
    //     return window.alert(`Crawl thành công, dữ liệu hiện tại có ${number} bản ghi`);
    // }

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