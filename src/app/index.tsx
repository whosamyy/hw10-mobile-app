import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Platform, StyleSheet, Text, View } from 'react-native';

import { builtInCards, drawCard, modes, typeKeys, types, type CardType, type Mode } from '@/game/cards';
import { useCustomCards } from '@/game/custom-cards';
import { Button, Heading, ModePicker, Page, palette, shared } from '@/game/ui';

export default function PlayScreen() {
  const [mode, setMode] = useState<Mode>('sweet');
  const [selection, setSelection] = useState<{ id: string; type: CardType }>();
  const previousId = useRef<string | undefined>(undefined);
  const [opacity] = useState(() => new Animated.Value(1));
  const reduceMotion = useRef(true);
  const { cards } = useCustomCards();
  const deck = [...builtInCards, ...cards];
  const card = selection && deck.find((entry) => entry.id === selection.id);
  const flavor = modes[mode];

  useEffect(() => {
    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) reduceMotion.current = enabled;
    }).catch(() => {});
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      reduceMotion.current = enabled;
    });
    return () => {
      active = false;
      subscription.remove();
      opacity.stopAnimation();
    };
  }, [opacity]);

  function selectMode(next: Mode) {
    if (next === mode) return;
    opacity.setValue(1);
    setMode(next);
    setSelection(undefined);
  }

  function draw(type: CardType) {
    const next = drawCard(deck, mode, type, previousId.current);
    if (!next) return;
    previousId.current = next.id;
    setSelection({ id: next.id, type });
    if (reduceMotion.current) {
      opacity.setValue(1);
      return;
    }
    opacity.setValue(0.5);
    Animated.timing(opacity, {
      toValue: 1, duration: 180, useNativeDriver: Platform.OS !== 'web',
    }).start();
  }

  return (
    <Page>
      <Heading title="Tea or Dare" subtitle="Spill the tea or take the dare" />
      <View style={styles.picker}>
        <Text style={shared.label}>Pick a mode</Text>
        <ModePicker value={mode} onChange={selectMode} />
      </View>
      <Animated.View style={[shared.panel, styles.card, { opacity, borderColor: flavor.ink }]}>
        <Text style={[styles.tag, { backgroundColor: flavor.tint, color: flavor.ink }]}>
          {flavor.emoji}  {flavor.label}{card ? ` · ${types[card.type]}` : ''}
        </Text>
        <View accessibilityLiveRegion="polite" style={styles.cardCopy}>
          <Text style={styles.english}>{card?.en ?? 'Ready to spill some tea?'}</Text>
          <View style={[styles.rule, { backgroundColor: flavor.tint }]} />
          <Text style={styles.chinese}>{card?.zh ?? '准备好分享你的小秘密了吗？'}</Text>
        </View>
      </Animated.View>
      <View style={shared.row}>
        {typeKeys.map((type) => (
          <View key={type} style={shared.column}>
            <Button label={types[type]} onPress={() => draw(type)} />
          </View>
        ))}
      </View>
      <Button
        label="Next Card  →"
        onPress={() => { if (card) draw(card.type); }}
        disabled={!card}
        tint={palette.cream}
        ink={palette.berry}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 8 },
  card: { minHeight: 220, padding: 22 },
  tag: {
    alignSelf: 'flex-start', borderRadius: 30, overflow: 'hidden',
    paddingHorizontal: 12, paddingVertical: 6, fontSize: 14, fontWeight: '700',
  },
  cardCopy: { flexGrow: 1, justifyContent: 'center', gap: 12 },
  english: { color: palette.ink, fontSize: 26, lineHeight: 34, fontWeight: '700' },
  rule: { width: 32, height: 3, borderRadius: 2 },
  chinese: { color: palette.muted, fontSize: 19, lineHeight: 29 },
});
