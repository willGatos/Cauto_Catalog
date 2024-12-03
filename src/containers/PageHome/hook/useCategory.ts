import { useState, useMemo } from "react"
import { Category } from "../lib/mock-data"

export function useCategories(categories: Category[]) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const mainCategories = useMemo(() => {
    return categories.filter(category => category.parent_id === 1)
  }, [categories])

  const subcategories = useMemo(() => {
    if (!selectedCategoryId) return []
    return categories.filter(category => category.parent_id === selectedCategoryId)
  }, [categories, selectedCategoryId])

  return {
    selectedCategoryId,
    setSelectedCategoryId,
    mainCategories,
    subcategories,
  }
}
