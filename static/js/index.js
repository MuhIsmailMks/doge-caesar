

// pop up
const popUp = document.querySelector('.pop-up_container');
const audioElement = document.getElementById('background-music');

popUp.addEventListener('click', () => {
    popUp.classList.add('hidden');
    audioElement.play();
    document.body.classList.remove('noScroll')
    isMusicPlaying = true;  
 
    AOS.init({
      once: true
    });
});
  

document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
      // Optional parameters
      loop: true,
      speed: 1000, 
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },      
      autoplay: {
        delay: 5500,
        disableOnInteraction: false,
      },
      allowTouchMove: false,   
    });
  });


  
// copy address

const copyAddress = document.querySelector('.copy-box');
    
let text = document.querySelector('.copy-box__text');
let btn = document.querySelector('.copy-box__btn');
let btnText = btn.textContent;
let timeout;

copyAddress.addEventListener('click', () => { 
    navigator.clipboard.writeText(text.textContent).then(function () {
        btn.textContent = 'Copied';

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            btn.textContent = btnText;
        }, 2000);
    }).catch(function (err) {
        console.error('Failed to copy text: ', err);
    });
    
})


// memes
const randomBtn = document.querySelector(".cards_random");
const cards = document.querySelectorAll(".card .card-inner"); 
const imageCards = document.querySelectorAll(".card .card-back");
const aboutCards = document.querySelectorAll(".about_card");
const cards_container_slide = document.querySelector(".cards_container_slide");

const card1 = document.querySelector(".card._1 .card-back img");
const card2 = document.querySelector(".card._2 .card-back img");
const card3 = document.querySelector(".card._3 .card-back img");
const card4 = document.querySelector(".card._4 .card-back img");

const close_popUp = document.querySelector(".close_popUp");
const popUp_image = document.querySelector(".popUp_image");
const image_popUp = document.querySelector(".image_popUp");
  

let isClickable = true;
const debounceTime = 1000; // 5 seconds

// card random function
window.addEventListener('DOMContentLoaded', () => {
   
    let cardImages = [
        './static/media/br_image01.png', 
        './static/media/br_image02.png', 
        './static/media/br_image03.png', 
        './static/media/br_image04.png', 
        './static/media/br_image05.png', 
        './static/media/br_image06.png', 
        './static/media/br_image07.png', 
        './static/media/br_image08.png', 
        './static/media/br_image09.png', 
        './static/media/br_image10.png', 
        './static/media/br_image11.png', 
        './static/media/br_image12.png',  
        './static/media/br_image13.png',  
        './static/media/br_image14.png',  
        './static/media/br_image15.png',  
        './static/media/br_image16.png',  
        './static/media/br_image17.png',  
        './static/media/br_image18.png',  
        './static/media/br_image19.png',  
        './static/media/br_image20.png',  
        './static/media/br_image21.png',  
        './static/media/br_image22.png',  
        './static/media/br_image23.png',  
        './static/media/br_image24.png',  
        './static/media/br_image25.png',  
    ];
  
    function cardRandom(){

        function shuffle(array) {
                let currentIndex = array.length, randomIndex;
            
                while (currentIndex != 0) {
            
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
            
                    [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex], array[currentIndex]];
                }

                    return array;
        } 
        

        let shuffledCardImage = shuffle(cardImages);
        let selectedImages = shuffledCardImage.slice(0, 4);

        cards_container_slide.classList.toggle('remove');

        if(cards_container_slide.classList.contains('remove')){
            cards_container_slide.style.transform = "translateX(-110%)";
            
        } else {
            cards_container_slide.style.transform = "translateX(0%)"; 

            cards.forEach(card => { 
                    let cardClosest = card.closest('.card')
                    cardClosest.classList.remove('is-flipped');   
            })
            

            card1.src = selectedImages[0]
            card2.src = selectedImages[1]
            card3.src = selectedImages[2]
            card4.src = selectedImages[3]   
            
             aboutCards.forEach((cardBtn,i) => { 
                cardBtn.dataset.set = selectedImages[i];
            })
        }

    }
 

    setTimeout(()=>{
        cards_container_slide.style.transform = "translateX(0%)"; 
    },1000)

    randomBtn.addEventListener('click', () => {
              
        if (!isClickable) return;
        isClickable = false;

           setTimeout(() => {
            isClickable = true;
        }, debounceTime); 
        cardRandom()

    
    });

    cards.forEach(card => {
            card.addEventListener('click', () => {
                let cardClosest = card.closest('.card')
                const cardAttr = cardClosest.getAttribute('data-set'); 
                cardClosest.classList.add('is-flipped');
                
                console.log(cardAttr);
 
 
                popUp_image.classList.remove('hidden');
                image_popUp.setAttribute('src', cardAttr)

            })
    });

   

    close_popUp.addEventListener('click', () => {
      popUp_image.classList.add('hidden')
    })
 
})