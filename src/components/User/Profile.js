import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Folder from "../Folder/Folder";
import Note from "../Note/Note";
import Notepad from "../../assets/notepad.svg";
import AppContext from "../../AppContext";
import { UserContext } from "../../providers/UserProvider";
import SignIn from "../SignIn/SignIn";


class Profile extends Component {
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
    // console.log(user);
    return (
      <AppContext.Provider value={this.state}>
        <UserContext.Consumer>
          {(user) =>
            user ? (
              <div className="App">
                <Container fluid>
                  <Row>
                    <Col md={3} className="border-right col-100vh">
                      <Header />
                      <Folder />
                    </Col>
                    <Col md={9} className="col-100vh">
                      <Note
                        folderID={this.state.folderSelected._id}
                        handleSelect={this.handleSelectNote}
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
            ) : (
                <SignIn />
              )
          }
        </UserContext.Consumer>
      </AppContext.Provider>
    );
  }
}

const Header = () => {
  return (
    <div className="App-header">
      <img alt="Inote Logo" className="App-logo" src={Notepad} />
       iNote App
    </div>
  );
};

export default Profile;
