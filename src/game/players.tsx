import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button, palette, shared } from './ui';

const storageKey = 'tea-or-dare:players:v1';

export function pickPlayer(players: string[], previous?: string) {
  const eligible = players.length > 1 ? players.filter((name) => name !== previous) : players;
  return eligible[Math.floor(Math.random() * eligible.length)];
}

export function usePlayers() {
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const writing = useRef(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(storageKey);
        const saved: unknown = raw === null ? [] : JSON.parse(raw);
        if (!Array.isArray(saved) || !saved.every((name) => typeof name === 'string')) {
          throw new Error('Invalid player list');
        }
        if (active) setNames(saved);
      } catch {
        if (active) setLoadFailed(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, []);

  async function save(next: string[]) {
    if (loading || loadFailed || writing.current) return false;
    writing.current = true;
    setSaving(true);
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(next));
      setNames(next);
      return true;
    } catch {
      return false;
    } finally {
      writing.current = false;
      setSaving(false);
    }
  }

  return { names, loading, saving, loadFailed, save };
}

export function PlayerPanel({ roster, selected, onRemoved }: {
  roster: ReturnType<typeof usePlayers>;
  selected?: string;
  onRemoved: (name: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const { names, loading, saving, loadFailed, save } = roster;
  const unavailable = loading || saving || loadFailed;

  async function add() {
    if (unavailable) return;
    const name = draft.trim();
    if (!name) {
      setError('Enter a player name.');
      return;
    }
    if (names.some((existing) => existing.toLowerCase() === name.toLowerCase())) {
      setError('That player is already on the list.');
      return;
    }
    setError('');
    if (await save([...names, name])) setDraft('');
    else setError('Couldn’t save the player. Try again.');
  }

  async function remove(name: string) {
    setError('');
    if (await save(names.filter((player) => player !== name))) {
      onRemoved(name);
    } else {
      setError('Couldn’t remove the player. Try again.');
    }
  }

  return (
    <View style={styles.panel}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded(!expanded)}
        style={styles.toggle}>
        <Text style={[shared.label, styles.centered]}>🎀  Who’s Spilling?</Text>
        <Text style={[styles.count, styles.centered]}>{names.length} {names.length === 1 ? 'player' : 'players'}  {expanded ? '▴' : '▾'}</Text>
      </Pressable>
      {expanded && (
        <View style={styles.contents}>
          <View style={shared.row}>
            {names.map((name) => (
              <Pressable key={name} accessibilityRole="button" accessibilityLabel={`Remove ${name}`}
                accessibilityState={{ disabled: unavailable, selected: name === selected }}
                disabled={unavailable} onPress={() => void remove(name)}
                style={[styles.tag, name === selected && styles.selected]}>
                <Text style={styles.tagText}>{name}  ×</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.form}>
            <TextInput
              accessibilityLabel="Player name"
              placeholder="Player name"
              placeholderTextColor={palette.muted}
              editable={!unavailable}
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => void add()}
              returnKeyType="done"
              style={styles.input}
            />
            <Button label="Add" onPress={() => void add()} disabled={unavailable} />
          </View>
          {loading && <Text style={styles.count}>Loading players…</Text>}
          {(loadFailed || error !== '') && (
            <Text accessibilityLiveRegion="polite" style={styles.tagText}>
              {loadFailed ? 'Couldn’t load players. Reopen the app to try again.' : error}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { backgroundColor: palette.cream, borderColor: palette.border, borderWidth: 1, borderRadius: 20 },
  toggle: { minHeight: 48, alignItems: 'center', justifyContent: 'center', gap: 3, paddingHorizontal: 14, paddingVertical: 8 },
  centered: { textAlign: 'center' },
  count: { color: palette.muted, fontSize: 13 },
  contents: { paddingHorizontal: 14, paddingBottom: 14, gap: 10 },
  form: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, minWidth: 0, borderColor: palette.border, borderWidth: 1, borderRadius: 14, paddingHorizontal: 10, color: palette.ink, fontSize: 16 },
  tag: { minHeight: 44, justifyContent: 'center', maxWidth: '100%', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#F6DFEA', borderWidth: 1, borderColor: 'transparent' },
  selected: { borderColor: palette.berry, backgroundColor: '#FAD3DF' },
  tagText: { color: palette.berry, fontWeight: '600' },
});
