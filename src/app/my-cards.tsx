import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';

import { modes, typeKeys, types, type CardType, type Mode } from '@/game/cards';
import { useCustomCards } from '@/game/custom-cards';
import { Button, Heading, ModePicker, Page, palette, shared } from '@/game/ui';

export default function MyCardsScreen() {
  const [mode, setMode] = useState<Mode>('sweet');
  const [type, setType] = useState<CardType>('truth');
  const [en, setEn] = useState('');
  const [zh, setZh] = useState('');
  const [error, setError] = useState('');
  const { cards, loading, saving, loadFailed, add, remove } = useCustomCards();

  async function submit() {
    if (!en.trim() || !zh.trim()) {
      setError('Enter both English and Chinese before adding your card.');
      return;
    }
    setError('');
    if (await add({ mode, type, en, zh })) {
      setEn('');
      setZh('');
      setMode('sweet');
      setType('truth');
      Keyboard.dismiss();
    } else {
      setError('Couldn’t save your card. Please try again.');
    }
  }

  async function deleteCard(id: string) {
    setError('');
    if (!(await remove(id))) setError('Couldn’t delete your card. Please try again.');
  }

  return (
    <Page keyboard>
      <Heading title="My Cards" subtitle="Brew questions of your own" />
      <View style={shared.panel}>
        <Text style={shared.label}>English</Text>
        <TextInput
          accessibilityLabel="English question"
          value={en}
          onChangeText={setEn}
          editable={!saving}
          multiline
          placeholder="Write a question or challenge"
          placeholderTextColor={palette.muted}
          style={styles.input}
        />
        <Text style={shared.label}>Chinese · 中文</Text>
        <TextInput
          accessibilityLabel="Chinese question"
          value={zh}
          onChangeText={setZh}
          editable={!saving}
          multiline
          placeholder="写一个问题或挑战"
          placeholderTextColor={palette.muted}
          style={styles.input}
        />
        <Text style={shared.label}>Mode</Text>
        <ModePicker value={mode} onChange={setMode} />
        <Text style={shared.label}>Card type</Text>
        <View style={shared.row}>
          {typeKeys.map((choice) => (
            <View key={choice} style={shared.column}>
              <Button label={types[choice]} onPress={() => setType(choice)} selected={type === choice}
                tint={type === choice ? modes[mode].tint : palette.background} ink={modes[mode].ink} />
            </View>
          ))}
        </View>
        <Button label="Add Card" onPress={submit} disabled={loading || saving || loadFailed} />
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {loadFailed ? 'Couldn’t open your saved cards. Reopen the app to try again.' : error}
        </Text>
      </View>
      <Text accessibilityRole="header" style={styles.section}>Your saved cards</Text>
      {loading && <Text style={shared.body}>Loading your cards…</Text>}
      {!loading && !loadFailed && cards.length === 0 && (
        <View style={shared.panel}>
          <Text style={shared.body}>🫧 Your cup is empty. Add an inside joke to get brewing.</Text>
        </View>
      )}
      {cards.map((card) => {
        const flavor = modes[card.mode];
        return (
          <View key={card.id} style={shared.panel}>
            <Text style={[shared.label, { color: flavor.ink }]}>
              {flavor.emoji}  {flavor.label} · {types[card.type]}
            </Text>
            <Text style={styles.savedEnglish}>{card.en}</Text>
            <Text style={shared.body}>{card.zh}</Text>
            <Button label="Delete" onPress={() => deleteCard(card.id)} disabled={saving}
              tint={palette.background} ink={palette.berry} />
          </View>
        );
      })}
    </Page>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 65,
    backgroundColor: '#FFFFFF',
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    color: palette.ink,
  },
  error: { color: palette.berry, fontSize: 15 },
  section: { color: palette.ink, fontSize: 22, fontWeight: '800' },
  savedEnglish: { color: palette.ink, fontSize: 18, lineHeight: 25, fontWeight: '600' },
});
