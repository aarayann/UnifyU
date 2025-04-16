
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Calendar } from '@/components/ui/calendar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CalendarIcon, 
  MapPin, 
  Clock, 
  Filter, 
  Tag, 
  Search
} from 'lucide-react';

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: string;
  description: string;
  image: string;
}

export default function LiveCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Mock categories derived from events
  const categories = ['Academic', 'Cultural', 'Sports', 'Workshop'];

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
  
      if (error) {
        console.error('Supabase Error:', error.message);
        setError('Failed to load events.');
      } else {
        console.log('Fetched Events:', data);
        setEvents(data);
      }
      setLoading(false);
    };
  
    fetchEvents();
  }, []);

  // Filter events based on search query, selected date, and category
  const filteredEvents = events.filter(event => {
    // Filter by search query
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected date if any
    const eventDate = new Date(event.date);
    const matchesDate = selectedDate 
      ? eventDate.toDateString() === selectedDate.toDateString()
      : true;
    
    // Filter by category if not "all"
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    
    return matchesSearch && matchesDate && matchesCategory;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'academic': return 'bg-blue-500';
      case 'cultural': return 'bg-purple-500';
      case 'sports': return 'bg-green-500';
      case 'workshop': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#244855] mx-auto mb-4"></div>
        <p className="text-lg text-[#244855]">Loading events...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
      <p className="text-red-700 text-lg">{error}</p>
      <Button 
        onClick={() => window.location.reload()} 
        variant="outline" 
        className="mt-4 border-red-300 text-red-700 hover:bg-red-50"
      >
        Try Again
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-[#244855] mb-2">Event Calendar</h2>
      <p className="text-gray-600 mb-8">Browse upcoming and past events at Bennett University</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filter sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Selection */}
              <div>
                <h3 className="text-sm font-medium mb-2">Select Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md"
                />
                {selectedDate && (
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2 text-sm"
                    onClick={() => setSelectedDate(undefined)}
                  >
                    Clear Date
                  </Button>
                )}
              </div>
              
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  Category
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="cat-all" 
                      name="category" 
                      value="all" 
                      checked={categoryFilter === 'all'}
                      onChange={() => setCategoryFilter('all')}
                      className="mr-2"
                    />
                    <label htmlFor="cat-all">All Categories</label>
                  </div>
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input 
                        type="radio" 
                        id={`cat-${category}`} 
                        name="category" 
                        value={category}
                        checked={categoryFilter === category}
                        onChange={() => setCategoryFilter(category)}
                        className="mr-2"
                      />
                      <label htmlFor={`cat-${category}`}>
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getCategoryColor(category)}`}></span>
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Events listing */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl">Events</CardTitle>
                <CardDescription>
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                </CardDescription>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant={view === 'grid' ? 'default' : 'outline'}
                  size="sm" 
                  onClick={() => setView('grid')}
                  className="h-8 w-8 p-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </Button>
                <Button 
                  variant={view === 'list' ? 'default' : 'outline'}
                  size="sm" 
                  onClick={() => setView('list')}
                  className="h-8 w-8 p-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No events found</h3>
                  <p className="text-gray-500">Try changing your filters or search query</p>
                </div>
              ) : view === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="bg-white rounded-lg overflow-hidden border shadow-sm transition-shadow hover:shadow-md">
                      <div className="relative h-40">
                        <img
                          src={event.image || 'https://via.placeholder.com/300x200?text=Event'}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 m-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <span className={`px-2 py-1 rounded-full text-xs text-white ${getCategoryColor(event.category)}`}>
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>{formatDate(event.date)}</span>
                          <Clock className="ml-2 mr-1 h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{event.description}</p>
                        <Button variant="outline" size="sm" className="w-full">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="relative min-w-[80px] w-20 h-20 rounded-md overflow-hidden">
                        <img
                          src={event.image || 'https://via.placeholder.com/80x80?text=E'}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium truncate">{event.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mb-1">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          <span>{formatDate(event.date)}</span>
                          <span className="mx-1">•</span>
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${getCategoryColor(event.category)}`}>
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
