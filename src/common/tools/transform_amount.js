export default new class transfromPrice {
    constructor() {}

    decimalAmount(amount) {
        return parseInt(amount, 16);
    }

    //转换INK的持币数量
    INKAmount(amount) {
        return this.decimalAmount(amount)/Math.pow(10, 9);
    }

    QTUMAmount(amount) {
        return this.decimalAmount(amount)/Math.pow(10, 8);
    }

    DifficultyAmount(amount) {
        return this.decimalAmount(amount)/Math.pow(10, 8);
    }
}
