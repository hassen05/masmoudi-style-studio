import { useEffect, useState } from "react";

import seedClothes, { type Clothing } from "@/data/clothes";

const STORAGE_KEY = "masmoudi-style-studio:clothes";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function cloneClothes(items: Clothing[]) {
  return items.map((item) => ({ ...item }));
}

function trimValue(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function coerceClothing(value: unknown): Clothing | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Partial<Clothing> & { id?: unknown };
  const id = trimValue(record.id) ?? undefined;
  const name = trimValue(record.name);

  if (!id || !name) {
    return null;
  }

  return {
    id,
    name,
    description: trimValue(record.description),
    price: trimValue(record.price),
    image: trimValue(record.image),
    collection: trimValue(record.collection),
  };
}

function readStoredClothes() {
  if (!canUseStorage()) {
    return cloneClothes(seedClothes);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return cloneClothes(seedClothes);
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return cloneClothes(seedClothes);
    }

    const items = parsed.map(coerceClothing).filter((item): item is Clothing => item !== null);
    return items;
  } catch {
    return cloneClothes(seedClothes);
  }
}

function writeStoredClothes(items: Clothing[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function createClothingId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `mas-${crypto.randomUUID()}`;
  }

  return `mas-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function normalizeClothingInput(
  input: Omit<Clothing, "id"> & { id?: string },
): Omit<Clothing, "id"> {
  return {
    name: input.name.trim(),
    description: trimValue(input.description),
    price: trimValue(input.price),
    image: trimValue(input.image),
    collection: trimValue(input.collection),
  };
}

export function useClothesStore() {
  const [items, setItems] = useState<Clothing[]>(() => readStoredClothes());

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setItems(readStoredClothes());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const resetToSeed = () => {
    setItems(() => {
      const next = cloneClothes(seedClothes);
      writeStoredClothes(next);
      return next;
    });
  };

  const createClothing = (input: Omit<Clothing, "id">) => {
    const nextItem: Clothing = {
      id: createClothingId(),
      ...normalizeClothingInput(input),
    };

    setItems((prev) => {
      const next = [nextItem, ...prev];
      writeStoredClothes(next);
      return next;
    });

    return nextItem;
  };

  const updateClothing = (id: string, patch: Partial<Omit<Clothing, "id">>) => {
    setItems((prev) => {
      const next = prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          ...normalizeClothingInput({ ...item, ...patch }),
        };
      });

      writeStoredClothes(next);
      return next;
    });
  };

  const deleteClothing = (id: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      writeStoredClothes(next);
      return next;
    });
  };

  return {
    items,
    createClothing,
    updateClothing,
    deleteClothing,
    resetToSeed,
  };
}
