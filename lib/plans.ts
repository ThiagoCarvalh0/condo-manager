export type Plan = "starter" | "pro" | "enterprise" | "trial"

export interface PlanFeatures {
  maxUnits: number
  maxCondominios: number
  financialManagement: boolean
  residentApp: boolean
  advancedReports: boolean
  accessControl: boolean
  bankIntegration: boolean
  customApi: boolean
  support: "email" | "priority" | "24/7"
}

export const planFeatures: Record<Plan, PlanFeatures> = {
  trial: {
    maxUnits: 10,
    maxCondominios: 1,
    financialManagement: true,
    residentApp: false,
    advancedReports: false,
    accessControl: false,
    bankIntegration: false,
    customApi: false,
    support: "email",
  },
  starter: {
    maxUnits: 50,
    maxCondominios: 1,
    financialManagement: true,
    residentApp: false,
    advancedReports: false,
    accessControl: false,
    bankIntegration: false,
    customApi: false,
    support: "email",
  },
  pro: {
    maxUnits: 200,
    maxCondominios: 5,
    financialManagement: true,
    residentApp: true,
    advancedReports: true,
    accessControl: true,
    bankIntegration: true,
    customApi: false,
    support: "priority",
  },
  enterprise: {
    maxUnits: Number.POSITIVE_INFINITY,
    maxCondominios: Number.POSITIVE_INFINITY,
    financialManagement: true,
    residentApp: true,
    advancedReports: true,
    accessControl: true,
    bankIntegration: true,
    customApi: true,
    support: "24/7",
  },
}

export function hasFeature(plan: Plan | null, feature: keyof PlanFeatures): boolean {
  if (!plan) return false
  return Boolean(planFeatures[plan][feature])
}

export function getMaxValue(plan: Plan | null, feature: "maxUnits" | "maxCondominios"): number {
  if (!plan) return 0
  return planFeatures[plan][feature]
}
