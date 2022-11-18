import { SyntheticEvent } from "react";

type AsyncEventFn = (event: SyntheticEvent) => Promise<void>;
type SyncEventFn = (event: SyntheticEvent) => void;

export function synchronizeEventFn(asyncEventFn: AsyncEventFn): SyncEventFn {
  const syncEventFn: SyncEventFn = (event) => {
    asyncEventFn(event).catch((error) => {
      console.error("Unexpected error on synchronizeEventFn ", error);
    });
  };

  return syncEventFn;
}
