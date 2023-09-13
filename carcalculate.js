// Заранее заданные значения моделей для каждой марки
const models = {
    reno: ["Модель 1", "Модель 2", "Модель 3"],
    opel: ["Модель A", "Модель B", "Модель C"],
    mazda: ["Модель X", "Модель Y", "Модель Z"],
    jaguar: ["Модель I", "Модель II", "Модель III"]
};

document.addEventListener("DOMContentLoaded", () => {
    const makeSelect = document.getElementById("make");
    const modelSelect = document.getElementById("model");
    const conditionRadios = document.getElementsByName("condition");
    const ownersGroup = document.getElementById("ownersGroup");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultSpan = document.getElementById("result");
    const errorDiv = document.getElementById("error");

    // Обновление списка моделей при изменении марки автомобиля
    makeSelect.addEventListener("change", () => {
        const selectedMake = makeSelect.value;
        modelSelect.innerHTML = "";

        if (selectedMake !== "") {
            const makeModels = models[selectedMake];
            makeModels.forEach(model => {
                const option = document.createElement("option");
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        }
    });

    // Показать/скрыть количество владельцев при выборе состояния автомобиля
    conditionRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.value === "used") {
                ownersGroup.style.display = "block";
            } else {
                ownersGroup.style.display = "none";
            }
        });
    });

    // Выполнение расчетов при нажатии кнопки "Рассчитать"
    calculateBtn.addEventListener("click", () => {
        const selectedMake = makeSelect.value;
        const selectedModel = modelSelect.value;
        const fuelType = document.querySelector('input[name="fuelType"]:checked')?.value;
        const engineVolume = parseFloat(document.getElementById("engineVolume").value);
        const condition = document.querySelector('input[name="condition"]:checked')?.value;
        const owners = document.querySelector('input[name="owners"]:checked')?.value;
        const paymentMethods = document.querySelector('input[name="paymentMethod"]:checked')?.value;

        const errors = [];
        if (selectedMake === "") {
            errors.push("Выберите марку автомобиля");
        }
        if (selectedModel === "") {
            errors.push("Выберите модель автомобиля");
        }
        if (!fuelType) {
            errors.push("Выберите тип топлива");
        }
        if (isNaN(engineVolume) || engineVolume < 1.1 || engineVolume > 3.5) {
            errors.push("Введите корректный объем двигателя от 1.1 до 3.5л");
        }
        if (!condition) {
            errors.push("Выберите состояние автомобиля");
        }
        if (condition === "used" && !owners) {
            errors.push("Выберите количество владельцев");
        }
        if (!paymentMethods) {
            errors.push("Выберите способ оплаты");
        }

        // Если есть ошибки, отобразить уведомление
        if (errors.length > 0) {
            errorDiv.textContent = "Заполните следующие поля: " + errors.join(", ");
            errorDiv.style.display = "block";
            return;
        }
        if (errors.length === 0) {
            errorDiv.style.display = "none";
        }

        // Выполнение расчетов и обновление отображения стоимости
        const price = calculatePrice(selectedMake, selectedModel, fuelType, engineVolume, condition, owners, paymentMethods);
        resultSpan.textContent = `${price} рублей`;
    });

    // Функция для расчета стоимости автомобиля
    function calculatePrice(make, model, fuelType, engineVolume, condition, owners, paymentMethods) {
        const minPrice = 100000;
        const maxPrice = 500000;
        const price = Math.floor(Math.random() * (maxPrice - minPrice + 1) + minPrice);
        return price;
    }
});