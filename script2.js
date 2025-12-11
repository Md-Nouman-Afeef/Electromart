function showPage(id) {
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
    });
    document.getElementById(id).style.display = "block";

    if (id === "payment") {
        document.getElementById("payAmount").innerText = totalAmount;
    }
}

// SEARCH PRODUCTS
function searchProduct() {
    let query = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll(".product-card");

    items.forEach(card => {
        let title = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    });
}

// CONTACT FORM VALIDATION
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

/* ------------------ CART SYSTEM ------------------ */

let cart = [];
let totalAmount = 0;

// ADD TO CART
function addToCart(name, price) {
    let item = cart.find(product => product.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCart();
    alert(name + " added to cart!");
}

// UPDATE CART DISPLAY
function updateCart() {
    let cartDiv = document.getElementById("cartItems");
    cartDiv.innerHTML = "";
    totalAmount = 0;

    cart.forEach((item, index) => {
        let cost = item.qty * item.price;
        totalAmount += cost;

        cartDiv.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>Price: $${item.price}</p>

                <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                ${item.qty}
                <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>

                <p>Total: $${cost}</p>
            </div>
        `;
    });

    document.getElementById("totalAmount").innerText = totalAmount;
    document.getElementById("payAmount").innerText = totalAmount;
}

// CHANGE QUANTITY
function changeQty(index, value) {
    cart[index].qty += value;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}
