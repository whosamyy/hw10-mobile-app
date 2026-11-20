import { modeKeys, typeKeys } from './cards';

export type PlayerPair = readonly [string, string];

export function mysteryCategory() {
  return {
    mode: modeKeys[Math.floor(Math.random() * modeKeys.length)],
    type: typeKeys[Math.floor(Math.random() * typeKeys.length)],
  };
}

export function pickPair(names: string[], previous?: PlayerPair): PlayerPair | undefined {
  const players = [...new Set(names)];
  const pairs: PlayerPair[] = players.flatMap((first, index) =>
    players.slice(index + 1).map((second): PlayerPair => [first, second]),
  );
  const choices = previous && pairs.length > 1
    ? pairs.filter(([first, second]) => !(previous.includes(first) && previous.includes(second)))
    : pairs;
  return choices[Math.floor(Math.random() * choices.length)];
}

export const duoChallenges = [
  { en: 'Make up the story of how you met. Take turns adding details, and make each new detail sound less believable than the last.', zh: '编一个你们初次见面的故事。轮流加细节，一个比一个离谱。' },
  { en: 'Give each other a fake award for an oddly specific talent. Each winner has to give a five-second acceptance speech.', zh: '给对方的某个奇怪技能颁个假奖。获奖的人要发表五秒感言。' },
  { en: 'Film an imaginary luxury ad for your friendship. One of you is the voice-over, and the other has to model the product.', zh: '给你们的友情拍一支假想的奢侈品广告。一个人配旁白，另一个人负责展示“产品”。' },
  { en: 'Act out a dramatic breakup over the last chicken nugget. Neither of you is allowed to say “chicken nugget.”', zh: '为了最后一块鸡块演一场分手大戏，但谁都不许说“鸡块”。' },
  { en: 'Audition for the same spot on a dating show. Your only selling point is a useless skill that the other player invents for you.', zh: '一起试镜同一个恋综名额。你唯一能炫耀的本事，必须是对方给你编的无用技能。' },
  { en: 'One of you is a campus tour guide. The other is a parent who insists every building looks haunted.', zh: '一个人当校园导游，另一个人演一位家长，坚持觉得每栋楼都闹鬼。' },
  { en: 'Start a podcast about a topic you know nothing about. Introduce each other as the world’s leading expert, then ask one very serious question.', zh: '挑一个你们完全不懂的主题假装录播客。先把对方介绍成全球顶尖专家，再问一个特别严肃的问题。' },
  { en: 'One of you is a boba shop cashier and the other is a time traveler. Order a drink using only ingredients that supposedly exist in the year 3026.', zh: '一个人当奶茶店店员，另一个人当时空旅客。点单时只能用据说在3026年才有的食材。' },
  { en: 'Describe each other’s imaginary dating type in exactly three words. Then name one fictional character who fits both descriptions.', zh: '各用三个词形容你想象中的对方理想型，然后找一个同时符合两种描述的虚构角色。' },
  { en: 'Hold a press conference for your disastrous group project. One of you is the spokesperson, and the other is a reporter asking what happened to slide seven.', zh: '为你们搞砸的小组作业开个记者会。一个人当发言人，另一个人当记者，追问第七页到底怎么了。' },
  { en: 'Deliver a weather report for finals week. One of you forecasts the chaos while the other acts out each weather event.', zh: '播报期末周天气。一个人负责预报有多混乱，另一个人把每种天气当场演出来。' },
  { en: 'Invent a secret handshake with three moves. Present it to the group as the official opening ceremony of a very serious competition.', zh: '编一套三个动作的秘密握手，然后一本正经地把它当成一场大赛的开幕仪式表演给大家看。' },
];

export function drawDuoChallenge(previous?: number) {
  const choices = duoChallenges.map((_, index) => index).filter((index) => index !== previous);
  return choices[Math.floor(Math.random() * choices.length)];
}
