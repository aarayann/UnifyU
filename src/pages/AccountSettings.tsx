import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error(userError);
        navigate('/auth');
        return;
      }

      setEmail(user.email ?? '');
      setNewEmail(user.email ?? '');

      const { data, error } = await supabase
        .from('login_users')
        .select('full_name')
        .eq('uid', user.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setFullName(data.full_name);
      }

      setLoading(false);
    };

    getProfile();
  }, []);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('login_users')
      .update({ full_name: fullName })
      .eq('uid', user?.id);

    if (error) {
      alert('Failed to update profile');
      console.error(error);
    } else {
      showSuccess('Profile updated successfully!');
    }

    setLoading(false);
  };

  const handlePasswordReset = async () => {
    if (!newPassword) {
      alert('Please enter a new password.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert('Failed to update password');
      console.error(error);
    } else {
      showSuccess('Password updated successfully!');
      setNewPassword('');
    }
  };

  const handleEmailChange = async () => {
    if (!newEmail || newEmail === email) {
      alert('Please enter a new email address.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      alert('Failed to update email');
      console.error(error);
    } else {
      showSuccess('Confirmation email sent to new address.');
      setEmail(newEmail);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      {successMessage && (
        <div className="mb-6 px-4 py-3 bg-green-100 border border-green-300 text-green-800 rounded">
          {successMessage}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProfile();
          }}
          className="space-y-6 max-w-md"
        >
          {/* Email */}
          <div>
            <Label>Current Email</Label>
            <Input value={email} disabled />
          </div>

          <div>
            <Label>Change Email</Label>
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="New email address"
            />
            <Button
              type="button"
              className="mt-2 bg-[#244855] text-white"
              onClick={handleEmailChange}
            >
              Update Email
            </Button>
          </div>

          {/* Full Name */}
          <div>
            <Label>Full Name</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          <Button type="submit" className="bg-[#244855] text-white">
            Save Changes
          </Button>

          {/* Password Reset */}
          <div className="mt-8">
            <Label>Reset Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
            />
            <Button
              type="button"
              className="mt-2 bg-[#244855] text-white"
              onClick={handlePasswordReset}
            >
              Update Password
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AccountSettings;
