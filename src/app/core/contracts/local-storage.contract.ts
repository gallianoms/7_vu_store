export abstract class AbstractLocalStorage {
    abstract setItem(key: string, value: string): void;
    abstract getItem(key: string): string | null;
    abstract removeItem(key: string): void;
    abstract clear(): void;
  }
  