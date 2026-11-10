// Comprehensive Curated YouTube Channel Directory
// Covering all 12 Niches across all Subscriber Brackets (0-1k, 1k-10k, 10k-100k, 100k-500k, 500k-2M, 2M-10M, 10M+) and Tier-1 Countries (US, GB, CA, AU)

const CURATED_NICHE_CHANNELS = {
  'Tech': [
    // 0 - 1k
    { id: 'tech_01', title: 'CodeWithKite', handle: '@codewithkite', subscribers: 480, niche: 'Tech', country: 'US', description: 'Beginner frontend coding tutorials, HTML/Tailwind CSS tips and dev logs.', videoCount: 14 },
    { id: 'tech_02', title: 'MicroLogicDev', handle: '@micrologicdev', subscribers: 820, niche: 'Tech', country: 'GB', description: 'Embedded systems, Raspberry Pi Pico projects, and DIY sensors.', videoCount: 22 },
    { id: 'tech_03', title: 'AussieBitCode', handle: '@aussiebitcode', subscribers: 650, niche: 'Tech', country: 'AU', description: 'Full-stack web development tutorials from Sydney, React & Node tips.', videoCount: 18 },
    { id: 'tech_04', title: 'MapleByte', handle: '@maplebyte', subscribers: 390, niche: 'Tech', country: 'CA', description: 'Junior software dev journey, computer science student devlogs in Toronto.', videoCount: 12 },
    // 1k - 10k
    { id: 'tech_05', title: 'robercik101', handle: '@robercik101', subscribers: 3200, niche: 'Tech', country: 'US', description: 'Tech reviews, indie maker projects, and ergonomic workspace builds.', videoCount: 38 },
    { id: 'tech_06', title: 'Hadzy Analytics', handle: '@hadzyanalytics', subscribers: 6510, niche: 'Tech', country: 'GB', description: 'YouTube algorithm data analysis, creator growth tools, and code breakdowns.', videoCount: 52 },
    { id: 'tech_07', title: 'HardwareForge', handle: '@hardwareforge', subscribers: 8900, niche: 'Tech', country: 'CA', description: 'Custom mechanical keyboard modifications and compact PC builds.', videoCount: 45 },
    { id: 'tech_08', title: 'SydneyTechLabs', handle: '@sydneytechlabs', subscribers: 4100, niche: 'Tech', country: 'AU', description: 'Smart home automation with Home Assistant and Zigbee gadgets.', videoCount: 31 },
    { id: 'tech_sg01', title: 'TechJitSG', handle: '@techjitsg', subscribers: 5850, niche: 'Tech', country: 'SG', description: 'Singapore gadget reviews, custom keyboards, and ergonomic desk setups.', videoCount: 32 },
    { id: 'tech_de01', title: 'BerlinCodeLab', handle: '@berlincodelab', subscribers: 6400, niche: 'Tech', country: 'DE', description: 'Rust programming, backend microservices, and Linux tutorials from Berlin.', videoCount: 45 },
    { id: 'tech_ae01', title: 'DubaiTechVentures', handle: '@dubaitechventures', subscribers: 9200, niche: 'Tech', country: 'AE', description: 'Tech startups, AI innovations, and modern workspace tours in Dubai.', videoCount: 38 },
    { id: 'tech_no01', title: 'NordicDevJourney', handle: '@nordicdevjourney', subscribers: 4760, niche: 'Tech', country: 'NO', description: 'Clean code, TypeScript, and open-source contributions from Oslo.', videoCount: 29 },
    { id: 'tech_ch01', title: 'SwissCyberSec', handle: '@swisscybersec', subscribers: 5400, niche: 'Tech', country: 'CH', description: 'Privacy-focused software, encryption, and network security from Zurich.', videoCount: 34 },
    { id: 'tech_jp01', title: 'TokyoDevLogs', handle: '@tokyodevlogs', subscribers: 35000, niche: 'Tech', country: 'JP', description: 'Software engineer life in Tokyo, iOS development, and developer culture.', videoCount: 68 },
    // 10k - 100k
    { id: 'tech_09', title: 'ByteCraftDev', handle: '@bytecraftdev', subscribers: 24500, niche: 'Tech', country: 'US', description: 'Full-stack web apps, Docker containerization, and modern cloud deployment.', videoCount: 78 },
    { id: 'tech_10', title: 'LinuxVibeLab', handle: '@linuxvibelab', subscribers: 46000, niche: 'Tech', country: 'GB', description: 'Arch Linux rice builds, Neovim workflows, and terminal productivity hacks.', videoCount: 92 },
    { id: 'tech_11', title: 'AussieDevCorner', handle: '@aussiedevcorner', subscribers: 38000, niche: 'Tech', country: 'AU', description: 'Software engineering career advice, system design, and clean architecture.', videoCount: 64 },
    { id: 'tech_12', title: 'NorthernTechTuts', handle: '@northerntechtuts', subscribers: 72000, niche: 'Tech', country: 'CA', description: 'Cybersecurity fundamentals, ethical hacking walkthroughs, and networking.', videoCount: 105 },
    // 100k - 500k
    { id: 'tech_13', title: 'CraftingCode', handle: '@craftingcode', subscribers: 185000, niche: 'Tech', country: 'US', description: 'High-production software architecture breakdowns and developer culture essays.', videoCount: 120 },
    { id: 'tech_14', title: 'Matthew Moniz', handle: '@MatthewMoniz', subscribers: 720000, niche: 'Tech', country: 'CA', description: 'Detailed laptop, smartphone, and tech gadget reviews and comparisons.', videoCount: 650 },
    { id: 'tech_15', title: 'TechSpurtUK', handle: '@techspurtuk', subscribers: 420000, niche: 'Tech', country: 'GB', description: 'Smartphone camera tests, budget audio gear, and real-world buyer guides.', videoCount: 210 },
    // 500k - 2M
    { id: 'tech_16', title: 'OptimumTech', handle: '@optimumtech', subscribers: 1150000, niche: 'Tech', country: 'AU', description: 'Small form factor PC builds, competitive gaming peripherals, and audio testing.', videoCount: 165 },
    { id: 'tech_17', title: 'ShortCircuit', handle: '@shortcircuit', subscribers: 1850000, niche: 'Tech', country: 'CA', description: 'Unboxing weird, wonderful, and cutting-edge tech gadgets with candid first impressions.', videoCount: 450 },
    // 2M - 10M
    { id: 'tech_18', title: 'Dave2D', handle: '@dave2d', subscribers: 3750000, niche: 'Tech', country: 'CA', description: 'Design-centric laptop and consumer electronics reviews with distinct visual style.', videoCount: 380 },
    { id: 'tech_19', title: 'Mrwhosetheboss', handle: '@mrwhosetheboss', subscribers: 9200000, niche: 'Tech', country: 'GB', description: 'High-energy smartphone deep dives, futuristic concept tech, and gadget comparisons.', videoCount: 520 },
    // 10M+
    { id: 'tech_mkbhd', title: 'Marques Brownlee', handle: '@mkbhd', subscribers: 19400000, niche: 'Tech', country: 'US', description: 'Quality tech videos | YouTuber | Geek | Ultimate Frisbee player | Podcaster.', videoCount: 1680 },
    { id: 'tech_linus', title: 'Linus Tech Tips', handle: '@LinusTechTips', subscribers: 15800000, niche: 'Tech', country: 'CA', description: 'Passionate people building innovative tech videos: PC builds, hardware torture tests, and server racks.', videoCount: 6500 }
  ],

  'Gaming': [
    // 0 - 1k
    { id: 'game_01', title: 'LofiGamerGuy', handle: '@lofigamerguy', subscribers: 540, niche: 'Gaming', country: 'US', description: 'Relaxing Stardew Valley and Animal Crossing cozy gameplay streams.', videoCount: 26 },
    { id: 'game_02', title: 'IndieQuestUK', handle: '@indiequestuk', subscribers: 790, niche: 'Gaming', country: 'GB', description: 'Discovering hidden gems and pixel art indies on Steam Next Fest.', videoCount: 34 },
    { id: 'game_03', title: 'DownUnderPlay', handle: '@downunderplay', subscribers: 420, niche: 'Gaming', country: 'AU', description: 'Multiplayer co-op gaming shenanigans with Australian friends.', videoCount: 19 },
    // 1k - 10k
    { id: 'game_04', title: 'snorehammer', handle: '@snorehammer', subscribers: 8100, niche: 'Gaming', country: 'GB', description: 'Indie game walkthroughs, dark fantasy lore commentary, and soulslike analysis.', videoCount: 84 },
    { id: 'game_05', title: 'PixelQuestTV', handle: '@pixelquesttv', subscribers: 3400, niche: 'Gaming', country: 'US', description: 'Classic JRPG retrospectives and retro console speedrun attempts.', videoCount: 61 },
    { id: 'game_06', title: 'VoxelRealm', handle: '@voxelrealm', subscribers: 6200, niche: 'Gaming', country: 'AU', description: 'Minecraft survival megastructures and redstone engineering builds.', videoCount: 47 },
    { id: 'game_07', title: 'CanuckArcade', handle: '@canuckarcade', subscribers: 4800, niche: 'Gaming', country: 'CA', description: 'Fighting game community tournament analysis and combo tutorials.', videoCount: 55 },
    // 10k - 100k
    { id: 'game_08', title: 'ClutchArcade', handle: '@clutcharcade', subscribers: 29500, niche: 'Gaming', country: 'US', description: 'Tactical FPS aim mechanics breakdown, crosshair placement, and game sense guides.', videoCount: 112 },
    { id: 'game_09', title: 'RetroGamerTom', handle: '@retrogamertom', subscribers: 67000, niche: 'Gaming', country: 'GB', description: 'PlayStation 1 & Nintendo 64 era game design documentaries.', videoCount: 95 },
    { id: 'game_10', title: 'OutbackPlayz', handle: '@outbackplayz', subscribers: 52000, niche: 'Gaming', country: 'AU', description: 'Open world survival crafting games: Rust, Valheim, and DayZ adventures.', videoCount: 88 },
    { id: 'game_11', title: 'NorthernLooter', handle: '@northernlooter', subscribers: 84000, niche: 'Gaming', country: 'CA', description: 'ARPG character builds for Path of Exile and Diablo IV league starters.', videoCount: 140 },
    // 100k - 500k
    { id: 'game_12', title: 'NeverKnowsBest', handle: '@neverknowsbest', subscribers: 280000, niche: 'Gaming', country: 'US', description: 'Long-form video essays analyzing RPG mechanics and narrative design.', videoCount: 65 },
    { id: 'game_13', title: 'SkillUp', handle: '@skillup', subscribers: 980000, niche: 'Gaming', country: 'AU', description: 'Weekly gaming news recaps and unmissable release impressions.', videoCount: 350 },
    // 500k - 2M
    { id: 'game_14', title: 'SkillUp', handle: '@skillup', subscribers: 1050000, niche: 'Gaming', country: 'AU', description: 'Honest game reviews, thorough industry journalism, and podcast discussions.', videoCount: 320 },
    { id: 'game_15', title: 'GarrysGamingHub', handle: '@garrysgaminghub', subscribers: 1420000, niche: 'Gaming', country: 'GB', description: 'Funny sandbox gaming highlights, challenges, and comedy gaming edits.', videoCount: 410 },
    // 2M - 10M
    { id: 'game_16', title: 'videogamedunkey', handle: '@videogamedunkey', subscribers: 7400000, niche: 'Gaming', country: 'US', description: 'Satirical game reviews, hilarious commentary, and Big Mode games publisher.', videoCount: 640 },
    // 10M+
    { id: 'game_mrbeast', title: 'MrBeast', handle: '@MrBeast', subscribers: 345000000, niche: 'Gaming', country: 'US', description: 'I want to make the world a better place before I die. Extreme challenges, gaming competitions, and massive entertainment.', videoCount: 840 },
    { id: 'game_mrbeastgaming', title: 'MrBeast Gaming', handle: '@MrBeastGaming', subscribers: 44500000, niche: 'Gaming', country: 'US', description: 'Challenges, custom Minecraft maps, GTA 5 races, and crazy gaming tournaments with friends.', videoCount: 160 },
    { id: 'game_pewdiepie', title: 'PewDiePie', handle: '@pewdiepie', subscribers: 111000000, niche: 'Gaming', country: 'GB', description: 'I make videos. Legendary gaming playthroughs, Meme Review, LWIAY, and Japan vlogs.', videoCount: 4700 },
    { id: 'game_markiplier', title: 'Markiplier', handle: '@markiplier', subscribers: 36800000, niche: 'Gaming', country: 'US', description: 'Welcome to Markiplier! Hilarious horror game reactions, comedy sketches, and original cinema.', videoCount: 5400 }
  ],

  'Maker & DIY': [
    // 0 - 1k
    { id: 'diy_01', title: 'TinyWoodshop', handle: '@tinywoodshop', subscribers: 610, niche: 'Maker & DIY', country: 'US', description: 'Small apartment woodworking, hand tool carving, and spoon whittling.', videoCount: 17 },
    { id: 'diy_02', title: 'UKPrintSmith', handle: '@ukprintsmith', subscribers: 850, niche: 'Maker & DIY', country: 'GB', description: 'Budget FDM 3D printer tuning, Klipper firmware setup, and PETG tips.', videoCount: 23 },
    { id: 'diy_03', title: 'AussieMakerStudio', handle: '@aussiemakerstudio', subscribers: 490, niche: 'Maker & DIY', country: 'AU', description: 'CNC router projects using Australian hardwood timber.', videoCount: 15 },
    // 1k - 10k
    { id: 'diy_04', title: 'apathyback', handle: '@apathyback', subscribers: 7200, niche: 'Maker & DIY', country: 'US', description: 'Practical 3D printing, custom studio furniture design, and workshop organization.', videoCount: 33 },
    { id: 'diy_05', title: 'WorkshopChronicles', handle: '@workshopchronicles', subscribers: 4100, niche: 'Maker & DIY', country: 'GB', description: 'Handmade leathercraft, custom wallets, and antique hand tool restoration.', videoCount: 26 },
    { id: 'diy_06', title: 'CircuitSmith', handle: '@circuitsmith', subscribers: 2900, niche: 'Maker & DIY', country: 'US', description: 'ESP32 robotics gadgets, soldering tutorials, and custom printed circuit boards.', videoCount: 31 },
    { id: 'diy_07', title: 'MapleMakerspace', handle: '@maplemakerspace', subscribers: 5600, niche: 'Maker & DIY', country: 'CA', description: 'Laser cutting and epoxy resin desk art fabrication.', videoCount: 42 },
    // 10k - 100k
    { id: 'diy_08', title: 'CraftyBuilderSam', handle: '@craftybuildersam', subscribers: 34000, niche: 'Maker & DIY', country: 'US', description: 'Modern farmhouse furniture builds and pocket hole joinery for beginners.', videoCount: 68 },
    { id: 'diy_09', title: 'TheRestorationShed', handle: '@therestorationshed', subscribers: 78000, niche: 'Maker & DIY', country: 'GB', description: 'Satisfying rusty tool restorations and vintage machinery reconditioning.', videoCount: 54 },
    { id: 'diy_10', title: 'OzMakerLab', handle: '@ozmakerlab', subscribers: 42000, niche: 'Maker & DIY', country: 'AU', description: 'Custom off-grid campervan conversions and solar electrical setups.', videoCount: 49 },
    // 100k - 500k
    { id: 'diy_11', title: 'FourPenceWorkshop', handle: '@fourpenceworkshop', subscribers: 240000, niche: 'Maker & DIY', country: 'GB', description: 'Traditional joinery techniques combined with contemporary industrial metalwork.', videoCount: 82 },
    { id: 'diy_12', title: 'Blacktail Studio', handle: '@blacktailstudio', subscribers: 2500000, niche: 'Maker & DIY', country: 'US', description: 'Live edge epoxy river tables, flattening slabs, and wood finish tests.', videoCount: 160 },
    // 500k - 2M
    { id: 'diy_13', title: 'BourbonMothWoodworking', handle: '@bourbonmoth', subscribers: 1250000, niche: 'Maker & DIY', country: 'US', description: 'Humorous, relatable fine woodworking projects with step-by-step masterclasses.', videoCount: 160 },
    // 2M - 10M
    { id: 'diy_14', title: 'BlacktailStudio', handle: '@blacktailstudio', subscribers: 2850000, niche: 'Maker & DIY', country: 'US', description: 'High-end artisan hardwood furniture making with candid narration on making mistakes.', videoCount: 190 },
    // 10M+
    { id: 'diy_markrober', title: 'Mark Rober', handle: '@MarkRober', subscribers: 61200000, niche: 'Maker & DIY', country: 'US', description: 'Former NASA & Apple engineer. Glitter bomb traps, squirrel obstacle courses, and engineering madness.', videoCount: 145 },
    { id: 'diy_colinfurze', title: 'colinfurze', handle: '@colinfurze', subscribers: 12900000, niche: 'Maker & DIY', country: 'GB', description: 'Crazy British inventions: underground bunker, jet engine bicycles, and extreme home engineering.', videoCount: 390 },
    { id: 'diy_hacksmith', title: 'Hacksmith Industries', handle: '@thehacksmith', subscribers: 14900000, niche: 'Maker & DIY', country: 'CA', description: 'We turn fictional movie gadgets into real functioning prototypes: lightsabers, exoskeletons, and shields.', videoCount: 520 }
  ],

  'Film & VFX': [
    // 0 - 1k
    { id: 'film_01', title: 'IndieCinephile', handle: '@indiecinephile', subscribers: 730, niche: 'Film & VFX', country: 'US', description: 'Short film cinematography breakdowns, natural lighting tips for beginners.', videoCount: 19 },
    { id: 'film_02', title: 'LondonGradeLab', handle: '@londongradelab', subscribers: 890, niche: 'Film & VFX', country: 'GB', description: 'DaVinci Resolve color grading node trees and Kodak film emulation tests.', videoCount: 24 },
    { id: 'film_03', title: 'AussieFilmer', handle: '@aussiefilmer', subscribers: 510, niche: 'Film & VFX', country: 'AU', description: 'Micro-budget filmmaking, Sony FX30 rig walk-throughs in Melbourne.', videoCount: 16 },
    // 1k - 10k
    { id: 'film_04', title: 'davidgrim', handle: '@davidgrim', subscribers: 5400, niche: 'Film & VFX', country: 'US', description: 'Cinematic color grading in DaVinci Resolve, lighting breakdowns and camera settings.', videoCount: 41 },
    { id: 'film_05', title: 'CineVisualsLab', handle: '@cinevisualslab', subscribers: 8300, niche: 'Film & VFX', country: 'GB', description: 'Blender 3D VFX breakdown, CGI compositing, and short film production diaries.', videoCount: 37 },
    { id: 'film_06', title: 'NorthernFrames', handle: '@northernframes', subscribers: 3900, niche: 'Film & VFX', country: 'CA', description: 'Anamorphic lens adapters, budget audio gear, and gimbal stabilization moves.', videoCount: 29 },
    { id: 'film_07', title: 'GoldCoastCine', handle: '@goldcoastcine', subscribers: 6100, niche: 'Film & VFX', country: 'AU', description: 'Documentary interviewing techniques and location sound recording.', videoCount: 35 },
    // 10k - 100k
    { id: 'film_08', title: 'VFXApprentice', handle: '@vfxapprentice', subscribers: 38000, niche: 'Film & VFX', country: 'US', description: 'Unreal Engine 5 virtual production, green screen lighting, and tracking.', videoCount: 62 },
    { id: 'film_09', title: 'BritishCinematographer', handle: '@britishcinematographer', subscribers: 64000, niche: 'Film & VFX', country: 'GB', description: 'Mastering depth of field, narrative lighting ratios, and vintage glass.', videoCount: 77 },
    { id: 'film_10', title: 'PacificStorytellers', handle: '@pacificstorytellers', subscribers: 49000, niche: 'Film & VFX', country: 'CA', description: 'Premiere Pro editing pacing, sound design transitions, and B-roll theory.', videoCount: 58 },
    // 100k - 500k
    { id: 'film_11', title: 'InDepthCine', handle: '@indepthcine', subscribers: 410000, niche: 'Film & VFX', country: 'AU', description: 'Analytical breakdowns of legendary directors, camera equipment, and film history.', videoCount: 110 },
    { id: 'film_12', title: 'FilmRiotArchive', handle: '@filmriotarchive', subscribers: 320000, niche: 'Film & VFX', country: 'US', description: 'DIY action movie stunts, squib effects, and practical monster makeup.', videoCount: 145 },
    // 500k - 2M
    { id: 'film_13', title: 'StudioBinder', handle: '@studiobinder', subscribers: 1680000, niche: 'Film & VFX', country: 'US', description: 'Definitive visual essays explaining screenwriting rules, shot types, and blocking.', videoCount: 280 },
    // 2M - 10M
    { id: 'film_14', title: 'CorridorCrew', handle: '@corridorcrew', subscribers: 6400000, niche: 'Film & VFX', country: 'US', description: 'VFX artists react to Hollywood bad and great CGI, stuntman reactions, and renders.', videoCount: 560 },
    // 10M+
    { id: 'film_zachking', title: 'Zach King', handle: '@ZachKing', subscribers: 35800000, niche: 'Film & VFX', country: 'US', description: 'Digital sleight of hand, visual effects illusion magic, and mind-bending short films.', videoCount: 420 },
    { id: 'film_dudeperfect', title: 'Dude Perfect', handle: '@DudePerfect', subscribers: 60500000, niche: 'Film & VFX', country: 'US', description: 'Trick shots, stereotypes, battles, bottle flips, and clean high-energy entertainment.', videoCount: 410 }
  ],

  'Music': [
    // 0 - 1k
    { id: 'mus_01', title: 'BedroomLofiLab', handle: '@bedroomlofilab', subscribers: 410, niche: 'Music', country: 'US', description: 'Sampling jazz vinyl on SP-404 mk2, cassette tape saturation beat making.', videoCount: 16 },
    { id: 'mus_02', title: 'CamdenSongsmith', handle: '@camdensongsmith', subscribers: 720, niche: 'Music', country: 'GB', description: 'Acoustic singer-songwriter originals and guitar chord progression lessons.', videoCount: 28 },
    { id: 'mus_03', title: 'MelbourneMelody', handle: '@melbournemelody', subscribers: 630, niche: 'Music', country: 'AU', description: 'Indie pop songwriting vlogs and vocal production in Logic Pro.', videoCount: 21 },
    // 1k - 10k
    { id: 'mus_04', title: 'journtales', handle: '@journtales', subscribers: 1100, niche: 'Music', country: 'US', description: 'Lo-fi beat production, analog synth jam sessions, and Ableton Live workflows.', videoCount: 22 },
    { id: 'mus_05', title: 'AcousticNook', handle: '@acousticnook', subscribers: 4900, niche: 'Music', country: 'CA', description: 'Fingerstyle guitar arrangements of movie themes and vocal harmonies.', videoCount: 50 },
    { id: 'mus_06', title: 'TapeLoopUK', handle: '@tapeloopuk', subscribers: 8400, niche: 'Music', country: 'GB', description: 'Ambient music tape loops, generative modular synth patches.', videoCount: 44 },
    { id: 'mus_07', title: 'AussieBassForge', handle: '@aussiebassforge', subscribers: 6800, niche: 'Music', country: 'AU', description: 'Bass guitar groove tutorials, slap bass techniques, and funk charts.', videoCount: 39 },
    // 10k - 100k
    { id: 'mus_08', title: 'SynthManiaUSA', handle: '@synthmaniausa', subscribers: 35000, niche: 'Music', country: 'US', description: 'Vintage 80s synthesizers, drum machine history, and patch sound design.', videoCount: 88 },
    { id: 'mus_09', title: 'LondonBeatmakers', handle: '@londonbeatmakers', subscribers: 72000, niche: 'Music', country: 'GB', description: 'UK Drill and Grime music production breakdown in FL Studio 21.', videoCount: 96 },
    { id: 'mus_10', title: 'MontrealVocalCoach', handle: '@montrealvocalcoach', subscribers: 58000, niche: 'Music', country: 'CA', description: 'Vocal warmups, belt training, and breath support exercises for singers.', videoCount: 67 },
    // 100k - 500k
    { id: 'mus_11', title: 'VenusTheory', handle: '@venustheory', subscribers: 340000, niche: 'Music', country: 'US', description: 'Sound design philosophies, dark ambient plugins, and experimental production.', videoCount: 135 },
    { id: 'mus_12', title: 'SignalsAudioLab', handle: '@signalsaudiolab', subscribers: 210000, niche: 'Music', country: 'CA', description: 'Heavy guitar mixing tutorials, amp simulation comparisons, and drum tone setup.', videoCount: 110 },
    // 500k - 2M
    { id: 'mus_13', title: 'AdamNeely', handle: '@adamneely', subscribers: 1780000, niche: 'Music', country: 'US', description: 'Music theory video essays, bass playing, jazz harmony concepts, and culture.', videoCount: 340 },
    // 2M - 10M
    { id: 'mus_14', title: 'RickBeato', handle: '@rickbeato', subscribers: 4300000, niche: 'Music', country: 'US', description: 'What Makes This Song Great series, ear training, rock history, and music legend interviews.', videoCount: 890 }
  ],

  'Cooking': [
    // 0 - 1k
    { id: 'cook_01', title: 'TinyKitchenMeals', handle: '@tinykitchenmeals', subscribers: 560, niche: 'Cooking', country: 'US', description: 'Single-serving comfort food recipes cooked in a tiny studio kitchen.', videoCount: 22 },
    { id: 'cook_02', title: 'YorkshireBaker', handle: '@yorkshirebaker', subscribers: 790, niche: 'Cooking', country: 'GB', description: 'Traditional English tea bakes, scones, crumpets, and fruit loaves.', videoCount: 29 },
    { id: 'cook_03', title: 'MelbourneBrunchAtHome', handle: '@melbournebrunchathome', subscribers: 430, niche: 'Cooking', country: 'AU', description: 'Recreating famous Australian cafe breakfasts: avo toast, flat whites, ricotta hotcakes.', videoCount: 18 },
    { id: 'cook_01b', title: 'RusticSkilletChef', handle: '@rusticskillet', subscribers: 720, niche: 'Cooking', country: 'US', description: 'Cast iron skillet cooking, southern comfort food, and homemade biscuits.', videoCount: 19 },
    { id: 'cook_01c', title: 'ChloeBakesVegan', handle: '@chloebakesvegan', subscribers: 840, niche: 'Cooking', country: 'US', description: 'Plant-based gluten-free desserts, vegan chocolate chip cookies, and sourdough.', videoCount: 27 },
    { id: 'cook_01d', title: 'NapaValleyPantry', handle: '@napavalleypantry', subscribers: 490, niche: 'Cooking', country: 'US', description: 'Farm to table seasonal cooking, herb gardens, and artisanal olive oil dressings.', videoCount: 15 },
    { id: 'cook_01e', title: 'QuickBiteAustin', handle: '@quickbiteaustin', subscribers: 620, niche: 'Cooking', country: 'US', description: 'Quick Texas street tacos, smoked salsa, and backyard grilling tutorials.', videoCount: 24 },
    { id: 'cook_02b', title: 'CotswoldKitchen', handle: '@cotswoldkitchen', subscribers: 880, niche: 'Cooking', country: 'GB', description: 'English countryside seasonal recipes, roast chicken, and apple crumbles.', videoCount: 21 },
    { id: 'cook_03b', title: 'SydneyGourmetAtHome', handle: '@sydneygourmet', subscribers: 530, niche: 'Cooking', country: 'AU', description: 'Crispy pork belly, homemade pasta noodles, and fresh Asian fusion dishes.', videoCount: 17 },
    { id: 'cook_03c', title: 'MontrealBakehouse', handle: '@montrealbakehouse', subscribers: 680, niche: 'Cooking', country: 'CA', description: 'Wood-fired bagels, French-Canadian tourtiere, and maple pastries.', videoCount: 23 },
    // 1k - 10k
    { id: 'cook_04', title: 'KitchenCraftsmen', handle: '@kitchencraftsmen', subscribers: 6100, niche: 'Cooking', country: 'US', description: 'Artisan sourdough baking, cast-iron skillet seasoning, and knife sharpening.', videoCount: 44 },
    { id: 'cook_05', title: 'SpicedPalette', handle: '@spicedpalette', subscribers: 3800, niche: 'Cooking', country: 'GB', description: 'Quick 20-minute weeknight dinners and balanced meal prep containers.', videoCount: 58 },
    { id: 'cook_06', title: 'MapleSyrupChef', handle: '@maplesyrupchef', subscribers: 7400, niche: 'Cooking', country: 'CA', description: 'Authentic Canadian poutine, Montreal smoked meat, and wild berry desserts.', videoCount: 36 },
    { id: 'cook_07', title: 'AussieBBQGrill', handle: '@aussiebbqgrill', subscribers: 5200, niche: 'Cooking', country: 'AU', description: 'Low and slow smoking, Australian brisket, lamb chops, and charcoal rubs.', videoCount: 42 },
    // 10k - 100k
    { id: 'cook_08', title: 'HomeCookMastery', handle: '@homecookmastery', subscribers: 48000, niche: 'Cooking', country: 'US', description: 'Culinary school fundamentals for everyday home cooks: mother sauces, searing.', videoCount: 82 },
    { id: 'cook_09', title: 'TheBritishTable', handle: '@thebritishtable', subscribers: 82000, niche: 'Cooking', country: 'GB', description: 'Sunday roasts, homemade gravy, beef wellington, and classic meat pies.', videoCount: 75 },
    { id: 'cook_10', title: 'SydneyBites', handle: '@sydneybites', subscribers: 36000, niche: 'Cooking', country: 'AU', description: 'Fresh seafood recipes, barramundi pan frying, and citrus marinades.', videoCount: 50 },
    // 100k - 500k
    { id: 'cook_11', title: 'Ethan Chlebowski', handle: '@EthanChlebowski', subscribers: 1950000, niche: 'Cooking', country: 'US', description: 'Food science experiments, testing cooking myths, and blind taste comparisons.', videoCount: 310 },
    { id: 'cook_12', title: 'SortedFoodShorts', handle: '@sortedfoodshorts', subscribers: 490000, niche: 'Cooking', country: 'GB', description: 'Chefs vs Normals kitchen gadgets, recipe taste tests, and food battles.', videoCount: 190 },
    // 500k - 2M
    { id: 'cook_13', title: 'NotAnotherCookingShow', handle: '@notanothercookingshow', subscribers: 1180000, niche: 'Cooking', country: 'US', description: 'Authentic Italian-American pastas, chicken parm, and high-energy cooking tips.', videoCount: 260 },
    // 2M - 10M
    { id: 'cook_14', title: 'BabiCooking', handle: '@babicooking', subscribers: 9400000, niche: 'Cooking', country: 'US', description: 'Recreating iconic foods from movies, television series, and anime with meticulous detail.', videoCount: 480 },
    // 10M+
    { id: 'cook_gordon', title: 'Gordon Ramsay', handle: '@gordonramsay', subscribers: 20900000, niche: 'Cooking', country: 'GB', description: 'MasterChef, Hell’s Kitchen, Kitchen Nightmares, simple home recipes, and chef masterclasses.', videoCount: 1500 },
    { id: 'cook_nick', title: 'Nick DiGiovanni', handle: '@NickDiGiovanni', subscribers: 18600000, niche: 'Cooking', country: 'US', description: 'MasterChef finalist breaking Guinness World Records and crafting delicious culinary creations.', videoCount: 480 }
  ],

  'Fitness': [
    // 0 - 1k
    { id: 'fit_01', title: 'GarageGymStarter', handle: '@garagegymstarter', subscribers: 620, niche: 'Fitness', country: 'US', description: 'Budget barbell workouts, rack building in a garage, and beginner squats.', videoCount: 20 },
    { id: 'fit_02', title: 'LondonRunClub', handle: '@londonrunclub', subscribers: 840, niche: 'Fitness', country: 'GB', description: 'Couch to 5K progression, running posture drills, and marathon prep logs.', videoCount: 26 },
    { id: 'fit_03', title: 'AussieKettlebell', handle: '@aussiekettlebell', subscribers: 470, niche: 'Fitness', country: 'AU', description: 'Kettlebell swings, Turkish get-ups, and functional core endurance training.', videoCount: 19 },
    // 1k - 10k
    { id: 'fit_04', title: 'CalisthenicsForge', handle: '@calisthenicsforge', subscribers: 7400, niche: 'Fitness', country: 'US', description: 'Bodyweight training progressions: first pull-up, dips, handstands, and mobility.', videoCount: 63 },
    { id: 'fit_05', title: 'PaceRunner', handle: '@pacerunner', subscribers: 2600, niche: 'Fitness', country: 'AU', description: 'Marathon training diaries, running shoe comparisons, and zone 2 heart rate runs.', videoCount: 35 },
    { id: 'fit_06', title: 'UKMobilityLab', handle: '@ukmobilitylab', subscribers: 5900, niche: 'Fitness', country: 'GB', description: 'Desk posture correction, hip flexor opening routines, and sciatica relief.', videoCount: 48 },
    { id: 'fit_07', title: 'GreatWhiteNorthLift', handle: '@greatwhitenorthlift', subscribers: 8300, niche: 'Fitness', country: 'CA', description: 'Powerlifting meet prep, deadlift form checks, and heavy bench cues.', videoCount: 52 },
    // 10k - 100k
    { id: 'fit_08', title: 'MovementByDavidMini', handle: '@movementbydavidmini', subscribers: 65000, niche: 'Fitness', country: 'US', description: 'Stay flexible tutorials, ankle mobility, splits progression, and joint health.', videoCount: 95 },
    { id: 'fit_09', title: 'BritishBodybuilder', handle: '@britishbodybuilder', subscribers: 42000, niche: 'Fitness', country: 'GB', description: 'Hypertrophy science, training till failure, and high protein meal prep.', videoCount: 71 },
    { id: 'fit_10', title: 'SydneyCrossfitHub', handle: '@sydneycrossfithub', subscribers: 31000, niche: 'Fitness', country: 'AU', description: 'Olympic lifting technique, clean & jerk bar path, and WOD pacing strategies.', videoCount: 60 },
    // 100k - 500k
    { id: 'fit_11', title: 'EugeneTeoClips', handle: '@eugeneteoclips', subscribers: 290000, niche: 'Fitness', country: 'AU', description: 'Biomechanics, exercise adaptations to prevent joint wear, and back training.', videoCount: 140 },
    { id: 'fit_12', title: 'GeoffreyVeritySchofield', handle: '@geoffreyverityschofield', subscribers: 210000, niche: 'Fitness', country: 'US', description: 'No-nonsense natural bodybuilding, realistic timelines, and high volume programming.', videoCount: 160 },
    // 500k - 2M
    { id: 'fit_13', title: 'SeanNalewanyj', handle: '@seannalewanyj', subscribers: 1450000, niche: 'Fitness', country: 'CA', description: 'Debunking fitness myths, evidence-based lifting advice, and simple workout routines.', videoCount: 480 },
    // 2M - 10M
    { id: 'fit_14', title: 'JeffNippard', handle: '@jeffnippard', subscribers: 5300000, niche: 'Fitness', country: 'CA', description: 'Scientific fitness breakdowns, muscle activation analysis, and optimal nutrition guides.', videoCount: 390 },
    // 10M+
    { id: 'fit_heria', title: 'Chris Heria', handle: '@ChrisHeria', subscribers: 15300000, niche: 'Fitness', country: 'US', description: 'Calisthenics workout routines, street workout championship techniques, and body transformation.', videoCount: 380 },
    { id: 'fit_hybrid', title: 'Hybrid Calisthenics', handle: '@HybridCalisthenics', subscribers: 11200000, niche: 'Fitness', country: 'US', description: 'Wholesome, encouraging bodyweight fitness: you can do hard things and make great progress.', videoCount: 450 }
  ],

  'Finance': [
    // 0 - 1k
    { id: 'fin_01', title: 'BudgetWithBen', handle: '@budgetwithben', subscribers: 510, niche: 'Finance', country: 'US', description: 'Zero-based budgeting, debt snowball method, and paying off student loans.', videoCount: 18 },
    { id: 'fin_02', title: 'LondonFrugalLiving', handle: '@londonfrugalliving', subscribers: 820, niche: 'Finance', country: 'GB', description: 'Saving money in London, ISA investing, and grocery budgeting hacks.', videoCount: 25 },
    { id: 'fin_03', title: 'AussieSuperFund', handle: '@aussiesuperfund', subscribers: 670, niche: 'Finance', country: 'AU', description: 'Superannuation tips, ETF investing on ASX, and property market updates.', videoCount: 20 },
    // 1k - 10k
    { id: 'fin_04', title: 'DividendsDaily', handle: '@dividendsdaily', subscribers: 8800, niche: 'Finance', country: 'US', description: 'Index fund investing, dividend growth portfolio building, and Roth IRA strategies.', videoCount: 54 },
    { id: 'fin_05', title: 'FrugalPilot', handle: '@frugalpilot', subscribers: 3100, niche: 'Finance', country: 'US', description: 'Side hustle case studies, credit card rewards maximization, and FIRE movement.', videoCount: 39 },
    { id: 'fin_06', title: 'UKMoneyMatters', handle: '@ukmoneymatters', subscribers: 6400, niche: 'Finance', country: 'GB', description: 'Vanguard LifeStrategy funds, mortgage fixed rates, and national insurance advice.', videoCount: 46 },
    { id: 'fin_07', title: 'MapleMoneyPath', handle: '@maplemoneypath', subscribers: 4900, niche: 'Finance', country: 'CA', description: 'TFSA vs RRSP maximization, Canadian real estate trends, and XEQT investing.', videoCount: 38 },
    // 10k - 100k
    { id: 'fin_08', title: 'Preston Pysh', handle: '@prestonpysh', subscribers: 98000, niche: 'Finance', country: 'US', description: 'Central banking balance sheet analysis, value investing, and market liquidity cycles.', videoCount: 145 },
    { id: 'fin_09', title: 'DamienTalksMoneyUK', handle: '@damientalksmoneyuk', subscribers: 89000, niche: 'Finance', country: 'GB', description: 'Bite-sized UK macroeconomic news, interest rate updates, and pension strategies.', videoCount: 88 },
    { id: 'fin_10', title: 'AussieWealthCreator', handle: '@aussiewealthcreator', subscribers: 54000, niche: 'Finance', country: 'AU', description: 'Negative gearing explained, Australian dividend imputation credits, and passive income.', videoCount: 72 },
    // 100k - 500k
    { id: 'fin_11', title: 'Ben Felix', handle: '@BenFelixCSI', subscribers: 360000, niche: 'Finance', country: 'CA', description: 'Rational investing advice backed by financial literature and factor regression analysis.', videoCount: 110 },
    { id: 'fin_12', title: 'Mark Tilbury', handle: '@marktilbury', subscribers: 480000, niche: 'Finance', country: 'GB', description: 'Millionaire business advice, negotiating raises, and financial literacy humor.', videoCount: 195 },
    // 500k - 2M
    { id: 'fin_13', title: 'ThePlainBagel', handle: '@theplainbagel', subscribers: 1250000, niche: 'Finance', country: 'CA', description: 'Clear, level-headed personal finance education, stock market history, and economic analysis.', videoCount: 210 },
    // 2M - 10M
    { id: 'fin_14', title: 'GrahamStephan', handle: '@grahamstephan', subscribers: 4650000, niche: 'Finance', country: 'US', description: 'Real estate investing, financial independence, banking news, and frugal millionaire lifestyle.', videoCount: 820 },
    // 10M+
    { id: 'fin_ramit', title: 'I Will Teach You To Be Rich', handle: '@ramitsethi', subscribers: 11800000, niche: 'Finance', country: 'US', description: 'Money psychology, asking tough questions to couples, and designing your rich life.', videoCount: 620 }
  ],

  'Science': [
    // 0 - 1k
    { id: 'sci_01', title: 'AstroBackyardBio', handle: '@astrobackyardbio', subscribers: 640, niche: 'Science', country: 'US', description: 'Backyard telescope stargazing, identifying constellations, and lunar photos.', videoCount: 19 },
    { id: 'sci_02', title: 'OxfordBioNotes', handle: '@oxfordbionotes', subscribers: 880, niche: 'Science', country: 'GB', description: 'Molecular biology study guides, CRISPR genetic engineering explainers.', videoCount: 25 },
    { id: 'sci_03', title: 'OzFaunaScience', handle: '@ozfaunascience', subscribers: 490, niche: 'Science', country: 'AU', description: 'Native Australian wildlife biology, reptile ecology, and conservation.', videoCount: 16 },
    // 1k - 10k
    { id: 'sci_04', title: 'QuantumCurious', handle: '@quantumcurious', subscribers: 5900, niche: 'Science', country: 'US', description: 'Visual physics explanations, double slit experiment, and general relativity concepts.', videoCount: 32 },
    { id: 'sci_05', title: 'BioMicroscope', handle: '@biomicroscope', subscribers: 4300, niche: 'Science', country: 'GB', description: 'Exploring pond water microorganisms, tardigrades, and amoebas in 4K microscopy.', videoCount: 28 },
    { id: 'sci_06', title: 'NorthernGeology', handle: '@northerngeology', subscribers: 7100, niche: 'Science', country: 'CA', description: 'Rockhound expeditions, identifying minerals, and Canadian shield plate tectonics.', videoCount: 39 },
    { id: 'sci_07', title: 'CSIROStudentHub', handle: '@csirostudenthub', subscribers: 3500, niche: 'Science', country: 'AU', description: 'Renewable energy research, green hydrogen, and climate modeling.', videoCount: 30 },
    // 10k - 100k
    { id: 'sci_08', title: 'EverydayAstrophysics', handle: '@everydayastrophysics', subscribers: 42000, niche: 'Science', country: 'US', description: 'Black holes, James Webb Space Telescope discoveries, and exoplanet atmospheres.', videoCount: 58 },
    { id: 'sci_09', title: 'BritishChemistryLab', handle: '@britishchemistrylab', subscribers: 85000, niche: 'Science', country: 'GB', description: 'Fascinating chemical reactions, crystal growing timelapse, and organic synthesis.', videoCount: 76 },
    { id: 'sci_10', title: 'GreatBarrierReefSci', handle: '@greatbarrierreefsci', subscribers: 63000, niche: 'Science', country: 'AU', description: 'Marine biology expeditions, coral reef bleaching recovery, and sea turtle tracking.', videoCount: 49 },
    // 100k - 500k
    { id: 'sci_11', title: 'AlphaPhoenix', handle: '@alphaphoenix', subscribers: 320000, niche: 'Science', country: 'US', description: 'Hands-on physics experiments: measuring speed of light, Schlieren imaging.', videoCount: 92 },
    { id: 'sci_12', title: 'ChemistryTalks', handle: '@chemistrytalks', subscribers: 240000, niche: 'Science', country: 'CA', description: 'Deep dives into everyday elements, chemical warfare history, and radioactive isotopes.', videoCount: 84 },
    // 500k - 2M
    { id: 'sci_13', title: 'ActionLabShorts', handle: '@actionlabshorts', subscribers: 1950000, niche: 'Science', country: 'US', description: 'Mind-boggling physical experiments with vacuum chambers, aerogels, and laser cutters.', videoCount: 310 },
    // 2M - 10M
    { id: 'sci_14', title: 'Veritasium', handle: '@veritasium', subscribers: 8900000, niche: 'Science', country: 'AU', description: 'An element of truth: thought-provoking science and engineering investigations.', videoCount: 420 },
    // 10M+
    { id: 'sci_markrober', title: 'Mark Rober', handle: '@MarkRober', subscribers: 61200000, niche: 'Science', country: 'US', description: 'Former NASA & Apple engineer. Glitter bomb traps, elephant toothpaste world records, and science madness.', videoCount: 145 },
    { id: 'sci_kurzgesagt', title: 'Kurzgesagt – In a Nutshell', handle: '@kurzgesagt', subscribers: 23400000, niche: 'Science', country: 'DE', description: 'Videos explaining things with optimistic nihilism. Beautiful animation explaining quantum mechanics and universe.', videoCount: 220 }
  ],

  'Education': [
    // 0 - 1k
    { id: 'edu_01', title: 'MedSchoolJournals', handle: '@medschooljournals', subscribers: 650, niche: 'Education', country: 'US', description: 'First-year medical student anatomy flashcards, active recall techniques.', videoCount: 21 },
    { id: 'edu_02', title: 'OxfordHistoryNotes', handle: '@oxfordhistorynotes', subscribers: 840, niche: 'Education', country: 'GB', description: 'Tudor dynasty history lectures, primary source analysis for A-level students.', videoCount: 29 },
    { id: 'edu_03', title: 'MelbourneStudyVlog', handle: '@melbournestudyvlog', subscribers: 510, niche: 'Education', country: 'AU', description: 'Law school study with me sessions, Pomodoro technique, and exam prep.', videoCount: 18 },
    // 1k - 10k
    { id: 'edu_04', title: 'mia.creates', handle: '@mia.creates', subscribers: 3200, niche: 'Education', country: 'US', description: 'Notion productivity workflows, aesthetic digital planning, and study templates.', videoCount: 40 },
    { id: 'edu_05', title: 'PaperAndPens', handle: '@paperandpens', subscribers: 7100, niche: 'Education', country: 'CA', description: 'Language learning methods, Anki spaced repetition mastery, and notebook reviews.', videoCount: 46 },
    { id: 'edu_06', title: 'CambridgePhilosophy', handle: '@cambridgephilosophy', subscribers: 4800, niche: 'Education', country: 'GB', description: 'Ethics, epistemology, and thought experiments explained simply.', videoCount: 33 },
    { id: 'edu_07', title: 'AussieTeacherTips', handle: '@aussieteachertips', subscribers: 5900, niche: 'Education', country: 'AU', description: 'Classroom management strategies, lesson plan ideas, and student engagement.', videoCount: 38 },
    // 10k - 100k
    { id: 'edu_08', title: 'ProductiveScientist', handle: '@productivescientist', subscribers: 45000, niche: 'Education', country: 'US', description: 'PhD research organization, Zotero reference management, and scientific writing.', videoCount: 65 },
    { id: 'edu_09', title: 'HistoryBuffUK', handle: '@historybuffuk', subscribers: 78000, niche: 'Education', country: 'GB', description: 'World War II strategic battlefield maps, diplomacy, and forgotten heroes.', videoCount: 82 },
    { id: 'edu_10', title: 'VancouverTutor', handle: '@vancouvertutor', subscribers: 62000, niche: 'Education', country: 'CA', description: 'Calculus made easy, derivative shortcuts, and linear algebra visual intuition.', videoCount: 70 },
    // 100k - 500k
    { id: 'edu_11', title: 'JustinSung', handle: '@justinsung', subscribers: 420000, niche: 'Education', country: 'AU', description: 'Cognitive learning science, non-linear mind mapping, and overcoming rote memorization.', videoCount: 140 },
    { id: 'edu_12', title: 'Thomas Frank', handle: '@Thomasfrank', subscribers: 2900000, niche: 'Education', country: 'US', description: 'Productivity systems, Notion automation templates, and habit building.', videoCount: 220 },
    // 500k - 2M
    { id: 'edu_13', title: 'OverSimplifiedClips', handle: '@oversimplifiedclips', subscribers: 1300000, niche: 'Education', country: 'US', description: 'Animated, hilariously narrated recaps of major historical conflicts and revolutions.', videoCount: 85 },
    // 2M - 10M
    { id: 'edu_14', title: 'CrashCourse', handle: '@crashcourse', subscribers: 9100000, niche: 'Education', country: 'US', description: 'Fast-paced, animated educational courses covering biology, world history, and sociology.', videoCount: 950 },
    // 10M+
    { id: 'edu_teded', title: 'TED-Ed', handle: '@TEDEd', subscribers: 20200000, niche: 'Education', country: 'US', description: 'Lessons worth sharing: beautifully animated educational videos on history, riddles, science, and literature.', videoCount: 2400 }
  ],

  'Travel': [
    // 0 - 1k
    { id: 'trv_01', title: 'SoloBackpackerBen', handle: '@solobackpackerben', subscribers: 590, niche: 'Travel', country: 'US', description: 'Ultralight backpacking across Appalachian Trail, gear weight breakdown.', videoCount: 17 },
    { id: 'trv_02', title: 'ScotRailExplorer', handle: '@scotrailexplorer', subscribers: 840, niche: 'Travel', country: 'GB', description: 'Scenic train journeys through the Scottish Highlands on an off-peak budget.', videoCount: 26 },
    { id: 'trv_03', title: 'OutbackVagabond', handle: '@outbackvagabond', subscribers: 420, niche: 'Travel', country: 'AU', description: '4WD camping trips across the Red Centre and Flinders Ranges.', videoCount: 15 },
    // 1k - 10k
    { id: 'trv_04', title: 'WanderNorth', handle: '@wandernorth', subscribers: 6700, niche: 'Travel', country: 'US', description: 'Solo backpacking in US National Parks, permit booking guides, and freeze-dried meals.', videoCount: 37 },
    { id: 'trv_05', title: 'EuroDrifter', handle: '@eurodrifter', subscribers: 4500, niche: 'Travel', country: 'GB', description: 'Budget travel tips, Eurail pass itineraries across Eastern Europe, and hostel reviews.', videoCount: 48 },
    { id: 'trv_06', title: 'RockyMountainVagabond', handle: '@rockymountainvagabond', subscribers: 8200, niche: 'Travel', country: 'CA', description: 'Banff and Jasper hiking trails, alpine photography, and wildlife safety.', videoCount: 41 },
    { id: 'trv_07', title: 'TasmanTravels', handle: '@tasmantravels', subscribers: 5100, niche: 'Travel', country: 'AU', description: 'Exploring hidden beaches in Tasmania, road trips along Great Ocean Road.', videoCount: 33 },
    // 10k - 100k
    { id: 'trv_08', title: 'NomadicMattTravel', handle: '@nomadicmatttravel', subscribers: 78000, niche: 'Travel', country: 'US', description: 'Travel credit cards points redemption, round-the-world itineraries on $50 a day.', videoCount: 89 },
    { id: 'trv_09', title: 'WalesCoastPath', handle: '@walescoastpath', subscribers: 39000, niche: 'Travel', country: 'GB', description: 'Walking the 870-mile Wales coast path, wild camping, and village pubs.', videoCount: 55 },
    { id: 'trv_10', title: 'MelbourneToEverywhere', handle: '@melbournetoeverywhere', subscribers: 62000, niche: 'Travel', country: 'AU', description: 'Southeast Asia street food crawls, Bangkok hidden alleys, and flight deal tracking.', videoCount: 71 },
    // 100k - 500k
    { id: 'trv_11', title: 'GabrielTravelerClips', handle: '@gabrieltravelerclips', subscribers: 290000, niche: 'Travel', country: 'US', description: 'Unscripted, genuine walking tours through remote towns across Latin America and Asia.', videoCount: 220 },
    { id: 'trv_12', title: 'DownUnderOverland', handle: '@downunderoverland', subscribers: 380000, niche: 'Travel', country: 'AU', description: 'Toyota LandCruiser extreme off-road expeditions in the Australian Outback.', videoCount: 130 },
    // 500k - 2M
    { id: 'trv_13', title: 'EvaZuBeck', handle: '@evazubeck', subscribers: 1720000, niche: 'Travel', country: 'GB', description: 'Raw, solitary overland journeys through the world\'s most remote wilderness and mountains.', videoCount: 240 },
    // 2M - 10M
    { id: 'trv_14', title: 'KaraAndNate', handle: '@karaandnate', subscribers: 3900000, niche: 'Travel', country: 'US', description: 'Traveling to 100 countries, converted van living, and luxury first class flight reviews.', videoCount: 780 },
    // 10M+
    { id: 'trv_drew', title: 'Drew Binsky', handle: '@drewbinsky', subscribers: 14200000, niche: 'Travel', country: 'US', description: 'Visited every country in the world! Meeting the most unique people and cultures on Earth.', videoCount: 1300 }
  ],

  'Beauty': [
    // 0 - 1k
    { id: 'bty_01', title: 'MinimalSkincareLab', handle: '@minimalskincarelab', subscribers: 680, niche: 'Beauty', country: 'US', description: 'Affordable drugstore skincare routines for acne-prone skin.', videoCount: 20 },
    { id: 'bty_02', title: 'LondonCleanBeauty', handle: '@londoncleanbeauty', subscribers: 820, niche: 'Beauty', country: 'GB', description: 'Cruelty-free cosmetics swatch tests and British pharmacy finds.', videoCount: 26 },
    { id: 'bty_03', title: 'AussieSunGlow', handle: '@aussiesunglow', subscribers: 450, niche: 'Beauty', country: 'AU', description: 'Australian mineral SPF testing, lightweight tinted moisturisers.', videoCount: 18 },
    // 1k - 10k
    { id: 'bty_04', title: 'GlowAesthetic', handle: '@glowaesthetic', subscribers: 5300, niche: 'Beauty', country: 'US', description: 'Clean skincare ingredient breakdowns, ceramide barrier repair, and no-makeup makeup.', videoCount: 49 },
    { id: 'bty_05', title: 'LuxeCurls', handle: '@luxecurls', subscribers: 3900, niche: 'Beauty', country: 'GB', description: 'Curly girl method routines, diffuser techniques, and humidity-resistant gels.', videoCount: 34 },
    { id: 'bty_06', title: 'MapleGlamour', handle: '@mapleglamour', subscribers: 7800, niche: 'Beauty', country: 'CA', description: 'Winter skin hydration routines and cruelty-free lip oil comparisons.', videoCount: 42 },
    { id: 'bty_07', title: 'SydneyGlowArt', handle: '@sydneyglowart', subscribers: 6100, niche: 'Beauty', country: 'AU', description: 'Dewy bronzed summer makeup, sweatproof foundations for humid climates.', videoCount: 38 },
    // 10k - 100k
    { id: 'bty_08', title: 'Lisa Eldridge', handle: '@LisaEldridgeMakeup', subscribers: 2100000, niche: 'Beauty', country: 'GB', description: 'World-renowned pro makeup artist tutorials, beauty history, and red carpet looks.', videoCount: 260 },
    { id: 'bty_09', title: 'BritishMakeupArtist', handle: '@britishmakeupartist', subscribers: 67000, niche: 'Beauty', country: 'GB', description: 'Bridal makeup techniques, mature skin foundation matching, and lash lifts.', videoCount: 78 },
    { id: 'bty_10', title: 'TorontoSkincareJunkie', handle: '@torontoskincarejunkie', subscribers: 44000, niche: 'Beauty', country: 'CA', description: 'K-beauty sunscreen tests, peptide serums, and chemical peel recovery.', videoCount: 63 },
    // 100k - 500k
    { id: 'bty_11', title: 'DrAlexisStephens', handle: '@dralexisstephens', subscribers: 390000, niche: 'Beauty', country: 'US', description: 'Board-certified dermatologist advice on hyperpigmentation, melasma, and dark spots.', videoCount: 130 },
    { id: 'bty_12', title: 'AliAndreeaShorts', handle: '@aliandreeashorts', subscribers: 290000, niche: 'Beauty', country: 'GB', description: 'Celebrity makeup artist tips: concealer mistakes to avoid, hooded eye liner.', videoCount: 145 },
    // 500k - 2M
    { id: 'bty_13', title: 'LabMuffinBeautyScience', handle: '@labmuffinbeautyscience', subscribers: 1250000, niche: 'Beauty', country: 'AU', description: 'Science-backed cosmetic education debunking clean beauty fearmongering.', videoCount: 220 },
    // 2M - 10M
    { id: 'bty_14', title: 'Hyram', handle: '@hyram', subscribers: 4300000, niche: 'Beauty', country: 'US', description: 'Skincare specialist reviewing celebrity routines, ingredient analysis, and brand reviews.', videoCount: 410 },
    // 10M+
    { id: 'bty_james', title: 'James Charles', handle: '@jamescharles', subscribers: 23900000, niche: 'Beauty', country: 'US', description: 'Makeup artist tutorials, instant glam transformations, and creative cosmetics challenges.', videoCount: 460 },
    { id: 'bty_nikkie', title: 'NikkieTutorials', handle: '@NikkieTutorials', subscribers: 14500000, niche: 'Beauty', country: 'US', description: 'The Power of Makeup, full face transformations, and honest cosmetic reviews.', videoCount: 650 }
  ]
};

module.exports = {
  CURATED_NICHE_CHANNELS
};
