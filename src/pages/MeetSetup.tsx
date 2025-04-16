import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Calendar,
  Video,
  UserPlus,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  Clock,
  CalendarDays,
  Users,
  FileText,
} from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  room_name: string;
  meeting_date: string;
  duration: number;
  participants?: string[];
  agenda?: string;
  created_at: string;
}

export default function MeetSetup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDuration, setMeetingDuration] = useState("60"); // default 60 minutes
  const [participants, setParticipants] = useState("");
  const [agenda, setAgenda] = useState("");
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetDialogOpen, setMeetDialogOpen] = useState(false);
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<Record<string, boolean>>({});
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }
      
      // Get user email
      const { data: userData } = await supabase
        .from('login_users')
        .select('email')
        .eq('uid', user.id)
        .single();
        
      if (userData && userData.email) {
        setUserEmail(userData.email);
      }
      
      // Get meetings
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('creator_id', user.id)
        .order('meeting_date', { ascending: true });
        
      if (error) {
        console.error('Error fetching meetings:', error);
        toast.error('Failed to load meetings');
      } else {
        setMeetings(data || []);
      }
      
      setLoading(false);
    };
    
    fetchMeetings();
  }, [navigate]);

  const createMeeting = async () => {
    // Validate form
    if (!meetingTitle || !meetingDate || !meetingTime || !meetingDuration) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      // Generate a unique room name based on title and random string
      const randomString = Math.random().toString(36).substring(2, 10);
      const sanitizedTitle = meetingTitle
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      const roomName = `${sanitizedTitle}-${randomString}`;
      
      // Parse participants
      const participantList = participants
        ? participants.split(',').map(p => p.trim()).filter(p => p)
        : [];
        
      // Combine date and time
      const dateTime = `${meetingDate}T${meetingTime}:00`;
      
      // Insert meeting
      const { data, error } = await supabase
        .from('meetings')
        .insert({
          creator_id: user.id,
          title: meetingTitle,
          room_name: roomName,
          meeting_date: dateTime,
          duration: parseInt(meetingDuration),
          participants: participantList.length > 0 ? participantList : null,
          agenda: agenda || null
        })
        .select();
        
      if (error) throw error;
      
      toast.success('Meeting created successfully');
      
      // Reset form
      setMeetingTitle("");
      setMeetingDate("");
      setMeetingTime("");
      setMeetingDuration("60");
      setParticipants("");
      setAgenda("");
      
      // Refresh meetings list
      if (data && data[0]) {
        setMeetings(prev => [...prev, data[0]]);
      }
      
    } catch (error: any) {
      console.error('Error creating meeting:', error);
      toast.error(error.message || 'Failed to create meeting');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteMeeting = async (meetingId: string) => {
    setDeleting(prev => ({ ...prev, [meetingId]: true }));
    
    try {
      const { error } = await supabase
        .from('meetings')
        .delete()
        .eq('id', meetingId);
        
      if (error) throw error;
      
      toast.success('Meeting deleted successfully');
      setMeetings(prev => prev.filter(m => m.id !== meetingId));
      
    } catch (error: any) {
      console.error('Error deleting meeting:', error);
      toast.error(error.message || 'Failed to delete meeting');
    } finally {
      setDeleting(prev => ({ ...prev, [meetingId]: false }));
    }
  };

  const openMeeting = (meeting: Meeting) => {
    setActiveMeeting(meeting);
    setMeetDialogOpen(true);
  };

  const copyMeetingLink = (roomName: string) => {
    const link = `https://meet.jit.si/${roomName}`;
    navigator.clipboard.writeText(link);
    toast.success('Meeting link copied to clipboard');
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isPastMeeting = (dateTimeString: string) => {
    const meetingDate = new Date(dateTimeString);
    const now = new Date();
    return meetingDate < now;
  };

  const isUpcomingMeeting = (meeting: Meeting) => {
    const meetingDate = new Date(meeting.meeting_date);
    const now = new Date();
    
    // Calculate end time
    const endTime = new Date(meetingDate);
    endTime.setMinutes(endTime.getMinutes() + meeting.duration);
    
    return meetingDate > now || endTime > now;
  };

  const renderJitsiMeet = (roomName: string) => {
    const domain = 'meet.jit.si';
    
    // Load the Jitsi Meet external API script
    if (!document.getElementById('jitsi-api')) {
      const script = document.createElement('script');
      script.id = 'jitsi-api';
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        initializeMeeting(domain, roomName);
      };
    } else {
      initializeMeeting(domain, roomName);
    }
    
    // Return a placeholder div that will be populated by Jitsi
    return (
      <div 
        id="jitsi-container" 
        ref={jitsiContainerRef} 
        className="w-full h-[500px] bg-gray-100 rounded flex items-center justify-center"
      >
        <div className="text-center">
          <div className="mb-4 animate-spin rounded-full h-12 w-12 border-b-2 border-[#244855] mx-auto"></div>
          <p>Loading meeting interface...</p>
        </div>
      </div>
    );
  };

  const initializeMeeting = (domain: string, roomName: string) => {
    // Ensure the container is available
    if (!jitsiContainerRef.current) return;
    
    // Clear previous content
    jitsiContainerRef.current.innerHTML = '';
    
    try {
      // @ts-ignore - JitsiMeetExternalAPI is loaded from external script
      const jitsiAPI = new JitsiMeetExternalAPI(domain, {
        roomName: roomName,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: userEmail || 'UnifyU User'
        },
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        }
      });
    } catch (err) {
      console.error('Error initializing Jitsi API:', err);
      if (jitsiContainerRef.current) {
        jitsiContainerRef.current.innerHTML = `
          <div class="flex flex-col items-center justify-center h-full bg-gray-100 rounded">
            <p class="text-red-500">Failed to load meeting interface</p>
            <a href="https://meet.jit.si/${roomName}" target="_blank" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
              Join in new tab
            </a>
          </div>
        `;
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-[#244855] mb-2">Meet Setup</h1>
      <p className="text-gray-600 mb-8">Create and manage virtual meetings</p>
      
      <Tabs defaultValue="schedule">
        <TabsList className="mb-8">
          <TabsTrigger value="schedule">Schedule Meeting</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Meetings</TabsTrigger>
          <TabsTrigger value="past">Past Meetings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-[#244855]" />
                Create New Meeting
              </CardTitle>
              <CardDescription>
                Schedule a new virtual meeting and invite participants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-title">Meeting Title *</Label>
                  <Input
                    id="meeting-title"
                    value={meetingTitle}
                    onChange={e => setMeetingTitle(e.target.value)}
                    placeholder="Enter meeting title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meeting-duration">Duration (minutes) *</Label>
                  <Input
                    id="meeting-duration"
                    type="number"
                    min="15"
                    max="240"
                    value={meetingDuration}
                    onChange={e => setMeetingDuration(e.target.value)}
                    placeholder="Meeting duration in minutes"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-date">Date *</Label>
                  <Input
                    id="meeting-date"
                    type="date"
                    value={meetingDate}
                    onChange={e => setMeetingDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meeting-time">Time *</Label>
                  <Input
                    id="meeting-time"
                    type="time"
                    value={meetingTime}
                    onChange={e => setMeetingTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="participants">Participants (comma-separated emails)</Label>
                <Input
                  id="participants"
                  value={participants}
                  onChange={e => setParticipants(e.target.value)}
                  placeholder="participant1@example.com, participant2@example.com"
                />
                <p className="text-xs text-gray-500">
                  Enter email addresses separated by commas. Participants will need to be sent the link manually.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="agenda">Agenda/Notes (optional)</Label>
                <Textarea
                  id="agenda"
                  value={agenda}
                  onChange={e => setAgenda(e.target.value)}
                  placeholder="Enter meeting agenda or notes"
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={createMeeting} 
                disabled={submitting}
                className="bg-[#244855] hover:bg-[#1a363f]"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#244855] flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Your Upcoming Meetings
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#244855]"></div>
              </div>
            ) : meetings.filter(isUpcomingMeeting).length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-1">No upcoming meetings</h3>
                  <p className="text-gray-500 text-center mb-6 max-w-md">
                    You don't have any upcoming meetings scheduled.
                  </p>
                  <Button onClick={() => document.querySelector('[value="schedule"]')?.dispatchEvent(new Event('click'))}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Meeting
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meetings
                  .filter(isUpcomingMeeting)
                  .sort((a, b) => new Date(a.meeting_date).getTime() - new Date(b.meeting_date).getTime())
                  .map(meeting => (
                    <Card key={meeting.id} className="overflow-hidden">
                      <div className="bg-[#244855]/10 px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <Video className="h-5 w-5 text-[#244855] mr-2" />
                          <h3 className="font-medium text-[#244855] truncate" title={meeting.title}>
                            {meeting.title}
                          </h3>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => copyMeetingLink(meeting.room_name)}
                            className="h-8 w-8"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteMeeting(meeting.id)}
                            disabled={deleting[meeting.id]}
                          >
                            {deleting[meeting.id] ? (
                              <div className="animate-spin h-4 w-4 border-2 border-b-transparent border-red-600 rounded-full"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 text-gray-500 mt-1 mr-2" />
                            <div>
                              <p className="text-sm font-medium">{formatDateTime(meeting.meeting_date)}</p>
                              <p className="text-xs text-gray-500">{meeting.duration} minutes</p>
                            </div>
                          </div>
                          
                          {meeting.participants && meeting.participants.length > 0 && (
                            <div className="flex items-start">
                              <Users className="h-4 w-4 text-gray-500 mt-1 mr-2" />
                              <div className="text-sm text-gray-600">
                                {meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                          )}
                          
                          {meeting.agenda && (
                            <div className="flex items-start">
                              <FileText className="h-4 w-4 text-gray-500 mt-1 mr-2" />
                              <p className="text-sm text-gray-600 line-clamp-2">{meeting.agenda}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between">
                        <p className="text-xs text-gray-500">
                          Created {new Date(meeting.created_at).toLocaleDateString()}
                        </p>
                        <Button 
                          onClick={() => openMeeting(meeting)} 
                          className="bg-[#244855] hover:bg-[#1a363f]"
                          size="sm"
                        >
                          <Video className="mr-1 h-3 w-3" />
                          Join Meeting
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Past Meetings
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#244855]"></div>
              </div>
            ) : meetings.filter(m => !isUpcomingMeeting(m)).length === 0 ? (
              <Card className="border-dashed bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-1">No past meetings</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    You haven't had any meetings yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {meetings
                  .filter(m => !isUpcomingMeeting(m))
                  .sort((a, b) => new Date(b.meeting_date).getTime() - new Date(a.meeting_date).getTime())
                  .map(meeting => (
                    <Card key={meeting.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="mb-3 md:mb-0">
                            <h3 className="font-medium flex items-center">
                              <Video className="h-4 w-4 text-gray-500 mr-2" />
                              {meeting.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDateTime(meeting.meeting_date)} • {meeting.duration} minutes
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => deleteMeeting(meeting.id)}
                              disabled={deleting[meeting.id]}
                            >
                              {deleting[meeting.id] ? (
                                <div className="animate-spin h-4 w-4 border-2 border-b-transparent border-red-600 rounded-full"></div>
                              ) : (
                                <>
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  <span>Delete</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Meeting Dialog */}
      <Dialog open={meetDialogOpen} onOpenChange={setMeetDialogOpen}>
        <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{activeMeeting?.title || 'Join Meeting'}</DialogTitle>
            <DialogDescription>
              {activeMeeting && formatDateTime(activeMeeting.meeting_date)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-grow" id="meet">
            {activeMeeting && renderJitsiMeet(activeMeeting.room_name)}
          </div>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setMeetDialogOpen(false)}>
              Close
            </Button>
            {activeMeeting && (
              <Button 
                className="gap-2"
                onClick={() => window.open(`https://meet.jit.si/${activeMeeting.room_name}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
