import React, { Component } from "react";
import "./AdminPage.css";
import { Container } from "react-bootstrap";
import Header from "../Layout/Header";
import Body from "../Layout/Body";
import Footer from "../Layout/Footer";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderSelected: {},
      handleSelectFolder: this.handleSelectFolder,
      noteSelected: {},
      handleSelectNote: this.handleSelectNote,
    };
  }

  handleSelectFolder = (folderSelected) => {
    this.setState({ folderSelected });
  };

  handleSelectNote = (noteSelected) => {
    this.setState({ noteSelected });
  };

  render() {
    return (
      <div className="App">
        <Container fluid style={{paddingLeft: '0px'}}>
          <Header/>
          <Body/>
          <Footer/>
        </Container>
      </div>
    );
  }
}

export default AdminPage;
