import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import "./Layout.css";
import Form from 'react-bootstrap/Form';
import TripadvisorDataService from "../../services/tripadvisor";

class MenuAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showBill: false,
            showHistory: false
        };
    }

    handleInputChange = async (e) => {
        e.preventDefault();
        const { setData } = this.props;
        let data;
        if(this.search.value === "") {
            data = await (await TripadvisorDataService.getAll()).data.tripadvisor;
        } else {
            data = await (await TripadvisorDataService.getDataLikeName(this.search.value)).data.tripadvisor; 
        }
        setData(data);
    }

    render() {
        return (
            <div className="menu-action">
                <Nav>
                    <Nav.Item>
                        <Nav.Link>Search by city: 
                            <Form as="select" style={{"margin-left": "5px", borderStyle: "ridge", "background-color": "white", height: '30px' }}>
                                <option>Hà Nội</option>
                                <option>Đà Nẵng</option>
                                <option>Đà Lạt</option>
                                <option>Hồ Chí Minh</option>
                            </Form>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{color: "red" }}>                           
                            <input type="text" style={{"margin-left": "5px",borderStyle: 'grove', "width": "300%", "background-color": "white" }} placeholder="Search by name..." ref={input => this.search = input} onChange={this.handleInputChange}/>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}
export default MenuAction;