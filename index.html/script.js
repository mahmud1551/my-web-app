document.querySelectorAll('.add-money button').forEach(button => {
    button.addEventListener('click', function() {
        alert(`${this.textContent} দিয়ে মানি অ্যাড করা হচ্ছে...`);
    });
});
