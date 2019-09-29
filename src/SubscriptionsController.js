import firebase from 'firebase/app';
import 'firebase/firestore';

class SubscriptionsController {
    constructor() {
        debugger;
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

    deactivate(id) {
        return this.db.collection('subscriptions')
            .doc(id)
            .set({
                expired: true
            }, {merge: true})
    }

    getSubscriptionsByAuth(auth) {
        return this.db.collection("subscriptions")
            .where('subscription.keys.auth', '==', auth)
            .where('expired', '==', false)
            .get()
    }
}

let subscriptionsController = null;

const getSubscriptionsController = () => {
    if (subscriptionsController === null) {
        subscriptionsController = new SubscriptionsController();
    }
    return subscriptionsController;
};

export default getSubscriptionsController