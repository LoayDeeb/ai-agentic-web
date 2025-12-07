import { create } from 'zustand'
import i18n from '../i18n'

type LocaleState = {
	lang: 'ar' | 'en'
	dir: 'rtl' | 'ltr'
	switchLanguage: (lang?: 'ar' | 'en') => void
}

export const useLocaleStore = create<LocaleState>((set, get) => ({
	lang: (localStorage.getItem('app.lang') as 'ar' | 'en') || 'en',
	dir: (localStorage.getItem('app.lang') || 'en') === 'ar' ? 'rtl' : 'ltr',
	switchLanguage: (lang) => {
		const current = get().lang
		const next = lang ?? (current === 'en' ? 'ar' : 'en')
		const dir = next === 'ar' ? 'rtl' : 'ltr'
		localStorage.setItem('app.lang', next)
		document.documentElement.lang = next
		document.documentElement.dir = dir
		i18n.changeLanguage(next)
		set({ lang: next, dir })
	}
}))


