/*
=====================================================
 G-Glam
 Firebase Cloud Messaging Service Worker
 الملف: firebase-messaging-sw.js
=====================================================
*/

importScripts(
    "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js"
);


/*
=====================================================
 FIREBASE CONFIG
=====================================================
*/

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


/*
=====================================================
 FIREBASE MESSAGING
=====================================================
*/

const messaging =
    firebase.messaging();


/*
=====================================================
 BACKGROUND MESSAGE
=====================================================
*/

messaging.onBackgroundMessage(
    function (payload) {

        console.log(
            "[firebase-messaging-sw.js] رسالة جديدة:",
            payload
        );


        const notificationTitle =
            payload.notification?.title ||
            payload.data?.title ||
            "طلب جديد";


        const notificationBody =
            payload.notification?.body ||
            payload.data?.body ||
            "لديك طلب جديد في متجرك";


        const notificationIcon =
            payload.notification?.icon ||
            payload.data?.icon ||
            "/logotrans.png";


        const notificationOptions = {

            body:
                notificationBody,

            icon:
                notificationIcon,

            badge:
                "/logotrans.png",

            dir:
                "rtl",

            lang:
                "ar",

            tag:
                "g-glam-new-order",

            renotify:
                true,

            requireInteraction:
                true,

            data: {

                url:
                    "/orders.html",

                orderId:
                    payload.data?.orderId ||
                    ""

            }

        };


        return self.registration.showNotification(
            notificationTitle,
            notificationOptions
        );

    }
);


/*
=====================================================
 NOTIFICATION CLICK
=====================================================
*/

self.addEventListener(
    "notificationclick",
    function (event) {

        event.notification.close();


        const notificationData =
            event.notification.data || {};


        const targetUrl =
            notificationData.url ||
            "/orders.html";


        event.waitUntil(

            clients.matchAll({

                type:
                    "window",

                includeUncontrolled:
                    true

            })

            .then(
                function (clientList) {

                    for (
                        const client of clientList
                    ) {

                        if (
                            "focus" in client
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


/*
=====================================================
 SERVICE WORKER INSTALL
=====================================================
*/

self.addEventListener(
    "install",
    function () {

        console.log(
            "G-Glam FCM Service Worker installed."
        );

        self.skipWaiting();

    }
);


/*
=====================================================
 SERVICE WORKER ACTIVATE
=====================================================
*/

self.addEventListener(
    "activate",
    function (event) {

        console.log(
            "G-Glam FCM Service Worker activated."
        );

        event.waitUntil(
            self.clients.claim()
        );

    }
);
