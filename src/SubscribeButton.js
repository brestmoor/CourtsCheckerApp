import React from 'react';
import {ToastProvider, useToasts} from 'react-toast-notifications'
import Button from "react-bootstrap/Button";

const SubscribeButton = ({onClick}) => {
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