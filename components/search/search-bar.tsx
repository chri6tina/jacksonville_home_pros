'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline'

interface SearchSuggestion {
  id: string
  type: 'service' | 'provider' | 'location'
  name: string
  description?: string
}

const mockSuggestions: SearchSuggestion[] = [
  { id: '1', type: 'service', name: 'Plumbing', description: 'Faucet repair, drain cleaning' },
  { id: '2', type: 'service', name: 'Electrical', description: 'Wiring, lighting installation' },
  { id: '3', type: 'service', name: 'HVAC', description: 'Heating and cooling repair' },
  { id: '4', type: 'provider', name: 'Jacksonville Plumbing Pros', description: 'Licensed plumber' },
  { id: '5', type: 'provider', name: 'Coastal Electric Solutions', description: 'Electrical contractor' },
  { id: '6', type: 'location', name: 'Jacksonville Beach', description: 'Jacksonville, FL' },
  { id: '7', type: 'location', name: 'San Marco', description: 'Jacksonville, FL' },
  { id: '8', type: 'location', name: 'Riverside', description: 'Jacksonville, FL' },
]

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockSuggestions.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
    setSelectedIndex(-1)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex])
      } else {
        handleSearch()
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      inputRef.current?.blur()
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name)
    setShowSuggestions(false)
    
    // Navigate based on suggestion type
    switch (suggestion.type) {
      case 'service':
        router.push(`/search?service=${encodeURIComponent(suggestion.name)}`)
        break
      case 'provider':
        router.push(`/providers/${suggestion.id}`)
        break
      case 'location':
        router.push(`/search?location=${encodeURIComponent(suggestion.name)}`)
        break
    }
  }

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setShowSuggestions(false)
    }
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'service':
        return '🔧'
      case 'provider':
        return '🏢'
      case 'location':
        return '📍'
      default:
        return '🔍'
    }
  }

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for services, providers, or locations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setShowSuggestions(true)}
          className="w-full pl-12 pr-16 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none placeholder-neutral-500"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 z-50 max-h-80 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors ${
                index === selectedIndex ? 'bg-primary-50 border-l-4 border-primary-500' : ''
              } ${index === 0 ? 'rounded-t-lg' : ''} ${
                index === suggestions.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getSuggestionIcon(suggestion.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-neutral-900 truncate">
                    {suggestion.name}
                  </div>
                  {suggestion.description && (
                    <div className="text-sm text-neutral-500 truncate">
                      {suggestion.description}
                    </div>
                  )}
                </div>
                <div className="text-xs text-neutral-400 uppercase tracking-wide">
                  {suggestion.type}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      
    </div>
  )
} 