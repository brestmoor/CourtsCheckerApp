import React from 'react';
import {ToastProvider, useToasts} from 'react-toast-notifications'
import Button from "react-bootstrap/Button";

const SubscribeButton = ({onClick}) => {
    let {addToast} = useToasts();
    const buttonOnClick = () => {
        onClick()
            .then(() => addToast('You will get notified, as soon as a court is free', {
                placement: 'bottom-center',
                appearance: 'success',
                autoDismissTimeout: 4000,
                autoDismiss: true
            }))
    };

    return (
        <Button variant="info"
                onClick={buttonOnClick}>Notify me!
        </Button>
    );
};

const SubscribeButtonWithToast = ({onClick}) => {
    return (
        <ToastProvider>
            <SubscribeButton onClick={onClick}/>
        </ToastProvider>
    )
};

export default SubscribeButtonWithToast;