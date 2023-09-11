import { Store } from "react-notifications-component";

export default function showNotification(title, message, type){
    Store.addNotification({
        title: title,
        message: message,
        type: type,
        container: "top-right",
        dismiss: {
            duration: 3000,
            onScreen: true
        }
        }); 
}