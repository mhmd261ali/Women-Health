// Sample blog data for Sanity import
// Use this as a reference for creating blog content in Sanity Studio

export const sampleCategories = [
  {
    title: 'Breastfeeding',
    slug: { current: 'breastfeeding' },
    description: 'Expert guidance on breastfeeding, latching, milk supply, and nursing support.',
    color: '#D4756A',
  },
  {
    title: 'Sports & Fitness',
    slug: { current: 'sports' },
    description: 'Training tips, workout routines, and athletic performance for women.',
    color: '#8A9E84',
  },
  {
    title: 'Health & Wellness',
    slug: { current: 'health' },
    description: 'Holistic health, nutrition, hormones, and preventative care.',
    color: '#E8776F',
  },
  {
    title: 'Physiotherapy',
    slug: { current: 'physiotherapy' },
    description: 'Rehabilitation, injury recovery, and therapeutic exercises.',
    color: '#748D6E',
  },
  {
    title: 'Postpartum Recovery',
    slug: { current: 'recovery' },
    description: 'Safe recovery after childbirth, pelvic floor health, and new mother support.',
    color: '#C4605A',
  },
  {
    title: 'Nutrition',
    slug: { current: 'nutrition' },
    description: 'Nutritional guidance, meal planning, and dietary wellness.',
    color: '#D4756A',
  },
];

export const sampleAuthor = {
  name: 'Dr. Sarah',
  slug: { current: 'dr-sarah' },
  bio: 'Certified Personal Trainer, Licensed Physiotherapist, and Breastfeeding Specialist with 8+ years of experience in women\'s health.',
};

export const samplePosts = [
  {
    title: 'The Complete Guide to Safe Postpartum Fitness',
    slug: { current: 'safe-postpartum-fitness' },
    excerpt:
      'Learn how to safely return to exercise after childbirth with proper progressions and pelvic floor awareness.',
    categories: ['Postpartum Recovery', 'Fitness'],
    publishedAt: new Date('2024-12-15').toISOString(),
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'When Can You Start Exercising?' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Many new mothers are eager to return to their pre-pregnancy fitness routine, but it\'s important to progress safely. Here\'s what you need to know.',
          },
        ],
      },
    ],
  },
  {
    title: 'Solving Common Breastfeeding Challenges',
    slug: { current: 'breastfeeding-challenges' },
    excerpt:
      'Solutions for latching issues, engorgement, nipple pain, and low milk supply with evidence-based techniques.',
    categories: ['Breastfeeding'],
    publishedAt: new Date('2024-12-10').toISOString(),
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Understanding Latch' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A proper latch is the foundation of comfortable breastfeeding. Here are the key signs of a good latch...',
          },
        ],
      },
    ],
  },
  {
    title: 'Pelvic Floor Health: Why Every Woman Should Care',
    slug: { current: 'pelvic-floor-health' },
    excerpt:
      'Comprehensive guide to pelvic floor function, common issues, and exercises to improve strength and resilience.',
    categories: ['Physiotherapy', 'Health & Wellness'],
    publishedAt: new Date('2024-12-05').toISOString(),
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'What is the Pelvic Floor?' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The pelvic floor is a group of muscles that support your bladder, uterus, and bowel. These muscles work hard throughout your life...',
          },
        ],
      },
    ],
  },
  {
    title: 'Nutrition for Breastfeeding Mothers',
    slug: { current: 'nutrition-breastfeeding' },
    excerpt: 'Essential nutrients, hydration, and foods to support milk production and postpartum recovery.',
    categories: ['Nutrition', 'Breastfeeding'],
    publishedAt: new Date('2024-11-28').toISOString(),
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Caloric Needs' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Breastfeeding mothers need about 500 additional calories per day compared to their pre-pregnancy needs...',
          },
        ],
      },
    ],
  },
  {
    title: 'Returning to High-Impact Exercise After Birth',
    slug: { current: 'high-impact-exercise' },
    excerpt:
      'A phased approach to safely return to running, jumping, and other high-impact activities postpartum.',
    categories: ['Fitness', 'Postpartum Recovery'],
    publishedAt: new Date('2024-11-20').toISOString(),
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'The Progressive Return' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Returning to high-impact exercise requires a careful, progressive approach. Let\'s break down the phases...',
          },
        ],
      },
    ],
  },
  {
    title: 'Managing Diastasis Recti: Exercises and Recovery',
    slug: { current: 'diastasis-recti' },
    excerpt:
      'Understanding abdominal separation after pregnancy and proven exercises for safe and effective healing.',
    categories: ['Physiotherapy', 'Postpartum Recovery'],
    publishedAt: new Date('2024-11-12').toISOString(),
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'What is Diastasis Recti?' }],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Diastasis recti abdominis (DRA) is the separation of the two sides of the abdominal rectus muscles during pregnancy...',
          },
        ],
      },
    ],
  },
];
