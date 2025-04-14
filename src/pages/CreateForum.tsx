import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreateForum() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) return;

    // Fetch the user type from the login_users table
    const { data: userData, error: userError } = await supabase
      .from("login_users")
      .select("user_type")
      .eq("uid", user.user.id)
      .single();

    if (userError) {
      alert("Error fetching user data");
      return;
    }

    const { error } = await supabase.from("discussion_forums").insert([
      {
        uid: user.user.id,
        title,
        content,
        user_type: userData?.user_type || "student",
      },
    ]);

    if (error) {
      alert("Error creating forum");
    } else {
      // Redirect based on user type
      if (userData?.user_type === "faculty") {
        navigate("/faculty/forums");
      } else {
        navigate("/student/forums");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Create a New Forum</h2>
      <input
        className="block border mb-2 p-2 w-full"
        placeholder="Forum Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="block border mb-2 p-2 w-full"
        placeholder="Forum Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Post Forum
      </button>
    </div>
  );
}
