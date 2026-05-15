import { create } from 'zustand'
import { mockPlants, mockAlerts } from '../data/mockData'
import { getPlants, getAlerts } from '../services/api'

const useAppStore = create((set, get) => ({
  // ─── App State ────────────────────────────────────────
  hasOnboarded: localStorage.getItem('flv_onboarded') === 'true',
  currentPage: 'dashboard',
  theme: 'forest',

  // ─── Plants ───────────────────────────────────────────
  plants: mockPlants,
  plantsLoading: false,
  plantsError: null,

  // ─── Alerts ───────────────────────────────────────────
  alerts: mockAlerts,
  resolvedAlerts: [],

  // ─── Diagnosis ────────────────────────────────────────
  diagnosisResult: null,
  diagnosisLoading: false,

  // ─── Actions ──────────────────────────────────────────
  completeOnboarding: () => {
    localStorage.setItem('flv_onboarded', 'true')
    set({ hasOnboarded: true })
  },

  setPage: (page) => set({ currentPage: page }),

  setDiagnosisResult: (result) => set({ diagnosisResult: result }),
  setDiagnosisLoading: (loading) => set({ diagnosisLoading: loading }),

  fetchPlants: async () => {
    set({ plantsLoading: true })
    try {
      const res = await getPlants()
      if (res.data && res.data.length > 0) {
        set({ plants: res.data, plantsError: null })
      }
    } catch {
      // Use mock data when backend isn't reachable
      set({ plants: mockPlants })
    } finally {
      set({ plantsLoading: false })
    }
  },

  addPlantLocal: (plant) =>
    set((state) => ({ plants: [plant, ...state.plants] })),

  removePlantLocal: (id) =>
    set((state) => ({ plants: state.plants.filter((p) => String(p.id) !== String(id)) })),

  fetchAlerts: async () => {
    try {
      const res = await getAlerts()
      if (res.data && res.data.length > 0) {
        // Merge backend alerts with mock static alerts
        const backendAlerts = res.data.map((a, i) => ({
          id: `b${i}`,
          type: 'watering',
          urgency: 'high',
          plant_name: a.plant_name,
          message: a.alert,
          time: 'Now',
          icon: '💧',
        }))
        set((state) => ({ alerts: [...backendAlerts, ...state.alerts] }))
      }
    } catch {
      // Keep mock alerts
    }
  },

  resolveAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
      resolvedAlerts: [...state.resolvedAlerts, id],
    })),

  setTheme: (theme) => set({ theme }),
}))

export default useAppStore
