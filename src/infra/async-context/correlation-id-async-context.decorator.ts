// import { runWithCorrelationId, getCorrelationId, setCorrelationId } from "./correlation-id-async-context";

// export function WithCorrelationId(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;

//   descriptor.value = function (...args: any[]) {
//     const correlationId = getCorrelationId()

//     if (!correlationId) {
//         throw new Error("Correlation ID is not defined.")
//     }

//     return originalMethod.apply(this, args)
//   };

//   return descriptor;
// }