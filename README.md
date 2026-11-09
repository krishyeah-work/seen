# Seen

**Learn a language by living it. Not by memorising it.**

Seen teaches vocabulary through short, real-life scenes: ordering breakfast at a café, picking up groceries, shopping with a friend. You meet every new word inside a conversation, work it out from the picture and the context, then meet it again somewhere new. Translation is the last resort, not the first step.

It is made for adults around 40 and up who want to talk to real people (a waiter, a taxi driver, a shopkeeper) rather than pass tests.

**Try it live:** https://krishyeah-work.github.io/seen/

The demo teaches Spanish, but the approach and the code are language-agnostic.

---

## Why Seen exists

> "I can memorise vocabulary lists, but I forget them quickly and still translate every sentence in my head."

Word lists and flashcards teach words without a moment to hang them on. Most people who learned a language well picked it up from people: a friend, a shopkeeper, a song. They noted a new word down, tried it on the same person next time, and found that words that sounded like ones they already knew stuck fastest.

Seen turns that experience into a product, built on **comprehensible input**: you understand the scene, so you can work out the one new word in it.

## How it works

Every word goes through the same loop:

1. **See**: a character says a line in a real situation. The bubble shows the line and a small English gloss with a *blank* where the new word goes.
2. **Guess**: you tap the thing in the scene, pick a picture or choose a reply. No translation unless you ask for it.
3. **Meet again**: the word comes back two or three times in the same scene, then again in a new place (a review at the market, a co-learn scene with a friend).
4. **Recall later**: your word bank keeps each word with its picture and every place you met it. More places, stronger word.

### Sound bridges

At the start you pick the languages you already speak. Seen uses them to show sound-alikes when you meet a new word, for example:

| Spanish | Sounds like |
| --- | --- |
| mesa (table) | *mez* in Hindi |
| pan (bread) | *pav* in Hindi and Marathi, *pão* in Portuguese |
| agua (water) | *aqua* |
| naranja (orange) | *narangi* in Hindi |

False friends get a warning too (*pan* is not a frying pan).

## What's in the demo

- **Landing and a 3-step setup**: languages you speak (with search), the language to learn, and how you'd like to learn (or skip, and the pace adapts).
- **Arrival**: a short animated landing in Spain.
- **Home**: your traveller, level, words learned, words that stuck, a weekly streak with daily moods, your languages and your friends.
- **Spanish home**: today's activity, review and word bank, a map of Spain where **each city is a level**, your week of scenes with an adjustable pace, and a "Road to Madrid" progress strip your avatar walks along.
- **Scenes**:
  - *Café La Plaza*: 9 moments with Lucía, about 5 minutes.
  - *El mercado*: a review at Paco's shop.
  - *Shopping with Meera*: a co-learn scene where a friend joins you in the shop.
- **Word bank**: every word with its picture, its lines and the places you met it.
- **Profile**: an avatar editor. Earn **Rep** in scenes and spend it on hats, tops, backpacks, badges, eyewear and illustrated backgrounds. Your level follows lifetime Rep, so spending never lowers it.
- **Friends**: filter by language, invite friends, and co-learn with friends on the same trip.
- **Glo**: a small learning buddy that offers hints when you're stuck, and stays quiet when you're not.

## Design principles

- **Scenes, not lists.** Words live inside real moments with real people.
- **The scene before English.** The gloss keeps the line understandable while leaving the new word for you to work out.
- **Familiar first.** Lean on the languages you already speak.
- **Meet it again.** Repetition across moments and places, not drills.
- **Calm, adult and encouraging.** No timers, no lives, no shaming. Hints are always one tap away.
- **Travel as progress.** Cities are levels, and Rep is the currency to move on and to personalise your traveller.
- **Learn together.** Friends appear on your map and can join a scene with you.

## Accessibility

- Works with keyboard only: every tappable thing in a scene is focusable, and Esc closes dialogs and menus.
- Respects `prefers-reduced-motion`.
- Large type, high contrast and generous touch targets, sized for readers over 40.
- Fully responsive, from 360 px phones to wide desktops.
- Voices use the browser's Speech Synthesis API, and every line can be replayed or slowed down.

## Tech

- Plain **HTML, CSS and JavaScript**. No framework, no build step, no dependencies.
- All illustrations (scenes, characters, props, map, backgrounds) are **inline SVG** drawn in code, so they stay sharp at any size and can be animated.
- Characters are built from one parametric system (skin, hair, outfit, accessories, expressions) and can blink, talk, react, wave and walk.
- Hash-based routing; progress is saved in `localStorage` on your device only.
- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts.

## Run it locally

You only need a static file server. From the project folder:

```bash
python -m http.server 8080
```

Then open http://localhost:8080. Any static server works, for example:

```bash
npx serve .
```

Opening `index.html` directly from disk also mostly works, but a local server is closer to how the site runs online.

**Voices:** speech depends on the voices installed on your device. Chrome and Edge on Windows and macOS usually include Spanish voices. If no male Spanish voice is available, male characters use a lowered pitch.

**Start over:** use "Restart the demo" in the footer or in the About dialog.

## Project structure

```
index.html   Page shell, fonts and meta tags
styles.css   Design tokens, layout, components, animations, responsive rules
art.js       Illustration kit: scenes, props, icons, characters, map, backgrounds (window.ART)
app.js       App: data, state, routing, views, scene engine, speech, Glo
```

### Extend it

Everything a learner sees is driven by data at the top of `app.js`:

| What | Where | Notes |
| --- | --- | --- |
| Words | `WORDS` | Target word, English meaning, picture (`art`), sound bridges per known language, optional false-friend note |
| Lines | `LINES` | What a character says with a word, per place, plus the English gloss with `___` as the blank |
| Scenes | `SCENES` | Ordered moments: who speaks, camera shot, line, gloss, and the interaction (`tap` in the scene, `pick` a picture, or `reply`) |
| Places and cities | `PLACES`, `CITIES` | Cities are levels on the map, each with its own scenes |
| Languages | `KNOWN`, `LEARN` | Languages a learner can speak and can learn |
| Avatar shop | `SHOP` | Items, costs and the look each one applies |
| Friends | `FRIENDS` | Friends, their language, city and look |

To add a new scene, draw it in `art.js` (an 800 × 500 SVG with a `<g class="cam">` group and `.hot` tap zones), give it camera shots in `CAMS`, then describe its moments in `SCENES`. To teach another language, swap the words, lines and voice language (`es-ES` in `Speech`).

## Contributing

Ideas, bug reports and pull requests are welcome. New scenes, new languages, better sound bridges and accessibility improvements are especially appreciated. Please keep the tone calm and adult, and keep translation as the last resort.

## Credits

Designed and built by **Krishna R**.

## License

[MIT](LICENSE). Free to use, change and share.
