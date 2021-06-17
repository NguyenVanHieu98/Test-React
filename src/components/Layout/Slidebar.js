import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import "./Layout.css";
import ListBill from './ListBill';
import History from './History';
class Slidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showBill: false,
            showHistory: false
        };
    }

    handleShowBill = () => {
        this.setState({
            showBill: true,
        })
    }

    handleShowHistory = () => {
        this.setState({
            showHistory: true,
        })
    }

    render() {
        const { showBill, showHistory } = this.state;
        const { isCrawl } = this.props;
        return (
            <div className="slidebar">
                {isCrawl ? (
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/">Crawl Data</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/data-processing">Data Processing</Nav.Link>
                        </Nav.Item>
                    </Nav>
                ) : (
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/">Crawl Data</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/data-processing">Data Processing</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.handleShowBill}>List Bill</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.handleShowHistory}>History</Nav.Link>
                        </Nav.Item>
                    </Nav>
                )}
                {showBill &&
                    <ListBill 
                        showBill={showBill}
                        handleClose={() => this.setState({ showBill: false })}                
                    />
                }
                {showHistory &&
                    <History
                        showHistory={showHistory}
                        handleClose={() => this.setState({ showHistory: false })}
                    />
                }
            </div>
        );
    }
}
export default Slidebar;