
//  scroll animation Effect
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        once: true,
    });

    // nav handler
    const menu_btn = document.querySelector('nav .menu-button');
    const menu_container = document.querySelector('nav .menu_container');

    menu_btn.addEventListener('click', () => {
        menu_btn.classList.toggle('active')
        menu_container.classList.toggle('active')
    })


    const musicButton = document.querySelector(".music");
    const musicIcon = document.querySelector(".music .rotate-animation");
    const audio = document.getElementById("backgroundMusic");
    audio.volume = 0.4; 

    musicButton.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            musicIcon.classList.add('rotate-animation')
            musicButton.classList.remove('active')
        } else {
            audio.pause();
            musicIcon.classList.remove('rotate-animation')
            musicButton.classList.add('active')
        }
    });


    const items = document.querySelectorAll('.wrapper .item');
    const totalItems = items.length; 
    const animationDuration = 30;  

    items.forEach((item, i) => { 
        const delay = (animationDuration / totalItems) * (totalItems - i) * -1;
        item.style.animationDelay = `${delay}s`;
    });

});

// copy address
document.querySelectorAll(".copy_address").forEach((copybtn) => {
    copybtn.addEventListener("click", function () {
        let parent = this.closest("div");
        let textSpan = parent.querySelector(".copy-box__text");
        let addressText = textSpan.getAttribute("data-set");

        textSpan.innerHTML = "COPIED";

        setTimeout(() => {
            textSpan.innerHTML = "000000000000000000000000000000000";
        }, 2000);

        navigator.clipboard.writeText(addressText);
    });
});

