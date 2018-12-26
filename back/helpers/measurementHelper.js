const nearestMeasurementElems = {
  height: 1,
  weight: 1,
  breath: 1,
  underBreath: 1,
  abdomen: 1,
  waist: 1,
  butt: 1,
  leftLeg: 1,
  rightLeg: 1,
  leftArm: 1,
  rightArm: 1,
  description: 1,
  date: 1,
};

const getNearestMeasurementQuery = (userId, date) => {
  return [
    {
      '$match': {
        userId: userId,
      },
    },
    {
      '$project': {
        ...nearestMeasurementElems,
        difference: {
          '$abs': {
            '$subtract': [date, '$date'],
          },
        },
      },
    },
    {
      $sort: {
        difference: 1,
      },
    },
    {
      $limit: 1,
    },
  ];
};

module.exports = {
  getNearestMeasurementQuery,
};
