import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Platform, StyleSheet, Text, View } from 'react-native';

import { BobaMascot } from '@/game/boba-mascot';
import { builtInCards, drawCard, modes, typeKeys, types, type CardType, type Mode } from '@/game/cards';
import { useCustomCards } from '@/game/custom-cards';
import { pickPlayer, PlayerPanel, usePlayers } from '@/game/players';
import { Button, Heading, ModePicker, Page, palette, shared } from '@/game/ui';

export default function PlayScreen() {
  const [mode, setMode] = useState<Mode>('sweet');
  const [selection, setSelection] = useState<{ id: string; player?: string }>();
  const [activeType, setActiveType] = useState<CardType>();
  const [shaking, setShaking] = useState(false);
  const shakeInProgress = useRef(false);
  const latestDraw = useRef<(type: CardType) => void>(() => {});
  const previousId = useRef<string | undefined>(undefined);
  const previousPlayer = useRef<string | undefined>(undefined);
  const [opacity] = useState(() => new Animated.Value(1));
  const [shakeProgress] = useState(() => new Animated.Value(0));
  const reduceMotion = useRef(true);
  const { cards } = useCustomCards();
  const roster = usePlayers();
  const deck = [...builtInCards, ...cards];
  const card = selection && deck.find((entry) => entry.id === selection.id);
  const player = card && roster.names.find((name) => name === selection?.player);
  const flavor = modes[mode];

  useEffect(() => {
    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) reduceMotion.current = enabled;
    }).catch(() => {});
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      reduceMotion.current = enabled;
      if (enabled) {
        opacity.setValue(1);
        if (shakeInProgress.current) shakeProgress.stopAnimation();
      }
    });
    return () => {
      active = false;
      subscription.remove();
      shakeInProgress.current = false;
      shakeProgress.stopAnimation();
      opacity.stopAnimation();
    };
  }, [opacity, shakeProgress]);

  function selectMode(next: Mode) {
    if (next === mode || shakeInProgress.current) return;
    opacity.setValue(1);
    setMode(next);
    setSelection(undefined);
  }

  function draw(type: CardType) {
    if (shakeInProgress.current) return;
    const next = drawCard(deck, mode, type, previousId.current);
    if (!next) return;
    const player = pickPlayer(roster.names, previousPlayer.current);
    previousId.current = next.id;
    previousPlayer.current = player;
    setActiveType(type);
    setSelection({ id: next.id, player });
    if (reduceMotion.current) {
      opacity.setValue(1);
      return;
    }
    opacity.setValue(0.5);
    Animated.timing(opacity, {
      toValue: 1, duration: 180, useNativeDriver: Platform.OS !== 'web',
    }).start();
  }

  useLayoutEffect(() => {
    latestDraw.current = draw;
  });

  function shake() {
    if (!activeType || shakeInProgress.current) return;
    if (reduceMotion.current) {
      draw(activeType);
      return;
    }
    shakeInProgress.current = true;
    setShaking(true);
    shakeProgress.setValue(0);
    Animated.timing(shakeProgress, {
      toValue: 1, duration: 360, useNativeDriver: Platform.OS !== 'web',
    }).start(({ finished }) => {
      if (!shakeInProgress.current) return;
      shakeInProgress.current = false;
      shakeProgress.setValue(0);
      setShaking(false);
      if (finished || reduceMotion.current) latestDraw.current(activeType);
    });
  }

  return (
    <Page keyboard>
      <Heading title="Tea or Dare" subtitle="Spill the tea or take the dare" />
      <View style={styles.picker}>
        <Text style={shared.label}>Pick a mode</Text>
        <ModePicker value={mode} onChange={selectMode} disabled={shaking} />
      </View>
      <PlayerPanel roster={roster} selected={player} onRemoved={(name) => {
        setSelection((current) => current?.player === name ? { id: current.id } : current);
      }} />
      <BobaMascot mode={mode} progress={shakeProgress} reveal={opacity} hasCard={Boolean(card)}
        hasPlayer={Boolean(player)} active={Boolean(activeType)} shaking={shaking} onShake={shake} />
      <Animated.View style={[shared.panel, styles.card, { opacity, borderColor: flavor.ink }]}>
        <Text style={[styles.tag, { backgroundColor: flavor.tint, color: flavor.ink }]}>
          {flavor.emoji}  {flavor.label}{card ? ` · ${types[card.type]}` : ''}
        </Text>
        <View accessibilityLiveRegion="polite" style={styles.cardCopy}>
          {player && (
            <Text style={[styles.spotlight, { backgroundColor: flavor.tint, color: flavor.ink }]}>
              You’re spilling the tea this round, {player}! 👀
            </Text>
          )}
          <Text style={styles.english}>{card?.en ?? 'Ready to spill some tea?'}</Text>
          <View style={[styles.rule, { backgroundColor: flavor.tint }]} />
          <Text style={styles.chinese}>{card?.zh ?? '准备好分享你的小秘密了吗？'}</Text>
        </View>
      </Animated.View>
      <View style={shared.row}>
        {typeKeys.map((type) => (
          <View key={type} style={shared.column}>
            <Button label={types[type]} onPress={() => draw(type)} selected={activeType === type} disabled={shaking}
              tint={activeType === type ? flavor.tint : undefined}
              ink={activeType === type ? flavor.ink : undefined} />
          </View>
        ))}
      </View>
      <Button
        label="Next Card  →"
        onPress={() => { if (card) draw(card.type); }}
        disabled={!card || shaking}
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
  spotlight: { alignSelf: 'flex-start', overflow: 'hidden', borderRadius: 12, padding: 8, fontSize: 15, fontWeight: '700' },
  english: { color: palette.ink, fontSize: 26, lineHeight: 34, fontWeight: '700' },
  rule: { width: 32, height: 3, borderRadius: 2 },
  chinese: { color: palette.muted, fontSize: 19, lineHeight: 29 },
});
