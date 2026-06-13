// ============================================================
// CONFIGURATION
// ============================================================

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
        '\u{1F4DE} *Phone:* ' + phone + '\n\n' +
        '\u{1F3E2} *Branch:* ' + branchName + '\n\n' +
        '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n' +
        'Booked via ' + CLINIC_NAME + ' Online'
    );

    // WhatsApp URL
    var whatsappURL = 'https://wa.me/' + whatsappNumber + '?text=' + whatsappText;

    // Redirect to WhatsApp after a brief moment
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
