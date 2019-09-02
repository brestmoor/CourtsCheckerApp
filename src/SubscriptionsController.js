import firebase from 'firebase/app';
import 'firebase/firestore';

export default class SubscriptionsController {
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyA4jEaLGE06Pjefzdw1adg6KWm7iwprwas",
            authDomain: "total-glider-242914.firebaseapp.com",
            projectId: "total-glider-242914",
        });

        this.db = firebase.firestore()
    }

    save(data) {
        return this.db.collection("subscriptions").doc()
            .set(data)
    }
}