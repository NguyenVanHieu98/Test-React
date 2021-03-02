import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "./User.css";
import { signInWithGoogle } from "../../firebase";

class SignInModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreen: false,
        };
    }

    handleSubmit = async () => {
        console.log(1);
    }

    render() {
        const { showModal, handleClose } = this.props;
        return (
            <div className="modal">
                <Modal show={showModal} size="lg">
                    <div className="signin">
                        <h1>Sign In</h1>
                        <div>
                            <Button onClick={signInWithGoogle} variant="outline-success">
                                Sign in with Google
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default SignInModal;