import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './routes/protectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Dragons } from './pages/Dragons';
import { DragonDetail } from './pages/DragonDetail';
import { Home } from './pages/Home';
import { Classes } from './pages/Classes';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { PasswordReset } from './pages/PasswordReset';
import { PasswordResetConfirm } from './pages/PasswordResetConfirm';
import { Admin } from './pages/admin/Admin';
import { AdminDragons } from './pages/admin/AdminDragons';
import { AdminClasses} from './pages/admin/AdminClasses';
import { AdminAbilities } from './pages/admin/AdminAbilities';
import { AdminDistributions } from './pages/admin/AdminDistributions';
import { AdminImages } from './pages/admin/AdminImages';

import './App.css';

function App() {
    return (
       <BrowserRouter>
            <div className="app-background">
                <div className="app-content">
                     <Navbar />
                    <div className="mx-auto w-full max-w-6xl min-w-0">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="about" element={<About />}/>
                            <Route path="/dragons" element={<Dragons />} />
                            <Route path="/dragons/:uid" element={<DragonDetail />} />
                            <Route path="/classes" element={<Classes />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/password-reset" element={<PasswordReset />} />
                            <Route path="/password-reset-confirm/:token" element={<PasswordResetConfirm />} />
                            <Route element={<ProtectedRoute adminOnly />}>
                                <Route path="/admin" element={<Admin />}>
                                    <Route path="dragons" element={<AdminDragons />} />
                                    <Route path="classes" element={<AdminClasses />} />
                                    <Route path="abilities" element={<AdminAbilities />} />
                                    <Route path="distributions" element={<AdminDistributions />} />
                                    <Route path="images" element={<AdminImages/>} />
                                </Route>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
