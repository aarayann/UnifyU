
import { useState, useEffect } from "react";
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
import { toast } from "sonner";
import {
  Search,
  MessageSquare,
  UserCircle,
  ArrowLeft,
  RotateCcw,
  MessageSquareOff,
} from "lucide-react";

interface Forum {
  id: string;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
  replies_count: number;
  is_archived: boolean;
}

export default function ArchivedForums() {
  const navigate = useNavigate();
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [unarchiving, setUnarchiving] = useState<Record<string, boolean>>({});

  const fetchForums = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    // Get all archived forums
    const { data, error } = await supabase
      .from("discussion_forums")
      .select("*")
      .eq("is_archived", true);

    if (error) {
      console.error("Error fetching forums:", error);
      toast.error("Failed to load archived forums");
    } else {
      setForums(data || []);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchForums();
  }, [navigate]);

  const handleUnarchive = async (forumId: string) => {
    setUnarchiving(prev => ({ ...prev, [forumId]: true }));
    
    try {
      const { error } = await supabase
        .from("discussion_forums")
        .update({ is_archived: false })
        .eq("id", forumId);
        
      if (error) throw error;
      
      setForums(forums.filter(forum => forum.id !== forumId));
      toast.success("Forum restored successfully");
    } catch (error: any) {
      console.error("Error restoring forum:", error);
      toast.error("Failed to restore forum");
    } finally {
      setUnarchiving(prev => ({ ...prev, [forumId]: false }));
    }
  };

  const filteredForums = forums.filter(forum =>
    forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    forum.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/discussion-forums")}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Forums</span>
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#244855]">Archived Forums</h1>
          <p className="text-gray-600 mt-1">View and manage your archived discussions</p>
        </div>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search in archived forums..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#244855]"></div>
        </div>
      ) : filteredForums.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <MessageSquareOff className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-1">No archived forums found</h3>
            <p className="text-gray-500 text-center mb-6 max-w-md">
              {searchQuery 
                ? "We couldn't find any archived forums matching your search."
                : "You don't have any archived forums yet."}
            </p>
            <Button 
              variant="outline"
              onClick={() => navigate("/discussion-forums")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Forums</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredForums.map((forum) => (
            <Card key={forum.id} className="relative group bg-gray-50 hover:bg-white transition-colors">
              <div className="absolute top-2 right-2 px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded-md">
                Archived
              </div>
              <CardHeader className="pb-3">
                <div>
                  <CardTitle className="text-xl text-gray-700">{forum.title}</CardTitle>
                  <CardDescription className="mt-1 text-gray-500 flex items-center">
                    <UserCircle className="h-4 w-4 mr-1" />
                    <span>Created by {forum.created_by === "You" ? "You" : "Faculty"} on {formatDate(forum.created_at)}</span>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-gray-600 line-clamp-2">{forum.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-1">
                <div className="flex items-center text-sm text-gray-500">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{forum.replies_count} {forum.replies_count === 1 ? "reply" : "replies"}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUnarchive(forum.id)}
                    disabled={unarchiving[forum.id]}
                  >
                    {unarchiving[forum.id] ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-[#244855]"></div>
                    ) : (
                      <>
                        <RotateCcw className="h-3 w-3 mr-1" />
                        <span>Restore</span>
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
