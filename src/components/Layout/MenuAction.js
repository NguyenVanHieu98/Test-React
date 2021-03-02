import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import "./Layout.css";
import Form from 'react-bootstrap/Form';
import ListBill from './ListBill';
import TripadvisorDataService from "../../services/tripadvisorhanoi";

class MenuAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showBill: false,
        };
    }

    handleShowBill = () => {
        this.setState({
            showBill: true,
        })
    }

    handleInputChange = async (e) => {
        e.preventDefault();
        const { setData } = this.props;
        let data;
        if(this.search.value === "") {
            data = await (await TripadvisorDataService.getAll()).data.tripadvisorhanoi;
        } else {
            data = await (await TripadvisorDataService.getDataLikeName(this.search.value)).data.tripadvisorhanoi; 
        }
        setData(data);
    }


    render() {
        const { showBill } = this.state;
        return (
            <div className="menu-action">
                <ListBill 
                    showBill={showBill}
                    handleClose={() => this.setState({ showBill: false })}                
                />
                <Nav>
                    <Nav.Item>
                        <Nav.Link style={{color: "red"}}>Search by city: 
                            <Form as="select" style={{"margin-left": "5px", border: "none", "background-color": "white", color: "red" }}>
                                <option>Hà Nội</option>
                                <option>Đà Nẵng</option>
                                <option>Đà Lạt</option>
                                <option>Hồ Chí Minh</option>
                            </Form>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{color: "red" }}>                           
                            <input type="text" style={{"margin-left": "5px",border: "none", "width": "300%", "background-color": "white", color: "red" }} placeholder="Search by name..." ref={input => this.search = input} onChange={this.handleInputChange}/>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={this.handleShowBill} style={{color: "red", marginLeft: '500px'}}>List Bill</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}
export default MenuAction;