// AI Knowledge Base — 20+ topics with scored keyword matching

export const chatResponses = {
  yellow: {
    keywords: ['yellow', 'yellowing', 'pale', 'light green'],
    response: `Yellow leaves usually mean one of three things 🌿\n\n• **Wet soil + yellow** → overwatering. Let soil dry 2 inches deep.\n• **Dry soil + yellow** → nitrogen deficiency. Apply balanced NPK (10-10-10).\n• **Lower leaves only** → natural aging, no action needed.\n• **New growth yellow** → iron deficiency. Try chelated iron supplement.\n\nCheck soil moisture first — that fixes 70% of yellowing cases.`,
  },
  water: {
    keywords: ['water', 'watering', 'how often', 'frequently', 'overwater', 'thirsty', 'dry soil'],
    response: `Watering depends on plant type, pot size, and season. 💧\n\n• **Succulents/Cactus** — every 14–21 days. Soil must be bone dry.\n• **Monstera, Pothos** — every 7 days summer, 14 days winter.\n• **Basil, Mint** — every 2–3 days. Keep consistently moist.\n• **Tomatoes** — every 2 days when fruiting, water deeply.\n• **Orchids** — weekly soak then fully drain. Never leave in standing water.\n• **Snake Plant, ZZ** — every 14 days. Loves neglect.\n\n**Finger test**: push finger 2 inches into soil. Dry = water now. Moist = wait.`,
  },
  indoor: {
    keywords: ['indoor', 'inside', 'room', 'apartment', 'low light', 'survive indoors'],
    response: `Many plants thrive indoors with the right conditions. 🏡\n\n**Best for low light:** Snake Plant, ZZ Plant, Pothos, Peace Lily\n**Medium light (near window):** Monstera, Philodendron, Spider Plant, Orchid\n**Bright indirect:** Fiddle Leaf Fig, Aloe Vera, Basil, Succulents\n\n**Indoor essentials:**\n• Temperature: 18–26°C, away from drafts\n• Humidity: 50–60% (mist leaves or use pebble tray)\n• Always use pots with drainage holes`,
  },
  disease: {
    keywords: ['disease', 'sick', 'spots', 'blight', 'fungus', 'mold', 'dying', 'rot', 'wilting', 'infected', 'brown'],
    response: `Let me help diagnose your plant. 🔍\n\n• **Brown spots with yellow halo** → bacterial leaf spot. Remove leaves, apply copper fungicide.\n• **White powdery coating** → powdery mildew. Spray neem oil weekly.\n• **Soft brown stem base** → root rot. Repot in fresh soil, trim rotted roots.\n• **Wilting + wet soil** → root rot. Stop watering immediately.\n• **Wilting + dry soil** → underwatering. Water deeply.\n• **Sticky residue** → aphids or scale. Wipe with neem oil solution.\n\nFor fastest diagnosis, upload a photo to the FloraVerse AI Scanner — 95%+ accuracy.`,
  },
  pests: {
    keywords: ['pest', 'bug', 'insect', 'aphid', 'spider mite', 'mealybug', 'gnats', 'flies', 'whitefly'],
    response: `Pests are manageable with the right approach. 🐛\n\n• **Aphids** (tiny clusters) → spray water forcefully, then neem oil weekly.\n• **Spider mites** (fine webs) → increase humidity, spray neem oil.\n• **Mealybugs** (white fluff) → dab rubbing alcohol, then neem oil.\n• **Fungus gnats** (tiny soil flies) → let soil dry fully between waterings.\n• **Whiteflies** → yellow sticky traps + insecticidal soap.\n\n**Prevention**: good airflow + avoid overwatering + inspect new plants before bringing indoors.`,
  },
  fertilize: {
    keywords: ['fertilizer', 'fertilize', 'feed', 'nutrients', 'npk', 'compost'],
    response: `Slow growth and pale leaves = hungry plant. 🌱\n\n**NPK guide:**\n• N (Nitrogen) → leafy green growth. Higher N in vegetative stage.\n• P (Phosphorus) → roots and flowers. Increase when flowering.\n• K (Potassium) → disease resistance and overall strength.\n\n**By plant:**\n• Vegetables → balanced 10-10-10 monthly.\n• Tomatoes → switch to 5-10-10 at flowering.\n• Houseplants → half-strength liquid every 4 weeks, spring/summer only.\n• Succulents → once in spring, very diluted.\n• Herbs → light feeding only. Too much N reduces flavor.\n\nOrganic options: worm castings, compost tea, fish emulsion.`,
  },
  harvest: {
    keywords: ['harvest', 'pick', 'ripe', 'ready', 'when to pick', 'maturity'],
    response: `Knowing when to harvest is an art. 🌾\n\n• **Tomatoes** → fully colored, slightly soft. Don't wait to fall off.\n• **Peppers** → green = spicy, red/yellow = sweet. Both are edible.\n• **Cucumbers** → 7–8 inches long, before yellowing.\n• **Lettuce/Spinach** → cut outer leaves, inner keeps growing.\n• **Basil** → pinch above leaf node, before it flowers.\n• **Carrots** → check girth at soil line (2cm+).\n• **Potatoes** → wait until vines die back naturally.\n• **Garlic** → harvest when lower half of leaves turn brown.\n\nCheck your FloraVerse harvest countdown for each plant.`,
  },
  sunlight: {
    keywords: ['sun', 'sunlight', 'light', 'shade', 'dark', 'window', 'grow light'],
    response: `Light is the engine of plant life. ☀️\n\n**Light requirements:**\n• **Full sun (6+ hrs):** Tomatoes, Peppers, Sunflowers, Basil, Roses\n• **Partial sun (3–6 hrs):** Spinach, Lettuce, Cilantro, Cucumber\n• **Bright indirect:** Monstera, Pothos, Peace Lily, Orchid, Fiddle Leaf\n• **Low light:** Snake Plant, ZZ Plant, Chinese Evergreen\n\n**Tips:**\n• Rotate plants 90° weekly for even growth.\n• Leaves leaning toward window = needs more light.\n• Grow lights: 12–16 hrs daily, 6–12 inches above plant.`,
  },
  soil: {
    keywords: ['soil', 'potting mix', 'drainage', 'repot', 'ph', 'acidic'],
    response: `Soil is your plant's foundation. 🪨\n\n• **Succulents/Cacti** → sandy, fast-draining (50% perlite)\n• **Vegetables** → rich loamy with compost, pH 6.0–7.0\n• **Orchids** → bark-based mix ONLY. Never regular potting soil.\n• **Tropicals (Monstera etc.)** → well-draining mix with perlite and peat\n• **Blueberries** → acidic, pH 4.5–5.5. Add pine bark or sulfur.\n\n**Repot when:** roots circle the pot bottom, or every 1–2 years.\n**Poor drainage fix:** add perlite or coarse sand to existing mix.`,
  },
  propagation: {
    keywords: ['propagate', 'cutting', 'clone', 'multiply', 'stem cutting', 'division', 'grow new'],
    response: `Propagating plants is deeply rewarding. 🌱\n\n• **Pothos, Monstera, Philodendron** → stem cutting below a node, place in water 2–3 weeks until roots form, then pot.\n• **Succulents** → remove healthy leaf, let callous 2 days, lay on dry soil, mist lightly.\n• **Rosemary, Basil** → 4-inch cutting, dip in rooting hormone, plant in moist soil.\n• **Spider Plant** → pin baby plantlets onto soil while attached — roots in 2 weeks.\n• **Snake Plant** → cut leaf into 3-inch sections, plant upright.\n• **Aloe Vera** → separate offsets (pups) from base and repot directly.\n\nBest time: spring or early summer.`,
  },
  tomato: {
    keywords: ['tomato', 'tomatoes'],
    response: `Tomatoes are the gardener's greatest reward. 🍅\n\n• **Light:** 6–8 hours direct sun minimum.\n• **Water:** deeply every 2 days when fruiting. Inconsistent watering causes blossom end rot.\n• **Pruning:** remove "suckers" (shoots in V between stem and branch) weekly.\n• **Support:** stake or cage when 30cm tall.\n• **Fertilize:** balanced NPK at planting, high-potassium once flowers appear.\n\n**Common problems:**\n• Blossom end rot → calcium deficiency + inconsistent watering\n• Cracked fruit → irregular watering\n• Curling leaves → heat stress or pests\n• Brown patches → early/late blight — use FloraVerse AI Scanner`,
  },
  monstera: {
    keywords: ['monstera', 'swiss cheese', 'split leaves'],
    response: `Monstera deliciosa — the crown jewel of houseplants. 🌿\n\n• **Light:** bright indirect. Direct sun scorches leaves.\n• **Water:** every 7 days summer, 14 days winter. Let top 2 inches dry first.\n• **Humidity:** 60%+ ideal. Mist weekly.\n• **Fertilize:** balanced liquid monthly in spring/summer.\n• **Support:** give it a moss pole — triggers larger, more split leaves.\n\n**Why no splits?** Young plants don't have fenestrations. They develop with age and better light.\n**#1 cause of yellowing:** overwatering. Always check soil before watering.`,
  },
  succulents: {
    keywords: ['succulent', 'cactus', 'aloe', 'jade', 'echeveria', 'drought tolerant'],
    response: `Succulents thrive on neglect. 🪴\n\n**The 3 golden rules:**\n1. Water deeply then wait until bone dry (14–21 days).\n2. Drainage is everything — sandy mix + holes in pot.\n3. Bright light — 6+ hours minimum.\n\n**Never mist** — moisture on leaves causes rot.\n\n**Problems:**\n• Mushy leaves → root rot. Stop watering, repot.\n• Stretching/leaning → not enough light.\n• Wrinkled leaves → underwatering (rare). Water deeply.\n• Red/purple tints → sun stress. Usually beautiful, not harmful.`,
  },
  herbs: {
    keywords: ['herb', 'basil', 'mint', 'rosemary', 'thyme', 'cilantro', 'parsley', 'dill', 'chives'],
    response: `Fresh herbs elevate your garden and kitchen. 🌿\n\n• **Basil** → 6+ hrs sun, water every 2–3 days. Pinch flower buds to keep leafy.\n• **Mint** → keep in containers (spreads aggressively). Partial shade fine.\n• **Rosemary** → drought-tolerant, sandy soil, full sun. Water only when dry.\n• **Thyme** → drought-tolerant, rocky/sandy soil, full sun.\n• **Cilantro** → cool-season. Bolts in heat — sow every 3 weeks for continuous supply.\n• **Parsley** → water regularly, partial shade fine. Slow germination (3 weeks).\n• **Chives** → nearly indestructible. Any light level works.\n\n**Harvest tip:** cut above a leaf node for bushier regrowth.`,
  },
  climate: {
    keywords: ['temperature', 'humidity', 'cold', 'frost', 'heat', 'hot', 'winter', 'summer', 'climate'],
    response: `Climate shapes your garden's health invisibly. 🌡️\n\n**Temperature ranges:**\n• Tropicals (Monstera, Pothos) → 18–30°C. Below 12°C causes damage.\n• Mediterranean herbs (Rosemary, Lavender) → tolerate 0–35°C.\n• Cool-season veggies (Lettuce, Spinach) → best at 10–18°C. Bolt in heat.\n• Warm crops (Tomato, Pepper) → need 18–32°C. Frost-kills.\n• Succulents → 10–35°C. Brief frost OK if soil is dry.\n\n**Humidity:**\n• <30% → tropicals suffer, succulents love it.\n• 50–60% → ideal for most houseplants.\n• >80% → fungal risk. Improve air circulation.\n\nUse the FloraVerse Climate Monitor for live readings.`,
  },
  pruning: {
    keywords: ['prune', 'pruning', 'trim', 'cut back', 'deadhead', 'pinch'],
    response: `Pruning directs energy toward healthy growth. ✂️\n\n• **Tomatoes** → remove suckers weekly to direct energy to fruit.\n• **Basil** → pinch flower buds as they appear.\n• **Roses** → deadhead spent blooms. Hard prune in early spring by 1/3.\n• **Monstera** → remove yellow/brown leaves at base.\n• **Lavender** → cut back 1/3 after flowering. Never cut into old wood.\n• **Fruit trees** → prune in late winter before new growth.\n\n**Golden rule:** always use clean, sharp, sterilized tools. Alcohol between plants prevents disease spread.`,
  },
  companion: {
    keywords: ['companion', 'grow together', 'plant next to', 'which plants together', 'combination'],
    response: `Companion planting is nature's own pest control. 🌾\n\n**Great combinations:**\n• Tomatoes + Basil → basil repels aphids and whiteflies\n• Corn + Beans + Squash (Three Sisters) → classic nitrogen-fixing trio\n• Roses + Marigolds → marigolds deter nematodes\n• Carrots + Onions → each repels the other's pests\n• Cucumbers + Dill → dill attracts beneficial predators\n• Lettuce + Tall plants → lettuce thrives in shade\n\n**Avoid:**\n• Fennel near anything — it inhibits most vegetables\n• Onions/Garlic near beans and peas`,
  },
  germination: {
    keywords: ['seed', 'germinate', 'seedling', 'sprouting', 'not sprouting', 'starting from seed'],
    response: `Starting from seed is the most intimate start to a plant's life. 🌱\n\n**Keys to germination:**\n• Warmth (20–25°C) — use a heat mat for tomatoes and peppers.\n• Consistent moisture — damp but never waterlogged.\n• Depth — plant 2× the seed's diameter deep.\n\n**Germination times:**\n• Radish → 3–7 days\n• Lettuce/Basil → 5–10 days\n• Tomato/Pepper → 7–14 days (need warmth)\n• Carrot → 14–21 days\n• Parsley → 21–28 days (be patient)\n\nOnce sprouted, move to bright light immediately. Leggy seedlings = not enough light.`,
  },
  rose: {
    keywords: ['rose', 'roses', 'not blooming', 'flowers not blooming'],
    response: `Roses — demanding but deeply rewarding. 🌹\n\n• **Sun:** 6+ hours direct sun. Morning sun + afternoon shade is ideal.\n• **Water:** at soil level, never wet leaves. 2–3x weekly.\n• **Feed:** rose fertilizer (higher phosphorus) every 4 weeks in growing season.\n• **Prune:** remove 1/3 in early spring. Remove dead and crossing canes.\n• **Deadhead:** remove spent flowers to keep blooming.\n\n**Problems:**\n• Black spots on leaves → black spot fungus. Remove leaves, spray fungicide.\n• Aphids → spray water then neem oil.\n• No blooms → too much nitrogen, not enough sun, or needs deadheading.`,
  },
  compost: {
    keywords: ['compost', 'organic', 'worm', 'mulch', 'eco', 'sustainable'],
    response: `Composting turns waste into life. ♻️\n\n**What to add:**\n• Greens (nitrogen): fruit peels, veg scraps, coffee grounds\n• Browns (carbon): dry leaves, cardboard, straw\n• Ratio: 3 parts brown to 1 part green\n\n**Timelines:**\n• Hot compost (turn weekly) → ready in 6–8 weeks\n• Cold compost (lazy) → ready in 3–6 months\n• Worm castings → 2–3 months, incredibly rich\n\n**Mulching:** 3–4 inches around plants retains moisture, suppresses weeds, and regulates temperature. Reduces fertilizer needs by 50–70%.`,
  },
  default: `Hello, Gardener. I'm Flora, your FloraVerse AI companion. 🌿

I have deep knowledge across 20+ topics:\n• 🔬 Disease & pest diagnosis\n• 💧 Watering by species and season\n• 🌱 50+ plant care guides\n• 🌡️ Climate & environment optimization\n• 🌾 Harvest timing\n• ✂️ Pruning & propagation\n• 🌻 Companion planting\n• ♻️ Soil, compost & organic methods\n\nAsk me anything — "why are my tomato leaves curling?", "how do I propagate Monstera?", "what pests attack basil?" — I'm here to help.`,
}
