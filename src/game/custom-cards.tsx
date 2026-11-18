import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

import { modeKeys, typeKeys, type Card, type CardType, type Mode } from './cards';

const storageKey = 'tea-or-dare:custom-cards:v1';
type Draft = Pick<Card, 'mode' | 'type' | 'en' | 'zh'>;
type CustomCards = {
  cards: Card[];
  loading: boolean;
  saving: boolean;
  loadFailed: boolean;
  add: (draft: Draft) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
};

const CustomCardsContext = createContext<CustomCards | null>(null);

function isCustomCard(value: unknown): value is Card {
  if (typeof value !== 'object' || value === null) return false;
  const card = value as Partial<Card>;
  return card.source === 'custom'
    && typeof card.id === 'string'
    && modeKeys.includes(card.mode as Mode)
    && typeKeys.includes(card.type as CardType)
    && typeof card.en === 'string' && Boolean(card.en.trim())
    && typeof card.zh === 'string' && Boolean(card.zh.trim());
}

export function CustomCardsProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const writeInProgress = useRef(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(storageKey);
        const saved: unknown = raw === null ? [] : JSON.parse(raw);
        if (!Array.isArray(saved) || !saved.every(isCustomCard)) {
          throw new Error('Invalid custom card list');
        }
        if (active) setCards(saved);
      } catch {
        if (active) setLoadFailed(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, []);

  async function save(next: Card[]) {
    if (loading || loadFailed || writeInProgress.current) return false;
    writeInProgress.current = true;
    setSaving(true);
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(next));
      setCards(next);
      return true;
    } catch {
      return false;
    } finally {
      setSaving(false);
      writeInProgress.current = false;
    }
  }

  function add(draft: Draft) {
    const en = draft.en.trim();
    const zh = draft.zh.trim();
    if (!en || !zh) return Promise.resolve(false);
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return save([{ ...draft, en, zh, id, source: 'custom' }, ...cards]);
  }

  function remove(id: string) {
    return save(cards.filter((card) => card.id !== id));
  }

  return (
    <CustomCardsContext.Provider value={{ cards, loading, saving, loadFailed, add, remove }}>
      {children}
    </CustomCardsContext.Provider>
  );
}

export function useCustomCards() {
  const context = useContext(CustomCardsContext);
  if (!context) throw new Error('Custom cards require a provider');
  return context;
}
