import { AsyncLocalStorage } from "async_hooks";

type RequestContext = {
  correlationId: string;
}

const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

export function setCorrelationId(correlationId: string, callback: () => void) {
    asyncLocalStorage.run({ correlationId }, callback);
}

export function getCorrelationId(): string {
    const store = asyncLocalStorage.getStore();
    const correlationId = store?.correlationId

    if (!correlationId) {
        throw new Error("Correlation ID not found.")
    }

    return store?.correlationId;
}