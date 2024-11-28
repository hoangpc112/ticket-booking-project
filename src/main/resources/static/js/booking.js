const mySeats = document.getElementById('seat-dynamic');
const myPrice = document.getElementById('show-price');
const checkBox = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
const foodCheckboxes = document.querySelectorAll('.food-selection input[type="checkbox"]');
const foodQuantities = document.querySelectorAll('.food-selection input[type="number"]');
const bookButton = document.querySelector('.bookBtn');
const totalAmountInput = document.getElementById('totalAmount'); // Thêm thẻ input ẩn để lưu tổng số tiền

let checkedSeat = [];
let seatTotal = 0;
let foodTotal = 0;

for (let i = 0; i < checkBox.length; i++) {
    checkBox[i].addEventListener('click', displayValue);
}
for (let i = 0; i < foodCheckboxes.length; i++) {
    foodCheckboxes[i].addEventListener('change', updateFoodTotal);
    foodQuantities[i].addEventListener('input', updateFoodTotal);
}

function displayValue(e) {
    const money = 50000; // Giá mỗi ghế
    let ans = "";
    if (e.target.checked) {
        checkedSeat.push(" " + getSeatLabel(e.target.id));
        seatTotal += money;
    }
    else {
        ans = getSeatLabel(e.target.id);
        const index = checkedSeat.indexOf(" " + ans);
        if (index > -1) {
            checkedSeat.splice(index, 1);
        }
        seatTotal -= money;
    }
    mySeats.innerHTML = checkedSeat.join(", ");
    updateTotal();
}

function updateFoodTotal() {
    foodTotal = 0;
    foodCheckboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const quantity = foodQuantities[index].value;
            let price = 0;
            switch (checkbox.value) {
                case 'popcorn':
                    price = 30000; // Giá bỏng ngô
                    break;
                case 'drink':
                    price = 20000; // Giá nước uống
                    break;
                case 'combo':
                    price = 40000; // Giá combo bỏng ngô + nước uống
                    break;
            }
            foodTotal += price * quantity;
        }
    });
    updateTotal();
}

function updateTotal() {
    const total = seatTotal + foodTotal;
    myPrice.innerHTML = total;
    bookButton.innerHTML = `Thanh toán: ${total} VNĐ`;
    totalAmountInput.value = total; // Cập nhật giá trị cho thẻ input ẩn
}

function getSeatLabel(id) {
    let label = "";
    if (id <= 20) {
        label += 'A';
    }
    else if (id <= 40) {
        label += 'B';
    }
    else if (id <= 60) {
        label += 'C';
    }
    else if (id <= 80) {
        label += 'D';
    }
    else if (id <= 100) {
        label += 'E';
    }
    else {
        label += 'F';
    }
    label += (id % 20 === 0) ? 20 : id % 20;
    return label;
}