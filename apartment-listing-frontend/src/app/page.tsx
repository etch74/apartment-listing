"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Loader2, Search } from 'lucide-react'
import AddApartmentModal from './components/AddApartmentModal'
import ApartmentCard from './components/ApartmentCard'
import ExpandedApartmentView from './components/ExpandedApartmentView'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const fetchAllApartments = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/apartments')
    return response.data
  } catch (error) {
    console.error('Error fetching apartments:', error)
    return []
  }
}

const fetchApartmentById = async (id: string) => {
 
    const response = await axios.get(`http://localhost:5000/api/apartments/${id}`)
    console.log(response.data)
    return response.data
  
}

export default function Home() {
  const [apartments, setApartments] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchId, setSearchId] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [expandedApartment, setExpandedApartment] = useState(null)

  useEffect(() => {
    const loadApartments = async () => {
      setLoading(true)
      const data = await fetchAllApartments()
      setApartments(data)
      setLoading(false)
    }

    loadApartments()
  }, [])

  const handleAddApartment = (newApartment) => {
    setApartments((prevApartments) => [...prevApartments, newApartment])
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    const result =!searchId.trim()? null : await fetchApartmentById(searchId)
    console.log(result)
    setSearchResult(result)
    setLoading(false)
  }

  const handleExpandApartment = (apartment) => {
    setExpandedApartment(apartment)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Apartment Listings</h1>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Apartment
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <Input
            type="text"
            placeholder="Search apartment by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search
          </Button>
        </form>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : searchResult ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ApartmentCard apartment={searchResult} onClick={() => handleExpandApartment(searchResult)} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {apartments.length > 0 ? (
              apartments.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} onClick={() => handleExpandApartment(apartment)} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-lg">No apartments available</p>
            )}
          </div>
        )}
      </main>

      <AddApartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddApartment}
      />

      {expandedApartment && (
        <ExpandedApartmentView
          apartment={expandedApartment}
          isOpen={!!expandedApartment}
          onClose={() => setExpandedApartment(null)} imageUrl={''}        />
      )}
    </div>
  )
}

