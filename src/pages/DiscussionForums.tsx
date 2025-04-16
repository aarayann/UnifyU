
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Search,
  PlusCircle,
  MessageSquare,
  UserCircle,
  Archive,
  CheckCircle2,
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

export default function DiscussionForums() {
  const navigate = useNavigate();
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [archiving, setArchiving] = useState<Record<string, boolean>>({});
  const [filterType, setFilterType] = useState<"all" | "my">("all");

  const fetchForums = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    let query = supabase
      .from("discussion_forums")
      .select("*")
      .eq("is_archived", false); // Only get non-archived forums
      
    if (filterType === "my") {
      query = query.eq("created_by", user.id);
    }
    
    const { data, error } = await query;

    if (error) {
      console.error("Error fetching forums:", error);
      toast.error("Failed to load discussion forums");
    } else {
      setForums(data || []);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchForums();
  }, [filterType, navigate]);

  const handleArchiveToggle = async (forumId: string) => {
    setArchiving(prev => ({ ...prev, [forumId]: true }));
    
    try {
      const { error } = await supabase
        .from("discussion_forums")
        .update({ is_archived: true })
        .eq("id", forumId);
        
      if (error) throw error;
      
      setForums(forums.filter(forum => forum.id !== forumId));
      toast.success("Forum archived successfully");
    } catch (error: any) {
      console.error("Error archiving forum:", error);
      toast.error("Failed to archive forum");
    } finally {
      setArchiving(prev => ({ ...prev, [forumId]: false }));
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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#244855]">Discussion Forums</h1>
          <p className="text-gray-600 mt-1">Engage in academic discussions with faculty and peers</p>
        </div>
        <Button 
          onClick={() => navigate("/create-forum")}
          className="flex items-center gap-2 bg-[#244855] hover:bg-[#1a363f]"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create New Forum</span>
        </Button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search forums by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs 
          defaultValue="all" 
          className="w-full md:w-auto"
          onValueChange={(value) => setFilterType(value as "all" | "my")}
        >
          <TabsList className="grid w-full grid-cols-2 md:w-[200px]">
            <TabsTrigger value="all">All Forums</TabsTrigger>
            <TabsTrigger value="my">My Forums</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate("/archived-forums")}
        >
          <Archive className="h-4 w-4" />
          <span>Archived Forums</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#244855]"></div>
        </div>
      ) : filteredForums.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-1">No forums found</h3>
            <p className="text-gray-500 text-center mb-6 max-w-md">
              {searchQuery 
                ? "We couldn't find any forums matching your search. Try with different keywords."
                : filterType === "my" 
                  ? "You haven't created any discussion forums yet."
                  : "There are no discussion forums yet."}
            </p>
            <Button 
              onClick={() => navigate("/create-forum")}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Create New Forum</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredForums.map((forum) => (
            <Card key={forum.id} className="relative group hover:border-[#244855]/30 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-[#244855]">{forum.title}</CardTitle>
                    <CardDescription className="mt-1 text-gray-500 flex items-center">
                      <UserCircle className="h-4 w-4 mr-1" />
                      <span>Created by {forum.created_by === "You" ? "You" : "Faculty"} on {formatDate(forum.created_at)}</span>
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleArchiveToggle(forum.id)}
                    disabled={archiving[forum.id]}
                  >
                    {archiving[forum.id] ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-[#244855]"></div>
                    ) : (
                      <Archive className="h-4 w-4" />
                    )}
                    <span className="ml-1">Archive</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-gray-700 line-clamp-2">{forum.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-1">
                <div className="flex items-center text-sm text-gray-500">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{forum.replies_count} {forum.replies_count === 1 ? "reply" : "replies"}</span>
                </div>
                <Button variant="outline" size="sm">View Discussion</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
