import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DatePicker from "react-datepicker/es";
import * as subscribing from "./subscribing.js";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import './app.scss'
import en from "date-fns/locale/en-GB";
import ActiveSubscriptionsTable from "./ActiveSubscriptionsTable";
import {ToastProvider, useToasts} from "react-toast-notifications";
import getSubscriptionsController from "./SubscriptionsController";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


const App = () => {
    const subscriptionsController = getSubscriptionsController();

    const [date, setDate] = useState(new Date());
    const [fromTime, setFromTime] = useState(new Date(2000, 1, 1, 17, 0));
    const [toTime, setToTime] = useState(new Date(2000, 1, 1, 21, 0));
    const [subscriptions, setSubscriptions] = useState([]);

    const {addToast} = useToasts();

    const subscribe = () => {
        return subscribing.askPermission()
            .then(subscribing.subscribeUserToPush)
            .then(subscription => subscriptionsController.save({
                date: date,
                fromTime: {hour: fromTime.getHours(), minute: fromTime.getMinutes()},
                toTime: {hour: toTime.getHours(), minute: toTime.getMinutes()},
                expired: false,
                subscription: JSON.parse(JSON.stringify(subscription))
            }))
            .catch(console.log)
    };

    const updateActiveSubscriptions = () => {
        if (Notification.permission === "granted") {
            subscribing.subscribeUserToPush()
                .then(subscriptionData => subscriptionsController.getSubscriptionsByAuth(JSON.parse(JSON.stringify(subscriptionData)).keys.auth))
                .then(activeSubscriptions => {
                debugger;
                    setSubscriptions(activeSubscriptions.docs.map(
                        sub => ({
                                id: sub.id,
                                timeFrom: sub.data().fromTime,
                                timeTo: sub.data().toTime,
                                date: sub.data().date
                            }
                        ))
                    )
                })
        }
    };

    useEffect(updateActiveSubscriptions, []);

    const popperModifiers = {
        computeStyle: {gpuAcceleration: false}
    };

    const onSubscribeClick = () => subscribe()
        .then(updateActiveSubscriptions)
        .then(() => addToast('You will get notified, as soon as a court is free', {
            appearance: 'success',
            autoDismiss: true
        }));

    return (
        <Container className="datepickers-container">
            <Row>
                <div className="top-bar"><span>Courts Checker</span></div>
            </Row>
            <Row>
                <Col>
                    <Card className="button-container"><Row>
                        <Col lg={3} className="datepicker-container">
                            <span className="datepicker-label">Date: </span>
                            <div className='datepicker-date'><DatePicker
                                selected={date}
                                onChange={(value) => setDate(new Date(value))}
                                className="form-control"
                                popperModifiers={popperModifiers}
                                dateFormat="d/MM/yyyy"
                                locale={en}
                            /></div>
                        </Col>
                        <Col xs={6} lg={3} className="datepicker-container">
                            <span className="datepicker-label">From: </span>
                            <DatePicker
                                selected={fromTime}
                                onChange={(value) => setFromTime(new Date(value))}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                dateFormat="HH:mm"
                                timeFormat="HH:mm"
                                timeCaption="Time"
                                className="form-control datepicker"
                                popperModifiers={popperModifiers}
                            />
                        </Col>
                        <Col xs={6} lg={3} className="datepicker-container justify-content-right">
                            <span className="datepicker-label">To: </span>
                            <DatePicker
                                selected={toTime}
                                onChange={(value) => setToTime(value)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                dateFormat="HH:mm"
                                timeFormat="HH:mm"
                                timeCaption="Time"
                                className="form-control datepicker"
                                popperModifiers={popperModifiers}
                            />
                        </Col>
                        <Col lg={3} className="datepicker-container">
                            <div className='subscribe-button-container'>
                                <Button variant="info"
                                        onClick={onSubscribeClick}>Notify me!
                                </Button>
                            </div>
                        </Col>
                    </Row></Card>
                    <Row>
                        <Col className={'active-subscriptions'}>
                            <h5 className="active-subscriptions-label">Active subscriptions</h5>
                            <ActiveSubscriptionsTable
                                onDelete={
                                    (id) => subscriptionsController.deactivate(id)
                                        .then(() => addToast("Subscription removed", {appearance: 'success', autoDismiss: true}))
                                        .then(updateActiveSubscriptions)

                                } subscriptions={subscriptions}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );

};

const AppWithToast = () =>
    (<ToastProvider placement="top-center" autoDismissTimeout={2000} autoDismiss={true}>
        <App/>
    </ToastProvider>);

export default AppWithToast;