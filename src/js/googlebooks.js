const loadcategory = document.querySelectorAll('.container-bottom__menu_item')

const loadmore = document.querySelector('.container-bottom__books_buttonmore')

let category = document.querySelector('.container-bottom__menu_item_active').innerText;
const max_Result = 6;
let startpage = 0;
let s = document.querySelector('.container-bottom__books');
let sticker = document.querySelector('.sticker');
let localCart =
JSON.parse(localStorage.getItem('cart') ?? '[]');
let booksum ="";
let starItem = `<p class="rating_item" aria-label="Rating is 4.5 out of 5">
<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
   <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
</svg>
</p>`;
let starItemYellow = `<p class="rating_item-yellow" aria-label="Rating is 4.5 out of 5">
<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
   <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
</svg>
</p>`;
function displayResult(apiData) {
  let cards = '';  
            // console.log('start cards', cards);

            apiData.forEach(item => {
               const checkCart = localCart.includes(item.id)
               const checkRaiting = item.volumeInfo.hasOwnProperty('averageRating')
               console.log(checkRaiting)
               const cardBlock = `
      <div class="container-bottom__books-card">
        <img
          src="${item.volumeInfo.imageLinks.thumbnail}"
          class="container-bottom__books-card-image"
        />
        <div class="container-bottom__books-card_opt">
          <p class="container-bottom__books-card-author">${item.volumeInfo?.authors ?? "No information about the author"}</p>
          <p class="container-bottom__books-card-title">${item.volumeInfo.title}</p> 
          <div class="container-bottom__books-card-ratings">
          <div class ="container-bottom__books-card-stars">
              <div class="container-bottom__books-card-staryellow" style="width:${(34 / 5) * item.volumeInfo?.averageRating ?? 0}%">
                        ${starItemYellow}
                        ${starItemYellow}
                        ${starItemYellow}
                        ${starItemYellow}
                        ${starItemYellow}
                        </div>
                        <div class="container-bottom__books-card-stargrey">
                        ${starItem}
                        ${starItem}
                        ${starItem}
                        ${starItem}
                        ${starItem}
              </div>
            </div>
          <div class="container-bottom__books-card-ratingCount">${item.volumeInfo?.ratingCount ?? "No review"}</div>
        </div>
          <p class="container-bottom__books-card-description">${item.volumeInfo?.description ?? "No description"}
          </p>
          <div class ="container-bottom__books-card-SaleInfo">
          <p>${item.saleInfo.retailPrice?.currencyCode ?? ""}
          </p> 
          <p class ="container-bottom__books-card-SaleInfo-retailPrice">${item.saleInfo.retailPrice?.amount ?? "No price"}
          </p> 
          </div>
          <div class="card_button">
          <button class="card_button_buynow ${checkCart ? "card_button_inthecart" : ""}" data-id="${item.id}">${checkCart ? "IN THE CART" : "Buy now"}</button>
          </div>
        </div>
      </div>
    `;
            cards = cards + cardBlock;
;            });
            // console.log('end cards', cards);
            s.innerHTML += cards;    

        }
function getbooksApi () {
fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyA9PDr5S-nkrxoPyWqcGL9WGblHSxLu14c&printType=books&startIndex=${startpage}&maxResults=${max_Result}&langRestrict=en`)
            .then(response => {
            return response.json();
            })
            .then(data =>{
            displayResult(data.items);
            console.log(data.items)
            })
}

function Booksincart() 
{
booksum = localCart.length;
  if(booksum>0) {
const stic = `<div class="sticker_bookssum">${booksum}</div>`;
sticker.innerHTML+=stic}
  else {
sticker.innerHTML = "";
}
}

document.addEventListener('click', () => {
   if (event.target.classList.contains('container-bottom__menu_item')) {
     s.innerHTML = "";
category = event.target.innerText; 
getbooksApi ();
document.querySelector(".container-bottom__menu_item_active").classList.remove("container-bottom__menu_item_active");
event.target.classList.add("container-bottom__menu_item_active")  
   
   }
 if (event.target.classList.contains('container-bottom__books_buttonmore')) {
   startpage = startpage + max_Result
   getbooksApi ();
 }
         if(event.target.classList.contains('card_button_buynow')) { 
          const id = event.target.getAttribute('data-id')
          event.target.classList.toggle ('card_button_inthecart');
          const btnText = event.target.innerText
            if(btnText==="IN THE CART") {
              event.target.innerText="BUY NOW";
                if(localCart.includes(id)) {
                    localCart.splice(localCart.indexOf(id),1)
                                          }
  }
  else {
event.target.innerText="IN THE CART"; 
localCart.push(id)
}
localStorage.setItem("cart", JSON.stringify(localCart)); 
Booksincart();
  }    
    })

 getbooksApi ();
 Booksincart();