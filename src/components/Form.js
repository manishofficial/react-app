import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

class EntryForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('http://127.0.0.1:8000/api/react-app', {
          method: 'POST',
          body: data,
        }).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            if (data.status === false) {
                var errors = data.msg;
                if(errors.phone){
                    toast.error( errors.phone[0] );
                }
                if(errors.store){
                    toast.error( errors.store[0] );
                }
                if(errors.file){
                    toast.error( errors.file[0] );
                }
            }else{
                toast.success(data.msg);
            }
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            toast.error('There was an error!');
        });
    }
    

    render(){
        return (
            <>
                <Container>
                    <ToastContainer />
                    <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Create Record</h1>
                    <Row className="mt-5">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Phone: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter phone" name="phone" />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Shop: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter shop name" name="store" />
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload HTML File: </Form.Label>
                                    <Form.Control type="file" name="file" accept=".html, .htm"/>
                                </Form.Group>

                                <Button variant="success btn-block" type="submit" className="mt-2">
                                    Save
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

export default EntryForm;