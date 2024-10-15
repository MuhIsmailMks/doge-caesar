//  scroll animation Effect
AOS.init({
    once: true
});
 
 

// copy address
const copyAddressAll = document.querySelectorAll('.copy-box');
    

let timeout;

copyAddressAll.forEach(copyAddress => {
    copyAddress.addEventListener('click', () => { 
        let text = copyAddress.querySelector('.copy-box__text');
        let btn = copyAddress.querySelector('.copy-box__text');
        let btnText = btn.textContent;
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
})