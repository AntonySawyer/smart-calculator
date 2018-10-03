class SmartCalculator {
  constructor(initialValue) {
    this.equals = [initialValue];
    this.fullExpression = [initialValue];
}
//While for right order. Switch for calculation.
  order(operatorIndex) {
    let first = this.equals[operatorIndex - 1];
    let second = this.equals[operatorIndex + 1];
    switch (this.equals[operatorIndex]) {
      case '+':
        this.changeEquals(operatorIndex - 1, first + second);
      break;
      case '-':
        this.changeEquals(operatorIndex - 1, first - second);
      break;
      case '*':
        this.changeEquals(operatorIndex - 1, first * second);
      break;
      case '/':
        this.changeEquals(operatorIndex - 1, first / second);
      break;
      case '^':
        this.changeEquals(operatorIndex - 1, Math.pow(first, second));
      break;
    }
    while (this.equals.length > 1) {
      if (this.equals.includes('^')) {
        this.order(this.equals.lastIndexOf('^'));
        break;
      } else if (this.equals.includes('*')) {
        this.order(this.equals.indexOf('*'));
        break;
    } else if (this.equals.includes('/')) {
        this.order(this.equals.indexOf('/'));
        break;
    } else if (this.equals.includes('+') || this.equals.includes('-')) {
      let add = this.equals.indexOf('+');
      let substract = this.equals.indexOf('-');
      if (substract != -1 && add != -1) {
        this.order(Math.min(substract, add));
      } else if (substract != -1) {
        this.order(substract);
      } else {
        this.order(add);
      }
        break;
    }
  }
  this.valueOf = function() {return this.equals[0].toString();}
  return this.valueOf();
}
// Most used expression in functions:
// changeEquals - for change result of calculation
  changeEquals (start, value) {
    this.equals.splice(start, 3, value);
  }
  // recoveryEquals - for change temporary array into full expression
  recoveryEquals () {
    if (this.fullExpression.length > 1) {
      this.equals = this.fullExpression.concat();
    }
  }
// next: just add and recalculate
  add(number) {
    this.fullExpression.push('+', number);
    this.recoveryEquals();
    this.order('');
    return this;
  }

  subtract(number) {
    this.fullExpression.push('-', number);
    this.recoveryEquals();
    this.order('');
    return this;
  }

  multiply(number) {
    this.fullExpression.push('*', number);
    this.recoveryEquals();
    this.order('');
    return this;
  }

  devide(number) {
    this.fullExpression.push('/', number);
    this.recoveryEquals();
    this.order('');
    return this;
  }

  pow(number) {
    this.fullExpression.push('^', number);
    this.recoveryEquals();
    this.order('');
    return this;
  }
}

module.exports = SmartCalculator;
