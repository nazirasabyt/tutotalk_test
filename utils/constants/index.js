import { telegram, instagram, linkedin } from "../../public/assets";

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/tuto_talk/",
  },
  {
    id: "social-media-2",
    icon: telegram,
    link: "https://t.me/+RZ8A0mFI8aI0NWQ0",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/company/tutotalk/",
  },
];

export const rates = [
  {
    id: "regular",
    name: "Regular",
    terms: [
      {
        id: "1",
        text: "Access to the plaform",
      },
      {
        id: "2",
        text: "One-on-one lessons with personal tutor",
      },
      {
        id: "3",
        text: "Price will stay for the whole learning period",
      },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    terms: [
      {
        id: "1",
        text: "Access to the plaform",
      },
      {
        id: "2",
        text: "One-on-one lessons with personal tutor",
      },
      {
        id: "3",
        text: "Price will stay for the whole learning period",
      },
    ],
  },
  {
    id: "intense",
    name: "Intense",
    terms: [
      {
        id: "1",
        text: "Access to the plaform",
      },
      {
        id: "2",
        text: "One-on-one lessons with personal tutor",
      },
      {
        id: "3",
        text: "Price will stay for the whole learning period",
      },
    ],
  },
];

export const routeInfo = {
  "/platform": {
    title: `Welcome, `,
    text: "Happy to see you here again.",
  },
  "/404": {
    title: `Welcome, `,
    text: "Happy to see you here again.",
  },
  "/lessons": { title: "Lessons", text: "Dream big, study hard." },
  "/homework": { title: "Homework", text: "Language knows no boundaries." },
  "/homework/exercise": {
    title: "Homework",
    text: "Language knows no boundaries.",
  },
  "/schedule": {
    title: "Schedule",
    text: "Every conversation is a chance to grow.",
  },
  "/progress": {
    title: "Progress",
    text: "Every word learned is progress made.",
  },
  "/grammar": {
    title: "Grammar",
    text: "Fluency begins with effort.",
  },

  "/plans": {
    title: "Plans",
    text: "Language opens doors.",
  },
  "/talk": {
    title: "Talk to Rachel",
    text: "Real time experience to practice your speech.",
  },
  "/flashcards": {
    title: "Flashcards",
    text: "Words are the voice of the heart. ",
  },
  "/sprint": {
    title: "Sprint",
    text: "Only under pressure we deliver results. ",
  },
  "/account": {
    title: "Profile",
    text: "Let's get to know you.",
  },
  "/payments": {
    title: "Payments",
    text: "The best investment you can make is in yourself.",
  },
  "/games": {
    title: "Practise",
    text: "Repetition is the key to learning.",
  },
  "/games/talk": {
    title: "Practise",
    text: "Repetition is the key to learning.",
  },
  "/games/sprint": {
    title: "Practise",
    text: "Repetition is the key to learning.",
  },
  "/games/flashcards": {
    title: "Practise",
    text: "Repetition is the key to learning.",
  },
};

export const grammar = [
  {
    id: "nouns",
    title: "Существительные(Nouns)",
    link: "mUN2i_pRbk8",
    img: "",
    text: "Имена существительные в английской грамматике - это слова, которые обозначают предметы, места, людей или идеи.",
    table: [
      { key: "Место:", word: "город (city), школа (school)" },
      {
        key: "Предмет:",
        word: "книга (book), мяч (ball)",
      },
      { key: "Люди:", word: "мама (mother), учитель (teacher)" },
      {
        key: "Идеи:",
        word: "счастье (happiness), образование(education)",
      },
    ],
    usefulLink: "",
    examples: [
      "У меня есть красивая книга. (I have a beautiful book.)",
      "Она живет в большом городе. (She lives in a big city.)",
      "Мой друг работает учителем. (My friend is a teacher.)",
      "Счастье - это важно. (Happiness is important.)",
    ],
  },
  {
    id: "pronouns",
    title: "Местоимения(Pronouns)",
    link: "gs6MZ-qLP0A",
    img: "",
    text: "Местоимения в английской грамматике - это слова, которые мы используем вместо существительных, чтобы избежать повторений.",
    table: [
      {
        key: "Личные:",
        word: "Я (I),Он (he), Мы(we),Вы(you), Они(they)",
      },
      {
        key: "Притяжательные:",
        word: "Мой(my),Его (his),Её (her),Наш (our),Ваш (your), Их(their)",
      },
      {
        key: "Указательные:",
        word: "Этот(this),Тот(that), Эти(these), Те(those)",
      },
    ],
    examples: [
      "Я иду в школу. (I am going to school.)",
      "Мой автомобиль красный. (My car is red.)",
      "Этот кот очень милый. (This cat is very cute.)",
      "Мы учимся вместе. (We are studying together.)",
    ],
    usefulLink: "",
  },
  {
    id: "adjectives",
    title: "Прилагательные(Adjectives)",
    link: "KcFKxDsM7b0",
    img: "",
    text: "Прилагательные - это слова, используемые для описания или изменения существительных (людей, мест, вещей или идей), предоставляя больше информации о них.",
    table: [
      {
        key: "Расположение:",
        word: "Перед существительным: -a beautiful flower, -an old house. После связывающего глагола: -The flower is beautiful, -The house seems old.",
      },
      {
        key: "Типы прилагательных:",
        word: "Описательные прилагательные: green, tall, happy, and expensive. Определители: (this, that, these, those), (my, your, his, her, its, our, their), (some, many, few). Сравнительные и превосходные прилагательные: bigger, biggest ",
      },
      {
        key: "Порядок прилагательных",
        word: "Типичный порядок: мнение, размер, возраст, форма, цвет, происхождение, материал и назначение. Например: прекрасный маленький старый красный итальянский деревянный обеденный стол.",
      },
    ],
    examples: [
      "She has a beautiful garden.",
      "This is my book.",
      "That dress is more beautiful than the one you wore yesterday.",
      "This is the tallest building in the city.",
    ],
    usefulLink: "",
  },
  {
    id: "adverbs",
    title: "Наречия (Adverbs)",
    link: "nVNEBy3k9Co",
    img: "",
    text: "Наречия  - это слова, которые описывают глаголы, прилагательные, другие наречия или даже целые предложения. ",
    table: [
      {
        key: "Расположение:",
        word: "Описание глагола - (She runs quickly).Описание прилагательного -(This book is very interesting). Описание наречия:(He reads very quickly).",
      },
      {
        key: "Наиболее распространенные",
        word: "Kак, когда, где и насколько часто что-то происходит.  Примеры включают: быстро (quickly), очень (very), здесь (here) и иногда (sometimes).",
      },
      {
        key: "Степени наречий:",
        word: "Например: быстро (quickly) может быть быстрее (quicker) в сравнительной степени и самым быстрым (fastest) в превосходной степени. ",
      },
    ],
    examples: [
      "She sings beautifully.",
      "The movie is very interesting.",
      "She speaks English quite fluently.",
      "She sings more beautifully than anyone I know.",
    ],
    usefulLink: "",
  },
  {
    id: "tenses",
    title: "Времена глаголов",
    img: "",
    link: "lcA9WnkPZUo",
    text: "Глаголы  обозначают действия, состояния или события. Глаголы могут изменять свою форму, чтобы указать разные времена, наклонения, залоги и виды.",
    table: [
      {
        key: "Простой вид: ",
        word: "Описывает прямолинейное действие без акцента на его продолжительность. ",
        link: "simple",
      },
      {
        key: "Продолжительный вид",
        word: "Акцентирует непрерывный или продолжительный характер действия.",
        link: "continuous",
      },
      {
        key: "Совершенный вид",
        word: "Указывает на завершенность действия или его связь с другим временем. ",
        link: "perfect",
      },
    ],
    examples: [
      "She sings a song.",
      "They are playing football.",
      "Они играют в футбол.",
    ],
    usefulLink: "",
  },
  {
    id: "prepositions",
    title: "Предлоги (Prepositions)",
    link: "wnzJ7sFhqr0",
    img: "",
    text: "Предлоги – это слова, которые показывают связь между существительным или местоимением и другими словами в предложении.",
    table: [
      {
        key: "Mестоположение:",
        word: "Например, такие предлоги, как «in», «on» и «at», могут",
        link: "place_preposition",
      },
      {
        key: "Время",
        word: "Предлоги типа «before», «after» и «during»",
        link: "time_preposition",
      },
      {
        key: "Направление",
        word: "Такие предлоги, как «to», «from» и «across»",
        link: "direction_preposition",
      },
    ],
    examples: [
      "I live in the city",
      "We should arrive before 9 am.",
      "They walked across the bridge.",
    ],
    usefulLink: "",
  },
  {
    id: "articles",
    title: "Артикли (Articles)",
    link: "eJnejBp9edA",
    img: "",
    text: "Артикли специально помогают указать, является ли существительное конкретным или неопределенным объектом. В английском языке существуют три артикля: -the, -a и -an.",
    table: [
      {
        key: "Определенный артикль -The:",
        word: "The используется перед конкретными существительными, что означает, что существительное известно и говорящему, и слушателю, или его можно идентифицировать в контексте. Пример: The cat is on the roof. В этом предложении используется the, потому что и говорящий, и слушатель знают, о каком коте идет речь, или контекст предоставляет достаточно информации для его определения.",
      },
      {
        key: "Неопределенные артикли -A и -An:",
        word: "-A используется перед существительными, которые не являются конкретными или неизвестными слушателю и указывает на любой объект такого типа. Пример:  I want to buy a book.  В этом предложении используется  -a , потому что не идет речь о конкретной книге; это может быть любая книга.  -An  используется перед существительными, начинающимися на гласный звук (a, e, i, o, u) с той же целью, что и  a . Пример:  She's an excellent student.  В этом предложении используется  an , потому что  excellent  начинается на гласный звук (звук имеет значение, а не фактическая буква).",
      },
    ],
    examples: [
      "Пример: -I saw cats on the roof. В этом предложении перед -cats нет артикля, для множественных числительных обычно не используется артикль",
    ],
    usefulLink: "",
  },
];
