let images = [
    {
        url: "./src/img/banner1.png",
    },
    {
        url: "./src/img/banner2.png",
    }, 
    {
        url: "./src/img/banner3.png",
    }
]

  
let sliderImages = document.querySelector(".images");
let sliderDots = document.querySelector(".slider__dots");

initImages();
initDots();
initAutoplay();

function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

function initDots() {
 images.forEach((image, index) => {
 	let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
	sliderDots.innerHTML += dot;
});
sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
dot.addEventListener("click", function() {
moveSlider (this.dataset.index);
	})
   })
}

function initAutoplay() {
setInterval(()=>{
let curNumber = +document.querySelector(".image.active").dataset.index;
        let nextNumber;
         nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        moveSlider(nextNumber);
      
}, 5000);
}

function moveSlider(num) {
document.querySelector(".image.active").classList.remove("active");
document.querySelector(".image.n" + num).classList.add("active");

document.querySelector(".slider__dots-item.active").classList.remove("active");
document.querySelector(`.slider__dots-item[data-index="${num}"]`).classList.add("active");

}

