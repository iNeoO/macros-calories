const lang = {
  default: {
    save: 'sauvegarder',
    cancel: 'annuler',
    remove: 'supprimer',
    add: 'ajouter',
    back: 'retour',
    edit: 'editer',
    reset: 'réinitialiser',
    home: 'acceuil',
    login: 'connexion',
    register: 's\'enregistrer',
    logout: 'se déconnecter',
    profile: 'profile',
    description: 'description',
    title: 'Calories-count',
  },
  login: {
    username: 'nom d\'utilisateur',
    password: 'mot de passe',
    alertWrongCredentials: 'Mauvais identifiants !',
    alertInput: 's\'il vous plait remplissez tous les champs !',
    subTitle: 'L\'application qui permet de calculer vos apports nutritionnels quotidiens',
  },
  register: {
    username: 'nom d\'utilisateur',
    password: 'mot de passe',
    email: 'courriel',
    dateOfBirth: 'date de naissance',
    activityType: 'type d\'activité quotidienne',
    sexe: 'sexe',
    male: 'masculin',
    female: 'feminin',
    variation: 'variation',
    variationDescription: 'En sèche mettre une valeur négative, en prise de muscle mettre une valeur positive. Laisser vide ou à 0 pour ne pas prendre en compte',
    activitiesTypes: {
      drying: 'sèche',
      weightLoss: 'perte de poids',
      gainMuscularMass: 'gain de masse musculaire',
      custom: 'custom',
    },
    objKcal: 'Objectif kcal de la journée',
    alertInput: 's\'il vous plait remplissez tous les champs !',
  },
  menu: {
    home: 'acceuil',
    addMacro: 'ajouter une macro',
    macros: 'macros',
    measurements: 'mensurations',
    aliments: 'aliments',
    profile: 'profile',
    settings: 'paramètres',
  },
  home: {
    date: 'date',
    weight: 'poids',
  },
  profile: {
    changeUserInfo: 'changer les infos',
    changeUserPassword: 'changer le mot de passe',
    changeUserObj: 'changer l\'objectif',
    username: 'nom d\'utilisateur',
    password: 'mot de passe',
    newPassword: 'nouveau mot de passe',
    email: 'courriel',
    dateOfBirth: 'date de naissance',
    alertWrongCredentials: 'Mauvais identifiants !',
    alertInput: 's\'il vous plait remplissez tous les champs !',
    activityType: 'type d\'activité quotidienne',
    kcal: 'kcal',
    settingsKcal: 'paramètrage de l\'objectif calorique quotidien',
    kcalObj: 'Calcul de l\'objectif quotidien des kcals ',
    alertEmptyMeasure: 'il faut préalablement renseigner au moins une mesure',
    sexe: 'sexe',
    male: 'masculin',
    female: 'feminin',
    variation: 'variation',
    objectif: {
      title: 'objectif',
      formule: '= objectif kcal + variation',
    },
    nutriments: {
      carbohydrate: {
        title: 'glucides',
        formule: '= objectif - lipides - protéines',
      },
      fat: {
        title: 'lipides',
        formule: '= poids(kg) x 1 x 9',
      },
      protein: {
        title: 'protéines',
        formule: '= poids(kg) x 1.6 x 4',
      },
      fiber: {
        title: 'fibres',
      },
    },
    nutritionnalsElements: 'calcul des éléments nutritionnels',
    variationDescription: 'En perte de poids mettre une valeur négative, en prise de muscle mettre une valeur positive',
    activitiesTypes: {
      normalActivity: {
        text: 'sédentaire',
        description: 'Allongé, éveillé. Calories de maintien.',
        formule: '= 9.74 x poids(kg) + 172.9 x taille(m) - 4.737 x age(A) + 667.051|13.707 x poids(kg) + 492.3 x taille(m) - 6.673 x age(A) + 77.607',
      },
      weekActivity: {
        text: 'très faible activité',
        description: 'Travail de bureau, rien de physique dans la journée.',
        formule: '= (9.74 x poids(kg) + 172.9 x taille(m) - 4.737 x age(A) + 667.051) x 1.2|(13.707 x poids(kg) + 492.3 x taille(m) - 6.673 x age(A) + 77.607) x 1.2',
      },
      lightActivity: {
        text: 'légère activité',
        description: 'Travail de bureau, un peu de marche durant la journée.',
        formule: '= (9.74 x poids(kg) + 172.9 x taille(m) - 4.737 x age(A) + 667.051) x 1.4|(13.707 x poids(kg) + 492.3 x taille(m) - 6.673 x age(A) + 77.607) x 1.4',
      },
      moderateActivity: {
        text: 'activité modérée',
        description: 'Travail non physique, mais training dans la journée.',
        formule: '= (9.74 x poids(kg) + 172.9 x taille(m) - 4.737 x age(A) + 667.051) x 1.6|(13.707 x poids(kg) + 492.3 x taille(m) - 6.673 x age(A) + 77.607) x 1.6',
      },
      hightActivity: {
        text: 'haute activité',
        description: 'L’équivalent de deux entrainements dans la journée.',
        formule: '= (9.74 x poids(kg) + 172.9 x taille(m) - 4.737 x age(A) + 667.051) x 1.8|(13.707 x poids(kg) + 492.3 x taille(m) - 6.673 x age(A) + 77.607) x 1.8',
      },
      extremActivity: {
        text: 'activité extrème',
        description: 'Travail physique, et training intense dans la journée.',
        formule: '= (9.74 x poids(kg) + 172.9 x taille(m) - 4.737 x age(A) + 667.051) x 2|(13.707 x poids(kg) + 492.3 x taille(m) - 6.673 x age(A) + 77.607) x 2',
      },
      custom: {
        text: 'custom',
        description: 'Kcal vous voulez utilser.',
        formule: '',
      },
    },
    programType: 'type de programme',
    programsTypes: {
      weightLoss: {
        slow: 'perte de poids, métabolysme lent',
        normal: 'perte de poids, métabolysme normal',
      },
      dried: 'sèche',
      gainMuscularMass: 'prise de masse',
      custom: 'custom',
    },
    alertRange: 'la somme des lipides, protéines, glucides doit être en 98% et 100%',
    objKcal: 'Objectif kcal de la journée',
  },
  aliments: {
    title: 'aliments',
    addAliment: 'ajouter un aliment',
    aliment: {
      name: 'nom',
      quantity: 'quantité',
      kcal: 'kcal',
      carbohydrate: 'glucides',
      fat: 'lipides',
      protein: 'protéines',
      fiber: 'fibres',
      description: 'description',
    },
    tab: {
      search: 'rechercher',
    },
    modal: {
      alertInput: 's\'il vous plait remplissez tous les champs !',
    },
  },
  measurements: {
    title: 'mensurations',
    addMeasurement: 'ajouter une mensuration',
    measurement: {
      date: 'date',
      weight: 'poids',
      breath: 'poitrine',
      underBreath: 'bas de la poitrine',
      abdomen: 'ventre',
      butt: 'fesses',
      leftLeg: 'bras gauche',
      rightLeg: 'bras droit',
      leftArm: 'cuisse gauche',
      rightArm: 'cuisse droite',
      height: 'taille  (hauteur)',
      waist: 'hanche',
      waistTurn: 'tour de taille',
    },
    tab: {
      dateRange: 'période',
    },
    modal: {
      alertInput: 's\'il vous plait remplissez tous les champs !',
    },
  },
  macros: {
    title: 'macros',
    addMacro: 'ajouter un aliment',
    day: 'jour',
    date: 'date',
    emptyData: 'pas de data pour cette date',
    tabs: {
      name: 'nom',
      quantity: 'quantité',
      kcal: 'kcal total',
      carbohydrate: 'glucides',
      fat: 'lipides',
      protein: 'protéines',
      fiber: 'fibres',
      totalTitle: 'total de la journée',
      weekNumber: 'numéro de la semaine',
      isFull: 'semaine complète ?',
      daylyObj: 'objectif pour la journée',
      title: 'type de stats',
      diff: 'différence',
      total: 'total de la journée',
    },
    totalTab: {
      kcal: 'kcal',
      carbohydrate: 'glucides (kcal)',
      fat: 'lipides (kcal)',
      protein: 'protéines (kcal)',
      fiber: 'fibres (g)',
    },
    modal: {
      alertInput: 's\'il vous plait remplissez tous les champs !',
    },
  },
  macro: {
    title: 'ajouter une macro',
    subTitle: 'ajouter les aliments',
    alimentsEated: {
      height: 'taille',
      weight: 'poids',
      name: 'nom',
      quantityEated: 'quantité mangée',
      quantity: 'quantité',
      kcal: 'kcal',
      carbohydrate: 'glucides',
      fat: 'lipides',
      protein: 'protéines',
      fiber: 'fibres',
      description: 'description',
      date: 'date',
      mealType: 'type de repas',
      mealsTypes: {
        breakfast: 'petit déjeuner',
        lunch: 'déjeuner',
        diner: 'diner',
      },
      activityType: 'type d\'activé quotidienne',
      activitiesTypes: {
        drying: 'sèche',
        weightLoss: 'perte de poids',
        gainMuscularMass: 'gain de masse musculaire',
        custom: 'custom',
      },
      objKcal: 'Objectif kcal de la journée',
      typeHead: 'aliments pré-enregistrées',
      save: 'sauvegarder macro',
      manualAdd: 'Ajouter aliment manuellement',
      add: 'Ajouter aliment',
      invalidUser: 'il faut complèter son profile avant de pouvoir ajouter des macros',
      alertDisabled: 'La quantité a été changé les champs sont désactivé, les valeurs nutritionnelles seront proportionnellement changées',
      alertInput: 's\'il vous plait remplissez tous les champs !',
    },
    modal: {
      alertInput: 's\'il vous plait remplissez tous les champs !',
    },
  },
};


export default lang;
