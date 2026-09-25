// The existing team data stores role names in French.
export const teamRoles: Record<string, { en: string; fr: string; ar: string }> = Object.fromEntries([
  ['Président', 'President', 'الرئيس'],
  ['Vice-Président', 'Vice-President', 'نائب الرئيس'],
  ['Responsable Ressources Humaines', 'Human Resources Lead', 'مسؤولة الموارد البشرية'],
  ['Trésorière', 'Treasurer', 'أمينة المال'],
  ['Secrétaire Générale', 'General Secretary', 'الكاتبة العامة'],
  ['Responsable Média & Communication', 'Media & Communications Lead', 'مسؤول الإعلام والتواصل'],
  ['Responsable Design & Identité Visuelle', 'Design & Visual Identity Lead', 'مسؤول التصميم والهوية البصرية'],
  ['Responsable Montage Vidéo', 'Video Editing Lead', 'مسؤول مونتاج الفيديو'],
  ['Responsable Formation & Bootcamp', 'Training & Bootcamp Lead', 'مسؤول التكوين والمعسكرات التدريبية'],
  ['Responsable Rédaction & Contenu', 'Editorial & Content Lead', 'مسؤولة التحرير والمحتوى'],
  ['Responsable Sponsoring & Partenariats', 'Sponsorship & Partnerships Lead', 'مسؤولة الرعاية والشراكات'],
  ['Responsable Organisation & Événements', 'Organization & Events Lead', 'مسؤول التنظيم والفعاليات'],
  ['Responsable Compétitions', 'Competitions Lead', 'مسؤولة المسابقات'],
  ['Responsable Maison des Sciences', 'Science House Lead', 'مسؤولة دار العلوم'],
].map(([fr, en, ar]) => [fr, { en, fr, ar }]))
