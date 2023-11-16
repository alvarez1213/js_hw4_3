const productElements = document.getElementsByClassName('product')

// controls
const quantityElements = document.getElementsByClassName('product__quantity-value')
const plusElements = document.getElementsByClassName('product__quantity-control product__quantity-control_inc')
const minusElements = document.getElementsByClassName('product__quantity-control product__quantity-control_dec')
const addBtnElements = document.getElementsByClassName('product__add')

// для корзины
const cartElement = document.querySelector('.cart__products')
const imageElements = document.getElementsByClassName('product__image')

// цикл по продуктам
for (let p = 0; p < productElements.length; p++) {
    // событие на плюс
    plusElements[p].addEventListener('click', () => {
        quantityElements[p].textContent = parseInt(quantityElements[p].textContent) + 1
    })
    
    // событие на минус
    minusElements[p].addEventListener('click', () => {
        let q = parseInt(quantityElements[p].textContent)
        if (q > 1) {
            quantityElements[p].textContent = q - 1
        }
    })

    // событие на кнопку добавление
    addBtnElements[p].addEventListener('click', () => {
        // сохраняем Id, он еще пригодится не раз
        const productId = productElements[p].getAttribute('data-id')

        // берем все товары в корзине в массив
        const cartProducts = [...cartElement.querySelectorAll('.cart__product')]
        
        // получаем элемент нужного товара из корзины
        const cartProductElement = cartProducts.find((el) => {
            return el.getAttribute('data-id') === productId
        })        

        // проверяем, нашли ли товар в корзине
        if (cartProductElement) {
            
            // получаем кол-во
            const cartProductCount = cartProductElement.querySelector('.cart__product-count')
            
            // записываем в элемент и в объект
            cartProductCount.textContent = parseInt(cartProductCount.textContent) + parseInt(quantityElements[p].textContent)
        }
        else {
            // добавляем в корзину
            cartElement.innerHTML +=  
                `<div class="cart__product" data-id="${productId}">
                    <img class="cart__product-image" src="${imageElements[p].getAttribute('src')}">
                    <div class="cart__product-count">${quantityElements[p].textContent}</div>
                </div>`
        }
    })
}
