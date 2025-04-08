import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Event = {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  status: string
  description: string
  image: string
}

export default function LiveCalendar() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
  
      if (error) {
        console.error('Supabase Error:', error.message)
        setError('Failed to load events.')
      } else {
        console.log('Fetched Events:', data)
        setEvents(data)
      }
      setLoading(false)
    }
  
    fetchEvents()
  }, [])
  
  if (loading) return <p className="text-center mt-4">Loading calendar...</p>
  if (error) return <p className="text-red-600 text-center mt-4">{error}</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Live Calendar</h2>
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="bg-white shadow-md rounded-lg p-4 border">
            <div className="flex items-center gap-4">
              <img
                src={event.image}
                alt={event.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date} | {event.time}</p>
                <p className="text-sm text-gray-500">{event.location}</p>
                <p className="text-sm text-blue-600 font-medium">{event.category} | {event.status}</p>
              </div>
            </div>
            <p className="mt-2 text-gray-700">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
