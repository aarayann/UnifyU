import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DiscussionForums() {
  const [forums, setForums] = useState<any[]>([]);
  const [comments, setComments] = useState<{ [key: string]: any[] }>({});
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    const { data: forumsData, error } = await supabase
      .from("discussion_forums")
      .select(`*, uid`)
      .order("created_at", { ascending: false });

    if (!error && forumsData) {
      // Fetch user details for each forum
      const enrichedForums = await Promise.all(
        forumsData.map(async (forum) => {
          const { data: userData } = await supabase
            .from("login_users")
            .select("name, user_type")
            .eq("uid", forum.uid)
            .single();

          return {
            ...forum,
            user_info: userData || { name: "Unknown", user_type: "Unknown" },
          };
        })
      );

      setForums(enrichedForums);

      // Fetch comments for each forum
      enrichedForums.forEach(forum => fetchComments(forum.id));
    }
  };

  const fetchComments = async (forumId: string) => {
    const { data: commentData, error } = await supabase
      .from("forum_comments")
      .select(`*`)
      .eq("forum_id", forumId)
      .order("created_at", { ascending: true });

    if (!error && commentData) {
      // Get user info for each comment
      const enrichedComments = await Promise.all(
        commentData.map(async (comment) => {
          const { data: userData } = await supabase
            .from("login_users")
            .select("name, user_type")
            .eq("uid", comment.uid)
            .single();

          return {
            ...comment,
            user_info: userData || { name: "Unknown", user_type: "Unknown" },
          };
        })
      );

      setComments((prev) => ({ ...prev, [forumId]: enrichedComments }));
    }
  };

  const handleCommentChange = (forumId: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [forumId]: value }));
  };

  const handleCommentSubmit = async (forumId: string) => {
    const commentText = commentInputs[forumId]?.trim();
    if (!commentText) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from("forum_comments").insert([
      {
        forum_id: forumId,
        uid: user.id,
        comment: commentText,
      },
    ]);

    if (!error) {
      setCommentInputs((prev) => ({ ...prev, [forumId]: "" }));
      fetchComments(forumId);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Discussion Forums</h2>
      {forums.map((forum) => (
        <div key={forum.id} className="border p-4 rounded mb-6">
          <h3 className="text-lg font-semibold">{forum.title}</h3>
          <p className="text-sm text-gray-600">
            Posted by {forum.user_info.name} ({forum.user_info.user_type}) on{" "}
            {new Date(forum.created_at).toLocaleString()}
          </p>
          <p className="mt-2">{forum.content}</p>

          {/* Comments Section */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Comments</h4>
            {comments[forum.id]?.length > 0 ? (
              comments[forum.id].map((comment) => (
                <div key={comment.id} className="border-t pt-2 mt-2 pl-2">
                  <p className="text-sm text-gray-700">
                    {comment.user_info.name} ({comment.user_info.user_type}):
                  </p>
                  <p className="text-gray-800">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>

          {/* Add Comment Box */}
          <div className="mt-4">
            <textarea
              value={commentInputs[forum.id] || ""}
              onChange={(e) => handleCommentChange(forum.id, e.target.value)}
              placeholder="Add a comment..."
              className="w-full border p-2 rounded resize-none"
            />
            <button
              onClick={() => handleCommentSubmit(forum.id)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Post Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
