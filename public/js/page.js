function WebmailViewModel() {
  var self = this;
  self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
  self.chosenFolderId = ko.observable();
  self.chosenFolderData = ko.observable();
  self.chosenMailData = ko.observable();
  
  // behaviors
  self.goToFolder = function (folder) { location.hash = folder };
  self.goToMail = function (mail) { location.hash = mail.folder + '/' + mail.id };

  // client-side routes
  // this makes it easier to use back and forward buttons
  // to get the same experience
  Sammy(function (){
    this.get('#:folder', function (){
      var folder = this.params.folder;
      self.chosenFolderId(folder);
      self.chosenMailData(null); // stop showing a folder
      $.get('/mail', { folder: folder }, self.chosenFolderData);
    });

    this.get('#:folder/:mailId', function (){
      self.chosenFolderId(this.params.folder);
      self.chosenFolderData(null);
      $.get('/mail', { mailId: this.params.mailId }, self.chosenMailData);
    });

    // reroute empty url to inbox
    this.get('', function () { this.app.runRoute('get', '#Inbox') });
  }).run();
};

ko.applyBindings(new WebmailViewModel());
