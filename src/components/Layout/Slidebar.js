import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import "./Layout.css";

class Slidebar extends Component {

    render() {
        return (
            <div className="slidebar">
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/">Crawl Data</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/data-processing">Data Processing</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}
export default Slidebar;