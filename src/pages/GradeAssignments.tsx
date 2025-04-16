
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BookOpen,
  CheckCircle2,
  Search,
  UserCircle,
  GraduationCap,
  Filter,
  ListFilter,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
}

interface Grade {
  id: string;
  student_id: string;
  faculty_id: string;
  subject_code: string;
  subject_name: string;
  assignment_name: string;
  grade: string;
  date: string;
}

// Sample subjects
const SUBJECTS = [
  { code: 'CSET301', name: 'Artificial Intelligence and Machine Learning' },
  { code: 'CSET209', name: 'Operating Systems' },
  { code: 'CSET207', name: 'Computer Networks' },
  { code: 'CSET244', name: 'Design and Analysis of Algorithms' },
  { code: 'CSET203', name: 'Microprocessors and Computer Architecture' },
];

const GRADES = ['A', 'B', 'C', 'D', 'E', 'F'];

// Sample assignments
const ASSIGNMENTS = [
  'Mid-term Exam',
  'Final Project',
  'Assignment 1',
  'Assignment 2',
  'Quiz 1',
  'Lab Work',
  'Group Presentation',
];

export default function GradeAssignments() {
  const [userType, setUserType] = useState<'student' | 'faculty' | null>(null);
  const [loading, setLoading] = useState(true);
  const [gradesData, setGradesData] = useState<Grade[]>([]);
  const [studentsList, setStudentsList] = useState<Student[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>(SUBJECTS[0].code);
  const [selectedAssignment, setSelectedAssignment] = useState<string>(ASSIGNMENTS[0]);
  const [gradingInProgress, setGradingInProgress] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  useEffect(() => {
    const checkUserType = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: userData } = await supabase
        .from("login_users")
        .select("user_type")
        .eq("uid", user.id)
        .single();

      if (userData) {
        setUserType(userData.user_type as 'student' | 'faculty');
        
        if (userData.user_type === 'student') {
          fetchStudentGrades(user.id);
        } else {
          fetchAllStudents();
          fetchFacultyGrades(user.id);
        }
      }
    };

    checkUserType();
  }, []);

  const fetchStudentGrades = async (studentId: string) => {
    setLoading(true);
    
    let query = supabase
      .from('student_grades')
      .select('*')
      .eq('student_id', studentId);
      
    // Apply subject filtering
    if (filterSubject !== 'all') {
      query = query.eq('subject_code', filterSubject);
    }
    
    // Sort by date descending
    query = query.order('date', { ascending: false });
    
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching grades:', error.message);
      toast.error('Failed to load grades');
    } else {
      setGradesData(data || []);
    }
    
    setLoading(false);
  };

  const fetchFacultyGrades = async (facultyId: string) => {
    setLoading(true);
    
    let query = supabase
      .from('student_grades')
      .select('*')
      .eq('faculty_id', facultyId);
      
    // Apply subject filtering
    if (filterSubject !== 'all') {
      query = query.eq('subject_code', filterSubject);
    }
    
    // Sort by date descending
    query = query.order('date', { ascending: false });
    
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching grades:', error.message);
      toast.error('Failed to load grades');
    } else {
      setGradesData(data || []);
    }
    
    setLoading(false);
  };

  const fetchAllStudents = async () => {
    // In a real app, you would fetch all students from the database
    const { data, error } = await supabase
      .from('login_users')
      .select('uid, name, email')
      .eq('user_type', 'student');

    if (error) {
      console.error('Error fetching students:', error.message);
    } else {
      setStudentsList(data?.map(s => ({
        id: s.uid,
        name: s.name,
        email: s.email,
      })) || []);
    }
  };

  const assignGrade = async (studentId: string, grade: string) => {
    setGradingInProgress(prev => ({ ...prev, [studentId]: true }));
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      // Check if grade already exists for this student, subject, and assignment
      const { data: existingData } = await supabase
        .from('student_grades')
        .select('id')
        .eq('student_id', studentId)
        .eq('subject_code', selectedSubject)
        .eq('assignment_name', selectedAssignment)
        .single();
        
      const selectedSubjectName = SUBJECTS.find(s => s.code === selectedSubject)?.name || '';
      
      if (existingData) {
        // Update existing grade
        const { error } = await supabase
          .from('student_grades')
          .update({ 
            grade,
            faculty_id: user.id,
            date: new Date().toISOString().split('T')[0]
          })
          .eq('id', existingData.id);
          
        if (error) throw error;
      } else {
        // Create new grade record
        const { error } = await supabase
          .from('student_grades')
          .insert({
            student_id: studentId,
            faculty_id: user.id,
            subject_code: selectedSubject,
            subject_name: selectedSubjectName,
            assignment_name: selectedAssignment,
            grade,
            date: new Date().toISOString().split('T')[0]
          });
          
        if (error) throw error;
      }
      
      // Refresh the grades data
      toast.success(`Grade ${grade} assigned to the student`);
      if (userType === 'faculty') {
        fetchFacultyGrades(user.id);
      }
      
    } catch (error: any) {
      console.error('Error assigning grade:', error);
      toast.error(error.message || 'Failed to assign grade');
    } finally {
      setGradingInProgress(prev => ({ ...prev, [studentId]: false }));
    }
  };

  const filteredGrades = gradesData.filter(grade =>
    grade.subject_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grade.subject_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grade.assignment_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      case 'E':
      case 'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAverageGrade = () => {
    if (filteredGrades.length === 0) return 'N/A';
    
    const gradeValues: Record<string, number> = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 };
    const sum = filteredGrades.reduce((acc, curr) => acc + gradeValues[curr.grade], 0);
    const avg = sum / filteredGrades.length;
    
    if (avg >= 4.5) return 'A';
    if (avg >= 3.5) return 'B';
    if (avg >= 2.5) return 'C';
    if (avg >= 1.5) return 'D';
    if (avg >= 0.5) return 'E';
    return 'F';
  };

  if (loading && !userType) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#244855]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-[#244855] mb-6">
        {userType === 'faculty' ? 'Grade Assignments' : 'My Grades'}
      </h1>
      
      <Tabs defaultValue={userType}>
        <TabsList className="mb-6">
          <TabsTrigger value="student" disabled={userType !== 'student'}>Student View</TabsTrigger>
          <TabsTrigger value="faculty" disabled={userType !== 'faculty'}>Faculty View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student" className="space-y-6">
          {/* Student Grades Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className={`text-5xl font-bold ${getGradeColor(getAverageGrade())} rounded-full w-20 h-20 flex items-center justify-center mb-4`}>
                    {getAverageGrade()}
                  </div>
                  <p className="text-gray-600">Average Grade</p>
                </div>
                
                <div className="mt-6 space-y-2">
                  {GRADES.map(grade => {
                    const count = filteredGrades.filter(g => g.grade === grade).length;
                    const percentage = filteredGrades.length > 0 
                      ? Math.round((count / filteredGrades.length) * 100) 
                      : 0;
                      
                    return (
                      <div key={grade} className="flex items-center">
                        <span className={`inline-block w-6 text-center ${getGradeColor(grade)} rounded mr-2`}>
                          {grade}
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#244855] h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600 w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Total Assignments Graded: {filteredGrades.length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Your grades across different subjects</CardDescription>
                </div>
                <Select onValueChange={setFilterSubject} defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {SUBJECTS.map(subject => (
                      <SelectItem key={subject.code} value={subject.code}>
                        {subject.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                {filteredGrades.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <p>No grades available</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Assignment</TableHead>
                        <TableHead className="text-center">Grade</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGrades.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell>
                            <div className="font-medium">{grade.subject_name}</div>
                            <div className="text-xs text-gray-500">{grade.subject_code}</div>
                          </TableCell>
                          <TableCell>{grade.assignment_name}</TableCell>
                          <TableCell className="text-center">
                            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getGradeColor(grade.grade)}`}>
                              {grade.grade}
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-sm text-gray-500">
                            {formatDate(grade.date)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="faculty" className="space-y-6">
          {/* Faculty Grading Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Assign Grades
              </CardTitle>
              <CardDescription>Grade student assignments and exams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map(subject => (
                        <SelectItem key={subject.code} value={subject.code}>
                          {subject.code} - {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assignment</label>
                  <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Assignment" />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSIGNMENTS.map(assignment => (
                        <SelectItem key={assignment} value={assignment}>
                          {assignment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsList.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                          No students found
                        </TableCell>
                      </TableRow>
                    ) : (
                      studentsList.map(student => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <UserCircle className="h-5 w-5 text-gray-400" />
                              {student.name}
                            </div>
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              {GRADES.map(grade => (
                                <Button
                                  key={grade}
                                  size="sm"
                                  variant="outline"
                                  className={`h-9 w-9 p-0 ${getGradeColor(grade)}`}
                                  onClick={() => assignGrade(student.id, grade)}
                                  disabled={gradingInProgress[student.id]}
                                >
                                  {gradingInProgress[student.id] ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                                  ) : grade}
                                </Button>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* Faculty Recent Grades */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recent Grades
                </CardTitle>
                <CardDescription>View recently assigned grades</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[180px]"
                  />
                </div>
                <Select onValueChange={setFilterSubject} defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {SUBJECTS.map(subject => (
                      <SelectItem key={subject.code} value={subject.code}>
                        {subject.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#244855] mx-auto mb-4"></div>
                  <p>Loading grades...</p>
                </div>
              ) : filteredGrades.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No grades found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Assignment</TableHead>
                        <TableHead className="text-center">Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGrades.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell>{formatDate(grade.date)}</TableCell>
                          <TableCell>
                            {studentsList.find(s => s.id === grade.student_id)?.name || "Unknown Student"}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{grade.subject_name}</div>
                            <div className="text-xs text-gray-500">{grade.subject_code}</div>
                          </TableCell>
                          <TableCell>{grade.assignment_name}</TableCell>
                          <TableCell className="text-center">
                            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getGradeColor(grade.grade)}`}>
                              {grade.grade}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
