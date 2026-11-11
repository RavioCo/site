/**
 * RAVIO Editorial Content & Replaceable Campaign Imagery Registry
 * Step 08 — Brand Story (/our-story), The RAVIO Standard (/the-ravio-standard), and Brand Philosophy (/philosophy)
 *
 * Strictly adheres to the approved RAVIO brand foundation:
 * - Zero invented founder biographies, company histories, manufacturing claims, or achievements.
 * - Uses approved brand philosophy and mission verbatim.
 * - Centralizes campaign placeholder imagery so official brand photography can be swapped in one place.
 */

export interface EditorialImageAsset {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  aspectRatio: '21/9' | '16/9' | '4/5' | '3/4' | '1/1';
  placeholderSlotName: string;
}

/**
 * Centralized Campaign Image Registry
 * Replace `src` values here when official RAVIO campaign photography is delivered.
 */
export const EDITORIAL_CAMPAIGN_IMAGES: Record<string, EditorialImageAsset> = {
  ourStoryHero: {
    id: 'our-story-hero',
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2400&q=85',
    alt: 'Minimalist architectural light and draped natural textiles representing the quiet discipline of RAVIO',
    caption: 'Campaign Visual Placeholder · Slot: OUR_STORY_HERO_21_9',
    aspectRatio: '21/9',
    placeholderSlotName: 'OUR_STORY_HERO_21_9',
  },
  ourStoryPerspective: {
    id: 'our-story-perspective',
    src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1400&q=85',
    alt: 'Quiet study of proportion and natural shadow in morning daylight',
    caption: 'Editorial Portrait Placeholder · Slot: OUR_STORY_PERSPECTIVE_4_5',
    aspectRatio: '4/5',
    placeholderSlotName: 'OUR_STORY_PERSPECTIVE_4_5',
  },
  ourStoryElevation: {
    id: 'our-story-elevation',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85',
    alt: 'Restrained silhouette and calm spatial composition illustrating Elevation Refined',
    caption: 'Editorial Study Placeholder · Slot: OUR_STORY_ELEVATION_3_4',
    aspectRatio: '3/4',
    placeholderSlotName: 'OUR_STORY_ELEVATION_3_4',
  },
  ourStoryPanorama: {
    id: 'our-story-panorama',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    alt: 'Warm architectural interior with calm natural stone and quiet daylight',
    caption: 'Full-Width Campaign Placeholder · Slot: OUR_STORY_PANORAMA_16_9',
    aspectRatio: '16/9',
    placeholderSlotName: 'OUR_STORY_PANORAMA_16_9',
  },
  standardHero: {
    id: 'standard-hero',
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2400&q=85',
    alt: 'Calm studio composition reflecting order, restraint, and the principles of The RAVIO Standard',
    caption: 'Campaign Visual Placeholder · Slot: STANDARD_HERO_21_9',
    aspectRatio: '21/9',
    placeholderSlotName: 'STANDARD_HERO_21_9',
  },
  standardDetailPrimary: {
    id: 'standard-detail-primary',
    src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85',
    alt: 'Close study of textile surface, structure, and balanced proportion',
    caption: 'Editorial Study Placeholder · Slot: STANDARD_DETAIL_PRIMARY_4_5',
    aspectRatio: '4/5',
    placeholderSlotName: 'STANDARD_DETAIL_PRIMARY_4_5',
  },
  standardDetailSecondary: {
    id: 'standard-detail-secondary',
    src: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=85',
    alt: 'Clean tailoring lines and quiet structural discipline in natural light',
    caption: 'Editorial Study Placeholder · Slot: STANDARD_DETAIL_SECONDARY_1_1',
    aspectRatio: '1/1',
    placeholderSlotName: 'STANDARD_DETAIL_SECONDARY_1_1',
  },
  philosophyHero: {
    id: 'philosophy-hero',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    alt: 'Serene architectural space with warm ivory light and quiet shadow',
    caption: 'Campaign Visual Placeholder · Slot: PHILOSOPHY_HERO_21_9',
    aspectRatio: '21/9',
    placeholderSlotName: 'PHILOSOPHY_HERO_21_9',
  },
  philosophyStudyOne: {
    id: 'philosophy-study-one',
    src: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1400&q=85',
    alt: 'Understated garment study in warm neutral light',
    caption: 'Editorial Study Placeholder · Slot: PHILOSOPHY_STUDY_01_3_4',
    aspectRatio: '3/4',
    placeholderSlotName: 'PHILOSOPHY_STUDY_01_3_4',
  },
  philosophyStudyTwo: {
    id: 'philosophy-study-two',
    src: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1400&q=85',
    alt: 'Quiet study of natural form, fold, and deliberate stillness',
    caption: 'Editorial Study Placeholder · Slot: PHILOSOPHY_STUDY_02_4_5',
    aspectRatio: '4/5',
    placeholderSlotName: 'PHILOSOPHY_STUDY_02_4_5',
  },
};

/**
 * Approved Brand Copy Constants
 */
export const APPROVED_BRAND_COPY = {
  name: 'RAVIO',
  company: 'Ravio & Co.',
  tagline: 'ELEVATION REFINED.',
  philosophy:
    'We believe refinement is a lifelong pursuit. Not of perfection, but of progress. The quiet decision to choose better. To think deeper. To live with intention. Because ordinary things deserve more care, more thought, and higher standards. To elevate what already exists.',
  mission:
    'To create products and experiences that earn trust through quality, intention, and enduring value.',
} as const;

export interface StandardPrinciple {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  lead: string;
  body: string;
  reflection: string;
}

/**
 * The 6 Principles of The RAVIO Standard
 * Treated strictly as brand principles rather than unsupported product or manufacturing claims.
 */
export const RAVIO_STANDARD_PRINCIPLES: StandardPrinciple[] = [
  {
    number: '01',
    id: 'quality',
    title: 'Quality',
    subtitle: 'A Standard Held Without Compromise',
    lead: 'Quality is the foundation upon which trust is earned, never assumed.',
    body: 'As a guiding principle, quality means refusing shortcuts that diminish longevity or integrity. It asks that every decision—from initial concept to final presentation—be measured against a higher expectation of substance and care.',
    reflection: 'Choosing better begins with respecting what a thing is meant to do and how it is meant to endure.',
  },
  {
    number: '02',
    id: 'intention',
    title: 'Intention',
    subtitle: 'Purpose Before Addition',
    lead: 'Nothing should exist merely for noise, excess, or momentary distraction.',
    body: 'Intention requires clarity of thought before action. When we approach design and experience with deliberate purpose, we remove the unnecessary so that what remains feels calm, resolved, and meaningful.',
    reflection: 'To live and create with intention is to value depth over volume.',
  },
  {
    number: '03',
    id: 'thoughtful-design',
    title: 'Thoughtful Design',
    subtitle: 'Clarity of Form & Proportion',
    lead: 'Design is an act of consideration toward the person who lives with an object every day.',
    body: 'Thoughtful design does not compete for attention. Instead, it honors balance, quiet proportion, and ease of use. It looks closely at the familiar forms of daily life and asks how they can be made more considered.',
    reflection: 'True restraint is achieved when nothing needs to be added and nothing needs to be explained.',
  },
  {
    number: '04',
    id: 'craftsmanship',
    title: 'Craftsmanship',
    subtitle: 'Respect for Discipline & Care',
    lead: 'Craftsmanship is an attitude of patience, precision, and attentiveness.',
    body: 'As a principle of the house, craftsmanship means honoring the quiet details that often go unnoticed at first glance—the alignment of an edge, the composure of a line, and the care invested in what lies beneath the surface.',
    reflection: 'Because ordinary things deserve more care, more thought, and higher standards.',
  },
  {
    number: '05',
    id: 'enduring-value',
    title: 'Enduring Value',
    subtitle: 'Permanence Over Passing Novelty',
    lead: 'Value is measured across time, not by the urgency of a single season.',
    body: 'We believe in creating for the long term. Enduring value arises when quality and restraint work together—yielding pieces and experiences that remain relevant, dignified, and trusted long after fleeting trends subside.',
    reflection: 'What is chosen with care today should continue to reward that choice tomorrow.',
  },
  {
    number: '06',
    id: 'continuous-refinement',
    title: 'Continuous Refinement',
    subtitle: 'The Quiet Pursuit of Progress',
    lead: 'Refinement is not a destination reached once; it is an ongoing discipline.',
    body: 'We do not view refinement as a claim of perfection, but as a commitment to progress. Each step is an opportunity to look closer, think deeper, and elevate what already exists with humility and resolve.',
    reflection: 'Not of perfection, but of progress. The quiet decision to choose better.',
  },
];

export interface PhilosophyPillar {
  index: string;
  id: string;
  phrase: string;
  title: string;
  essay: string[];
}

export const PHILOSOPHY_MOVEMENTS: PhilosophyPillar[] = [
  {
    index: 'I',
    id: 'lifelong-pursuit',
    phrase: '“We believe refinement is a lifelong pursuit. Not of perfection, but of progress.”',
    title: 'Progress Over Perfection',
    essay: [
      'Perfection is static; it implies an endpoint where curiosity stops. Progress, by contrast, is alive, observant, and receptive to continual improvement.',
      'At RAVIO, refinement is understood as a daily practice. It lives in the willingness to examine familiar habits and objects closely, asking how each decision can be approached with greater clarity and care.',
    ],
  },
  {
    index: 'II',
    id: 'quiet-decision',
    phrase: '“The quiet decision to choose better. To think deeper. To live with intention.”',
    title: 'The Quiet Decision',
    essay: [
      'Meaningful choices rarely announce themselves loudly. They happen in quiet moments of discernment—when we favor substance over spectacle, and permanence over impulse.',
      'Thinking deeper means looking beyond surface impressions. Living with intention means surrounding ourselves with fewer, more considered things that align with our standards.',
    ],
  },
  {
    index: 'III',
    id: 'ordinary-things',
    phrase: '“Because ordinary things deserve more care, more thought, and higher standards.”',
    title: 'Dignity in the Everyday',
    essay: [
      'The objects and garments we reach for every day shape the texture of our lives far more than what is reserved for rare occasions. Yet the everyday is often treated as an afterthought.',
      'We hold the opposite view: what accompanies you daily deserves the highest standard of consideration, restraint, and respect.',
    ],
  },
  {
    index: 'IV',
    id: 'elevate-what-exists',
    phrase: '“To elevate what already exists.”',
    title: 'Elevation Refined',
    essay: [
      'We do not seek invention for the sake of novelty. The foundational forms of a wardrobe and a life already exist.',
      'Our purpose is to refine them—bringing discipline, calm proportion, and enduring value to the essentials you already know and trust.',
    ],
  },
];
