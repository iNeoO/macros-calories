const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MacroSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref:'users', required: true },
  date: { type: Date, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  activityType: {
    type: { type: String, enum: [
      'normalActivity',
      'weekActivity',
      'lightActivity',
      'moderateActivity',
      'hightActivity',
      'extremActivity',
      'custom',
    ] },
    variation: { type: Number },
    objKcal: { type: Number },
  },
  nutriments: {
    carbohydrate: { type: Number },
    fat: { type: Number },
    protein: { type: Number },
    fiber: { type: Number },
  },
  aliments: [
    {
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
      kcal: { type: Number, required: true },
      carbohydrate: { type: Number, required: true },
      fat: { type: Number, required: true },
      protein: { type: Number, required: true },
      fiber: { type: Number, default: 0 },
      mealType: { type: String, enum: ['breakfast', 'lunch', 'diner'], required: true },
    },
  ],
  stats: {
    kcal: { type: Number },
    carbohydrate: { type: Number },
    fat: { type: Number },
    protein: { type: Number },
    fiber: { type: Number },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

MacroSchema.pre('save', function calculStats(next) {
  const aliments = this.aliments.toObject();
  const stats = aliments.reduce((alimentstats, aliment) => {
    alimentstats.kcal += aliment.kcal;
    alimentstats.carbohydrate += aliment.carbohydrate;
    alimentstats.fat += aliment.fat;
    alimentstats.protein += aliment.protein;
    alimentstats.fiber += aliment.fiber;
    return alimentstats;
  }, {
    kcal: 0,
    carbohydrate: 0,
    fat: 0,
    protein: 0,
    fiber: 0,
  });
  this.stats = stats;
  next();
});

MacroSchema.pre('findOneAndUpdate', function preUpdate(next) {
  try {
    const query = {
      updated_at: new Date(),
    };
    const doc = this.getUpdate();
    const stats = doc['$set'].aliments.reduce((alimentstats, aliment) => {
      alimentstats.kcal += aliment.kcal;
      alimentstats.carbohydrate += aliment.carbohydrate;
      alimentstats.fat += aliment.fat;
      alimentstats.protein += aliment.protein;
      alimentstats.fiber += aliment.fiber;
      return alimentstats;
    }, {
      kcal: 0,
      carbohydrate: 0,
      fat: 0,
      protein: 0,
      fiber: 0,
    });
    query.stats = stats;
    this.update({}, {
      '$set': query,
    });
    next();
  } catch (e) {
    console.log(e);
  }
});


module.exports = mongoose.model('macros', MacroSchema);
