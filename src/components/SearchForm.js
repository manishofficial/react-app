import React, { useState } from 'react';
import {Col, Container, Form, Row, Modal, ListGroup} from "react-bootstrap";

function SearchForm(){
    const [data, setData] = useState([]);
    const [fullscreen, setFullscreen] = useState(true);
    const [modalTitle, setModalTitle] = useState([]);
    const [modalFiles, setModalFiles] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [show, setShow] = useState(false);
    async function search(key){
        if (key.length > 0) {
            let result = await fetch(`http://127.0.0.1:8000/api/react-app/${key}`)
            result = await result.json();
            setData(result.data);
        }else{
            setData([]);
        }
        setSearchKey(key);
    }

    function handleShow(modal) {
        setFullscreen(modal);
        setModalTitle(modal.store);
        setModalFiles(modal.file);
        setShow(true);
    }
    return (
        <Container>
            <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Search</h1>
            <Row className="mt-5">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form.Group controlId="formSearch">
                        <Form.Control type="text" placeholder="Enter keyword" name="phone" onChange={(e) => search(e.target.value)} autoComplete="off" />
                        {
                            data.length > 0?
                            <ListGroup>
                                {data.map((d,key) => (
                                    <ListGroup.Item key={key} action onClick={() => handleShow(d)}>
                                        {d.store}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>:searchKey.length > 0 ? <h6>Nothing Found!!</h6>:<h6>Type Someting for search..</h6>
                        }
                    </Form.Group>
                </Col>
            </Row>

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        modalFiles.length > 0?
                        <ListGroup>
                            {modalFiles.map((file,key) => (
                                <a key={key} target='_blank' href={file} rel="noopener noreferrer">
                                    <ListGroup.Item>{file.split('/').pop()}</ListGroup.Item>
                                </a>
                            ))}
                        </ListGroup>:<h3>No Files Found</h3>
                    }
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default SearchForm;