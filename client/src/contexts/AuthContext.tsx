import React, { createContext, useContext, useState, useEffect } from 'react'

type AuthContextType = {
	isAuthenticated: boolean
	user: { username: string; tin?: string } | null
	login: (username: string, password: string) => Promise<boolean>
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState<{ username: string; tin?: string } | null>(null)

	// Check if user is logged in on mount
	useEffect(() => {
		const storedUser = localStorage.getItem('zatca.user')
		if (storedUser) {
			try {
				const userData = JSON.parse(storedUser)
				setUser(userData)
				setIsAuthenticated(true)
			} catch (e) {
				localStorage.removeItem('zatca.user')
			}
		}
	}, [])

	const login = async (username: string, password: string): Promise<boolean> => {
		// In production, validate against backend
		// For demo, any credentials work
		console.log('[Auth] Login attempt:', username)
		
		const userData = {
			username,
			tin: username.startsWith('3') ? username : undefined
		}
		
		setUser(userData)
		setIsAuthenticated(true)
		localStorage.setItem('zatca.user', JSON.stringify(userData))
		
		return true
	}

	const logout = () => {
		setUser(null)
		setIsAuthenticated(false)
		localStorage.removeItem('zatca.user')
		console.log('[Auth] Logged out')
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}
	return context
}








