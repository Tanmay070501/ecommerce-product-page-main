
/*snapshot*/
var snapshot=[`translateX(0%)`,`translateX(100%)`,`translateX(200%)`,`translateX(300%)`];
var modalActive= ['m-active','','','']; 
/*-------*/

/*THUMBNAIL IMAGES MODAL IMPLEMENTATION USING EVENT BUBBLING*/
var thumbnailImages = document.querySelector('.thumbnail-images');

thumbnailImages.addEventListener('click',(e)=>{
    if(e.target.parentNode.classList.contains('thumbnail-image')){
        var currentThumbnailFocus = document.querySelector('.active');
        if(currentThumbnailFocus){
            currentThumbnailFocus.classList.remove('active');
        }
        e.target.parentNode.classList.add('active');
        var MainImg = e.target.parentNode.id;
        MainImg = MainImg.substring(MainImg.length - 1);
        MainImg = parseInt(MainImg);
        var mainImage = document.querySelectorAll('.main-image');
        mainImage.forEach((el,idx)=>{
            el.style.transform = `translateX(${100 * (idx+1-MainImg) }%)`;
            el.style.transition = `transform 0.2s linear`;
            snapshot[idx] = `translateX(${100 * (idx+1-MainImg) }%)`;
            modalActive[idx] = ``;
        });
        modalActive[MainImg-1] = `m-active`;
    }
})


var mainImageSlider = document.querySelector('.main-image-slider');
var modal = document.querySelector('.modal');
var backDrop = document.querySelector('.backdrop');
mainImageSlider.addEventListener('click',(e)=>{
    console.log(e.target.parentNode.parentNode.classList.contains('main-image-slider'))
    if(e.target.parentNode.parentNode.classList.contains('main-image-slider')){
        if(window.innerWidth <= 768){
            return;
        }
        backDrop.classList.add('backdrop-active');
        modal.classList.add('modal-active');
        modal.innerHTML = `
        <div class="modal-image">
                <div class="modal-slider">
                    <div class="modal-main-image-slider">
                    <div class="modal-main-image" style="transform:${snapshot[0]}">
                    <img src="images/image-product-1.jpg" alt="product-1">
                    </div>
                    <div class="modal-main-image" style="transform:${snapshot[1]}">
                    <img src="images/image-product-2.jpg" alt="product-1">
                    </div>
                    <div class="modal-main-image " style="transform:${snapshot[2]}">
                    <img src="images/image-product-3.jpg" alt="product-1">
                    </div>
                    <div class="modal-main-image" style="transform:${snapshot[3]}">
                    <img src="images/image-product-4.jpg" alt="product-1">
                    </div>
                    </div>
                    <button class="modal-left-btn">
                    <img src="images/icon-previous.svg" alt="previous">
                    </button>
                    <button class="modal-right-btn">
                        <img src="images/icon-next.svg" alt="next">
                    </button>
            </div>
            <div class="modal-thumbnail-images">
                    <div class="m-thumbnail-image ${modalActive[0]} " id="m-ti-1">
                    <img src="images/image-product-1-thumbnail.jpg" alt="thumbnail-1">
                    <div class="m-thumbnail-modal"></div>
                    </div>
                    <div class="m-thumbnail-image ${modalActive[1]} " id="m-ti-2">
                    <img src="images/image-product-2-thumbnail.jpg" alt="thumbnail-1">
                    <div class="m-thumbnail-modal"></div>
                    </div>
                    <div class="m-thumbnail-image ${modalActive[2]}" id="m-ti-3">
                    <img src="images/image-product-3-thumbnail.jpg" alt="thumbnail-1">
                    <div class="m-thumbnail-modal"></div>
                    </div>
                    <div class="m-thumbnail-image ${modalActive[3]}" id="m-ti-4">
                    <img src="images/image-product-4-thumbnail.jpg" alt="thumbnail-1">
                    <div class="m-thumbnail-modal"></div>
            </div>
        </div>
        <button class="close-modal">
            <img src="images/icon-close.svg" alt="close">
        </button>
    </div>
        `;
    }
});


document.querySelector('.backdrop').addEventListener('click',(e)=>{
    if(e.target.parentNode.classList.contains('close-modal')){
        backDrop.classList.remove('backdrop-active');
        modal.innerHTML = ``;
        modal.classList.remove('modal-active');
    }
    if(e.target.classList.contains('backdrop')){
        backDrop.classList.remove('backdrop-active');
        modal.innerHTML = ``;
        modal.classList.remove('modal-active');
    }
    if(document.querySelector('.nav-items').classList.contains('side-nav-active')){
        document.querySelector('.nav-items').classList.remove('side-nav-active')
    }
    console.log(e.target);
})



document.querySelector('.modal').addEventListener('click',(e)=>{

    if(e.target.parentNode.classList.contains('close-modal')){
        backDrop.classList.remove('backdrop-active');
        modal.innerHTML = ``;
        modal.classList.remove('modal-active');
    }

    if(e.target.parentNode.classList.contains('m-thumbnail-image')){
        var currentMThumbnailFocus = document.querySelector('.m-active');
        if(currentMThumbnailFocus){
            currentMThumbnailFocus.classList.remove('m-active');
        }
        e.target.parentNode.classList.add('m-active');
        var modalMainImg = e.target.parentNode.id;
        modalMainImg = modalMainImg.substring(modalMainImg.length - 1);
        modalMainImg = parseInt(modalMainImg);
        console.log(modalMainImage);
        var modalMainImage = document.querySelectorAll('.modal-main-image');
        modalMainImage.forEach((el,idx)=>{
            el.style.transform = `translateX(${100 * (idx+1-modalMainImg) }%)`;
            el.style.transition = `transform 0.2s linear`;
        })
    }

    if(e.target.parentNode.classList.contains('modal-right-btn') || e.target.classList.contains('modal-right-btn')){
        var currSlide = document.querySelector('.m-active').id;
        currSlide= currSlide.substring(currSlide.length - 1);
        currSlide = parseInt(currSlide) - 1;
        if(currSlide===3){
            return;
        }
        document.querySelectorAll('.modal-main-image')
            .forEach((el,idx)=>{
                el.style.transform = `translateX(${100 * (idx-currSlide-1) }%)`;
                el.style.transition = `transform 0.2s linear`;
                //console.log(`translateX(${100 * (idx-currSlide-1) }%)`);
            })
            currSlide++;
            document.querySelector('.m-active').classList.remove('m-active');
            document.getElementById(`m-ti-${currSlide+1}`).classList.add('m-active');
    }
    
    if(e.target.parentNode.classList.contains('modal-left-btn') || e.target.classList.contains('modal-left-btn') ){
        var currSlide = document.querySelector('.m-active').id;
        currSlide= currSlide.substring(currSlide.length - 1);
        currSlide = parseInt(currSlide) - 1;
        if(currSlide===0){
            return;
        }
        document.querySelectorAll('.modal-main-image')
            .forEach((el,idx)=>{
                el.style.transform = `translateX(${100 * (-(currSlide -idx -1)) }%)`;
                el.style.transition = `transform 0.2s linear`;
            })
            currSlide--;
            document.querySelector('.m-active').classList.remove('m-active');
            document.getElementById(`m-ti-${currSlide+1}`).classList.add('m-active');
    }
});
/**/

var plusCart = document.querySelector('.plus');
plusCart.addEventListener('click',()=>{
    var amount = document.querySelector('.amount-number').textContent;
    amount = parseInt(amount) + 1;
    document.querySelector('.amount-number').innerHTML = amount;
    if(amount > 0){
        document.querySelector('.cart-amount').style.display= `inline-block`;
        document.querySelector('.cart-amount').innerHTML = amount;
        document.querySelector('.checkout').innerHTML = `
        <div class="cart-item">
            <div class="cart-item-img">
                <img width="8rem" height="8rem" src="images/image-product-1.jpg" >
            </div> 
            <div class="cart-item-details">
                <p>Fall Limited Edition Sneakers</p>
                <p class="cart-item-amount-details" ><span class="cart-item-amount">$125 x ${amount}</span> 
                <span class="cart-total-amount" >$${125*amount}</span> </p>
            </div>
            <div class="delete">
                <button>
                    <img src="images/icon-delete.svg" alt="delete">
                </button>
            </div>
        </div>
        <button class="checkout-btn">Checkout</button>
    `;  
    }
})

var minusCart = document.querySelector('.minus');
minusCart.addEventListener('click',()=>{
    var amount = document.querySelector('.amount-number').textContent;
    amount = parseInt(amount);
    if(amount===0) {
        return;
    }
    amount--;
    document.querySelector('.amount-number').innerHTML = amount;
    document.querySelector('.cart-amount').innerHTML = amount;
    if(amount===0){
        document.querySelector('.cart-amount').style.display= `none`;
        var htmlCode = `<p class="empty">Your Cart is empty</p>`;
        document.querySelector('.checkout').innerHTML = htmlCode;
    }else{
        document.querySelector('.checkout').innerHTML = `
        <div class="cart-item">
            <div class="cart-item-img">
                <img width="8rem" height="8rem" src="images/image-product-1.jpg" >
            </div> 
            <div class="cart-item-details">
                <p>Fall Limited Edition Sneakers</p>
                <p class="cart-item-amount-details" ><span class="cart-item-amount">$125 x ${amount}</span> 
                <span class="cart-total-amount" >$${125*amount}</span> </p>
            </div>
            <div class="delete">
                <button>
                    <img src="images/icon-delete.svg" alt="delete">
                </button>
            </div>
        </div>
        <button class="checkout-btn">Checkout</button>
    `;    
    }
});

var cartDiv = document.querySelector('.cart-checkout');

document.querySelector('.cart').addEventListener('click',()=>{
    if(cartDiv.classList.contains('cart-show')){
        cartDiv.classList.remove('cart-show')
    }else{
        cartDiv.classList.add('cart-show')
    }
});

window.addEventListener('resize',(e)=>{
    console.log(e);
})


var nav = document.querySelector('.nav-items');

document.querySelector('.hamburger').addEventListener('click',()=>{
    nav.classList.add('side-nav-active');
    backDrop.classList.add('backdrop-active');
})
document.querySelector('.nav-close').addEventListener('click',()=>{
    nav.classList.remove('side-nav-active');
    backDrop.classList.remove('backdrop-active');
})