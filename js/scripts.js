var Contact = {
  all: [],
  create: function(firstName, lastName) {
    var contact = Object.create(Contact);
    contact.initialize(firstName, lastName);
    this.all.push(contact);
    return contact;
  },
  initialize: function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = [];
    this.phoneNumbers = [];
    return this.firstName + " " + this.lastName;
  },
  createAddress: function(myStreet, myCity, myState) {
    var address = Object.create(Address);
    this.addresses.push(address.fullAddress(myStreet, myCity, myState));
    return address;
  },
  createPhoneNumber: function () {
    var number = Object.create(PhoneNumber);
    this.phoneNumbers.push(number);
    return number;
  },
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

var Address = {
  fullAddress: function(myStreet, myCity, myState) {
    this.street = myStreet;
    this.city = myCity;
    this.state = myState;
    return this.street + " " + this.city + ", " + this.state;
  }
};

var PhoneNumber = {
  /*fullPhone: function(myNumber) {
    this.
  }*/
};


$(document).ready(function () {
  $("#add-address").click(function () {
    $("#new-addresses").append('<div class="new-address">' + '<div class="form-group">' + '<label for="new-street">Street</label>' +
      '<input type="text" class="form-control new-street">' + '</div>' + '<div class="form-group">' + '<label for="new-city">City</label>' +
      '<input type="text" class="form-control new-city">' + '</div>' + '<div class="form-group">' + '<label for="new-state">State</label>' +
      '<input type="text" class="form-control new-state">' + '</div>' + '</div>');
  });

  $("#add-number").click(function () {
    $("#new-phone-numbers").append('<div class="new-phone-numbers">' + '<div class="form-group">' + ' <label for="new-phone-number">Phone #</label>' +
      '<input type="text" class="form-control new-phone-number">' + '</div>' + '</div>');
  });


  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    if ( $("input.new-state").val() === "Texas" ) {
      if (($("input#new-first-name").val() === "Tinker") && ($("input#new-last-name").val() === "Bell")) {
      $('#tinkerbellpopup').modal('show');
  };
      $("span#state-test").append('<span class="glyphicon glyphicon-ok"' + "Validated" + '</span>').show();
      var inputtedFirstName = $("input#new-first-name").val();
      var inputtedLastName = $("input#new-last-name").val();
      var newContact = Contact.create(inputtedFirstName, inputtedLastName);
      /*newContact.firstName = inputtedFirstName;
      newContact.lastName = inputtedLastName;*/
      // newContact.addresses = [];
      // newContact.phoneNumbers = [];
      $(".new-address").each(function () {
        var inputtedStreet = $(this).find("input.new-street").val();
        var inputtedCity = $(this).find("input.new-city").val();
        var inputtedState = $(this).find("input.new-state").val();

        var newAddress = newContact.createAddress(inputtedStreet, inputtedCity, inputtedState);
        //console.log(newAddress);
        /*newAddress.street = inputtedStreet;
        newAddress.city = inputtedCity;
        newAddress.state = inputtedState;*/
        // newContact.addresses.push(newAddress);

      });
      $(".new-phone-numbers").each(function () {
        var inputtedPhoneNumber = $(this).find("input.new-phone-number").val();
        var newPhoneNumber = newContact.createPhoneNumber(inputtedPhoneNumber);
        newPhoneNumber.number = inputtedPhoneNumber;
        newContact.phoneNumbers.push(newPhoneNumber);
      });
      // .every should return tru for function .valid(). .every will not work if calling function within object must set variable to return boolean.
      var numbersValid = newContact.phoneNumbers.every(function (number) {
        return true;
      });
      if (numbersValid) {
        $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
      } else {
        alert("You F^&*ED UP!");
        newContact.phoneNumbers = [];
      }
      $(".contact").last().click(function () {
        $("#show-contact").show();
        $("#show-contact h2").text(newContact.fullName());
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);
        $("ul#addresses").text("");
        console.log(newContact.addresses);
        //console.log(newContact.addresses)
        newContact.addresses.forEach(function (curAddress) {
          $("ul#addresses").append("<li>" + curAddress + "</li>");
        });
        /*$("ul#phone-numbers").text("");
        newContact.phoneNumbers.forEach(function (phoneNumber) {
          $("ul#phone-numbers").append("<li>" + phoneNumber.fullNumber() + "</li>");
        });*/
      });
      this.reset();
    } else {
      $("span#state-test").text( "Not valid!" ).show().fadeOut( 5000 );
    };
    // this.reset();
  });
});

