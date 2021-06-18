import React, { Component } from "react";
import { setStateAsync } from "../../helper";
import { Button, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import TripadvisorDataService from "../../services/tripadvisor";
import MyAppService from "../../services/myApp.service";
import MenuAction from "./MenuAction";
import Slidebar from "./Slidebar";
import Footer from "./Footer";
import { Link } from 'react-router-dom';

class DataProcessing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.setStateAsync = setStateAsync.bind(this);
    }

    componentDidMount() {
        this.fetchInitData();
    }

    // componentDidUpdate() {
    //     this.fetchInitData();
    // }

    fetchInitData = async () => {
        const data = await (await MyAppService.getAll()).data.myapp;
        console.log(data);
        this.setState({data});
    }

    handleInputChange(e, id) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        if (value) {
            window.alert(`Data có id: ${id} sẽ được chọn là 1 trong 5 khách sạn đề cử`);
        }
      }

    render() {
        const { data } = this.state;
        return (<>
            <Slidebar/>
            <div className="menubar">
                <MenuAction setData={(newData) => this.setState({ data: newData })}/>
            </div>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>District</th>
                            <th>Place</th>
                            <th>Convenient</th>
                            <th>Room type</th>
                            <th>Comment</th>
                            {/* <th>Price</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data) =>
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.district}</td>
                                <td>{data.place}</td>
                                <td>{data.convenient ? data.convenient.length : ''}</td>
                                <td>{data.roomtype ? data.roomtype.length : ''}</td>
                                <td>{data.comment ? data.comment.length : ''}</td>
                                {/* <td>1234567 VND</td> */}
                                <td>
                                    <Button variant="secondary" size="sm" >Delete</Button>
                                    <Link to={`/detail/${data.name}`}>
                                        <Button variant="primary" size="sm" style={{marginTop: '5px'}} >View</Button>
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <Footer/>
            </>
        );
    }
}

export default DataProcessing;
