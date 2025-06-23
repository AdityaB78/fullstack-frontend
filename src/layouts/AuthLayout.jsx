import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-50 to-purple-100 font-sans">
      <div className="w-full max-w-lg mx-auto">
        {/*
          The <Outlet /> component will render your Login, Register, or Forgot Password components here.
          The styling for the specific forms (background, shadow, etc.) will come from those individual components.
          This AuthLayout primarily sets the full-page background and centers the content.
        */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;