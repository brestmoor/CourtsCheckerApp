import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import DatePicker from "react-datepicker/es";
import * as subscribing from "./subscribing.js";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import './app.scss'
import SubscriptionsController from "./SubscriptionsController";


class App extends Component {
    subscriptionsController = new SubscriptionsController();

    state = {
        date: new Date(),
        fromTime: new Date(2000, 1, 1, 17, 0),
        toTime: new Date(2000, 1, 1, 21, 0)
    };

    subscribe = () => {
        subscribing.askPermission()
            .then(subscribing.subscribeUserToPush)
            .then(subscription => this.subscriptionsController.save({
                date: this.state.date,
                fromTime: {hour: this.state.fromTime.getHours(), minute: this.state.fromTime.getMinutes()},
                toTime: {hour: this.state.toTime.getHours(), minute: this.state.toTime.getMinutes()},
                expired: false,
                subscription: JSON.parse(JSON.stringify(subscription))
            }))
            .catch(console.log)
    };

    render() {
        const popperModifiers = {
            computeStyle: {gpuAcceleration: false}
        };

        return (
            <Container className="datepickers-container">
                <Row>
                    <Col>
                        <Row>
                            <Col className="justify-content-center">
                                <div className="datepicker-component">
                                    <span>Date: </span>
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={(value) => this.setState({date: new Date(value)})}
                                        className="form-control"
                                        popperModifiers={popperModifiers}
                                        dateFormat="d/MM/yyyy"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="justify-content-space-between">
                                <div className="datepicker-component">
                                    <span>From: </span>
                                    <DatePicker
                                        selected={this.state.fromTime}
                                        onChange={(value) => this.setState({fromTime: new Date(value)})}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        dateFormat="HH:mm"
                                        timeFormat="HH:mm"
                                        timeCaption="Time"
                                        className="form-control datepicker"
                                        popperModifiers={popperModifiers}
                                    />
                                </div>
                                <div className="datepicker-component">
                                    <span>To: </span>
                                    <DatePicker
                                        selected={this.state.toTime}
                                        onChange={(value) => this.setState({toTime: value})}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        dateFormat="HH:mm"
                                        timeFormat="HH:mm"
                                        timeCaption="Time"
                                        className="form-control datepicker"
                                        popperModifiers={popperModifiers}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="justify-content-right">
                                    <div className="datepicker-component"><Button variant="info"
                                                                                  onClick={this.subscribe}>Notify
                                        me!</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;