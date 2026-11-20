import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Platform, StyleSheet, Text, View } from 'react-native';

import { BobaMascot } from '@/game/boba-mascot';
import { builtInCards, drawCard, modes, typeKeys, types, type CardType, type Mode } from '@/game/cards';
import { useCustomCards } from '@/game/custom-cards';
import { pickPlayer, PlayerPanel, usePlayers } from '@/game/players';
import { drawDuoChallenge, duoChallenges, mysteryCategory, pickPair, type PlayerPair } from '@/game/special-rounds';
import { Button, Heading, ModePicker, Page, palette, shared } from '@/game/ui';

type Selection =
  | { kind: 'solo'; id: string; player?: string; mystery: boolean }
  | { kind: 'duo'; index: number; pair: PlayerPair };
type DrawRequest =
  | { kind: 'solo'; type: CardType }
  | { kind: 'mystery' }
  | { kind: 'duo' };

const duoFlavor = { tint: '#F5DCEB', ink: '#81305E' };

export default function PlayScreen() {
  const [mode, setMode] = useState<Mode>('sweet');
  const [selection, setSelection] = useState<Selection>();
  const [activeType, setActiveType] = useState<CardType>();
  const [pending, setPending] = useState<DrawRequest>();
  const [duoMessage, setDuoMessage] = useState('');
  const shaking = Boolean(pending);
  const shakeInProgress = useRef(false);
  const latestDraw = useRef<(request: DrawRequest) => void>(() => {});
  const previousId = useRef<string | undefined>(undefined);
  const previousPlayer = useRef<string | undefined>(undefined);
  const previousPair = useRef<PlayerPair | undefined>(undefined);
  const previousChallenge = useRef<number | undefined>(undefined);
  const [opacity] = useState(() => new Animated.Value(1));
  const [shakeProgress] = useState(() => new Animated.Value(0));
  const reduceMotion = useRef(true);
  const { cards } = useCustomCards();
  const roster = usePlayers();
  const deck = [...builtInCards, ...cards];
  const solo = selection?.kind === 'solo' ? selection : undefined;
  const card = solo && deck.find((entry) => entry.id === solo.id);
  const player = card && roster.names.find((name) => name === solo.player);
  const duo = selection?.kind === 'duo' && selection.pair.every((name) => roster.names.includes(name))
    ? selection : undefined;
  const question = duo ? duoChallenges[duo.index] : card;
  const flavor = modes[mode];
  const cardFlavor = duo ? duoFlavor : flavor;

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
    setDuoMessage('');
  }

  function draw(request: DrawRequest) {
    if (shakeInProgress.current) return;
    if (request.kind === 'duo') {
      const pair = pickPair(roster.names, previousPair.current);
      if (!pair) {
        setDuoMessage('Add at least two players in Who’s Spilling? to start a duo round.');
        return;
      }
      const index = drawDuoChallenge(previousChallenge.current);
      previousPair.current = pair;
      previousChallenge.current = index;
      setSelection({ kind: 'duo', pair, index });
    } else {
      const mystery = request.kind === 'mystery';
      const category = mystery ? mysteryCategory() : { mode, type: request.type };
      const next = drawCard(deck, category.mode, category.type, previousId.current);
      if (!next) return;
      const player = pickPlayer(roster.names, previousPlayer.current);
      previousId.current = next.id;
      previousPlayer.current = player;
      setMode(category.mode);
      setActiveType(category.type);
      setSelection({ kind: 'solo', id: next.id, player, mystery });
    }
    setDuoMessage('');
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

  function shake(request: DrawRequest) {
    if (shakeInProgress.current) return;
    setDuoMessage('');
    if (reduceMotion.current) {
      draw(request);
      return;
    }
    shakeInProgress.current = true;
    setPending(request);
    shakeProgress.setValue(0);
    Animated.timing(shakeProgress, {
      toValue: 1, duration: 360, useNativeDriver: Platform.OS !== 'web',
    }).start(({ finished }) => {
      if (!shakeInProgress.current) return;
      shakeInProgress.current = false;
      shakeProgress.setValue(0);
      setPending(undefined);
      if (finished || reduceMotion.current) latestDraw.current(request);
    });
  }

  function removePlayer(name: string) {
    setSelection((current) => {
      if (current?.kind === 'duo' && current.pair.includes(name)) return undefined;
      if (current?.kind === 'solo' && current.player === name) return { ...current, player: undefined };
      return current;
    });
  }

  return (
    <Page keyboard>
      <Heading title="Tea or Dare" subtitle="Spill the tea or take the dare" />
      <View style={styles.picker}>
        <Text style={shared.label}>Pick a mode</Text>
        <ModePicker value={mode} onChange={selectMode} disabled={shaking} />
      </View>
      <PlayerPanel roster={roster} selected={duo?.pair ?? (player ? [player] : [])} onRemoved={removePlayer} />
      <BobaMascot mode={mode} progress={shakeProgress} reveal={opacity} hasCard={Boolean(question)}
        hasPlayer={Boolean(player || duo)} duo={Boolean(duo)} mysteryPending={pending?.kind === 'mystery'}
        active={Boolean(activeType)} shaking={shaking}
        onShake={() => { if (activeType) shake({ kind: 'solo', type: activeType }); }} />
      <Animated.View style={[shared.panel, styles.card, { opacity, borderColor: cardFlavor.ink }]}>
        <Text style={[styles.tag, { backgroundColor: cardFlavor.tint, color: cardFlavor.ink }]}>
          {duo ? '💞  Two-Pearl Trouble' : `${card && solo?.mystery ? '🎲  ' : ''}${flavor.emoji}  ${flavor.label}${card ? ` · ${types[card.type]}` : ''}`}
        </Text>
        <View accessibilityLiveRegion="polite" style={styles.cardCopy}>
          {player && (
            <Text style={[styles.spotlight, { backgroundColor: flavor.tint, color: flavor.ink }]}>
              You’re spilling the tea this round, {player}! 👀
            </Text>
          )}
          {duo && (
            <Text style={[styles.spotlight, { backgroundColor: duoFlavor.tint, color: duoFlavor.ink }]}>
              {duo.pair.join(' + ')}, you’re in trouble together! 💞
            </Text>
          )}
          <Text style={styles.english}>{question?.en ?? 'Ready to spill some tea?'}</Text>
          <View style={[styles.rule, { backgroundColor: cardFlavor.tint }]} />
          <Text style={styles.chinese}>{question?.zh ?? '准备好分享你的小秘密了吗？'}</Text>
        </View>
      </Animated.View>
      <View style={shared.row}>
        {typeKeys.map((type) => (
          <View key={type} style={shared.column}>
            <Button label={types[type]} onPress={() => draw({ kind: 'solo', type })} selected={activeType === type} disabled={shaking}
              tint={activeType === type ? flavor.tint : undefined}
              ink={activeType === type ? flavor.ink : undefined} />
          </View>
        ))}
      </View>
      <Button
        label={duo ? 'Next Duo Challenge  →' : 'Next Card  →'}
        onPress={() => {
          if (duo) draw({ kind: 'duo' });
          else if (card) draw({ kind: 'solo', type: card.type });
        }}
        disabled={!question || shaking}
        tint={palette.cream}
        ink={palette.berry}
      />
      <View style={styles.picker}>
        <Text style={shared.label}>Special Rounds</Text>
        <View style={shared.row}>
          <View style={shared.column}>
            <Button label="🎲  Mystery Boba" onPress={() => shake({ kind: 'mystery' })} disabled={shaking}
              tint={modes.deep.tint} ink={modes.deep.ink} />
          </View>
          <View style={shared.column}>
            <Button label="💞  Two-Pearl Trouble" onPress={() => draw({ kind: 'duo' })}
              disabled={shaking || roster.loading} tint={duoFlavor.tint} ink={duoFlavor.ink} />
          </View>
        </View>
        {pending?.kind === 'mystery' && (
          <Text accessibilityLiveRegion="polite" style={shared.body}>Let’s see what the boba gods decided…</Text>
        )}
        {!!duoMessage && <Text accessibilityLiveRegion="polite" style={shared.body}>{duoMessage}</Text>}
      </View>
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
