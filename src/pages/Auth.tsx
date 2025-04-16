import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Auth = () => {
  const [userType, setUserType] = useState<"student" | "faculty">("student");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserType: setContextUserType } = useAuth();

  const handleSignup = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    const userId = data.user?.id;
    if (userId) {
      const { error: insertError } = await supabase.from("login_users").insert([
        {
          uid: userId,
          email,
          name,
          user_type: userType,
        },
      ]);
      if (insertError) {
        alert("Signup successful but failed to save user details.");
      } else {
        alert("Signup successful! Please check your email to confirm.");
      }
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    const userId = data.user.id;
    const { data: userData, error: userError } = await supabase
      .from("login_users")
      .select("user_type")
      .eq("uid", userId)
      .single();
    if (userError) {
      alert("Login successful, but failed to fetch user type.");
      setLoading(false);
      return;
    }
    setContextUserType(userData.user_type);

    if (userData.user_type === "student") {
      navigate("/student-dashboard");
    } else {
      navigate("/faculty-dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Login / Signup</CardTitle>
          <CardDescription className="text-center text-gray-600 mb-4">
            Access your dashboard as a student or faculty member.
          </CardDescription>
          {/* Student & Faculty buttons here, visible in both tabs */}
          <div className="flex gap-4 justify-center mb-6">
            <Button
              type="button"
              variant={userType === "student" ? "default" : "outline"}
              onClick={() => setUserType("student")}
              className="flex-1"
            >
              Student
            </Button>
            <Button
              type="button"
              variant={userType === "faculty" ? "default" : "outline"}
              onClick={() => setUserType("faculty")}
              className="flex-1"
            >
              Faculty
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="space-y-4"
              >
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSignup();
                }}
                className="space-y-4"
              >
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
