const switchBtn = document.querySelector(".switch-btn");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const livenetBtn = document.querySelector(".livenet-btn");
const testnetBtn = document.querySelector(".testnet-btn");
const sendBtn = document.querySelector(".send-btn");


// Function to show modal dialog
function showModal() {
  window.dialog.showModal();
}

// Function to connect to WizzWallet
function connectToWizzWallet() {
  // Your code to connect to WizzWallet
}

// Add event listener to show modal dialog
document.getElementById("myButton").addEventListener("click", showModal);

// Add event listener to connect to WizzWallet
document.getElementById("myButton").addEventListener("click", connectToWizzWallet);





// Define the function to connect to WizzWallet and fetch the account address
async function connectToWizzWallet() {
  try {
    let accounts = await wizz.requestAccounts();
    console.log("Connect success:", accounts);
    
    // Fetch the address of the current account
    let address = await wizz.getAccounts();
    console.log("Account address:", address);
    
    // Display the account address on the web page
    document.getElementById("account-address").textContent =
      "Account Address: " + address[0]; // Assuming the first address is the current account
    
    // Fetch the network (livenet or testnet)
    let network = await wizz.getNetwork();
    console.log("Network:", network);
    
    // Display the network on the web page
    document.getElementById("network-status").textContent =
      "Network: " + (network === "livenet" ? "Mainnet" : "Testnet");
    
    // Fetch the balance of the current account
    let balance = await window.wizz.getBalance();
    console.log("Balance:", balance);
    
    // Display the balance on the web page
    document.getElementById("account-balance").textContent =
      `Balance: Confirmed - ${balance.confirmed}, Unconfirmed - ${balance.unconfirmed}, Total - ${balance.total}`;
    
    // Fetch the public key of the current account
    let publicKey = await window.wizz.getPublicKey();
    console.log("Public Key:", publicKey);
    
    // Display the public key on the web page
    document.getElementById("public-key").textContent =
      "Public Key: " + publicKey;
    
    // Alert message after successful connection
    alert("Wallet successfully connected!");
  } catch (error) {
    console.error("Connect failed:", error);
    // Handle error, maybe display a message to the user
  }
}

// Define the function to switch the network
async function switchNetwork() {
  try {
      // Fetch the current network (livenet or testnet)
      let currentNetwork = await wizz.getNetwork();
      console.log("Current Network:", currentNetwork);
      
      // Toggle between livenet and testnet
      const targetNetwork = currentNetwork === "livenet" ? "testnet" : "livenet";
      let res = await window.wizz.switchNetwork(targetNetwork);
      console.log(res);
      
      // Update the network status on the web page
      document.getElementById("network-status").textContent = 
          "Network: " + (targetNetwork === "livenet" ? "Mainnet" : "Testnet");

      alert(`Switched to ${targetNetwork === "livenet" ? "Mainnet" : "Testnet"} successfully!`);
  } catch (e) {
      console.error(e);
      alert("Failed to switch network. Please try again."); // Optional: Show an alert if switching fails
  }
}

// Function to send Bitcoin
async function sendBitcoin() {
  try {
    const address = document.getElementById("recipient-address").value;
    const amount = parseInt(document.getElementById("amount").value, 10);
    const feeRate = parseInt(document.getElementById("fee-rate").value, 10);
    
    const txid = await window.wizz.sendBitcoin(address, amount, { feeRate });
    console.log("Transaction ID:", txid);
    
    alert("Transaction sent successfully! TXID: " + txid);
  } catch (error) {
    console.error("Send transaction failed:", error);
    alert("Failed to send transaction. See console for details.");
  }
}

// Check if Wizz Wallet is installed
if (typeof window.wizz !== "undefined") {
  console.log("Wizz Wallet is installed!");
  // Add event listener to the button when the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    const connectButton = document.querySelector(".connect-button");
    connectButton.addEventListener("click", connectToWizzWallet);
    
    sendBtn.addEventListener("click", sendBitcoin);
  });
} else {
  console.log("Wizz Wallet is not installed.");
  // Check again after a short delay in case of asynchronous loading
  setTimeout(() => {
    if (typeof window.wizz !== "undefined") {
      console.log("Wizz Wallet is installed!");
    } else {
      // Show popup if Wizz Wallet is still not detected
      const popupMessage = document.createElement("div");
      popupMessage.style.position = "fixed";
      popupMessage.style.top = "50%";
      popupMessage.style.left = "50%";
      popupMessage.style.transform = "translate(-50%, -50%)";
      popupMessage.style.background = "#fff";
      popupMessage.style.padding = "20px";
      popupMessage.style.border = "1px solid #ccc";
      popupMessage.style.borderRadius = "5px";
      popupMessage.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
      popupMessage.style.zIndex = "9999";

      const message = document.createElement("p");
      message.textContent =
        "Wizz Wallet is not installed. Click the button below to add the Wizz Wallet extension.";

      const addButton = document.createElement("button");
      addButton.textContent = "Add Wizz Wallet Extension";
      addButton.style.marginTop = "10px";
      addButton.addEventListener("click", function () {
        // Redirect users to the link to add the extension
        window.location.href =
          "https://chromewebstore.google.com/detail/wizz-wallet/ghlmndacnhlaekppcllcpcjjjomjkjpg?hl=en"; // Replace with the actual link
      });

      popupMessage.appendChild(message);
      popupMessage.appendChild(addButton);
      document.body.appendChild(popupMessage);
    }
  }, 1000); // Adjust the delay as needed
}
