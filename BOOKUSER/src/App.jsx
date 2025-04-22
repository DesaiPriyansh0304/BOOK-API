import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import RegisterPage from './components/LoginComponent/RegisterPage'
import LoginPage from './components/LoginComponent/Login'
import BooksPage from './components/Books'
import Addtocard from './components/Addtocard'
import Dateselect from './components/Dateselect'
import UserBookings from './components/Userbooking'
import BookIssueSearch from './components/bookuserfind'
import ForgotPasswordPage from './components/Password/ForgotPasswordPage'
import ResetPasswordPage from './components/Password/ResetPasswordPage'
import ChangePasswordPage from './components/Password/ChangePasswordPage'
import ProfileUpload from './components/profileupload'
import Adminlayout from './components/Admin/Adminlayout'
import Adminuser from './components/Admin/Adminuser'
import AdminBook from './components/Admin/AdminBook'
import AdminupdateUser from './components/Admin/AdminupdateUser'
import Adminbookupdate from './components/Admin/Adminbookupdate'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book" element={<BooksPage />} />
        <Route path="/addtocard" element={<Addtocard />} />
        <Route path="/myslot" element={<BooksPage />} />
        <Route path='/selectdate' element={<Dateselect />} />
        <Route path='/mybookings' element={<UserBookings />} />
        <Route path='/mybookuser' element={<BookIssueSearch />} />

        //*file upload
        <Route path='/profile' element={<ProfileUpload />} />

        //*Password
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/change-password' element={<ChangePasswordPage />} />

        //* Admin Router
        <Route path="/admin" element={<Adminlayout />}>
          <Route path='users' element={<Adminuser />} />
          <Route path="users/:id/edit" element={<AdminupdateUser />} />
          <Route path='books' element={<AdminBook />} />
          <Route path="books/:id/edit" element={<Adminbookupdate />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
