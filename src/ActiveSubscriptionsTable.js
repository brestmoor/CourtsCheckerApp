import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import format from 'date-fns/esm/format'
import {FaTimes} from 'react-icons/fa'

const ActiveSubscriptionsTable = ({subscriptions, onDelete}) => {

    const formatTimeReadable = (time) => {
        return time.hour + ':' + formatMinute(time.minute)
    };

    const formatMinute = (minute) => {
        return ("0" + minute).slice(-2)
    };

    const renderHeader = () => {
        return (
            <Row className={'subscription-headers'}>
                <Col xs={5}>Date</Col>
                <Col xs={3}>From</Col>
                <Col xs={3}>To</Col>
                <Col xs={1} />
            </Row>
        )
    };

    const renderRows = (subscriptions) => {

        return subscriptions.map((subscription, idx) =>
            renderTableRow(subscription, idx)
        );
    };


    const renderTableRow = (subscription, idx) => {
        return (
            <Row key={idx}>
                <Col xs={5}>{format(subscription.date.toDate(), 'yyyy-MM-dd')}</Col>
                <Col xs={3}>{formatTimeReadable(subscription.timeFrom)}</Col>
                <Col xs={3}>{formatTimeReadable(subscription.timeTo)}</Col>
                <Col xs={1} className='cancel-subscription-container'>
                    <div className="cancel-subscription" onClick={() => onDelete(subscription.id)}><FaTimes/></div>
                </Col>
            </Row>
        )
    };

    return (
        <Card className={'subscriptions-table'}>
            {renderHeader()}
            {renderRows(subscriptions)}
        </Card>
    );
};

export default ActiveSubscriptionsTable;