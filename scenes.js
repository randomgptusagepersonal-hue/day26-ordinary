/* =====================================================================
   DAY 26: THE DAY ITSELF. Every word and little interaction lives here.
   Change text freely. Each moment runs its "beats" from top to bottom.

   line   a thought, appears in the text area            { line:"..." }
   strong the same, in bold                              { strong:"..." }
   quiet  a small aside                                  { quiet:"..." }
   head   a small heading                                { head:"..." }
   talk   a line of a script, with a name                { who:"Ammu", talk:"..." }
   say    a speech bubble in the room, at [x, y]         { say:"...", at:[630,420] }
   state  changes what the two of them are doing         { state:"snack" }
   wait   a pause, in milliseconds                       { wait:1500 }
   clear  fades the text away and starts fresh           { clear:true }
   tap    an object to tap; if he doesn't, it happens by itself after a moment
   spots  optional objects to discover, nothing waits for them
   choose optional choice, nothing waits for it
   ask    a small button; if he doesn't press it, it carries on by itself
   next   the arrow to the next moment

   x is where the room sits in the home (bedroom 520, kitchen 1500,
   living room 2500, street 3400 onwards). light is the tint over the home.
   ===================================================================== */
window.DAY26 = {
  /* How quickly things appear, in milliseconds. Raise these to slow it all down. */
  pace: { line: 800, perChar: 30, say: 1700, idle: 7000, move: 2600, hold: 6000 },

  opening: {
    day: "DAY 26",
    title: "The Ordinary Life I Dream About",
    sub: "Not the grand stuff. Just the little life in between. ♡",
    lines: [
      "you know what i've realised, ammu?",
      "when i imagine our future, it's not always the big things i picture first.",
      "sometimes it's just... a completely normal day.",
    ],
    button: "let's spend a day there →",
  },

  /* Before the day starts: the bedroom, still dark. */
  before: { x: 520, actors: "bed", state: "asleep", light: { color: "46,38,84", a: .6 }, night: true },

  moments: [
    { /* ---------- SLEEPY MORNING ---------- */
      time: "08:17 AM", x: 520, actors: "bed", state: "morning", glow: "bedSun",
      light: { color: "255,206,150", a: .1 },
      beats: [
        { line: "one of us is already awake." },
        { line: "the other one is absolutely not. 😂" },
        { tap: { at: [632, 520], label: "Tap the sleepy side of the bed", says: [
          { say: "\"five more minutes...\"", at: [632, 470] },
          { say: "\"you said that ten minutes ago.\"", at: [415, 390] },
          { say: "\"...and?\"", at: [632, 470] },
        ] } },
        { state: "up" },
        { strong: "“okay fine. i'm getting up.”" },
        { state: "kiss" },
        { wait: 1500 },
        { next: true },
      ],
    },

    { /* ---------- THE KITCHEN ---------- */
      time: "09:02 AM", x: 1500, actors: "kitchen", state: "breakfast", glow: "kitchenSun",
      light: { color: "255,216,165", a: .07 },
      beats: [
        { line: "there's something about having a person to ask..." },
        { line: "“what do you want for breakfast?”" },
        { state: "backhug", line: "...even when you already know they're probably going to say “anything.”" },
        { choose: { q: "“what are we eating?”", at: [1640, 300], options: [
          { label: "something proper", say: "\"bro, look at you. being an adult. 😭\"" },
          { label: "whatever is available", say: "\"so... anything. i knew it.\"" },
          { label: "your food because mine suddenly looks better", say: "\"i knew you'd steal mine.\"" },
        ] } },
        { next: true },
      ],
    },

    { /* ---------- THE LITTLE ROUTINES ---------- */
      time: "11:46 AM", x: 2500, actors: "living", state: "routines", glow: "livingSun",
      light: { color: "255,240,215", a: 0 },
      beats: [
        { line: "and then... nothing particularly exciting happens." },
        { spots: [
          { at: [2478, 720], label: "Tap the mug", say: "“whose tea is this?”" },
          { at: [2567, 730], label: "Tap the phone", say: "“why are you sending me this while i'm sitting right here?”" },
          { at: [2630, 510], label: "Tap the laptop", say: "“you're working again?”" },
          { at: [2470, 470], label: "Tap the sofa", say: "“come here.”", state: "cuddle" },
        ] },
        { line: "you do your thing." },
        { line: "i do mine." },
        { line: "we're in the same room anyway." },
        { clear: true },
        { line: "you'll probably randomly look up and tell me something." },
        { line: "i'll probably interrupt you with something completely unrelated." },
        { state: "cuddle", line: "and somehow that's enough." },
        { next: true },
      ],
    },

    { /* ---------- THE COMPLETELY UNNECESSARY ARGUMENT ---------- */
      time: "02:13 PM", x: 2500, actors: "living", state: "apart", glow: "livingAfternoon",
      light: { color: "255,218,170", a: .1 },
      beats: [
        { head: "THE IMPORTANT MATTER OF ABSOLUTELY NOTHING" },
        { line: "obviously, we would still argue." },
        { line: "not about anything important." },
        { line: "probably something incredibly stupid." },
        { clear: true },
        { who: "Kanmani", talk: "“why did you do that?”" },
        { who: "Ammu", talk: "“do what?”" },
        { who: "Kanmani", talk: "“THAT.”" },
        { who: "Ammu", talk: "“i genuinely have no idea what you're talking about.”" },
        { ask: { label: "continue the argument", then: [
          { who: "Kanmani", talk: "“you know what you did.”" },
          { who: "Ammu", talk: "“bro, i was literally just sitting here.”" },
          { who: "Kanmani", talk: "“exactly.”" },
          { who: "Ammu", talk: "“exactly WHAT??” 😭" },
        ] } },
        { clear: true },
        { state: "silence" },
        { quiet: "five minutes later..." },
        { wait: 1800 },
        { state: "snack" },
        { line: "and somehow we're both sitting next to each other again." },
        { wait: 900 },
        { state: "makeup", strong: "“yeah. this is probably us.”" },
        { next: true },
      ],
    },

    { /* ---------- THE OUTSIDE WORLD ---------- */
      time: "05:38 PM", x: 3400, actors: "street", state: "walking",
      light: { color: "238,150,90", a: .2 },
      beats: [
        { walk: { to: 3930, ms: 15000 } },
        { line: "maybe we go out." },
        { line: "not on a date." },
        { line: "not anywhere special." },
        { line: "just because we needed something from somewhere." },
        { wait: 700 },
        { line: "and somehow even buying completely boring things becomes something i'll remember." },
        { next: true },
      ],
    },

    { /* ---------- EVENING QUIET ---------- */
      time: "08:41 PM", x: 2500, actors: "living", state: "evening", glow: "livingEvening",
      light: { color: "60,38,84", a: .5, hole: [2300, 400, 620] }, night: true,
      beats: [
        { line: "eventually the day gets quieter." },
        { line: "we're tired." },
        { line: "maybe we're talking." },
        { line: "maybe we're doing completely separate things." },
        { line: "maybe one of us is half asleep while pretending to listen." },
        { clear: true },
        { ask: { label: "“are you listening?”", spoken: true, then: [
          { say: "“yes.”", at: [2620, 350] },
          { wait: 1100 },
          { say: "“what did i just say?”", at: [2400, 350] },
          { say: "“...”", at: [2620, 350] },
          { wait: 900 },
          { say: "“exactly.” 😂", at: [2400, 350] },
        ] } },
        { state: "eveningCuddle" },
        { wait: 1200 },
        { next: true },
      ],
    },

    { /* ---------- THE ORDINARY THING I ACTUALLY WANT ---------- */
      time: "10:16 PM", x: 2500, actors: "living", state: "close", glow: "livingNight",
      light: { color: "34,24,60", a: .62, hole: [2300, 400, 560] }, night: true,
      beats: [
        { line: "you know what i think i want most?" },
        { line: "not every day to be exciting." },
        { line: "not every day to be romantic." },
        { line: "not every day to be memorable." },
        { wait: 500 },
        { line: "i think i want a life where even the boring days feel good because you're there." },
        { wait: 1600 },
        { clear: true },
        { line: "where “what do you want for dinner?” becomes a familiar question." },
        { line: "where we can have silly arguments and forget why we were annoyed." },
        { line: "where i can hear you moving around in the next room and somehow that makes the house feel right." },
        { line: "where we don't need a special occasion to feel like we're sharing something special." },
        { state: "forehead" },
        { wait: 1500 },
        { next: true },
      ],
    },

    { /* ---------- BEDTIME ---------- */
      time: "11:47 PM", x: 520, actors: "bed", state: "bedtime", glow: "bedLamp",
      light: { color: "24,18,48", a: .66, hole: [815, 450, 520] }, night: true,
      beats: [
        { line: "and eventually, we're both tired enough to stop pretending we're going to stay awake." },
        { ask: { label: "“sleep?”", spoken: true, then: [{ say: "“not yet.”", at: [578, 430] }] } },
        { ask: { label: "“you said that twenty minutes ago.”", spoken: true, then: [{ say: "“shhh.”", at: [578, 430] }] } },
        { clear: true },
        { state: "goodnight", strong: "goodnight, darling. 💜" },
        { tap: { at: [811, 505], label: "Turn off the bedside lamp", says: [{ lamp: true }] } },
        { wait: 1400 },
        { clear: true },
      ],
    },

    { /* ---------- WE JUST LIVED A DAY ---------- */
      x: 520, actors: "bed", state: "dark", glow: "bedMoon", still: true,
      light: { color: "14,12,34", a: .78 }, night: true, tall: true,
      beats: [
        { strong: "and that's it." },
        { wait: 900 },
        { line: "no big adventure." },
        { line: "no perfect day." },
        { line: "no grand plan." },
        { line: "just one ordinary day with you." },
        { wait: 1800 },
        { clear: true },
        { strong: "And somehow, Ammu..." },
        { line: "while making this, i realised that this is the kind of future i actually dream about." },
        { line: "not because every day will be perfect." },
        { line: "but because i hope there are so many ordinary ones waiting for us." },
        { wait: 1400 },
        { clear: true },
        { line: "sleepy mornings." },
        { line: "random conversations." },
        { line: "food debates." },
        { line: "silly arguments." },
        { line: "quiet evenings." },
        { line: "days where nothing happens." },
        { line: "days where everything happens." },
        { line: "and all the tiny moments in between." },
        { wait: 1400 },
        { clear: true },
        { line: "I don't think i'd ever get bored of building an ordinary life with you." },
        { wait: 1800 },
        { strong: "maybe that's the dream." },
        { strong: "not a perfect life." },
        { strong: "just our life. ♡" },
        { wait: 2600 },
        { clear: true },
      ],
    },

    { /* ---------- THE LAST LOOK AT THE ROOM ---------- */
      x: 520, actors: "bed", state: "dark", glow: "bedMoon", still: true,
      light: { color: "14,12,34", a: .62 }, night: true, ending: true,
      beats: [
        { hold: true },
        { note: "thank you for spending one ordinary day with me. 🫂💜" },
        { wait: 2400 },
        { note: "maybe someday, we won't have to imagine it." },
        { wait: 2000 },
        { sign: "— your Kanmani" },
        { wait: 1400 },
        { back: true },
      ],
    },
  ],
};
