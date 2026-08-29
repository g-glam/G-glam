/* =====================================================
   G-GLAM FIREBASE CLOUD MESSAGING SERVICE WORKER
===================================================== */


/* =====================================================
   IMPORT FIREBASE COMPAT
===================================================== */

importScripts(
    "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js"
);


importScripts(
    "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js"
);


/* =====================================================
   FIREBASE CONFIG
===================================================== */

firebase.initializeApp({

    apiKey:
        "AIzaSyBqt5JH9AR1n4vdZlImLKB_jZi1jTe63Jo",

    authDomain:
        "g-glam.firebaseapp.com",

    projectId:
        "g-glam",

    storageBucket:
        "g-glam.firebasestorage.app",

    messagingSenderId:
        "997228419719",

    appId:
        "1:997228419719:web:f9d88de7ea2c6f457e3622",

    measurementId:
        "G-WX1K1F83F6"

});


/* =====================================================
   FIREBASE MESSAGING
===================================================== */

const messaging =
    firebase.messaging();


/* =====================================================
   BACKGROUND MESSAGE
===================================================== */

messaging.onBackgroundMessage(
    function(payload) {

        console.log(
            "G-Glam background message:",
            payload
        );


        const notification =
            payload.notification
            ||
            {};


        const title =
            notification.title
            ||
            "🛍️ طلب جديد";


        const body =
            notification.body
            ||
            "وصل طلب جديد إلى متجرك.";


        const icon =
            notification.icon
            ||
            "/G-glam/logotrans.png";


        const data =
            payload.data
            ||
            {};


        const notificationOptions = {

            body:
                body,

            icon:
                icon,

            badge:
                "/G-glam/logotrans.png",

            dir:
                "rtl",

            lang:
                "ar",

            tag:
                data.orderId
                ||
                "g-glam-order",

            renotify:
                true,

            requireInteraction:
                true,

            data: {

                url:
                    data.url
                    ||
                    "https://g-glam.github.io/G-glam/orders.html"

            }

        };


        return self.registration.showNotification(
            title,
            notificationOptions
        );

    }
);


/* =====================================================
   NOTIFICATION CLICK
===================================================== */

self.addEventListener(
    "notificationclick",
    function(event) {

        event.notification.close();


        const targetUrl =

            event.notification?.data?.url

            ||

            "https://g-glam.github.io/G-glam/orders.html";


        event.waitUntil(

            clients.matchAll({

                type:
                    "window",

                includeUncontrolled:
                    true

            })

            .then(
                function(clientList) {

                    for (
                        const client
                        of clientList
                    ) {

                        if (
                            client.url.includes(
                                "/G-glam/"
                            )
                            &&
                            "focus"
                            in client
                        ) {

                            client.navigate(
                                targetUrl
                            );


                            return client.focus();
                        }
                    }


                    if (
                        clients.openWindow
                    ) {

                        return clients.openWindow(
                            targetUrl
                        );
                    }

                }
            )

        );

    }
);


/* =====================================================
   SERVICE WORKER INSTALL
===================================================== */

self.addEventListener(
    "install",
    function(event) {

        console.log(
            "G-Glam Firebase Service Worker installed."
        );


        self.skipWaiting();

    }
);


/* =====================================================
   SERVICE WORKER ACTIVATE
===================================================== */

self.addEventListener(
    "activate",
    function(event) {

        console.log(
            "G-Glam Firebase Service Worker activated."
        );


        event.waitUntil(
            self.clients.claim()
        );

    }
);
