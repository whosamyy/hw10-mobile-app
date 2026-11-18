export const modes = {
  sweet: { label: 'Sweet', emoji: '🍓', tint: '#FAD3DF', ink: '#8C294D' },
  chaotic: { label: 'Chaotic', emoji: '🔥', tint: '#FAE2C7', ink: '#85431D' },
  spicy: { label: 'Spicy', emoji: '🌶️', tint: '#FAD7CF', ink: '#932F32' },
  deep: { label: 'Deep Talk', emoji: '🌙', tint: '#E9DDF6', ink: '#5E4079' },
} as const;

export type Mode = keyof typeof modes;
export const modeKeys: Mode[] = ['sweet', 'chaotic', 'spicy', 'deep'];
export const types = { truth: 'Truth', dare: 'Dare' } as const;
export type CardType = keyof typeof types;
export const typeKeys: CardType[] = ['truth', 'dare'];

export type Card = {
  id: string;
  mode: Mode;
  type: CardType;
  en: string;
  zh: string;
  source: 'built-in' | 'custom';
};

const prompts: Record<Mode, Record<CardType, [string, string][]>> = {
  sweet: {
    truth: [
      ['What tiny thing did a friend remember about you that made your whole day?', '朋友记住过你的哪件小事，让你开心了一整天？'],
      ['Which ordinary hangout would you replay if you could?', '如果能重来一次，你最想再体验哪次平平常常的聚会？'],
      ['What food tastes like home to you, and who makes it best?', '哪道菜让你一吃就想家？谁做得最好吃？'],
      ['What was your first sign that someone here was going to be a real friend?', '哪个瞬间让你觉得，在场的某个人会成为你的真朋友？'],
      ['What compliment do you still think about when you need a boost?', '没自信的时候，你会想起别人夸过你的哪句话？'],
    ],
    dare: [
      ['Give someone a compliment so specific it could only be about them.', '夸在场的一位朋友，具体到这句话只能用来夸对方。'],
      ['Name a bubble tea drink after a friend and pitch it to the table.', '用一个朋友的名字给奶茶起名，然后向大家推销这杯奶茶。'],
      ['Make up a tiny award for something kind someone here does.', '给在场的一位朋友颁个小奖，表扬对方平时做的一件暖心小事。'],
      ['Describe your ideal low-budget hangout with this group in twenty seconds.', '用二十秒描述一下，预算很低的时候，你最想和这群朋友怎么过。'],
      ['Make a three-song mini playlist for the person to your left. Explain one pick.', '给左边的朋友挑三首歌做个迷你歌单，说说其中一首为什么适合对方。'],
    ],
  },
  chaotic: {
    truth: [
      ['What is the pettiest imaginary argument you have ever won in the shower?', '你在洗澡时脑补过哪场最鸡毛蒜皮的争吵，还被自己吵赢了？'],
      ['What innocent thing would look most suspicious if someone saw it out of context?', '你做过哪件明明很无辜的事，被人撞见却特别容易让人误会？'],
      ['What tiny inconvenience turned you into a full-time hater for an afternoon?', '哪件小破事让你气到吐槽了整整一个下午？'],
      ['What did you confidently mispronounce for an embarrassing number of years?', '哪个词你一脸自信地念错了好多年？'],
      ['What is the weirdest excuse you made to leave a conversation, and did it work?', '为了结束一段聊天，你编过最离谱的借口是什么？成功了吗？'],
    ],
    dare: [
      ['Hold a press conference about a missing french fry. Take one question.', '为一根失踪的薯条开记者会，并回答一个记者提问。'],
      ['Argue that a spoon is guilty of a crime. The group gets to deliver the verdict.', '说服大家一把勺子犯了罪，最后由大家宣判。'],
      ['Narrate someone taking a sip like it is the final ten seconds of a championship.', '像解说总决赛最后十秒一样，解说一个人喝一口饮料。'],
      ['Apologize to an ordinary object like a celebrity in a notes-app scandal.', '挑一样日常用品，用明星发道歉声明的语气向它道歉。'],
      ['Invent a pigeon conspiracy theory and explain it with complete confidence.', '编一个关于鸽子的阴谋论，然后用深信不疑的语气讲给大家听。'],
    ],
  },
  spicy: {
    truth: [
      ['What oddly specific thing would make you catch feelings way too fast?', '对方做什么特别具体的小事，会让你一下子就心动？'],
      ['What is the most ridiculous excuse you made to see a crush again?', '为了再见喜欢的人一面，你找过最离谱的借口是什么？'],
      ['What harmless red flag would you pretend not to see if the banter was good?', '如果特别聊得来，哪种无伤大雅的小雷点你会假装没看见？'],
      ['What is the most obvious hint you dropped that somehow went unnoticed?', '你给过最明显的暗示是什么？对方居然没发现。'],
      ['If your flirting style came with a warning label, what would it say?', '如果你的撩人方式要贴一张警示标签，上面会写什么？'],
    ],
    dare: [
      ['Deliver your smoothest pickup line to a cup of bubble tea. Commit to it.', '对着一杯奶茶说出你最会撩的一句情话，一定要认真演。'],
      ['Pitch a first date using only places that are within walking distance.', '只用走路能到的地方，给大家推销一个初次约会方案。'],
      ['Read “I saved you a seat” three ways: friendly, flirty, and wildly dramatic.', '用三种语气说“我给你留了个座”：朋友式、暧昧式、偶像剧式。'],
      ['Give a dramatic breakup speech to a snack you secretly still love.', '选一种你其实还很爱吃的零食，对它发表一段戏剧化的分手宣言。'],
      ['Improvise a rom-com meet-cute based on an object the group picks.', '请大家挑一样东西，用它即兴演一段爱情喜剧里的初遇。'],
    ],
  },
  deep: {
    truth: [
      ['When do you feel most like yourself around other people?', '和别人在一起时，什么时候你最能做自己？'],
      ['What is something you used to think was a weakness that you now appreciate?', '你以前觉得是缺点、现在却开始欣赏自己的哪一点？'],
      ['What part of your life would you defend even if it never looked impressive?', '生活中有什么事，就算看起来没什么了不起，你也会坚持留住它？'],
      ['How can a friend tell you need company even when you say you are fine?', '你嘴上说没事的时候，朋友怎么才能看出你其实想有人陪？'],
      ['What would your younger self be surprised you stopped worrying about?', '小时候的你会惊讶地发现，现在的你已经不再担心什么了？'],
    ],
    dare: [
      ['Say one sentence you wish you had heard during your first week of college.', '说一句你希望自己在上大学第一周就能听到的话。'],
      ['Name one small thing you are ready to do for yourself this week.', '说一件这周你愿意为自己做的小事。'],
      ['Give your current chapter of life a book title and read it aloud.', '给你现在的人生阶段取个书名，然后大声念出来。'],
      ['Tell the group one way you like to be supported when you go quiet.', '告诉大家，当你突然变得安静时，希望朋友怎么关心你。'],
      ['Say a one-sentence thank-you to a past version of yourself.', '用一句话谢谢过去的自己。'],
    ],
  },
};

export const builtInCards: Card[] = modeKeys.flatMap((mode) =>
  typeKeys.flatMap((type) =>
    prompts[mode][type].map(([en, zh], index) => ({
      id: `builtin-${mode}-${type}-${index + 1}`,
      mode, type, en, zh, source: 'built-in',
    })),
  ),
);

export function drawCard(cards: Card[], mode: Mode, type: CardType, previousId?: string) {
  const matching = cards.filter((card) => card.mode === mode && card.type === type);
  const choices = matching.length > 1 ? matching.filter((card) => card.id !== previousId) : matching;
  return choices[Math.floor(Math.random() * choices.length)];
}
