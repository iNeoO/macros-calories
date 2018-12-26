module.exports = {
  activities: {
    normalActivity(kcal) {
      return kcal;
    },
    weekActivity(kcal) {
      return Math.floor(kcal * 1.2);
    },
    lightActivity(kcal) {
      return Math.floor(kcal * 1.4);
    },
    moderateActivity(kcal) {
      return Math.floor(kcal * 1.6);
    },
    hightActivity(kcal) {
      return Math.floor(kcal * 1.8);
    },
    extremActivity(kcal) {
      return Math.floor(kcal * 2);
    },
    custom(kcal) {
      return kcal;
    },
  },
  objInKcal(dailyObj, nutriments) {
    const carbohydrate = Math.floor((dailyObj *
      nutriments.carbohydrate) / 100);
    const protein = Math.floor((dailyObj *
      nutriments.protein) / 100);
    const fat = Math.floor((dailyObj *
      nutriments.fat) / 100);
    return {
      carbohydrate,
      protein,
      fat,
    };
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
};
