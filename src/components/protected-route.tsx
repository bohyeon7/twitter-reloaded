import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

// Firebase 에 유저정보를 요청
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}