import React from 'react';
import format from 'date-fns/esm/format'
import {FaTimes} from 'react-icons/fa'
import Table from "react-bootstrap/Table";

const ActiveSubscriptionsTable = ({subscriptions, onDelete}) => {

    const formatTimeReadable = (time) => {
        return time.hour + ':' + formatMinute(time.minute)
    };

    const formatMinute = (minute) => {
        return ("0" + minute).slice(-2)
    };

    const renderHeader = () => {
        return (
            <thead>
            <tr className={'subscription-headers'}>
                <td>Date</td>
                <td>From</td>
                <td>To</td>
                <td/>
            </tr>
            </thead>
        )
    };

    const renderRows = (subscriptions) => {

        return <tbody>
        {subscriptions.map((subscription, idx) =>
            renderTableRow(subscription, idx)
        )}
        </tbody>;
    };


    const renderTableRow = (subscription, idx) => {
        return (
            <tr key={idx}>
                <td>{format(subscription.date.toDate(), 'yyyy-MM-dd')}</td>
                <td>{formatTimeReadable(subscription.timeFrom)}</td>
                <td>{formatTimeReadable(subscription.timeTo)}</td>
                <td className='cancel-subscription-container'>
                    <div className="cancel-subscription" onClick={() => onDelete(subscription.id)}><FaTimes/></div>
                </td>
            </tr>
        )
    };

    return (
        <div className={'subscriptions-table'}>
            <Table>
                {renderHeader()}
                {renderRows(subscriptions)}
            </Table>
        </div>
    );
};

export default ActiveSubscriptionsTable;