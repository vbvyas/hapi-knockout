function WebmailViewModel() {
  var self = this;
  self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
  self.chosenFolderId = ko.observable();
  self.chosenFolderData = ko.observable();
  self.chosenMailData = ko.observable();
  
  // behaviors
  self.goToFolder = function (folder) { location.hash = folder };
  self.goToMail = function (mail) { location.hash = mail.folder + '/' + mail.id };

  // show inbox by default
  self.goToFolder('Inbox');
};

ko.applyBindings(new WebmailViewModel());
