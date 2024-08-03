import algorithms from '../algorithms/index.js';
import '../styles/styles.css';

class Prisoner {
  constructor(algorithm) {
    this.score = 0;
    this.history = [];
    this.algorithm = algorithm;
    this.cooperates = algorithms[algorithm].turn;
  }

  averageScore() {
    return this.history.length === 0 ? this.score : this.score / this.history.length;
  }
}

class PrisonersDilemma {
  constructor({ algorithm1, algorithm2, R = 3, P = 1, S = 0, T = 5 }) {
    this.prisoner1 = new Prisoner(algorithm1);
    this.prisoner2 = new Prisoner(algorithm2);
    this.R = R;
    this.P = P;
    this.S = S;
    this.T = T;
  }

  next() {
    const cooperates1 = this.prisoner1.cooperates(this.prisoner1.history, this.prisoner2.history);
    const cooperates2 = this.prisoner2.cooperates(this.prisoner2.history, this.prisoner1.history);

    this.prisoner1.history.push(cooperates1);
    this.prisoner2.history.push(cooperates2);

    if (cooperates1 && cooperates2) {
      this.prisoner1.score += this.R;
      this.prisoner2.score += this.R;
    } else if (!cooperates1 && !cooperates2) {
      this.prisoner1.score += this.P;
      this.prisoner2.score += this.P;
    } else {
      this.prisoner1.score += cooperates1 ? this.S : this.T;
      this.prisoner2.score += cooperates2 ? this.S : this.T;
    }
  }
}

export default PrisonersDilemma;
