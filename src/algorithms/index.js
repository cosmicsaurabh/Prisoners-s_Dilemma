const algorithms = {};

algorithms.ALLC = {
  name: 'Always Cooperate',
  description: 'Cooperate every move.',
  turn: (myHistory, theirHistory) => true,
};

algorithms.ALLD = {
  name: 'Always Defect',
  description: 'Defect every move.',
  turn: (myHistory, theirHistory) => false,
};

algorithms.ALT = {
  name: 'Alternate',
  description: 'Start by cooperating, then cooperate and defect alternately.',
  turn: (myHistory, theirHistory) => myHistory.length % 2 === 0,
};

algorithms.APP = {
  name: 'Appease',
  description: 'Start by cooperating, then repeat your previous move if the other player has cooperated or do the opposite if they have defected.',
  turn: (myHistory, theirHistory) => {
    if (myHistory.length === 0) return true;
    return theirHistory[theirHistory.length - 1] ? myHistory[myHistory.length - 1] : !myHistory[myHistory.length - 1];
  },
};

algorithms.CPAVG = {
  name: 'Copy Average',
  description: 'Choose a random move, but with a probability distribution that matches the other player\'s move distribution.',
  turn: (myHistory, theirHistory) =>
  {const cooperationRate = theirHistory.filter
    (x => x).length / theirHistory.length;
    //if random is leass than equal to our calcualted rate then cooperate
    return Math.random() <= cooperationRate;
  },
};

algorithms.GRIM = {
  name: 'Grim Trigger',
  description: 'Cooperate until the other player defects, after that always defect.',
  turn: (myHistory, theirHistory) => !theirHistory.includes(false),
};

algorithms.PAV = {
  name: 'Pavlovian',
  description: 'Start by cooperating, then repeat the previous move if had a positive outcome or do the opposite otherwise.',
  turn: (myHistory, theirHistory) => {
    if (myHistory.length === 0) return true;
    const myPrev = myHistory[myHistory.length - 1];
    const theirPrev = theirHistory[theirHistory.length - 1];
    return (myPrev && theirPrev) || (!myPrev && !theirPrev) ? myPrev : !myPrev;
  },
};

algorithms.RAND = {
  name: 'Random',
  description: 'Make a random move.',
  turn: (myHistory, theirHistory) => Math.random() >= 0.5,
};

algorithms.TFT = {
  name: 'Tit for Tat',
  description: 'Start by cooperating, then copy the other player\'s moves.',
  turn: (myHistory, theirHistory) => theirHistory.length === 0 || theirHistory[theirHistory.length - 1],
};

algorithms.TFTT = {
  name: 'Tit for Two Tats',
  description: 'Always cooperate, unless the other player has defected the last two times.',
  turn: (myHistory, theirHistory) => myHistory.length <= 1 || theirHistory[theirHistory.length - 1] || theirHistory[theirHistory.length - 2],
};

algorithms.TTFT = {
  name: 'Two Tits for Tat',
  description: 'Always cooperate, unless the other player has betrayed at least once in the last two moves.',
  turn: (myHistory, theirHistory) => myHistory.length <= 1 || (theirHistory[theirHistory.length - 1] && theirHistory[theirHistory.length - 2]),
};

export default algorithms;