// ============================================================
// CONFIGURATION - Update these with your details
// ============================================================

// EmailJS (free at https://www.emailjs.com - 200 emails/month)
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';       // EmailJS > Account > Public Key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';      // EmailJS > Email Services > Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // EmailJS > Email Templates > Template ID

// Business WhatsApp numbers per branch
const WHATSAPP_NUMBERS = {
    dubai: '971544630447',
    sharjah: '971528434127'
};

// Clinic name
const CLINIC_NAME = 'Shanthi Wellness Medical Center';

// ============================================================
// APP LOGIC
// ============================================================

// Initialize EmailJS (only if configured)
try {
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
} catch (err) {
    console.warn('EmailJS init skipped:', err);
}

// Form submission
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = document.getElementById('submitBtn');
    var btnText = btn.querySelector('.btn-text');
    var btnLoading = btn.querySelector('.btn-loading');

    btn.disabled = true;
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');

    // Collect form data
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var branch = document.getElementById('branch').value;

    // Get branch name
    var branchName = branch === 'dubai' ? 'Dubai' : 'Sharjah';

    // Get WhatsApp number based on selected branch
    var whatsappNumber = WHATSAPP_NUMBERS[branch] || WHATSAPP_NUMBERS.dubai;

    // Build WhatsApp message
    var whatsappText = encodeURIComponent(
        '\u{1F64F} *New Appointment Booking*\n' +
        '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n' +
        '\u{1F464} *Patient:* ' + name + '\n' +
        '\u{1F4DE} *Phone:* ' + phone + '\n' +
        '\u{1F4E7} *Email:* ' + email + '\n\n' +
        '\u{1F3E2} *Branch:* ' + branchName + '\n\n' +
        '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n' +
        'Booked via ' + CLINIC_NAME + ' Online'
    );

    // WhatsApp URL
    var whatsappURL = 'https://wa.me/' + whatsappNumber + '?text=' + whatsappText;

    // Try sending email in background, but always redirect to WhatsApp
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: email,
            to_name: name,
            phone: phone,
            branch: branchName,
            clinic_name: CLINIC_NAME
        }).catch(function (err) {
            console.warn('Email send failed:', err);
        });
    }

    // Redirect to WhatsApp after a brief moment (so user sees the loading)
    setTimeout(function () {
        window.open(whatsappURL, '_blank');

        // Reset button after redirect
        setTimeout(function () {
            btn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
        }, 1000);
    }, 800);
});
