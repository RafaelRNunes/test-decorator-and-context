import CalculatorEntity from "../domain/calculator.entity";
import { Log } from "../infra/logger/log.decorator";
import ISum from "./sum.interface";

export default class SumUseCase implements ISum {

    constructor() {}

    @Log
    async exec(a: number, b: number): Promise<Object> {
        const calculator = new CalculatorEntity()
        return { result: calculator.sum(a, b) }
    }

}