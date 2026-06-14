// Utility for keyboard navigation
export function useKeyboardNavigation(items: any[], onSelect: (item: any) => void) {
  const [index, setIndex] = React.useState(0)
  
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setIndex(Math.max(0, index - 1))
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setIndex(Math.min(items.length - 1, index + 1))
      } else if (e.key === 'Enter') {
        onSelect(items[index])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index, items, onSelect])

  return index
}

// Generate unique IDs for accessibility
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}
