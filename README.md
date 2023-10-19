# asa20033.github.io
LAB SHEET 3
1- Create an Interactive Gallery Slideshow Using JavaScript

HTML:
Made a <div> that has a class “container” to act as slideshow’s primary container. Created eight separate slide div inside the “container” div, each with the class “mySlides”. In order to display the slide, a <div> element with the class “numbertext” was also added.

<div class = "container">
    <div class="mySlides">
      <div class="numbertext">1</div>
      <img src="1.jpeg" >
      </div>
      <div class="mySlides">
      <div class="numbertext">2</div>
      <img src="2.jpeg" >
      </div>
      <div class="mySlides">
      <div class="numbertext">3</div>
      <img src="3.jpeg" >
      </div>
      <div class="mySlides">
      <div class="numbertext">4</div>
      <img src="4.jpeg" >
      </div>
      <div class="mySlides">
      <div class="numbertext">5</div>
      <img src="5.jpeg" >
      </div>
      <div class ="mySlides">
      <div class="numbertext">6</div>
      <img src="6.jpeg" >
      </div>
      <div class="mySlides">
      <div class="numbertext">7</div>
      <img src="7.jpeg" >
      </div>
      <div class="mySlides">
      <div class="numbertext">8</div>
      <img src="8.jpeg" >
      </div>
  

JavaScript:

selected the slide to display by passing the newIndex as a parameter.
 Verified whether the new index is greater than or equal to the number of slides, or less than 0. Then loop to the first or last slide in these situations.
to make every slide invisible by giving them the 'hidden-slide' class.
To display it, then take off the 'hidden-slide' class from the slide at the newIndex.
Also Slide visibility can be adjusted as the image changes by invoking the updateSlideVisibility function within the changeImage function.
<script>
    let currentSlide = 1;
showSlide(currentSlide);

function changeSlide(n) {
showSlide(currentSlide += n);
}

function showSlide(n) {
const slides = document.getElementsByClassName("mySlides");

if (n > slides.length) {
currentSlide = 1;
}
if (n < 1) {
currentSlide = slides.length;
}

for (let i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}

slides[currentSlide - 1].style.display = "block";
}
function updateSlideVisibility(newIndex) {
  const slides = document.getElementsByClassName('slide'); // Assuming you have a class 'slide' for your slide elements

  if (newIndex < 0) {
    // If the new index is less than 0, loop to the last slide
    newIndex = slides.length - 1;
  } else if (newIndex >= slides.length) {
    // If the new index is greater than or equal to the number of slides, loop back to the first slide
    newIndex = 0;
  }

  // Hide all slides by adding the 'hidden-slide' class
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.add('hidden-slide');
  }

  // Show the slide at the newIndex by removing the 'hidden-slide' class
  slides[newIndex].classList.remove('hidden-slide');
}

  </script>




2- Form Validation Assignment


Javascript:
the submit event of the form, verifies the accuracy of the input fields (password, email, username, and confirm password), and, if necessary, shows error messages. The form cannot be submitted if any of the validations are unsuccessful (event.preventDefault()).
const form = document.getElementById("registration-form");
form.addEventListener("submit", function (event) {
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const usernameError = document.getElementById("username-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

let isValid = true;

if (username.value.length < 3) {
usernameError.textContent = "Username must be at least 3 characters";
isValid = false;
} else {
usernameError.textContent = "";
username.classList.remove("input-error");
username.classList.add("input-success");
}

if (!/^\S+@\S+\.\S+$/.test(email.value)) {
emailError.textContent = "Invalid email format";
isValid = false;
} else {
emailError.textContent = "";
email.classList.remove("input-error");
email.classList.add("input-success");
}

if (password.value.length < 6) {
passwordError.textContent = "Password must be at least 8 characters";
isValid = false;
} else {
passwordError.textContent = "";
password.classList.remove("input-error");
password.classList.add("input-success");
}

if (confirmPassword.value !== password.value) {
confirmPasswordError.textContent = "Passwords do not match";
isValid = false;
} else {
confirmPasswordError.textContent = "";
confirmPassword.classList.remove("input-error");
confirmPassword.classList.add("input-success");
}

if (!isValid) {
event.preventDefault();
}
});

  </script>
</body>
</html>



