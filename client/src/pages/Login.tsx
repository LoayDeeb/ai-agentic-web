import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ZATCALoginPortal } from '../components/ZATCALogin'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
	const navigate = useNavigate()
	const location = useLocation()
	const { isAuthenticated, login } = useAuth()
	
	// Redirect if already logged in
	useEffect(() => {
		if (isAuthenticated) {
			const from = (location.state as any)?.from?.pathname || '/services'
			navigate(from, { replace: true })
		}
	}, [isAuthenticated, navigate, location])

	const handleLogin = async (username: string, password: string) => {
		const success = await login(username, password)
		if (success) {
			const from = (location.state as any)?.from?.pathname || '/services'
			navigate(from, { replace: true })
		}
	}

	return (
		<ZATCALoginPortal
			onLogin={handleLogin}
			onIAMLogin={() => {
				console.log('IAM Login clicked')
				// In production, redirect to IAM then call login on callback
			}}
			onForgotPassword={() => {
				console.log('Forgot password clicked')
			}}
			onRegister={(type) => {
				console.log('Register clicked:', type)
			}}
		/>
	)
}

