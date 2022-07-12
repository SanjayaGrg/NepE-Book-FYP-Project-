import "./App.css";
import React, { useState } from "react";
import { onMessageListener } from "./firebase";
import Notifications from './components/notification/Notification';
import ReactNotificationComponent from './components/notification/ReactNotificationComponent';

function Notify() {
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({ title: "", body: "" });

    console.log(show, notification);

    onMessageListener()
        .then((payload) => {
            setShow(true);
            setNotification({
                title: payload.notification.title,
                body: payload.notification.body,
            });
            console.log(payload);
        })
        .catch((err) => console.log("failed: ", err));

    return (
        <div className="Notify">
            {show ? (
                <ReactNotificationComponent
                    title={notification.title}
                    body={notification.body}
                />
            ) : (
                <></>
            )}
            <Notifications />
            {/* <Fader text="Hello React"></Fader> */}
        </div>
    );
}

export default Notify 