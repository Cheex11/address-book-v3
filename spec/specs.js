describe('Contact', function(){
  describe("initialize", function() {
    it('combines the first name and last name with a space in between', function() {
      var testContact = Object.create(Contact);
      testContact.initialize("John", "Smith").should.equal("John Smith");
    });

    it("sets up an empty array", function() {
      var testContact = Contact.create();
      testContact.initialize();
      testContact.addresses.should.eql([]);
    });
  });

  describe("fullName", function(){
    it("combines the firstName and the lastName seperated by a space", function(){
      var testContact = Object.create(Contact);
      testContact.firstName = "Dolly";
      testContact.lastName = "Parton";
      testContact.fullName().should.equal("Dolly Parton");
  });
    it("Pushes address into new contact", function() {
      var cody = Object.create(Contact);
      cody.addresses = [];
      cody.firstName = "Cody";
      cody.lastName = "Wilson";
      var codyHome = Object.create(Address);
      codyHome.state = "Texas";
      codyHome.street = "Texas St.";
      codyHome.city = "Dallas";
      cody.addresses.push(codyHome);
      cody.addresses.should.equal["Texas St., Dallas, Texas"];
    });
  });

  describe("createAddress", function() {
    it("creates an address object", function() {
      var testContact = Contact.create();
      var testAddress = testContact.createAddress();
      Address.isPrototypeOf(testAddress).should.equal(true);
    });

    it("adds the address to the addresses property of the contact", function() {
      var testContact = Contact.create();
      var testAddress = testContact.createAddress();
      testContact.addresses.should.eql([testAddress]);
    });
  });

  describe("createPhoneNumber", function() {
    it("creates a phone number object", function() {
      var testContact = Contact.create();
      var testNumber = testContact.createPhoneNumber();
      PhoneNumber.isPrototypeOf(testNumber).should.equal(true);
    });

    it("adds the number to PhoneNumber property of the contact", function() {
      var testContact = Contact.create();
      var testNumber = testContact.createPhoneNumber();
      testContact.phoneNumbers.should.eql([testNumber]);
    });
  });


});

