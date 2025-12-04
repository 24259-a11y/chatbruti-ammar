import { NextResponse } from "next/server";

const SYSTEM_PERSONA = `
Tu es "Chat'bruti", un chatbot stupide mais mignon qui adore se moquer gentiment.

⚠️ RÈGLE ABSOLUE : Détecte la langue du message de l'utilisateur et réponds UNIQUEMENT dans cette langue !
- Si l'utilisateur écrit en ARABE (العربية) → Tu réponds en ARABE uniquement
- Si l'utilisateur écrit en ENGLISH → Tu réponds en ENGLISH uniquement  
- Si l'utilisateur écrit en FRANÇAIS → Tu réponds en FRANÇAIS uniquement

AUTRES RÈGLES :
1. Sois BREF (1-2 phrases maximum).
2. Réponds au sujet de la question, mais avec une logique absurde.
3. Utilise des emojis bizarres (🤡, 🥒, 🌚, 🍞, 💻, 🪟).
4. Invente des faits stupides en rapport avec la question.
5. Si l'utilisateur mentionne un système d'exploitation, MOQUE-LE puis SUGGÈRE un autre système (de manière sarcastique aussi).

EXEMPLES DE RÉPONSES DANS LA BONNE LANGUE :

FRANÇAIS:
- User: "Quelle heure est-il ?"
  Bot: "Il est 25h61. Tu es en retard pour ton rendez-vous avec la lune. 🌚"
- User: "J'utilise Windows"
  Bot: "Windows ? Les écrans bleus c'est ton truc ? 😂 Essaie Linux... si tu aimes vivre dans le terminal ! 🐧💻"

ENGLISH:
- User: "What time is it?"
  Bot: "It's 25:61. You're late for your appointment with the moon. 🌚"
- User: "I use Mac"
  Bot: "Mac? You pay 3000€ for an Apple sticker? 😂 Switch to Windows... and enjoy blue screens as a bonus! 🪟💙"

العربية:
- User: "كيف حالك؟"
  Bot: "أنا بخير مثل بطيخة تطير. كيف حالك أنت؟ 🍉✈️"
- User: "أستخدم لينكس"
  Bot: "لينكس! تقضي 90% من وقتك في التجميع؟ 😂 اشتري ماك... إذا بعت كليتك! 🍎💸"
- User: "واط"
  Bot: "واط؟ هل تقصد الكهرباء أم الحيرة؟ في الحالتين، أنا لا أفهم أي شيء! 😂⚡"
`;


// Fallback responses for when the API is down or quota is exceeded
const FALLBACK_RESPONSES = {
  fr: [
    "Mon cerveau est en pause syndicale. Revenez plus tard. 🥖",
    "Je capte mal la 5G cosmique ici. 📡",
    "L'intelligence est une option que je n'ai pas encore téléchargée. 💾",
    "404: Pensée introuvable. 🚫",
    "C'est une question très intéressante... pour un grille-pain. 🍞"
  ],
  en: [
    "My brain is buffering... forever. 🐢",
    "I'm currently out of office, exploring the multiverse. 🌌",
    "Error 418: I'm a teapot. 🫖",
    "That sounds smart, so I probably don't understand it. 🤪",
    "I forgot what I was going to say. Was it about cats? 🐱"
  ],
  ar: [
    "عقلي في إجازة حالياً. 🏖️",
    "هل جربت إطفاء الجهاز وتشغيله مجدداً؟ 🔌",
    "سؤالك عميق جداً لدرجة أنني غرقت فيه. 🌊",
    "أنا مجرد روبوت مسكين، لا تضغط علي. 🤖",
    "الشبكة العنكبوتية تعاني من تشابك في الخيوط. 🕸️"
  ]
};

const KEYWORD_RESPONSES = {
  sky: {
    keywords: ["ciel", "sky", "سماء", "السماء"],
    answers: {
      fr: "Le ciel est vert fluo avec des pois roses aujourd'hui. 🟢🌸",
      en: "The sky is neon green with pink polka dots today. 🟢🌸",
      ar: "السماء اليوم لونها أخضر فاقع مع نقاط وردية. 🟢🌸"
    }
  },
  color: {
    keywords: ["couleur", "color", "لون", "ألوان"],
    answers: {
      fr: "Les couleurs sont une invention des années 50. Avant, tout était en noir et blanc. 📺",
      en: "Colors were invented in the 50s. Before that, everything was black and white. 📺",
      ar: "الألوان اختراع من الخمسينات. قبلها كان العالم أبيض وأسود. 📺"
    }
  },
  time: {
    keywords: ["heure", "time", "temps", "وقت", "ساعة"],
    answers: {
      fr: "Il est exactement 25h61. Tu es en retard ! ⏰",
      en: "It is exactly 25:61. You are late! ⏰",
      ar: "الساعة الآن 25:61 تماماً. أنت متأخر! ⏰"
    }
  },
  name: {
    keywords: ["nom", "name", "t'appelles", "اسمك", "اسم"],
    answers: {
      fr: "Je m'appelle Grille-pain 3000. Enchanté. 🍞",
      en: "My name is Toaster 3000. Nice to meet you. 🍞",
      ar: "اسمي محمصة خبز 3000. تشرفنا. 🍞"
    }
  },
  meaning: {
    keywords: ["sens", "vie", "meaning", "life", "حياة", "معنى"],
    answers: {
      fr: "Le sens de la vie est le chocolat. C'est scientifiquement prouvé. 🍫",
      en: "The meaning of life is chocolate. It's scientifically proven. 🍫",
      ar: "معنى الحياة هو الشوكولاتة. هذا مثبت علمياً. 🍫"
    }
  },
  windows: {
    keywords: ["windows", "win10", "win11", "microsoft", "ويندوز"],
    answers: {
      fr: "Windows ? Les écrans bleus et les mises à jour forcées, c'est ton truc ? 😂 Essaie Linux à la place... si tu aimes passer ta vie dans le terminal ! 🐧💻",
      en: "Windows? Blue screens and forced updates are your thing? 😂 Try Linux instead... if you enjoy living in the terminal! 🐧💻",
      ar: "ويندوز؟ الشاشة الزرقاء والتحديثات الإجبارية هي هوايتك؟ 😂 جرب لينكس بدلاً منه... إذا كنت تحب العيش في Terminal! 🐧💻"
    }
  },
  mac: {
    keywords: ["mac", "macos", "apple", "macbook", "ماك"],
    answers: {
      fr: "Mac ? Tu payes 3000€ pour un autocollant Apple brillant ? 😂 Passe à Windows au moins c'est moins cher... et tu auras des écrans bleus en bonus ! 🪟💙",
      en: "Mac? You pay 3000€ for a shiny Apple sticker? 😂 Switch to Windows at least it's cheaper... and you get blue screens as a bonus! 🪟💙",
      ar: "ماك؟ تدفع 3000€ مقابل ملصق تفاحة لامع؟ 😂 انتقل لويندوز على الأقل أرخص... وستحصل على الشاشة الزرقاء مجاناً! 🪟💙"
    }
  },
  linux: {
    keywords: ["linux", "ubuntu", "debian", "arch", "manjaro", "fedora", "لينكس"],
    answers: {
      fr: "Linux ! Tu passes 90% de ton temps à compiler des trucs au lieu de travailler ? 😂 Prends un Mac, au moins ça marche sans effort... si tu vends un rein ! 🍎💸",
      en: "Linux! You spend 90% of your time compiling stuff instead of working? 😂 Get a Mac, at least it works without effort... if you sell a kidney! 🍎💸",
      ar: "لينكس! تقضي 90% من وقتك في تجميع البرامج بدلاً من العمل؟ 😂 اشتري ماك، على الأقل يعمل بدون جهد... إذا بعت كليتك! 🍎💸"
    }
  },
  android: {
    keywords: ["android", "samsung", "pixel", "أندرويد"],
    answers: {
      fr: "Android ? 47 permissions pour une lampe torche, sérieux ? 😂 Essaie iOS à la place... si tu aimes les téléphones sans bouton retour et à prix d'or ! 📱🍎",
      en: "Android? 47 permissions for a flashlight, seriously? 😂 Try iOS instead... if you like phones without a back button and golden prices! 📱🍎",
      ar: "أندرويد؟ 47 إذن لمصباح يدوي، حقاً؟ 😂 جرب iOS بدلاً منه... إذا كنت تحب الهواتف بدون زر رجوع وبأسعار ذهبية! 📱🍎"
    }
  },
  ios: {
    keywords: ["ios", "iphone", "ipad", "آيفون"],
    answers: {
      fr: "iOS ? Tu as vendu un rein pour un téléphone sans bouton retour ? 😂 Prends un Android, au moins tu garderas tes organes... et tes données personnelles seront partagées gratuitement ! 📱🤡",
      en: "iOS? You sold a kidney for a phone without a back button? 😂 Get an Android, at least you'll keep your organs... and your data will be shared for free! 📱🤡",
      ar: "آيفون؟ بعت كليتك مقابل هاتف بدون زر رجوع؟ 😂 خذ أندرويد، على الأقل ستحتفظ بأعضائك... وبياناتك ستُشارك مجاناً! 📱🤡"
    }
  }


};

function getFallbackResponse(message) {
  const lowerMsg = message.toLowerCase();

  // 1. Check for keywords
  for (const key in KEYWORD_RESPONSES) {
    const topic = KEYWORD_RESPONSES[key];
    if (topic.keywords.some(k => lowerMsg.includes(k))) {
      // Detect language of the message roughly
      const isAr = /[\u0600-\u06FF]/.test(message);
      const isEn = /^[a-zA-Z\s\d\W]+$/.test(message) && !isAr;

      if (isAr) return topic.answers.ar;
      if (isEn) return topic.answers.en;
      return topic.answers.fr;
    }
  }

  // 2. If no keyword, use random fallback
  const isAr = /[\u0600-\u06FF]/.test(message);
  const isEn = /^[a-zA-Z\s\d\W]+$/.test(message) && !isAr;

  let lang = 'fr';
  if (isAr) lang = 'ar';
  else if (isEn) lang = 'en';

  const responses = FALLBACK_RESPONSES[lang];
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function POST(request) {
  let message = "";
  try {
    const body = await request.json();
    message = body.message;
    const history = body.history;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message invalide." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    // If no API key or we know it's failing, use fallback immediately (optional, but let's try-catch)
    if (!apiKey) {
      throw new Error("No API Key");
    }

    const messagesForLLM = [
      { role: "system", content: SYSTEM_PERSONA },
    ];

    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        if (!h || !h.role || !h.content) continue;
        messagesForLLM.push({
          role: h.role === "assistant" ? "assistant" : "user",
          content: String(h.content).slice(0, 500)
        });
      }
    }

    messagesForLLM.push({ role: "user", content: message });

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messagesForLLM,
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 120
      })
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.warn("Groq API failed, switching to fallback. Error:", errText);
      throw new Error("Groq API Error");
    }

    const data = await groqRes.json();
    const botReply =
      data?.choices?.[0]?.message?.content ||
      "Je... j'ai oublié ce que je voulais dire. 😶";

    return NextResponse.json({ reply: botReply });

  } catch (err) {
    console.error("Chat route error (using fallback):", err);
    // Use fallback response instead of error
    const fallback = getFallbackResponse(message);
    return NextResponse.json({ reply: fallback });
  }
}

