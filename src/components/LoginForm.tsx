
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  userType: "student" | "faculty";
}

const LoginForm = ({ userType }: LoginFormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google login
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${userType === "student" ? "Student" : "Faculty"} logged in with Google`);
      navigate(`/${userType}-dashboard`);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        toast.success(`${userType === "student" ? "Student" : "Faculty"} logged in successfully`);
        navigate(`/${userType}-dashboard`);
      } else {
        toast.error("Please fill in all fields");
      }
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        type="button" 
        disabled={isLoading}
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
      >
        <Mail size={18} />
        <span>Login with Google</span>
      </Button>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-[#244855] hover:underline">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-[#244855] hover:bg-[#1a363f]" 
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
