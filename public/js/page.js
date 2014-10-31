function WebmailViewModel() {
  var self = this;
  self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
  self.chosenFolderId = ko.observable();
  self.chosenFolderData = ko.observable();
  self.chosenMailData = ko.observable();
  
  // behaviors
  self.goToFolder = function (folder) {
    self.chosenFolderId(folder);
    self.chosenMailData(null); // stop showing a mail
    $.get('/mail', { folder: folder }, self.chosenFolderData);
  };

  self.goToMail = function (mail) {
    self.chosenFolderId(mail.folder);
    self.chosenFolderData(null); // stop showing a folder
    $.get('/mail', { mailId: mail.id }, self.chosenMailData);
  };

  // show inbox by default
  self.goToFolder('Inbox');
};

ko.applyBindings(new WebmailViewModel());
