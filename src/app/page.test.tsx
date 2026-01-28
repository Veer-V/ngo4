import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Page from './page'
import { redirect } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}))

describe('Page', () => {
    it('redirects to dashboard', () => {
        render(<Page />)
        expect(redirect).toHaveBeenCalledWith('/dashboard')
    })
})
