module.exports = {
  activitiesTypes: [
    {
      value: 'normalActivity',
      text: 'profile.activitiesTypes.normalActivity.text',
    },
    {
      value: 'weekActivity',
      text: 'profile.activitiesTypes.weekActivity.text',
    },
    {
      value: 'lightActivity',
      text: 'profile.activitiesTypes.lightActivity.text',
    },
    {
      value: 'moderateActivity',
      text: 'profile.activitiesTypes.moderateActivity.text',
    },
    {
      value: 'hightActivity',
      text: 'profile.activitiesTypes.hightActivity.text',
    },
    {
      value: 'extremActivity',
      text: 'profile.activitiesTypes.extremActivity.text',
    },
    {
      value: 'custom',
      text: 'profile.activitiesTypes.custom.text',
    },
  ],
  programsTypes: {
    weightLossNormal: {
      value: {
        male: -310,
        female: -300,
      },
      text: 'profile.programsTypes.weightLoss.slow',
    },
    weightLoss: {
      value: {
        male: -210,
        female: -200,
      },
      text: 'profile.programsTypes.weightLoss.normal',
    },
    dried: {
      value: {
        male: 210,
        female: 200,
      },
      text: 'profile.programsTypes.dried',
    },
    gainMuscularMass: {
      value: {
        male: 310,
        female: 300,
      },
      text: 'profile.programsTypes.gainMuscularMass',
    },
    custom: {
      value: {
        male: 0,
        female: 0,
      },
      text: 'profile.programsTypes.custom',
    },
  },
  objForm: {
    normalActivity: {
      description: 'profile.activitiesTypes.normalActivity.description',
      formule: 'profile.activitiesTypes.normalActivity.formule',
      func(kcal) {
        return kcal;
      },
    },
    weekActivity: {
      description: 'profile.activitiesTypes.weekActivity.description',
      formule: 'profile.activitiesTypes.weekActivity.formule',
      func(kcal) {
        return Math.floor(kcal * 1.2);
      },
    },
    lightActivity: {
      description: 'profile.activitiesTypes.lightActivity.description',
      formule: 'profile.activitiesTypes.lightActivity.formule',
      func(kcal) {
        return Math.floor(kcal * 1.4);
      },
    },
    moderateActivity: {
      description: 'profile.activitiesTypes.moderateActivity.description',
      formule: 'profile.activitiesTypes.moderateActivity.formule',
      func(kcal) {
        return Math.floor(kcal * 1.6);
      },
    },
    hightActivity: {
      description: 'profile.activitiesTypes.hightActivity.description',
      formule: 'profile.activitiesTypes.hightActivity.formule',
      func(kcal) {
        return Math.floor(kcal * 1.8);
      },
    },
    extremActivity: {
      description: 'profile.activitiesTypes.extremActivity.description',
      formule: 'profile.activitiesTypes.extremActivity.formule',
      func(kcal) {
        return Math.floor(kcal * 2);
      },
    },
    custom: {
      description: 'profile.activitiesTypes.custom.description',
      formule: 'profile.activitiesTypes.custom.formule',
      func(kcal) {
        return kcal;
      },
    },
  },
  getFemaleKcal(weight, height, old) {
    return (((9.74 * weight) + (172.9 * (height / 100))) - (4.737 * old)) + 667.051;
  },
  getMaleKcal(weight, height, old) {
    return (((13.707 * weight) + (492.3 * (height / 100))) - (6.673 * old)) + 77.607;
  },
  proteinGtoKcal(protein) {
    return protein * 4;
  },
  carbohydrateGtoKcal(carbohydrate) {
    return carbohydrate * 4;
  },
  fatGtoKcal(fat) {
    return fat * 9;
  },
  proteinKcaltoG(protein) {
    return Math.round(protein / 4);
  },
  carbohydrateKcaltoG(carbohydrate) {
    return Math.round(carbohydrate / 4);
  },
  fatKcaltoG(fat) {
    return Math.round(fat / 9);
  },
};
