const dict = {
  username: 'nom d\'utilisateur',
  password: 'mot de passe',
  updates: 'mis à jour',
  email: 'email',
  user: 'utilisateur',
}

module.exports = {
  // errors
  errorType: atb => `${dict[atb]} a un type incorrect`,
  errorEmptyObject: atb => `L'objet ${dict[atb]} est vide`,
  errorAttribute: atb => `L'attribut ${dict[atb]} est manquant`,
  errorConfirmAccount: () => 'Vous devez d\'abord confirmer votre compte',
  errorUsername: () => 'Le nom d\'utilisateur doit uniquement contenir des lettres, des chiffres, _ ou - et être compris entre 3 et 6 caractères',
  errorEmail: () => 'L\'email ne présente pas le bon format',
  errorPassword: () => 'Le mot de passe doit contenir au moins un chiffre, une lettre minuscule, une lettre majuscule et 8 caractères',

  // fails
  failHash: () => 'Échec de hashage',
  failCompareHash: key => `${dict[key]} doesn't match`,
  failSave: key => `Échec de la sauvegarde ${dict[key]}`,
  failUpdate: () => 'Échec de la mise à jour',
  failDelete: () => 'Échec de la suppression',
  failMailer: () => 'Échec de l\'envoi d\'email',
  failCompileMjml: () => 'Échec de la compilation d\'email',

  idNotFound: () => 'L\'identifiant n\'a pas été trouvé',
  docNotFound: (key, value) => `${dict[key]} ${value} n'a pas été trouvé`,
  docExists: (key, value) => `${dict[key]} ${value} existe déjà`,

  // success
  docSaved: key => `${dict[key]} sauvegardé`,
  pwdUpdated: () => 'Mot de passe mis à jour',
  successUpdate: () => 'Mise à jour réussie',
  successDelete: key => `${dict[key]} supprimé`,
  successConfirmUserMail: () => 'Un email de confirmation vous a été envoyé',
  successResetPwdMail: () => 'Un email pour modifier votre mot de passe vous a été envoyé',

  // mails
  confirmUserSubject: () => 'MyWebsite - Confirmation utilisateur',
  confirmUserTitle: () => 'Confirmation utilisateur',
  confirmUserText: () => 'Cliquer sur le bouton ci-dessous pour confirmer votre compte',
  confirmUserButton: () => 'Confirmer votre compte',
  resetPwdSubject: () => 'MyWebsite - Réinitialisation de mot de passe',
  resetPwdTitle: () => 'Réinitialisation de mot de passe',
  resetPwdText: () => 'Cliquer sur le bouton ci-dessous pour réinitialiser votre mot de passe',
  resetPwdButton: () => 'Réinitialiser mot de passe',
}
