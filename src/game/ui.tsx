import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { modeKeys, modes, type Mode } from './cards';

export const palette = {
  background: '#FCE8EE',
  cream: '#FFF9F0',
  ink: '#39232E',
  muted: '#755461',
  berry: '#A92C56',
  border: '#E9BCC9',
};

export function Page({ children, keyboard = false }: { children: ReactNode; keyboard?: boolean }) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.page}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={keyboard}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.heading}>
      <View style={styles.headingCopy}>
        <Text accessibilityRole="header" style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View accessible={false} importantForAccessibility="no-hide-descendants" style={styles.badge}>
        <Text style={styles.drink}>🧋</Text>
      </View>
    </View>
  );
}

export function Button({ label, onPress, selected, disabled, tint, ink }: {
  label: string;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
  tint?: string;
  ink?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: tint ?? palette.berry, borderColor: selected ? ink ?? palette.berry : 'transparent' },
        (pressed || disabled) && styles.faded,
      ]}>
      <Text style={[styles.buttonText, { color: ink ?? '#FFFFFF' }]}>{label}</Text>
    </Pressable>
  );
}

export function ModePicker({ value, onChange }: { value: Mode; onChange: (mode: Mode) => void }) {
  return (
    <View style={styles.grid}>
      {modeKeys.map((mode) => {
        const { label, emoji, ink, tint } = modes[mode];
        return (
          <View key={mode} style={styles.cell}>
            <Button
              label={`${emoji}  ${label}`}
              onPress={() => onChange(mode)}
              selected={value === mode}
              tint={value === mode ? tint : palette.cream}
              ink={ink}
            />
          </View>
        );
      })}
    </View>
  );
}

export const shared = StyleSheet.create({
  panel: {
    backgroundColor: palette.cream,
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    gap: 14,
    boxShadow: '0px 4px 12px #69233E13',
  },
  label: { fontSize: 15, fontWeight: '700', color: palette.ink },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  column: { flexGrow: 1, flexBasis: '40%' },
  body: { fontSize: 16, lineHeight: 24, color: palette.muted },
});

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.background },
  content: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  headingCopy: { flex: 1 },
  title: { color: palette.ink, fontSize: 39, fontWeight: '800', letterSpacing: -1.6 },
  subtitle: { color: palette.muted, fontSize: 15, marginTop: 4 },
  badge: {
    width: 61, height: 61, borderRadius: 31, backgroundColor: palette.cream,
    borderWidth: 1, borderColor: palette.border, alignItems: 'center', justifyContent: 'center',
    transform: [{ rotate: '9deg' }],
  },
  drink: { fontSize: 34 },
  grid: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  cell: { flexGrow: 1, flexBasis: '44%' },
  button: {
    minHeight: 48, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 10,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  faded: { opacity: 0.55 },
});
