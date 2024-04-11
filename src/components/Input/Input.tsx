import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { issuesSlice } from '../../redux/slices/issuesSlice';
import { changeUrlIssues, changeUrlAbout } from '../../utils/changeURL';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, Col} from 'react-bootstrap';
import { FormEvent } from 'react';

const Input:React.FC = () => {
    const dispatch = useDispatch();
    const { loadIssues, loadRepoInfo } = issuesSlice.actions;
    const [input, setInput] = useState('');

    const fetchData = async (url: string) => {
        const response = await fetch(url);
        return await response.json();
    };

    const loadFromApi = async (e : FormEvent) => {
        e.preventDefault();
        try {
            const [dataIssues, dataCommon] = await Promise.all([
                fetchData(changeUrlIssues(input)),
                fetchData(changeUrlAbout(input))
            ]);

            const storedData = sessionStorage.getItem(dataCommon.html_url);
            const issuesData = storedData ? JSON.parse(storedData) : dataIssues;

            dispatch(loadIssues(issuesData));
            dispatch(loadRepoInfo(dataCommon));
            setInput('');
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    return (
        <Container className="todo__form">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Form onSubmit={loadFromApi}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicUrl">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter repo url"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="auto">
                                <Button variant="primary" type="submit">
                                    Load issues
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

}

export default Input;