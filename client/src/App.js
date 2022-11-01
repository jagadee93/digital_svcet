import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import TimeTable from '../src/components/Timtable/TimeTable';
import Navbarr from './components/Navbar/Nabarr';
import AddClass from "./components/class/AddClass"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css"
import PendingTeachers from './components/Admin/PendingTeachers';
import PendingTables from './components/class/pendingTables';
const ROLES = {
  'Student': 2001,
  'Teacher': 1984,
  'Admin': 5150
}

function App() {

  return (
    <>
    <Navbarr/>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
       
        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Teacher]} />}>
            <Route path="addclass" element={<AddClass />} />
          </Route>
          
          <Route element={<RequireAuth allowedRoles={[ROLES.Teacher]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>


          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="users" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Admin]} />}>
            <Route path="pendingteachers" element={<PendingTeachers />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="pendingtimetables" element={<PendingTables />} />
          </Route>

        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;