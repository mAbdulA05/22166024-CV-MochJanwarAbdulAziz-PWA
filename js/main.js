document.addEventListener('DOMContentLoaded', () => {
    // Meminta izin notifikasi ketika aplikasi dimuat
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Notification permission denied.');
        }
    });


    // Mendaftarkan Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => {
            console.log('Service Worker berhasil terdaftar');
            requestNotificationPermission();  // Meminta izin notifikasi setelah SW terdaftar
        })
        .catch(error => console.log('Pendaftaran Service Worker gagal:', error));
}

// Meminta izin notifikasi
function requestNotificationPermission() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showWelcomeNotification(); // Menampilkan notifikasi selamat datang
                console.log('Izin notifikasi diberikan.');
            } else {
                console.log('Izin notifikasi ditolak.');
            }
        });
    } else {
        console.log('Browser tidak mendukung notifikasi atau Service Worker.');
    }
}

// Menampilkan notifikasi selamat datang
function showWelcomeNotification() {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            if (reg) {
                reg.showNotification("🎉 Selamat Datang di Portofolio Saya!", {
                    body: "Terima kasih sudah berkunjung! Jelajahi proyek dan keterampilan saya di sini. Semoga Anda terinspirasi!",
                    icon: "/path/to/icon.png",  // Ganti dengan path ikon PWA Anda
                    badge: "/path/to/badge-icon.png", // Ganti dengan ikon badge jika ada (opsional)
                    vibrate: [200, 100, 200],   // Pola getaran (opsional)
                    actions: [
                        { action: 'explore', title: 'Lihat Proyek', icon: '/path/to/explore-icon.png' },
                        { action: 'close', title: 'Tutup', icon: '/path/to/close-icon.png' }
                    ]
                });
            }
        });
    }
}


    

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    navigator.serviceWorker.ready.then(registration => {
        return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('<Your-VAPID-Public-Key>')
        });
    }).then(subscription => {
        return fetch('http://localhost:8080/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });
    
    
// Daftarkan push subscription
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('<Your-VAPID-Public-Key>')
        };

        return registration.pushManager.subscribe(subscribeOptions);
    }).then(pushSubscription => {
        console.log('Received PushSubscription:', JSON.stringify(pushSubscription));
        // Kirim pushSubscription ke server
        return fetch('/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pushSubscription)
        });
    }).then(response => {
        if (response.ok) {
            console.log('User subscribed to push notifications.');
        }
    }).catch(error => {
        console.error('Failed to subscribe the user: ', error);
    });
}
});

// Fungsi untuk konversi VAPID key
function urlBase64ToUint8Array(base64String) {
const padding = '='.repeat((4 - base64String.length % 4) % 4);
const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
const rawData = window.atob(base64);
const outputArray = new Uint8Array(rawData.length);

for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
}
return outputArray;
}








(function ($) {
    "use strict";
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 30
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    

    // Typed Initiate
    if ($('.header h2').length == 1) {
        var typed_strings = $('.header .typed-text').text();
        var typed = new Typed('.header h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Review slider
    $('.review-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);

