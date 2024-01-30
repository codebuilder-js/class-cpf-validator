class ValidateCPF {
  constructor(sendedCPF) {
    Object.defineProperty(this, 'cleanCPF', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: sendedCPF.replace(/\D+/g, '')
    });
  }

  sequence() {
    return this.cleanCPF.charAt(0).repeat(this.cleanCPF.length) === this.cleanCPF;
  }

  generateNewCPF() {
    const cpfWithoutDigit = this.cleanCPF.slice(0, -2);
    const digit1 = ValidateCPF.generateDigit(cpfWithoutDigit);
    const digit2 = ValidateCPF.generateDigit(cpfWithoutDigit + digit1);

    this.newCPF = cpfWithoutDigit + digit1 + digit2;
  }

  static generateDigit(cpfWithoutDigit) {
    let total = 0;
    let reverse = cpfWithoutDigit.length + 1;

    for(let numericString of cpfWithoutDigit) {
      total += reverse * Number(numericString);
      reverse--;
    }

    const digit = 11 - (total % 11);
    return digit <= 9 ? String(digit) : '0';
  }

  validate() {
    if(!this.cleanCPF) return false;
    if(typeof this.cleanCPF !== 'string') return false;
    if(this.cleanCPF.length !== 11) return false;
    if(this.sequence()) return false;
    
    this.generateNewCPF();

    return this.newCPF === this.cleanCPF;
  }
}

const cpfList = ['705.484.450-52', '070.987.720-03', '999.999.999-99']
const validateCPF = new ValidateCPF(cpfList[1]);

if(validateCPF.validate()) {
  console.log('This is a valid CPF!');
} else {
  console.log('Invalid CPF!');
}