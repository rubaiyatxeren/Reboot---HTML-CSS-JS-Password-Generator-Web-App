// ========== DOM ELEMENTS COLLECTION ========== \\

// Password Display & Copy Elements
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

// Length Control Elements
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const inputSlider = document.querySelector("[data-lengthSlider]");

// Character Type Checkboxes
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

// Strength Indicator Elements
const indicator = document.querySelector("[data-indicator]");
const strengthText = document.querySelector("[data-strengthText]");

// Generate Button
const generateBtn = document.querySelector(".generateButton");

// ========== CHARACTER SETS COLLECTION ========== \\

// Available character pools
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numbersChars = "0123456789";
const symbolsChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// INITIALIZING SOME DEFAULT VALUES
let passwordLength = 10;
let password = "";

// UPDATE PASSWORD LENGTH DISPLAY WHEN SLIDER CHANEGS
inputSlider.addEventListener("input", () => {
  passwordLength = parseInt(inputSlider.value);
  lengthDisplay.textContent = passwordLength;

  // CALL THE GENERATE PASSWORD BUTTON HERE...
  generatePassword();
});

// Generate password when any checkbox changes
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", generatePassword);
});

// Generate password on button click
generateBtn.addEventListener("click", generatePassword);

// Generate password function
function generatePassword() {
  let charSet = "";
  if (uppercaseCheck.checked) charSet += uppercaseChars;
  if (lowercaseCheck.checked) charSet += lowercaseChars;
  if (numbersCheck.checked) charSet += numbersChars;
  if (symbolsCheck.checked) charSet += symbolsChars;
  console.log(charSet);

  if (charSet.length === 0) {
    passwordDisplay.value = "Select at least one option";
    updateStrengthIndicator();
    return;
  }

  // Generate password
  let tempPassword = "";
  console.log(tempPassword);

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    tempPassword += charSet[randomIndex];
  }
  // Shuffle for security
  password = shufflePassword(tempPassword);

  // Update display and strength indicator
  passwordDisplay.value = password;
  updateStrengthIndicator();
}

// Shuffle function
function shufflePassword(str) {
  return str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

// Update password strength indicator
function updateStrengthIndicator() {
  // Calculate password strength based on length and character variety
  let strength = 0;

  // Length contributes to strength
  if (passwordLength >= 12) strength += 2;
  else if (passwordLength >= 8) strength += 1;

  // Character variety contributes to strength
  const checks = [uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck];
  const checkedCount = Array.from(checks).filter(
    (check) => check.checked
  ).length;

  if (checkedCount >= 3) strength += 2;
  else if (checkedCount >= 2) strength += 1;

  // Cap strength at 4
  strength = Math.min(strength, 4);

  // Update indicator
  indicator.className = `strength-indicator strength-${strength}`;

  // Update strength text
  const strengthLabels = [
    "Very Weak",
    "Weak",
    "Medium",
    "Strong",
    "Very Strong",
  ];
  strengthText.textContent = strengthLabels[strength];

  // Update text color based on strength
  const strengthColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-lime-500",
    "text-green-500",
  ];
  strengthText.className = `font-medium ${strengthColors[strength]}`;
}

// Copy password to clipboard
copyBtn.addEventListener("click", () => {
  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      // Show success message
      copyMsg.textContent = "Copied!";
      copyBtn.classList.remove("bg-blue-500", "hover:bg-blue-600");
      copyBtn.classList.add("bg-green-500", "hover:bg-green-600");

      // Reset after 2 seconds
      setTimeout(() => {
        copyMsg.textContent = "";
        copyBtn.classList.remove("bg-green-500", "hover:bg-green-600");
        copyBtn.classList.add("bg-blue-500", "hover:bg-blue-600");
      }, 2000);
    });
  }
});

// Generate initial password on page load
generatePassword();
