export const trackingEvents = {
  pageView: {
    event: "pageView",
  },
  navigationClick: {
    event: "navigationClick",
  },
  mobileDrawerOpen: {
    event: "navigationOpen",
    navigationType: "Top Menu",
  },
  productMessageClose: {
    event: "notificationMessageClose",
    errorId: undefined,
  },
  productMessageView: {
    event: "notificationMessageView",
    errorId: undefined,
  },
  editUploadImage: {
    processType: "Upload Image",
  },
  uploadImageStart: {
    event: "uploadImage",
    processType: "Upload Image",
    processStep: "Upload Image Start",
  },
  uploadImageSuccess: {
    event: "uploadImage",
    processType: "Upload Image",
    processStep: "Upload Image Success",
  },
  loginSuccess: {
    event: "loginSuccess",
    loginType: "email",
    loginStatus: "logged in",
  },
  logoutSuccess: {
    event: "logoutSuccess",
    loginStatus: "logged out",
  },
  loginPlatformStart: {
    event: "loginPlatformStart",
  },
  landingPageContactFormView: {
    event: "landingPage",
    formType: "contact form",
    formStep: "Form View",
  },
  landingPageContactFormSubmit: {
    event: "landingPage",
    formType: "contact form",
    formStep: "Form Submit",
  },
  activityStreamFilterClick: {
    event: "filterClick",
    filterType: "My Activity",
  },
  activityStreamFiltersResetAllClick: {
    event: "filtersControlClick",
    filtersControlItem: "Clear All"
  },
  activityStreamFiltersToggleClick: {
    event: "filtersControlClick",
    filtersControlItem: "Filters toggle icon"
  },
  activityStreamItem: {
    event: "activityStreamItem"
  },
  listingDuplicateKeep: {
    event: "listingDuplicateKeep",
  },
  listingDuplicateRemove: {
    event: "listingDuplicateRemove",
  },
  listingAnalysisChangeDates: {
    event: "listingAnalysisChangeDates",
  },
  listingAnalysisView : {
    event: "listingAnalysisView"
  },
  postingFormView: {
    event: "posting",
    formType: "Posting",
    formStep: "Form View",
  },
  postingFormSubmit: {
    event: "posting",
    formType: "Posting",
    formStep: "Form Submit",
  },
  profileToggleActivate: {
    event: "toggleActivate",
  },
  profileToggleDeactivate: {
    event: "toggleDeactivate",
  },
  profileChangeBusinessInformation: {
    event: "changeBusinessInformation",
    formType: "Change Business Information",
    formStep: "Form Submit",
  },
  profileSocialMediaAdd: {
    event: "socialMediaAdd",
  },
  profileSocialMediaRemove: {
    event: "socialMediaRemove",
  },
  profileSaveAbout: {
    event: "navigationClick",
    navigationType: "My Profile About",
    navigationElement: "save button",
  },
  profileVideoAdd: {
    event: "videoAdd",
  },
  profileVideoRemove: {
    event: "videoRemove",
  },
  profileSaveVideo: {
    event: "navigationClick",
    navigationType: "My Profile Video",
    navigationElement: "save",
  },
  profilePhotoAdd: {
    event: "photoAdd",
  },
  profilePhotoRemoved: {
    event: "photoRemoved",
  },
  profileSaveGallery: {
    event: "navigationClick",
    navigationType: "My Profile Photos",
    navigationElement: "save",
  },
  profileKeywordRemove: {
    event: "keywordsRemove",
  },
  profileKeywordAdd: {
    event: "keywordsAdd",
  },
  profileHighlightsAdd: {
    event: "highlightsAdd",
  },
  profileHighlightsRemove: {
    event: "highlightsRemove",
  },
  profileBadgesAdd: {
    event: "badgesAdd",
    sealType: "Image",
  },
  profileBadgesRemove: {
    event: "badgesRemove",
    sealType: "Image",
  },
  profileSaveOpeningHours: {
    event: "navigationClick",
    navigationType: "My Profile Opening Hours",
    navigationElement: "save",
  },
  profileSaveAdditionalInfo: {
    event: "navigationClick",
    navigationType: "My Profile Company Directory",
    navigationElement: "save button",
  },
  profileLanguageAdd: {
    event: "languageAdd",
  },
  profilePaymentAdd: {
    event: "paymentAdd",
  },
  profileAccessSymbolAdd: {
    event: "accessSymbolAdd",
  },
  profileSaveApprenticeship: {
    event: "navigationClick",
    navigationType: "My Profile Apprenticeship",
    navigationElement: "save button",
  },
  profileApprenticeshipAdd: {
    event: "apprenticeshipAdd"
  },
  openingHoursChange: {
    event: "openingHoursChange",
  },
  errorMessage: {
    event: "errorMessage",
  },
  pageNotFound: {
    event: "errorMessage",
    errorId: "404",
    errorName: "Page Not Found",
  },
  forgotPasswordFormSubmit: {
    event: "resetPassword",
    formType: "Forgot Password",
    formStep: "Form Submit",
  },
  forgotPasswordFormView: {
    event: "resetPassword",
    formType: "Forgot Password",
    formStep: "Form View",
  },
  resetPasswordLink: {
    event: "resetPasswordLink",
  },
  resetPasswordLinkClick: {
    event: "resetPasswordLinkClick",
  },
  resetPasswordFormSubmit: {
    event: "resetPassword",
    formType: "Forgot Password",
    formStep: "New PasswordSubmit",
  },
  resetPasswordFormView: {
    event: "resetPassword",
    formType: "Forgot Password",
    formStep: "New Password View",
  },
  accountDataFormSubmit: {
    event: "accountData",
    formType: "Change Account Data",
    formStep: "Form Submit",
  },
  accountDeleteStart: {
    event: "deleteData",
    processType: "Delete Account",
    processStep: "Link Click",
    processAction: "Start",
  },
  accountDataFormView: {
    event: "accountData",
    formType: "Change Account Data",
    formStep: "Form View",
  },
  changePasswordFormSubmit: {
    event: "changePassword",
    processType: "Change Password",
    formStep: "Form Submit",
  },
  changePasswordFormView: {
    event: "changePassword",
    formType: "Change Password",
    formStep: "Form View",
  },
  newsletterToggleActivate: {
    event: "toggleActivate",
    toggleType: "Notification",
    notificationType: "Newsletter",
  },
  newsletterToggleDeactivate: {
    event: "toggleDeactivate",
    toggleType: "Notification",
    notificationType: "Newsletter",
  },
  personalizeUrlFormFieldError: {
    event: "formFieldError",
    formFieldName: "personalize url",
  },
  personalizeUrlFormSubmit: {
    event: "changeSellwerkURL",
    formType: "Change Sellwerk URL",
    formStep: "Form Submit",
  },
  personalizeUrlFormView: {
    event: "changeSellwerkURL",
    formType: "Change Sellwerk URL",
    formStep: "Form View",
  },
  changeProfileVisibility: {
    event: "changeProfileVisibility",
  },
  onboardingRegistrationFail: {
    event: "onboardingFailure",
    formType: "Onboarding",
    formStep: "Registration Submit",
  },
  onboardingRegistrationSubmit: {
    event: "onboarding",
    formType: "Onboarding",
    formStep: "Registration Submit",
  },
  onboardingRegistrationView: {
    event: "onboarding",
    formType: "Onboarding",
    formStep: "Registration View",
  },
  onboardingSetPasswordSubmit: {
    event: "onboarding",
    formType: "Onboarding",
    formStep: "Set Password Submit",
  },
  onboardingSetPasswordFailed: {
    event: "onboardingFailure",
    formType: "Onboarding",
    formStep: "Set Password Submit",
  },
  onboardingSetPasswordFormView: {
    event: "onboarding",
    formType: "Onboarding",
    formStep: "Set Password View",
  },
  reviewReplyStart:{
    event: "reviewReplyStart"
  },
  reviewReplySuccess:{
    event: "reviewReplySuccess", 
  },
  reviewDashboardChangeDates: {
    event: "reviewDashboardChangeDates"
  }
}
