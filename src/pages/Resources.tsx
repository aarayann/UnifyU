import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Resource {
  id: number;
  course_name: string;
  resource_url: string;
}

const courseOptions = [
  'Computer Networks',
  'Operating Systems',
  'Algorithms',
  'Data Structures',
];

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Faculty upload state
  const [selectedCourse, setSelectedCourse] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchUserType = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) return;

    const { data, error } = await supabase
      .from('login_users')
      .select('user_type')
      .eq('uid', user.user.id)
      .single();

    if (error) {
      console.error('Failed to fetch user type:', error.message);
    } else {
      setUserType(data?.user_type);
    }
  };

  const fetchEnrolledCourses = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) return;

    const { data, error } = await supabase
      .from('performance_metrics')
      .select('course_name')
      .eq('uid', user.user.id);

    if (error) {
      console.error('Error fetching enrolled courses:', error);
    } else {
      const courses = data.map((item) => item.course_name);
      setEnrolledCourses(courses);
    }
  };

  const fetchResources = async () => {
    const { data, error } = await supabase.from('resources').select('*');

    if (error) {
      console.error('Error fetching resources:', error);
    } else {
      setResources(data);
    }

    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const { error } = await supabase.from('resources').insert([
      {
        course_name: selectedCourse,
        resource_url: resourceUrl,
      },
    ]);

    if (error) {
      alert('Failed to upload resource');
      console.error(error.message);
    } else {
      alert('Resource uploaded successfully');
      setResourceUrl('');
      setSelectedCourse('');
      fetchResources(); // Refresh the list
    }

    setUploading(false);
  };

  useEffect(() => {
    fetchUserType();
    fetchEnrolledCourses();
  }, []);

  useEffect(() => {
    if (enrolledCourses.length > 0 || userType === 'faculty') {
      fetchResources();
    }
  }, [enrolledCourses, userType]);

  const filteredResources =
    userType === 'faculty'
      ? resources // faculty sees all resources
      : resources.filter((res) => enrolledCourses.includes(res.course_name));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Course Resources</h2>

      {loading ? (
        <p>Loading...</p>
      ) : filteredResources.length > 0 ? (
        <ul className="space-y-4 mb-6">
          {filteredResources.map((res) => (
            <li
              key={res.id}
              className="border p-4 rounded shadow hover:bg-gray-50 transition"
            >
              <h3 className="text-lg font-medium">{res.course_name}</h3>
              <a
                href={res.resource_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Resource
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources found.</p>
      )}

      {/* Faculty Upload Form */}
      {userType === 'faculty' && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Upload New Resource</h3>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border px-3 py-2 w-full rounded"
                required
              >
                <option value="">-- Select Course --</option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Resource URL</label>
              <input
                type="url"
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
                className="border px-3 py-2 w-full rounded"
                placeholder="https://..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Resource'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Resources;
