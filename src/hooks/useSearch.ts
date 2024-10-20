import { useState, useEffect } from 'react'
import { Dream } from '@/lib/constants'
import { searchDreams } from '@/lib/loadData'

export const useSearch = () => {
  const [query, setQuery] = useState<string>('')
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false)
  const [filteredDreams, setFilteredDreams] = useState<Dream[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true

    const fetchDreams = async () => {
      if (query) {
        setLoading(true)
        try {
          const filtered = await searchDreams(query)
          if (isMounted) {
            setFilteredDreams(filtered)
            setDropdownVisible(true)
          }
        } catch (error) {
          console.error('Error fetching dreams:', error)
        } finally {
          if (isMounted) setLoading(false)
        }
      } else {
        setFilteredDreams([])
        setDropdownVisible(false)
      }
    }

    fetchDreams()

    return () => {
      isMounted = false
    }
  }, [query])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setDropdownVisible(false)
    }, 200)
  }

  const handleFocus = () => {
    if (filteredDreams.length > 0) {
      setDropdownVisible(true)
    }
  }

  return {
    query,
    isDropdownVisible,
    filteredDreams: filteredDreams,
    loading,
    setQuery,
    setDropdownVisible,
    handleInputChange,
    handleBlur,
    handleFocus,
  }
}
