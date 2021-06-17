import React, { Component } from "react";
import "./Layout.css";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import TaskDataService from "../../services/task.service";
import BookingDataService from "../../services/booking";
import TripadvisorDataService from "../../services/tripadvisor";
import MyAppService from "../../services/myApp.service";
import RunningModal from "../Modal/RunningModal";
import Checkbox from './Checkbox';
import Slidebar from "./Slidebar";

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
            webName: ''
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
        if (this.state.webName === 'tripadvisor.com.vn') {
            data = await (await TripadvisorDataService.getAll()).data.tripadvisor;
        } else if (this.state.webName === 'booking.com') {
            data = await (await BookingDataService.getAll()).data.booking;
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
            } else {
                for (var j = 0; j < data[i].img.length; j++) {
                    if (myData && myData.img.includes(data[i].img[j])) {
                        delete data[i].img[j];  
                    }
                }
            }
            if (!selectData.includes('Review')) {
                data[i].review = [];
            } else {
                for (var j = 0; j < data[i].review.length; j++) {
                    if (myData && myData.review.includes(data[i].review[j])) {
                        delete data[i].review[j];  
                    }
                }
            }
            if (!selectData.includes('Convenient')) {
                data[i].convenient = [];
            } else {
                for (var j = 0; j < data[i].convenient.length; j++) {
                    if (myData && myData.convenient.includes(data[i].convenient[j])) {
                        delete data[i].convenient[j];  
                    }
                }
            }
            if (!selectData.includes('Roomtype')) {
                data[i].roomtype = [];
            } else {
                for (var j = 0; j < data[i].roomtype.length; j++) {
                    if (myData && myData.roomtype.includes(data[i].roomtype[j])) {
                        delete data[i].roomtype[j];  
                    }
                }
            }
            if (!selectData.includes('Comment')) {
                data[i].comment = [];
            } else {
                for(var k = 0; k < data[i].comment.length; k++) {
                    data[i].comment[k] += '  ' + this.state.webName
                }
                for (var j = 0; j < data[i].comment.length; j++) {
                    if (myData && myData.comment.includes(data[i].comment[j])) {
                        delete data[i].comment[j];  
                    }
                    if (data[i].comment[j] === "") {
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
        const webName = document.getElementById('webName').value;
        const cityName = document.getElementById('cityName').value;
        if (webName === 'tripadvisor.com.vn'){
            if (cityName === 'Hà Nội'){
                run = await (await TripadvisorDataService.tripadvisorCrawlHanoi()).data;
            }
            else if (cityName === 'Thành phố Hồ Chí Minh'){
                run = await (await TripadvisorDataService.tripadvisorCrawlHoChiMinh()).data;
            }
            else if (cityName === 'Nha Trang') {
                run = await (await TripadvisorDataService.tripadvisorCrawlNhaTrang()).data;
            }
            else if (cityName === 'Đà Lạt') {
                run = await (await TripadvisorDataService.tripadvisorCrawlDaLat()).data;
            }
        } else if (webName === 'booking.com'){
            if (cityName === 'Hà Nội') {
                run = await (await BookingDataService.bookingCrawlHanoi()).data;
            }
            else if (cityName === 'Thành phố Hồ Chí Minh') {
                run = await (await BookingDataService.bookingCrawlHoChiMinh()).data;
            }
            else if (cityName === 'Nha Trang') {
                run = await (await BookingDataService.bookingCrawlNhaTrang()).data;
            }
            else if (cityName === 'Đà Lạt') {
                run = await (await BookingDataService.bookingCrawlDaLat()).data;
            }
        }
        // const run = await (await TaskDataService.run()).data;
        await this.setState({
            runData: run,
            webName
        });
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
        <div className="col-lg-6">
            <Checkbox
                label={label}
                handleCheckboxChange={this.toggleCheckbox}
                key={label}
            />
        </div>
    )

    createCheckboxes = () => (
        items.map(this.createCheckbox)
    )

    render() {
        const { openModal } = this.state;
        return (
            <div>
                <Slidebar isCrawl={true}/>
                <RunningModal
                    showModal={openModal}
                />
                <Form className="form" >
                    <Form.Label className="form-label">Lựa chọn nguồn thu thập dữ liệu: </Form.Label>
                </Form>
                <Form className="form_select" inline>
                    <Form.Control as="select" id="webName" className="form-control">
                        <option>tripadvisor.com.vn</option>
                        <option>booking.com</option>
                    </Form.Control>
                    <Form.Control as="select" id="cityName" className="form-control">
                        <option>Hà Nội</option>
                        <option>Thành phố Hồ Chí Minh</option>
                        <option>Nha Trang</option>
                        <option>Đà Lạt</option>
                    </Form.Control>
                </Form>
                <Form>
                    <Form.Label className="form form-label">Các tiêu chí muốn thu thập: </Form.Label>
                    <div className="form_select">
                        <form onSubmit={this.handleStart}>
                            <div className="checkbox_container">
                                {this.createCheckboxes()}
                            </div>
                        </form>
                    </div>
                    <Button variant="primary" className="button-start" onClick={this.handleStart}>Start</Button>
                </Form>
            </div>
        );
    }
}
export default Body;