import React from 'react'
import { create } from 'zustand'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const DURATION_SHORT = 3000
const DURATION_MEDIUM = 5000
const DURATION_LONG = 7000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toastTimeouts = new Map()

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    useToastStore.setState((state) => ({
      toasts: state.toasts.filter((t) => t.id !== toastId),
    }))
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const useToastStore = create((set, get) => ({
  toasts: [],
  addToast: (toast) => {
    const id = genId()
    set((state) => ({
      toasts: [
        ...state.toasts.slice(0, TOAST_LIMIT - 1),
        {
          id,
          ...toast,
        },
      ],
    }))
    addToRemoveQueue(id)
    return id
  },
  updateToast: (id, toast) =>
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, ...toast } : t)),
    })),
  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id
          ? {
              ...t,
              open: false,
            }
          : t
      ),
    }))
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))

function toast({ ...props }) {
  return useToastStore.getState().addToast(props)
}

function useToast() {
  const state = useToastStore()

  return {
    ...state,
    toast,
    dismiss: state.dismissToast,
  }
}

export { useToast, toast, DURATION_SHORT, DURATION_MEDIUM, DURATION_LONG }
