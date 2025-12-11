function showPage(id) {
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
}

// SEARCH PRODUCT
function searchProduct() {
    let query = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll(".product-card");

    items.forEach(card => {
        let title = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    });
}

// FORM VALIDATION
function submitForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let msgBox = document.getElementById("messageBox").value.trim();
    let output = document.getElementById("message");

    output.innerHTML = "";
    output.className = "";

    if (name === "" || email === "" || phone === "" || msgBox === "") {
        output.classList.add("error");
        output.innerHTML = "All fields are required!";
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        output.classList.add("error");
        output.innerHTML = "Invalid Email!";
        return;
    }

    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        output.classList.add("error");
        output.innerHTML = "Phone must be 10 digits!";
        return;
    }

    output.classList.add("success");
    output.innerHTML = "Message sent successfully!";

    document.getElementById("contactForm").reset();
}
