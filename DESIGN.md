# Picto design rules

How Picto's characters, motion, locations and map are made, so new work matches what's there.

## How to use this file

- **Read it before** changing or adding a character, an animation, a location or the map.
- **Update it after** a change, in the same commit:
  - If the change alters how things are done in general, edit the matching rule in sections 1 to 9 so it stays true. Write the rule generally ("characters do X"), not as a note about one case.
  - Add to **section 11, Specific rules** only when the project owner asks for a one-off exception, or explicitly asks a tool to record one. Otherwise never add case-by-case rules.
  - Add one line to **section 12, Change log**.
- If a request conflicts with a rule here, follow the request and update the rule.

## 1. Feel

Picto is for adults around 40 and up. It should feel calm, warm and a little playful: a friendly café, not an arcade.

- Clear before clever. Every picture must be understood in a second.
- Delight in small doses: a hop, a wave, a cat asleep in the shop.
- Never shame. Wrong answers get a sympathetic look and a hint, not a buzzer.
- Never spoil. Nothing on screen may give away an answer the learner is about to work out.

## 2. Visual language

**Palette** (`art/kit.js`, `styles.css`): ink `#0B0B0B`, blue `#3A5AFF`, lime `#C6F432`, pink `#FF6FB5`, white. Supporting: deep blue `#2238C9`, deep lime `#A5D31C`, tan, tomato, orange, leaf green. Type: Space Grotesk for display, Inter for text.

**Shapes.** Flat, rounded, geometric. Round line caps and joins everywhere.

**Outlines.** Characters and word props have an ink outline. Scenery (walls, shelves, furniture) has none, so characters and props stand forward. Stroke weights in a character's own units: body 2.4, face and hands 1.7; Glo 4.5.

**Shading: one shade, one highlight.** Each form gets at most one darker area (ink at 10 to 14 % opacity, or `shade(colour, -0.12…-0.22)`) on the right or bottom, and one soft highlight (white at 30 to 60 %) top-left. No gradients on characters. Light comes from the top-left.

**Depth in scenes** comes from layering, soft ground shadows (ink at 13 to 20 %) and a darker lower wall, not from perspective drawing.

## 3. Motion language

Tokens live at the top of `motion.css`. Use them; don't invent durations.

| Token | Value | Use |
| --- | --- | --- |
| `--t-1` | 140 ms | taps, colour changes |
| `--t-2` | 260 ms | eyes, lids, brows, chips |
| `--t-3` | 480 ms | cards, panels, poses |
| `--t-4` | 800 ms | page and scene level |
| `--e-out` | decelerate | things arriving |
| `--e-inout` | ease both ways | loops, moves between two places |
| `--e-spring`, `--e-soft` | overshoot | playful arrivals, limbs settling |
| `--stagger` | 60 ms | delay between siblings |

Rules:

1. **Motion has a job.** It explains (where something went), guides (what to look at) or rewards. If it does none, remove it.
2. **Reactions are one-shots.** A wave, a hop, a cheer plays once and stops. Nothing that asks for attention may loop.
3. **Loops are ambient only.** Breathing, blinking, a lamp swaying. Slow (3 s or more), small, and never next to something tappable.
4. **Organic, not mechanical.** Ease in and out. Overlap parts: the forearm starts 50 ms after the arm, the hand 100 ms after; Glo's tuft trails its body. Nothing moves linearly except travel along a path (walking across, marching dashes, clock hands).
5. **Squash and stretch is Glo's.** People stay solid. They shift weight, tilt, breathe and gesture instead.
6. **Enter in reading order.** Top to bottom, left to right, staggered. Exits are faster than entrances.
7. **Poses are states, not animations.** A pose or expression is a set of values; CSS transitions spring between them. Use keyframes only for one-shots and loops.
8. **Reduced motion.** Everything must be fine with animation off (`prefers-reduced-motion` is handled once at the end of `styles.css`). Never hide content behind an animation that might not run in a way that makes it unusable.

## 4. Glo

Glo is a small speech-bubble creature (from the Greek *glossa*: tongue, language). File: `art/glo.js`; motion: `motion.css`, "Glo".

**Anatomy.** Lime gumdrop body with a speech-bubble tail, a blue tilde-shaped tuft, stub arms, blue feet, big close-set eyes with upper and lower lids, pink cheeks, a ground shadow. `glo({ mark: true })` is the face-only mark for the logo, tabs and streak.

**Moods** (set `data-mood` on the SVG):

| Mood | Looks like | Use |
| --- | --- | --- |
| `idle` | soft smile, breathing, blinking | default |
| `happy` | lower lids up, open smile, tail wag | greeting, encouragement |
| `joy` | eyes closed in arcs, open mouth | right answer, celebration |
| `talk` | three mouth shapes cycling, gentle bob | while Glo's bubble is open |
| `think` | one brow up, eyes up, tuft curled, arm raised | offering hints |
| `wow` | wide eyes, brows up, round mouth | surprise |
| `soft` | lids low, brows tilted | sympathy |
| `sleep` | lids closed, slow breathing, floating z | rest days |
| `star` | star eyes, sparkles | goal reached |

**Actions** (classes): `is-jump` (squash, launch, hang, land, settle; arms up, tuft flung), `is-wave` (one hello), `data-point="l|r|up|down"` (leans and points, used by the guide), `still` (no idle motion, for rows of small Glos).

**Behaviour.** Eyes follow the pointer. Outside scenes Glo stands fully visible in the bottom corner; in a scene it lives in the top bar and speaks inside the answer panel, so it never floats over the picture. Tapping Glo always does something (it helps with the current screen, or says hello). Glo never blocks content and never speaks unprompted more than once per screen. Never show a Glo that can't be tapped where it looks like a button.

## 5. People

One rig serves the traveller, friends and scene cast. File: `art/people.js`; motion: `motion.css`, "People".

**Build.** 120 × 200 units, about 4.5 heads tall, adult proportions. Front view. Layers back to front: backpack and back hair, legs, torso, left arm, right arm, head. Arms have three pivots (shoulder, elbow, wrist) and three hand shapes (open, pointing, thumb).

**Options** (`AV_DEFAULT`): `skin`, `hair` (short, buzz, curly, mid, bun, long, bob), `hairC`, `fem`, `beard`, `tache`, `cap` (none, cap, beanie, beret, sunhat), `top` (tee, stripes, cardigan, hoodie, jacket), `pants`, `pack` (pack, tote, cross, none), `badge`, `eyes` (glasses, round, shades, goggles), `apron`, `cape`, `bg`.

**The traveller** is the learner's own character: man or woman, skin, hair, hair colour and (men) beard, chosen free in the profile's "You" tab (`state.me`). Anything in a scene that depends on the learner (haircut photos, the mirror, Carmen's *bienvenido/bienvenida*) follows it.

**Gender cues.** A character's look must match their name and voice. Feminine cue set: `fem: true` (lashes, earrings, lip colour) with long hair, a bob, a bun or curls. Masculine: short, buzz, curly or longer (mid) hair, optional beard or moustache. Voices follow `CHARS` in `app.js`.

**Expressions** (class on the SVG or any ancestor):

| Class | Face | Use |
| --- | --- | --- |
| *(none)* | open smile | default |
| `x-talk` | mouth cycles through shapes, head moves with the words | exactly while the voice plays |
| `x-joy` | eyes closed in arcs, grin, small hop and nod | right answer |
| `x-wow` | brows up, wide eyes, round mouth | surprise |
| `x-think` | one brow up, eyes up and away, flat mouth, head tilt | pondering |
| `x-soft` | brows tilted in sympathy, gentle smile, head tilt | wrong answer |
| `x-wink` | one eye closed | encouragement |

**Poses** (class `p-…`; angles live in `motion.css`):

| Class | Body |
| --- | --- |
| `p-present`, `p-present-l` | open hand offered to one side: "here you go" |
| `p-hips` | hands on hips: relaxed, confident |
| `p-idea` | index finger up beside the face |
| `p-shrug` | both palms out, head tilt: asking |
| `p-think` | arm across the chest, hand on chin |
| `p-thumb` | thumbs-up |
| `p-cheer` | both arms up with a small shake |
| `p-point-l`, `p-point-up-l`, `p-point-r` | pointing at something in the scene |

A hello is the `waving` class on `.arm-r`: raise, two flicks, lower, once.

**Idle life** (full figures only): breathing, a slow weight shift, blinking, an occasional glance.

**Gaze.** `--gx`, `--gy` move the pupils and `--hx` turns the head slightly. The speaker looks at the learner; everyone else in the scene looks at the speaker.

**In scenes:**

- Each line gets a hand gesture (the scene's `acts` list, or `act` on a moment). Vary them; never the same gesture twice in a row.
- **Pointing at the answer is a hint, not a gesture.** Only the hint flow may point (`pointAt`).
- Right answer: `x-joy` plus `p-thumb` or `p-cheer`, and a glance at the thing tapped. Wrong answer: `x-soft`.
- Everyone in one scene is drawn at the same scale. Characters behind a counter are drawn without legs.

## 6. Locations

File: `art/scenes.js`. Each scene is an 800 × 500 SVG with everything inside `<g class="cam">` so the app can move a camera over it (`CAMS` in `app.js`).

**Layers, back to front:** wall and floor (drawn far beyond the frame, so camera moves never show an edge), light, wall decor, cast, furniture, props, then tap zones (`.hot`), always last.

**Rules:**

- A scene needs three things to feel like a place: something that tells you where you are (a menu, an awning), something alive (a plant, a cat) and a light source (a window, lamps).
- **Ambient motion** uses the `.sc-*` classes (sway, leaf, cloud, sun, clock hands, steam, light, blink, cat). Keep it to about six moving things per scene.
- **No look-alikes.** Never add decoration that could be mistaken for a tappable item or for a word being taught.
- **Tap zones** are generous, never overlap, and stay clear of ambient motion.
- **Props** that arrive during a scene are `.prop` groups shown by adding `.in`.
- Speech bubbles sit beside the speaker's mouth when nothing is covered, otherwise in the band at the top of the scene. On desktop the bubble and the band scale with the picture (`--k`), so browser zoom keeps them in proportion.
- **Phones:** the picture takes the free height; the answer panel is compact and sits below it with no scrolling needed to answer (small word, icon-only audio buttons, one-line prompt, short tiles). Once answered, the choices collapse and the feedback and Continue take their place.
- **No dark overlays** on the picture before a scene starts. The panel introduces the scene.

**Conversations, not quizzes** (every scene):
- **A scene is a real conversation.** The learner takes part in what actually happens at that place (ordering, choosing a haircut, chatting while it's done, paying), not a list of "find the object" questions. Object-finding is only for moments where it's natural (Lucía offers a table, Paco asks what's on your list, Carmen says look in the mirror).
- **Where a person would choose, the learner chooses.** Ordering, picking a style or colour, what to buy: every option is right (`type: 'choose'`), tapped in the scene or picked below, and "no thanks" is allowed where it would be in real life.
- **Later lines follow the choices.** A moment can be a function of the scene state, resolved when it starts, so Lucía brings what you ordered, offers only what's left and asks how your own order is. Choices show in the scene too (your order on the table, your new hair in the salon mirror).
- **Facts are checked.** What happens in a scene and what the culture note says must be true of Spain (salons work by appointment, tips aren't expected). Don't invent customs.
- **Point of view is the learner's.** A mirror shows the learner where they'd really be (in the chair, in a cape); the room never shows an empty seat where the learner is sitting. Furniture stands on the floor; no shadows floating below it.
- **Every word is met.** Branches must still show each scene word at least once (offered by the character with a picture), so the next scene's review makes sense.

**Questions** (every scene):
- **Picture choices are one category.** Every option in a food question is a food, every drink option a drink, every salon option a salon item, so the learner has to know the word, not just rule out the odd one out. Draw each option the way it's served in the scene (pan con tomate is toast with tomato, not a plain loaf).
- **Reply questions show the meaning.** When the learner answers with a reply rather than finding something, the word's picture sits beside it in the panel and the thing appears or wiggles in the scene (Lucía lifts a jug of agua). No one should answer a question about a word they can't picture. Prompts name the Spanish word, not its English translation.
- **Picture questions can be answered in the scene too.** If the item is visible in the scene, tapping it there is as good as picking its picture, and the two stay in step (`scene: { hotKey: optionKey }`). Items offered during the moment appear as props first (the pan con tomate on Lucía's counter, the bill on Paco's counter).

**Help for confused tapping** (every scene). Taps that miss (on the picture or the panel background, or a wrong answer) count up per moment:
1. 3 taps: everything tappable wiggles once.
2. 5 taps: only the answer wiggles and glows once, and the speaker points at it (look and point, `pointAt`).
3. 9 taps: the speaker points again and Glo jumps and offers help (say it slower, show me where, show it in English).
Scene art that can be tapped carries `data-art="<key>"` so it can wiggle. Picture answers count too: the matching scene item wiggles, glows and gets pointed at.

## 7. Map

File: `art/map.js`. viewBox 432 × 332, content offset by 14, 12. The app places HTML pins with the same numbers.

What makes it read as a map, in order of importance:

1. A smooth coastline (polygon run through a spline) with a soft shadow, floating on a tinted sea.
2. Neighbours in muted tones with dashed borders and letter-spaced capital labels; sea names in italics.
3. A faint grid and a dashed frame.
4. Terrain glyphs: small mountains, pale rivers.
5. One small landmark per city, muted while the city is locked.
6. A compass, plus one or two things that move a little (a boat, a whale's tail, drifting waves, marching dashes on the route ahead).

Keep it light: land, sea and labels must stay readable under the pins. Nothing on the map may cover a city label.

## 8. Voices

Speech uses the browser's voices, with the settings learners liked from the first version: Spain Spanish, rate 0.92 (0.62 for "slower"), women at pitch 1.08, men at 0.95.

- **Desktop:** keep the browser's own voice order; women get the first female or Google voice. With no male voice, Paco uses the default voice at pitch 0.5.
- **iPhone and iPad:** never use novelty voices (Eddy, Flo, Grandpa and others); rank voices by quality (enhanced or premium first). With no male voice, use the best voice at pitch 0.82, because a heavy drop sounds robotic there. Speech is unlocked on the first tap.
- Pre-recorded voices were tried (Piper) and rejected: too fast and less warm than the browser voices. Don't switch to recorded audio without asking.

## Loading and errors

- The page is never blank: a small "Loading Picto…" splash shows until the app draws, and offers a reload after a few seconds if it never does.
- Fonts load without blocking the first paint (preload, then swap).
- If a page fails to draw, show the "Oops, this page didn't load" card with Try again and Back to the start, never a white screen.
- Places that exist on the week list but have no scene yet must be treated as closed, not looked up.
- Entrance animations that start content invisible need a safety net, but it must only step in if the entrance really stalled (its animations never finished). Swapping classes on a page that animated normally replays the page fade and looks like a reload.
- State classes for whole pages use specific names (`entering`, not `intro`), and component styles are scoped to their parent (`.stage > .intro`). A shared name once hid the whole first page.
- Test first visits in a fresh session (clear sessionStorage and localStorage), and check that content is visible, not just present.

## 9. Interface motion

- **Pages** fade and rise 14 px (`viewIn`). Pages with a fixed footer only fade.
- **Landing, first open:** logo, headline lines (rising from a mask), sentence, button, picture, then Glo hops in and waves and two floating notes pop in. The notes never contain words taught in a scene. Once per visit; afterwards the plain page fade.
- **Setup steps:** the page fades, the content rises in reading order, the choices follow one by one, and the footer slides up. Glo's dock stays hidden until setup is done.
- **Entrances play once.** Selecting an option updates it in place; never rebuild a list to change one item. When part of a page must be redrawn (a filter, a new pace, a map city, a search), use `rerender()` or the `settled` class so nothing replays its entrance and the scroll position stays put.
- **Cards** lift 2 to 3 px on hover; buttons press down.
- **Buttons follow logic.** A button that moves the learner forward is disabled until the choice it depends on is made, and the text beside it says what is missing. Nothing is pre-selected on the learner's behalf. A locked action shows why it is locked instead of a button that only produces a message.
- **The guide** (spotlight tour): the spotlight glides between targets, the card fades and swaps, Glo points at the target. At most four steps per tour, always skippable, replayable from the `?` button.
- **In-scene coaching:** the first tap moments outline what can be tapped and show a "tap the picture" pill. It disappears after the first correct tap.

## 10. Checklists

**New character**

1. Add a config (to `CAST` for scene characters, `FRIENDS` for friends). Reuse the rig; don't draw a new body.
2. Check gender cues, name and voice agree.
3. Check it reads at 36 px (bust) and at scene scale.
4. Give scene characters an `acts` list of gestures.

**New location**

1. 800 × 500, content in `g.cam`, background drawn well beyond the frame.
2. Place, life, light (section 6). Up to six ambient motions.
3. Add tap zones last; test each is reachable at phone size.
4. Add camera shots to `CAMS`, then the moments to `SCENES`.
5. Check for look-alikes and spoilers.

**New animation**

1. Say its job in one sentence (rule 1). One-shot or ambient?
2. Use the tokens. Add overlap if more than one part moves.
3. Check it with reduced motion on, and at phone size.

## 11. Specific rules

One-off exceptions. Add here **only when asked** (see "How to use this file").

*None yet.*

## 12. Change log

- 2026-11: First version. Product renamed Picto. Glo rebuilt as a full character; people rig gained lids, brows, mouth shapes, jointed arms with hands, poses and gaze; café and shop given depth and ambient life; Spain redrawn as an illustrated map; landing simplified with a first-open entrance; first-time guide added.
- 2026-11: Setup buttons made conditional and nothing pre-selected; floating notes back on the landing; setup steps reveal in order; avatar editor fixed on phones.
- 2026-11: Glo moved into the scene top bar and made always tappable; no Glo on the landing; bubble scales with the picture; compact phone scene layout; escalating help for confused tapping; better voice choice on iPhone.
- 2026-11: Speakers point at the answer when the learner struggles; Chrome's Google voice ranked first again.
- 2026-11: Desktop voices restored to the original settings; iOS keeps its own quality ranking.
- 2026-11: Fixed blank Spanish home after finishing the café and the shop; loading splash, error card and non-blocking fonts added.
- 2026-11: Fixed blank first page for new visitors (class clash between the landing entrance and the scene overlay); entrance safety net added.
- 2026-11: No more second fade after the first-page entrance; selecting, filtering, tapping cities and changing pace no longer replay entrances.
- 2026-11: Picture choices made one category with matching drawings; reply questions show the word's picture and a scene cue; picture questions answerable in the scene; Day 3 added: Salón Rosa with Carmen (espejo, toalla, champú, tijeras).
- 2026-11: Scenes became conversations: free ordering at the café with follow-ups that match, a shopping list in any order at Paco's, Meera asks what to buy, and the salon is a real haircut (style, colour, a check while cutting) with your reflection changing in the mirror.
- 2026-11: Salon: you sit in the chair (mirror shows you in a cape, counter below), haircut photos match your avatar, Carmen opens with "¿Tiene cita?" instead of a coffee, "No, no quiero color" answer, fact-checked culture note. Profile "You" tab (man or woman, skin, hair, beard) and more bags, badges, hats, tops and glasses. Word bank gained a language dropdown and sorting by scene, type or newest.
