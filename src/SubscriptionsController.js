import firebase from 'firebase'

export default class SubscriptionsController {
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyDK7-_gtT3Y3JTHHU-P8zII8hCDQbK_vGk",
            authDomain: "courtschecks.firebaseapp.com",
            projectId: "courtschecks",
        });

        this.db = firebase.firestore()
    }

    save(data) {
        return this.db.collection("subscriptions").doc()
            .set(data)
    }
}