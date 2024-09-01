import SumUseCase from "./application/sum.usecase"
import ISum from "./application/sum.interface";
import { setCorrelationId } from "./infra/async-context/correlation-id-async-context";

const calculatorApplication: ISum = new SumUseCase();
const values = [
    { a: 1, b: 1, correlationId: "1" },
    { a: 2, b: 2, correlationId: "2" },
    { a: 3, b: 3, correlationId: "3" },
    { a: 4, b: 4, correlationId: "4" }
];

(
    async () => {
        for (const value of values) {
            const correlationId = value.correlationId

            setCorrelationId(correlationId)

            const result = await calculatorApplication.exec(value.a, value.b)
            console.log(result)
        }

        const result = await calculatorApplication.exec(values[0].a, values[3].b)
        console.log(result)
    }
)()