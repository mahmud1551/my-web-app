// Fake account storage (In a real app, this data would be stored in a database)
let users = {};

// সাইন আপ ফাংশন
function signup() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // ইমেইল পাসওয়ার্ড সংরক্ষণ
    if (email && password) {
        users[email] = password;
        alert("সাইন আপ সফল!");
        showLogin();
    } else {
        alert("দয়া করে সঠিক তথ্য দিন!");
    }
}

// লগইন ফাংশন
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // লগইন যাচাই
    if (users[email] && users[email] === password) {
        alert("লগইন সফল!");
        showHomePage();
    } else {
        alert("ভুল ইমেইল বা পাসওয়ার্ড!");
    }
}

// লগইন পেজ দেখান
function showLogin() {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('signupPage').style.display = 'none';
}

// সাইন আপ পেজ দেখান
function showSignup() {
    document.getElementById('signupPage').style.display = 'block';
    document.getElementById('loginPage').style.display = 'none';
}

// হোমপেজ দেখান
function showHomePage() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'none';
}

// মেসেজ পাঠানোর ফাংশন
function sendMessage() {
    const message = document.getElementById('message').value;
    const recipientEmail = document.getElementById('recipientEmail').value;

    if (message && recipientEmail) {
        // এখানে মেসেজ পাঠানো হবে
        alert(`বার্তা পাঠানো হয়েছে ${recipientEmail} এর কাছে: ${message}`);
        
        // নোটিফিকেশন (এসএমএস) সিমুলেট করা
        alert(`নোটিফিকেশন: ${recipientEmail} এর কাছে বার্তা পাঠানো হয়েছে`);

        document.getElementById('message').value = ''; // Clear message box
    } else {
        alert("দয়া করে বার্তা এবং প্রাপক ইমেইল দিন!");
    }
}

// ফাইল শেয়ার করার ফাংশন
function shareFile() {
    alert("ফাইল শেয়ার করা হচ্ছে...");
}

// অডিও কল শুরুর ফাংশন
function startAudioCall() {
    alert("অডিও কল শুরু হচ্ছে...");
}

// ভিডিও কল শুরুর ফাংশন
function startVideoCall() {
    alert("ভিডিও কল শুরু হচ্ছে...");
}

