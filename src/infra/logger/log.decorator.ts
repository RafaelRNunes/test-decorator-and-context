import { getCorrelationId } from "../../infra/async-context/correlation-id-async-context";

async function asyncLog(message: string) {
  return new Promise<void>((resolve) => {
    console.log(message);
    resolve()
  });
}

export function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;

    descriptor.value = async function (...args: any[]) {
        const correlationId = getCorrelationId();
        const timestamp = new Date().toISOString();

        await asyncLog(`[${timestamp}] [${className}] [${propertyKey}] [Correlation ID: ${correlationId}] Calling method with args: ${JSON.stringify(args)}`);

        try {
            const result = await originalMethod.apply(this, args);
            await asyncLog(`[${timestamp}] [${className}] [${propertyKey}] [Correlation ID: ${correlationId}] Method executed successfully. Result: ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            await asyncLog(`[${timestamp}] [${className}] [${propertyKey}] [Correlation ID: ${correlationId}] Error occurred: ${error}`);
            throw error;
        };
    }

    return descriptor;
}