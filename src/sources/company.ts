import { liveCompanies } from '../data/liveCompanies'
import { mockCompanies } from '../data/mockCompanies'
import type { Company } from '../types'

export function getCompany(companyId: string): Company | undefined {
  return liveCompanies[companyId] ?? mockCompanies[companyId]
}

export function getAllCompanies(): Record<string, Company> {
  return { ...mockCompanies, ...liveCompanies }
}
