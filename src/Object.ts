class Demo {
  name: string
  constructor(name: string) {
    this.name = name
  }
  showText() {
    return 'showText ' + this.name
  }
}

export default Demo
