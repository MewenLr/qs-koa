const dict = {
  username: 'nom d\'utilisateur',
  password: 'mot de passe',
  updates: 'mis à jour',
  email: 'email',
  user: 'utilisateur',
}

module.exports = {
  errorType: atb => `${dict[atb]} a un type incorrect`,
  errorEmptyObject: atb => `L'objet ${dict[atb]} est vide`,
  errorAttribute: atb => `L'attribut ${dict[atb]} est manquant`,
  errorHash: () => 'Échec de hashage',
  errorCompareHash: key => `${dict[key]} doesn't match`,

  failSave: key => `Échec de la sauvegarde ${dict[key]}`,
  docSaved: key => `${dict[key]} sauvegardé`,
  docExists: (key, value) => `${dict[key]} ${value} existe déjà`,
  idNotFound: () => 'L\'identifiant n\'a pas été trouvé',
  docNotFound: (key, value) => `${dict[key]} ${value} n'a pas été trouvé`,
  failUpdate: () => 'Échec de la mise à jour',
  successUpdate: () => 'Mise à jour réussie',
  failDelete: () => 'Échec de la suppression',
  successDelete: key => `${dict[key]} supprimé`,

  wrongUsername: () => 'Le nom d\'utilisateur doit uniquement contenir des lettres, des chiffres, _ ou - et être compris entre 3 et 6 caractères',
  wrongEmail: () => 'L\'email ne présente pas le bon format',
  wrongPassword: () => 'Le mot de passe doit contenir au moins un chiffre, une lettre minuscule, une lettre majuscule et 8 caractères',
}
