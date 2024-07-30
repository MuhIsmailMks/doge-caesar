

// pop up
const popUp = document.querySelector('.pop-up_container');
const audioElement = document.getElementById('background-music');

popUp.addEventListener('click', () => {
    popUp.classList.add('hidden');
    audioElement.play();
    document.body.classList.remove('noScroll')
    isMusicPlaying = true;  

    //  scroll animation Effect
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



  const images = document.querySelectorAll('.column img');
 
  images.forEach((img, index) => {
      img.setAttribute('data-aos', 'zoom-in');
      img.setAttribute('data-aos-duration', '700');
       
      let delay = 200 + (index * 10); 
      img.setAttribute('data-aos-delay', delay);
  });