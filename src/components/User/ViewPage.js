import React, { Component } from "react";
import { setStateAsync } from "../../helper";
import { Button, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import TripadvisorDataService from "../../services/tripadvisorhanoi";
// import MenuAction from "./MenuAction";
// import Slidebar from "./Slidebar";
import "./User.css";

class ViewPage extends Component {
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
        const data = await (await TripadvisorDataService.getDataByName()).data.tripadvisorhanoi[0];
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
            <div>
                <span className="name">{data.name}</span>
                <img className="img" src={data.img}></img>
            </div>
            </>
        );
    }
}

export default ViewPage;
