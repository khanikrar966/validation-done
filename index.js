function clearErrors() {
   errors = document.getElementsByClassName('formerror');
   for (let item of errors) {
      item.innerHTML = '';
   }
}

function seterror(id, error) {
   element = document.getElementById(id);
   element.getElementsByClassName('formerror')[0].innerHTML = error;
}

var form = document.getElementById('myForm');
var formSuccess = document.querySelector('.form-message');

function isValidEmail(email) {
   const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}

function isValidPhoneNumber(phone) {
   const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
   return re.test(Number(phone));
}

function validateForm(e) {
   e.preventDefault();
   var returnval = true;

   if (returnval === true) {
      clearErrors();
   }
   var name = document.forms['myForm']['fname'].value;
   if (!name || name.length < 5) {
      seterror('name', 'Length of name is too short');
      returnval = false;
   }

   var email = document.forms['myForm']['femail'].value;
   if (!email || !isValidEmail(email)) {
      seterror('email', 'Email is invalid');
      returnval = false;
   }

   var phone = document.forms['myForm']['fphone'].value;
   if (!phone || !isValidPhoneNumber(phone)) {
      seterror('phone', 'Phone number is invalid');
      returnval = false;
   }

   var gender = document.forms['myForm']['fgender'].value;
   if (!gender) {
      seterror('gender-radio', 'You must select gender');
      returnval = false;
   }

   var address = document.forms['myForm']['faddress'].value;
   if (!address) {
      seterror('address', 'You must enter address');
      returnval = false;
   }

   var date = document.forms['myForm']['fdob'].value;
   var today = new Date();
   var birthDate = new Date(date);
   var age = today.getFullYear() - birthDate.getFullYear();
   var m = today.getMonth() - birthDate.getMonth();
   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
   }
   if (!age || age < 18) {
      seterror('dob', "You're under age 18");
      returnval = false;
   }

   if (returnval) {
      formSuccess.classList.remove('hide');
      formSuccess.classList.add('show');
      signUp(e);
      form.reset();
   }

   return returnval;
}

function signUp(e) {
   let formData = JSON.parse(localStorage.getItem('formData')) || [];
   let exist =
      formData.length &&
      JSON.parse(localStorage.getItem('formData')).some(
         (data) =>
            data.fname.toLowerCase() ==
            document.getElementById('fname').value.toLowerCase(),
      );
   if (!exist) {
      formData.push({
         fname: document.getElementById('fname').value,
         phone: document.getElementById('fphone').value,
         gender: document.getElementById('fgender').value,
         email: document.getElementById('femail').value,
         dob: document.getElementById('fdob').value,
         address: document.getElementById('faddress').value,
      });
      localStorage.setItem('formData', JSON.stringify(formData));
      dispData();
      document.getElementById('fname').focus();
   } else {
      alert('Oops!, Duplicate found!!\nYou have already sigjned up');
   }
   e.preventDefault();
}
function dispData() {
   console.log('hi', localStorage.getItem('formData'));
   if (localStorage.getItem('formData')) {
      var output = document.querySelector('tbody');
      output.innerHTML = '';
      JSON.parse(localStorage.getItem('formData')).forEach((data) => {
         output.innerHTML += `
                  <tr>
                      <td>${data.fname}</td>
                      <td>${data.phone}</td>
                      <td>${data.gender}</td>
                      <td>${data.email}</td>
                      <td>${data.dob}</td>
                      <td>${data.address}</td>
                  </tr>
          `;
      });
   }
}
dispData();
