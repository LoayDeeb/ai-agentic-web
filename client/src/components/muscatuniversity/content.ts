export type MuProgramme = {
	id: string
	level: 'foundation' | 'diploma' | 'undergraduate' | 'postgraduate'
	title: string
	arTitle: string
	faculty: string
	highlight: string
	bestFor: string[]
}

export const MU_BRAND = {
	navy: '#0B2D42',
	teal: '#007A78',
	gold: '#C99A3E',
	plum: '#7B1F6F',
	grape: '#4A1F66',
	lime: '#A7C947',
	ink: '#102331',
	mist: '#F3F7F4',
	pearl: '#FFFDF8',
}

export const MU_PROGRAMMES: MuProgramme[] = [
	{
		id: 'general-foundation',
		level: 'foundation',
		title: 'General Foundation Programme',
		arTitle: 'برنامج التأسيس العام',
		faculty: 'Study at MU',
		highlight: 'A structured bridge into university study, English, academic skills, and mathematics.',
		bestFor: ['طلبة بعد الدبلوم العام', 'تقوية اللغة الإنجليزية', 'الانتقال للدراسة الجامعية'],
	},
	{
		id: 'bsc-data-ai',
		level: 'undergraduate',
		title: 'BSc Data Science and Artificial Intelligence',
		arTitle: 'بكالوريوس علوم البيانات والذكاء الاصطناعي',
		faculty: 'Faculty of Engineering and Technology',
		highlight: 'A technology path for students who want analytics, AI systems, and applied computing.',
		bestFor: ['الذكاء الاصطناعي', 'تحليل البيانات', 'وظائف التقنية'],
	},
	{
		id: 'beng-digital-software',
		level: 'undergraduate',
		title: 'BEng Digital and Software Engineering',
		arTitle: 'هندسة رقمية وبرمجيات',
		faculty: 'Faculty of Engineering and Technology',
		highlight: 'Software development and software management routes for future product and engineering teams.',
		bestFor: ['بناء التطبيقات', 'إدارة البرمجيات', 'هندسة المنتجات'],
	},
	{
		id: 'bsc-cybersecurity',
		level: 'undergraduate',
		title: 'BSc Cybersecurity and Cyber Forensics',
		arTitle: 'الأمن السيبراني والتحقيق الجنائي الرقمي',
		faculty: 'Faculty of Engineering and Technology',
		highlight: 'Security, forensics, and cyber resilience for students interested in digital protection.',
		bestFor: ['الأمن السيبراني', 'التحقيق الرقمي', 'حماية المؤسسات'],
	},
	{
		id: 'beng-energy',
		level: 'undergraduate',
		title: 'BEng Energy Engineering',
		arTitle: 'هندسة الطاقة',
		faculty: 'Faculty of Engineering and Technology',
		highlight: 'Energy engineering aligned with Oman Vision 2040 and the future of sustainable energy.',
		bestFor: ['الطاقة المتجددة', 'رؤية عمان ٢٠٤٠', 'الهندسة'],
	},
	{
		id: 'bsc-accounting-finance',
		level: 'undergraduate',
		title: 'BSc Accounting and Finance',
		arTitle: 'المحاسبة والمالية',
		faculty: 'Faculty of Business and Management',
		highlight: 'Finance and accounting with a strong professional pathway, including CFA-aligned positioning.',
		bestFor: ['المالية', 'المحاسبة', 'الشهادات المهنية'],
	},
	{
		id: 'bsc-logistics-supply-chain',
		level: 'undergraduate',
		title: 'BSc Logistics with Supply Chain Management',
		arTitle: 'اللوجستيات وإدارة سلاسل الإمداد',
		faculty: 'Faculty of Transport and Logistics',
		highlight: 'Transport, logistics, ports, and supply chain skills for Oman and GCC trade corridors.',
		bestFor: ['الموانئ', 'سلاسل الإمداد', 'النقل واللوجستيات'],
	},
	{
		id: 'mba-digital-innovation',
		level: 'postgraduate',
		title: 'MBA Digital Innovation Management',
		arTitle: 'ماجستير إدارة الأعمال في الابتكار الرقمي',
		faculty: 'Faculty of Business and Management',
		highlight: 'A postgraduate route for professionals moving into digital leadership.',
		bestFor: ['القيادة', 'التحول الرقمي', 'الإدارة'],
	},
	{
		id: 'msc-renewable-energy',
		level: 'postgraduate',
		title: 'MSc Renewable Energy Engineering',
		arTitle: 'ماجستير هندسة الطاقة المتجددة',
		faculty: 'Faculty of Engineering and Technology',
		highlight: 'Advanced study in renewable energy engineering for sustainability-focused careers.',
		bestFor: ['الطاقة المتجددة', 'الاستدامة', 'الدراسات العليا'],
	},
]

export const MU_PROGRAMME_OPTIONS = MU_PROGRAMMES.map((programme) => ({
	value: programme.id,
	label: programme.title,
}))

export function getMuProgramme(id?: string) {
	return MU_PROGRAMMES.find((programme) => programme.id === id)
}

export function inferMuStudyLevel(programmeId?: string) {
	const programme = getMuProgramme(programmeId)
	if (!programme) return ''
	return programme.level
}

export const MU_HEARD_FROM_OPTIONS = [
	{ value: 'website', label: 'Website' },
	{ value: 'instagram', label: 'Instagram Advertisement' },
	{ value: 'school-referral', label: 'School Referral' },
	{ value: 'university-open-day', label: 'University Open Day' },
	{ value: 'word-of-mouth', label: 'Word of Mouth' },
	{ value: 'internet-search', label: 'Internet Search' },
]
