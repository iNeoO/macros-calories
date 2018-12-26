const nutrition = require('./nutritionHelper.js');

module.exports = {
  getStats(macros_by_weeks, user) {
    const keys = Object.keys(macros_by_weeks);
    for (let i = 0; i < keys.length; i += 1) {
      const macroWeek = macros_by_weeks[keys[i]];
      const firstDate = macroWeek[0].date;
      const full = macroWeek.length === 7;
      let height = 0;
      let weight = 0;
      let activityType = {};
      let nutriments = {};
      const macroWeekTotal = macroWeek
        .reduce((alimentstats, aliment) => {
          if (aliment.height && aliment.weight) {
            height = aliment.height;
            weight = aliment.weight;
          }
          if (aliment.activityType) {
            activityType = aliment.activityType;
          }
          if (aliment.nutriments) {
            nutriments = aliment.nutriments;
          }
          alimentstats.kcal += aliment.stats.kcal;
          alimentstats.carbohydrate += aliment.stats.carbohydrate;
          alimentstats.fat += aliment.stats.fat;
          alimentstats.protein += aliment.stats.protein;
          alimentstats.fiber += aliment.stats.fiber;
          return alimentstats;
        }, {
          kcal: 0,
          carbohydrate: 0,
          fat: 0,
          protein: 0,
          fiber: 0,
        });
      let obj = 0;
      const old = (new Date(firstDate).getFullYear()) - new Date(user.birthdate).getFullYear();
      if (activityType.type !== 'custom') {
        if (user.sexe === 'female') {
          obj = Math.round(nutrition.getFemaleKcal(weight, height, old));
        } else {
          obj = Math.round(nutrition.getMaleKcal(weight, height, old));
        }
        obj = nutrition.activities[activityType.type](obj);
        obj += activityType.variation;
      } else {
        obj = activityType.objKcal;
      }
      const nutrimentsKcal = nutrition.objInKcal(obj, nutriments);
      macroWeekTotal.kcal = obj - macroWeekTotal.kcal;
      macroWeekTotal.carbohydrate = nutrimentsKcal.carbohydrate -
        nutrition.carbohydrateGtoKcal(macroWeekTotal.carbohydrate);
      macroWeekTotal.fat = nutrimentsKcal.fat -
        nutrition.fatGtoKcal(macroWeekTotal.fat);
      macroWeekTotal.protein = nutrimentsKcal.protein -
        nutrition.proteinGtoKcal(macroWeekTotal.protein);
      macroWeekTotal.fiber = nutriments.fiber - macroWeekTotal.fiber;
      macros_by_weeks[keys[i]] = macroWeekTotal;
      macros_by_weeks[keys[i]].nutriments = nutriments;
      macros_by_weeks[keys[i]].firstDate = firstDate;
      macros_by_weeks[keys[i]].full = full;
    }
    return macros_by_weeks;
  },
};
