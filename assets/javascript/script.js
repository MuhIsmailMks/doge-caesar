// let header = document.querySelector(".navbar")
// window.onscroll = (e)=> {
//    if (window.pageYOffset > 100) {
//       header.style.backgroundColor= "#911616";
//     } else{
//       header.style.backgroundColor = "transparent";
//     }
//  }


const navbarToggle = document.querySelector(".navbar-toggle");
const navbarLinks = document.querySelector(".center-menu");

navbarToggle.addEventListener("click", () => {
  navbarToggle.classList.toggle("active");
  navbarLinks.classList.toggle("active");
});


var coll = document.getElementsByClassName("question");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function copyText() {
  // Get the paragraph element
  var paragraphToCopy = document.getElementById("paragraphToCopy");
  // Create a range and select the text
  var range = document.createRange();
  range.selectNode(paragraphToCopy);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  // Copy the selected text
  document.execCommand("copy");
  // Deselect the text
  window.getSelection().removeAllRanges();
}

// Function to format date and time
function formatDateAndTime(dateString) {
  const date = new Date(dateString);
  const optionsDate = { month: 'short', day: 'numeric', year: 'numeric' };
  const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true, timeZoneName: 'short' };

  const formattedDate = date.toLocaleDateString('en-US', optionsDate);
  const formattedTime = date.toLocaleTimeString('en-US', optionsTime).replace(' AM', 'AM').replace(' PM', 'PM').replace(' UTC', ' UTC');

  return { formattedDate, formattedTime };
}

// Function to fetch Bitcoin data from Blockchair API
async function fetchBitcoinData() {
  const response = await fetch('https://api.blockchair.com/tools/halvening');
  const data = await response.json();
  return data.data.bitcoin;
}

// Function to fetch Bitcoin price and 24-hour change from CoinGecko API
async function fetchBitcoinPrice() {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
  const priceData = await response.json();
  return priceData.bitcoin;
}

// Function to set up an interval for auto-reloading data
function setupAutoReload(intervalMinutes) {
  // Call initializeData immediately for the first load
  initializeData();
  // Set up the interval
  setInterval(initializeData, intervalMinutes * 60 * 1000); // converting minutes to milliseconds
}

// Function to update the countdown
function updateCountdown(halveningTime) {
  const targetDate = new Date(halveningTime).getTime();
  const currentDate = new Date().getTime();
  const timeRemaining = targetDate - currentDate;

  if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      document.getElementById('countdown').innerHTML = 'The countdown has ended!';
      return;
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById('countdown').innerHTML = `${days}: ${hours}: ${minutes}: ${seconds}`;
}

// Function to initialize and update the data
async function initializeData() {
  // Show the loading notification
  document.getElementById('notify').style.display = 'block';
  console.log('Loading data');
  try {
      const bitcoinData = await fetchBitcoinData();
      const { usd, usd_24h_change } = await fetchBitcoinPrice();

      // Format the date and time
      const { formattedDate, formattedTime } = formatDateAndTime(bitcoinData.halvening_time);

      // Update HTML elements
      document.getElementById('dateEst').innerHTML = formattedDate;
      document.getElementById('timeEst').innerHTML = formattedTime;
      document.getElementById('blockLeft').innerHTML = bitcoinData.blocks_left;

      // Update Bitcoin price and change
      const btcPriceElement = document.getElementById('btcPrice');
      const priceChangeColor = usd_24h_change < 0 ? 'red' : 'green';
      btcPriceElement.innerHTML = `$${usd.toLocaleString()} <span style='color:${priceChangeColor};'>(${usd_24h_change.toFixed(2)}%)</span>`;

      // Update countdown every second
      const countdownInterval = setInterval(() => updateCountdown(bitcoinData.halvening_time), 1000);
  } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally, handle errors, such as showing an error message
  }

  // Hide the loading notification
  document.getElementById('notify').style.display = 'none';
}

// Call the initialize function when the page loads
window.onload = setupAutoReload(5); //auto update every 5 minutes