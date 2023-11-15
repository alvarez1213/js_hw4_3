const productElements = document.getElementsByClassName('product')

// controls
const quantityElements = document.getElementsByClassName('product__quantity-value')
const plusElements = document.getElementsByClassName('product__quantity-control product__quantity-control_inc')
const minusElements = document.getElementsByClassName('product__quantity-control product__quantity-control_dec')
const addBtnElements = document.getElementsByClassName('product__add')

// для корзины
const cartElement = document.querySelector('.cart__products')
const imageElements = document.getElementsByClassName('product__image')

let cartObj = {}

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

        // проверяем есть ли уже товар в корзине
        if (cartObj[productId] != null) {                        
            // получаем элемент товара из корзины
            const cartProductElement = getCartProduct(productId)

            // получаем кол-во
            const cartProductCount = cartProductElement.querySelector('.cart__product-count')            
            
            // записываем в элемент и в объект
            cartProductCount.textContent = cartObj[productId] = cartObj[productId] + parseInt(quantityElements[p].textContent)            
        }
        else {
            // добавляем в корзину
            cartElement.innerHTML +=  
                `<div class="cart__product" data-id="${productId}">
                    <img class="cart__product-image" src="${imageElements[p].getAttribute('src')}">
                    <div class="cart__product-count">${quantityElements[p].textContent}</div>
                </div>`

            // сохраняем в объект {id: qty}
            cartObj[productId] = parseInt(quantityElements[p].textContent)
        }
                
        // console.log(cartObj)
    })
}

// получаем товар их корзины по Id
function getCartProduct(id) {
    const cartProducts = cartElement.querySelectorAll('.cart__product')
    for (const i of cartProducts) {
        if (i.getAttribute('data-id') === id) {
            return i
        }
    }

    return null
}