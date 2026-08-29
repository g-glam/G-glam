/* =========================================================
   G-Glam
   Firebase Cloud Messaging Service Worker
   GitHub Pages
   https://g-glam.github.io/G-glam/
========================================================= */


/* =========================================================
   FIREBASE COMPAT SDK
========================================================= */

importScripts(
    "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js"
);


/* =========================================================
   FIREBASE CONFIG
========================================================= */

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


/* =========================================================
   FIREBASE MESSAGING
========================================================= */

const messaging =
    firebase.messaging();


/* =========================================================
   BACKGROUND MESSAGE
========================================================= */

messaging.onBackgroundMessage(
    function(payload) {

        console.log(
            "[firebase-messaging-sw.js] رسالة جديدة:",
            payload
        );


        /* -------------------------------------------------
           الحصول على بيانات الإشعار
        ------------------------------------------------- */

        const notificationTitle =
            payload.notification &&
            payload.notification.title

                ?

            payload.notification.title

                :

            "G-Glam";


        const notificationBody =
            payload.notification &&
            payload.notification.body

                ?

            payload.notification.body

                :

            "لديك طلب جديد في متجرك";


        /* -------------------------------------------------
           خيارات الإشعار
        ------------------------------------------------- */

        const notificationOptions = {

            body:
                notificationBody,

            icon:
                "/G-glam/logotrans.png",

            badge:
                "/G-glam/logotrans.png",

            dir:
                "rtl",

            lang:
                "ar",

            vibrate:
                [
                    200,
                    100,
                    200,
                    100,
                    300
                ],

            tag:
                "g-glam-new-order",

            renotify:
                true,

            requireInteraction:
                false,

            data:
                {

                    url:
                        "https://g-glam.github.io/G-glam/orders.html"

                }

        };


        /* -------------------------------------------------
           إظهار الإشعار
        ------------------------------------------------- */

        return self.registration.showNotification(

            notificationTitle,

            notificationOptions

        );

    }
);


/* =========================================================
   NOTIFICATION CLICK
========================================================= */

self.addEventListener(
    "notificationclick",

    function(event) {

        console.log(
            "[firebase-messaging-sw.js] تم الضغط على الإشعار"
        );


        /* -------------------------------------------------
           إغلاق الإشعار
        ------------------------------------------------- */

        event.notification.close();


        /* -------------------------------------------------
           رابط صفحة الطلبات
        ------------------------------------------------- */

        const targetUrl =
            "https://g-glam.github.io/G-glam/orders.html";


        /* -------------------------------------------------
           فتح orders.html
        ------------------------------------------------- */

        event.waitUntil(

            clients.matchAll({

                type:
                    "window",

                includeUncontrolled:
                    true

            })

            .then(
                function(clientList) {

                    /* -------------------------------------
                       إذا كانت orders.html مفتوحة
                    ------------------------------------- */

                    for (
                        const client of clientList
                    ) {

                        if (
                            client.url.includes(
                                "/G-glam/orders.html"
                            )
                            &&
                            "focus" in client
                        ) {

                            return client.focus();

                        }

                    }


                    /* -------------------------------------
                       إذا لم تكن الصفحة مفتوحة
                    ------------------------------------- */

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


/* =========================================================
   SERVICE WORKER INSTALL
========================================================= */

self.addEventListener(
    "install",

    function(event) {

        console.log(
            "[firebase-messaging-sw.js] Service Worker installed"
        );

        self.skipWaiting();

    }

);


/* =========================================================
   SERVICE WORKER ACTIVATE
========================================================= */

self.addEventListener(
    "activate",

    function(event) {

        console.log(
            "[firebase-messaging-sw.js] Service Worker activated"
        );

        event.waitUntil(
            self.clients.claim()
        );

    }

);


/* =========================================================
   SERVICE WORKER MESSAGE
========================================================= */

self.addEventListener(
    "message",

    function(event) {

        console.log(
            "[firebase-messaging-sw.js] Message:",
            event.data
        );

    }

);
