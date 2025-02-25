import React from "react";
import { useAuthStore } from "@/stores/auth";
import { Navigate, useLocation } from "react-router-dom";

export interface ProtectedPageProps {
	children: React.ReactNode;
}

function ProtectedPage(props: ProtectedPageProps) {
	const { authenticated } = useAuthStore();
	const location = useLocation();
	const { children } = props;

	return authenticated === true ? (
		<>{children}</>
	) : (
		<Navigate to={"/"} replace state={{ path: location.pathname }} />
	);
}

export default ProtectedPage;
