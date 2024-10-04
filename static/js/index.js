//  scroll animation Effect
AOS.init({
    once: true
});
 

// copy address
const copyAddress = document.querySelector('.copy-box');
    
let text = document.querySelector('.copy-box__text'); 
let btnText = text.textContent;
let timeout;

copyAddress.addEventListener('click', () => { 
    navigator.clipboard.writeText(text.textContent).then(function () {
        text.textContent = 'Copied';

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            text.textContent = textText;
        }, 2000);
    }).catch(function (err) {
        console.error('Failed to copy text: ', err);
    });
    
})


// video
document.addEventListener("DOMContentLoaded", function() {
    let videoServices = document.querySelectorAll('.video_service');

    function playVideo(video) {
        if (video.paused) {
            video.play().catch(function(error) {
                console.error("Video play was prevented:", error);
            });
        }
    }
 
    for (let video of videoServices) { 
        video.addEventListener('play', function() {
            video.muted = true;
        });
 
        video.addEventListener('loadeddata', function() {
            playVideo(video);
        });
 
        video.muted = true;
        video.controls = false;
    }
});
 
document.addEventListener('DOMContentLoaded', function() {
    let videos = document.querySelectorAll('.video_service');
    videos.forEach(function(video) {
        video.addEventListener('canplaythrough', function() {
            video.play();
        }, true);
    });
});

