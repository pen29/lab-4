// =========================
// TOP按鈕
// =========================

const topBtn = document.querySelector(".top-btn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });

}

// =========================
// Modal
// =========================

const modal = document.getElementById("productModal");

const cards = document.querySelectorAll(".card");

const closeBtn = document.querySelector(".close");

const modalTitle = document.getElementById("modalTitle");

const modalPrice = document.getElementById("modalPrice");

const modalDesc = document.getElementById("modalDesc");

const mainImg = document.getElementById("mainImg");

const cartBtn = document.querySelector(".cart-btn");

// =========================
// 購物車
// =========================

const navCart = document.querySelector(".nav-cart");

const cartSidebar = document.getElementById("cartSidebar");

const cartClose = document.getElementById("cartClose");

const cartItems = document.getElementById("cartItems");

const totalPrice = document.getElementById("totalPrice");

const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =========================
// 數量
// =========================

const minusBtn = document.getElementById("minusBtn");

const plusBtn = document.getElementById("plusBtn");

const qty = document.getElementById("qty");

let count = 1;

if (plusBtn) {

    plusBtn.addEventListener("click", () => {

        count++;

        qty.textContent = count;

    });

}





if (minusBtn) {

    minusBtn.addEventListener("click", () => {

        if (count > 1) {

            count--;

            qty.textContent = count;

        }

    });

}



// =========================
// 商品點擊
// =========================

let currentProduct = {};

cards.forEach(card => {

    card.addEventListener("click", () => {

        const name = card.dataset.name || card.querySelector("h3").textContent;

        const price = card.dataset.price || "$0";

        const desc = card.dataset.desc || "尚無商品介紹";

        const img = card.dataset.img || card.querySelector("img").src;

        currentProduct = {
            name,
            price,
            desc,
            img
        };

        modalTitle.textContent = name;

        modalPrice.textContent = price;

        modalDesc.textContent = desc;

        mainImg.src = img;

        count = 1;

        qty.textContent = count;

        modal.classList.add("show");

    });

});

// =========================
// 關閉modal
// =========================

closeBtn.addEventListener("click", () => {

    modal.classList.remove("show");

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("show");

    }

});

// =========================
// 加入購物車
// =========================

cartBtn.addEventListener("click", () => {

    const existing = cart.find(item => item.name === currentProduct.name);

    if (existing) {

        existing.qty += count;

    } else {

        cart.push({
            ...currentProduct,
            qty: count
        });

    }

    renderCart();
    

    modal.classList.remove("show");

});

// =========================
// 渲染購物車
// =========================

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-text">
                尚未加入商品
            </p>
        `;

        totalPrice.textContent = "$0";

        cartCount.textContent = "0";

        // 儲存
        localStorage.setItem("cart", JSON.stringify(cart));

        return;

    }

    cartItems.innerHTML = "";

    let total = 0;

    let totalQty = 0;

    cart.forEach((item, index) => {

        const priceNumber = parseInt(item.price.replace(/[^0-9]/g, ""));

        total += priceNumber * item.qty;

        totalQty += item.qty;

        cartItems.innerHTML += `
        
            <div class="cart-item">

                <img src="${item.img}">

                <div class="cart-info">

                    <h4>${item.name}</h4>

                    <p>${item.price}</p>

                    <div style="margin-top:10px;">

                        <button onclick="changeQty(${index}, -1)">
                            -
                        </button>

                        <span style="margin:0 10px;">
                            ${item.qty}
                        </span>

                        <button onclick="changeQty(${index}, 1)">
                            +
                        </button>

                        <button 
                            onclick="removeItem(${index})"
                            style="
                                margin-left:15px;
                                background:red;
                                color:white;
                                border:none;
                                padding:5px 10px;
                                border-radius:8px;
                                cursor:pointer;
                            "
                        >
                            刪除
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

    totalPrice.textContent = "$" + total.toLocaleString();

    cartCount.textContent = totalQty;

    // 儲存購物車
    localStorage.setItem("cart", JSON.stringify(cart));

}
// =========================
// 修改數量
// =========================

function changeQty(index, amount) {

    cart[index].qty += amount;

    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }

    renderCart();

}

// =========================
// 刪除商品
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    renderCart();

}

// =========================
// 開關購物車
// =========================

navCart.addEventListener("click", (e) => {

    e.preventDefault();

    cartSidebar.classList.toggle("show");

});

cartClose.addEventListener("click", () => {

    cartSidebar.classList.remove("show");

});

// =========================
// 初始化
// =========================

renderCart();