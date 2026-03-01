import { lazy } from "react";

const StudentDashboard = lazy(() => import("./pages/student/StudentDashboard"));
const Activities = lazy(() => import("./pages/student/Activities"));
const ActivityUpload = lazy(() => import("./pages/student/ActivityUpload"));
const Portfolio = lazy(() => import("./pages/student/Portfolio"));
const Profile = lazy(() => import("./pages/student/Profile"));
const DocumentVerification = lazy(() => import("./pages/student/DocumentVerification"));
const ResumeBuilder = lazy(() => import("./pages/student/ResumeBuilder"));
const FacultyDashboard = lazy(() => import("./pages/faculty/FacultyDashboard"));
const Approvals = lazy(() => import("./pages/faculty/Approvals"));
const Analytics = lazy(() => import("./pages/faculty/Analytics"));
const StudentMonitoring = lazy(() => import("./pages/faculty/StudentMonitoring"));
const ActivityManagement = lazy(() => import("./pages/faculty/ActivityManagement"));
const ReportingTools = lazy(() => import("./pages/faculty/ReportingTools"));
const SearchFilter = lazy(() => import("./pages/faculty/SearchFilter"));
const LoginFaculty = lazy(() => import("./pages/auth/LoginFaculty"));
const Login = lazy(() => import("./pages/auth/Login"));
const RecruiterDashboard = lazy(() => import("./pages/recruiter/RecruiterDashboard"));
const StudentPortfolios = lazy(() => import("./pages/recruiter/StudentPortfolios"));
const JobPosting = lazy(() => import("./pages/recruiter/JobPosting"));
const Shortlisting = lazy(() => import("./pages/recruiter/Shortlisting"));
const RecruiterChat = lazy(() => import("./pages/recruiter/RecruiterChat"));
const StudentProfile = lazy(() => import("./pages/recruiter/StudentProfile"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const MasterControl = lazy(() => import("./pages/admin/MasterControl"));
const DataManagement = lazy(() => import("./pages/admin/DataManagement"));
const AuditLogs = lazy(() => import("./pages/admin/AuditLogs"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const Users = lazy(() => import("./pages/admin/Users"));
const LoginStudent = lazy(() => import("./pages/auth/LoginStudent"));
const LoginAdmin = lazy(() => import("./pages/auth/LoginAdmin"));
const LoginRecruiter = lazy(() => import("./pages/auth/LoginRecruiter"));
const SignupRecruiter = lazy(() => import("./pages/auth/SignupRecruiter"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const NotFound = lazy(() => import("./pages/shared/NotFound"));
const Chat = lazy(() => import("./pages/shared/Chat"));
const SignupStudent = lazy(() => import("./pages/auth/SignupStudent"));
const SignupFaculty = lazy(() => import("./pages/auth/SignupFaculty"));
const Welcome = lazy(() => import("./pages/welcome/Welcome"));

const routes = [
  { path: "/", element: Welcome, protected: false },
  { path: "/student/dashboard", element: StudentDashboard, protected: true },
  { path: "/student", element: StudentDashboard, protected: true },
  { path: "/student/activities", element: Activities, protected: true },
  { path: "/student/activities/upload", element: ActivityUpload, protected: true },
  { path: "/student/portfolio", element: Portfolio, protected: true },
  { path: "/student/profile", element: Profile, protected: true },
  { path: "/student/verification", element: DocumentVerification, protected: true },
  { path: "/student/resume", element: ResumeBuilder, protected: true },
  { path: "/faculty/dashboard", element: FacultyDashboard, protected: true },
  { path: "/faculty", element: FacultyDashboard, protected: true },
  { path: "/faculty/approvals", element: Approvals, protected: true },
  { path: "/faculty/monitoring", element: StudentMonitoring, protected: true },
  { path: "/faculty/activities", element: ActivityManagement, protected: true },
  { path: "/faculty/reports", element: ReportingTools, protected: true },
  { path: "/faculty/search", element: SearchFilter, protected: true },
  { path: "/faculty/analytics", element: Analytics, protected: true },
  { path: "/recruiter/dashboard", element: RecruiterDashboard, protected: true },
  { path: "/recruiter", element: RecruiterDashboard, protected: true },
  { path: "/recruiter/portfolios", element: StudentPortfolios, protected: true },
  { path: "/recruiter/jobs", element: JobPosting, protected: true },
  { path: "/recruiter/shortlist", element: Shortlisting, protected: true },
  { path: "/recruiter/chat", element: RecruiterChat, protected: true },
  { path: "/recruiter/student/profile", element: StudentProfile, protected: true },
  { path: "/admin/dashboard", element: AdminDashboard, protected: true },
  { path: "/admin", element: AdminDashboard, protected: true },
  { path: "/admin/control", element: MasterControl, protected: true },
  { path: "/admin/data", element: DataManagement, protected: true },
  { path: "/admin/audit", element: AuditLogs, protected: true },
  { path: "/admin/settings", element: Settings, protected: true },
  { path: "/admin/users", element: Users, protected: true },
  { path: "/chat", element: Chat, protected: true },
  { path: "/login/:role", element: Login, protected: false },
  { path: "/login/student", element: LoginStudent, protected: false },
  { path: "/login/faculty", element: LoginFaculty, protected: false },
  { path: "/login/recruiter", element: LoginRecruiter, protected: false },
  { path: "/signup/student", element: SignupStudent, protected: false },
  { path: "/signup/faculty", element: SignupFaculty, protected: false },
  { path: "/signup/recruiter", element: SignupRecruiter, protected: false },
  { path: "/forgot-password", element: ForgotPassword, protected: false },
  { path: "/reset-password", element: ResetPassword, protected: false },
  { path: "/login/admin", element: LoginAdmin, protected: false },
  { path: "*", element: NotFound, protected: false }
];

export default routes;
