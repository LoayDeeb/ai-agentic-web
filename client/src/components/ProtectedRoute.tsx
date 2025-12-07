import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type ProtectedRouteProps = {
	children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated) {
		// Redirect to login if not authenticated
		return <Navigate to="/login" replace />
	}

	return <>{children}</>
}








