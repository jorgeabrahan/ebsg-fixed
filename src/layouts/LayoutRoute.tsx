import type { ComponentChildren } from "preact";
import type { RouteAccessCondition } from "../lib/types/routes";
import {
  DEFAULT_AUTHENTICATED_ROUTE,
  DEFAULT_UNAUTHENTICATED_ROUTE,
  ROUTE_ACCESS_CONDITION,
} from "../lib/constants/routes";
import { ServiceAuth } from "../services/ServiceAuth";
import { useEffect, useState } from "preact/hooks";
import { user } from "../stores/session";
import { route } from "preact-router";
import { CSidebar } from "../components/CSidebar";

export const LayoutRoute = ({
  children,
  type,
}: {
  children: ComponentChildren;
  type: RouteAccessCondition;
}) => {
  const [isCheckingUserAccess, setIsCheckingUserAccess] = useState(true);
  const [isCheckingAuthStatus, setIsCheckingAuthStatus] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user.value);

  useEffect(() => {
    setIsAuthenticated(!!user.value);
  }, [user.value]);

  useEffect(() => {
    const restoreSession = async () => {
      const { data, ok, error } = await ServiceAuth.getUser();
      error && console.error(error);
      if (ok && data) {
        user.value = data;
        setIsAuthenticated(true);
      }
      setIsCheckingAuthStatus(false);
    };

    if (type !== ROUTE_ACCESS_CONDITION.public && !isAuthenticated) {
      restoreSession();
    } else {
      setIsCheckingAuthStatus(false);
    }
  }, []);
  useEffect(() => {
    if (isCheckingAuthStatus) return;
    // if it is NOT authenticated and should be to view the current route
    if (!isAuthenticated && type === ROUTE_ACCESS_CONDITION.authenticated) {
      route(DEFAULT_UNAUTHENTICATED_ROUTE);
    }
    // if IS authenticated and it should NOT be to view the current route
    if (isAuthenticated && type === ROUTE_ACCESS_CONDITION.unauthenticated) {
      route(DEFAULT_AUTHENTICATED_ROUTE);
    }
    setIsCheckingUserAccess(false);
  }, [isCheckingAuthStatus]);
  if (isCheckingUserAccess) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {type === ROUTE_ACCESS_CONDITION.authenticated && <CSidebar />}
      <div className={"py-4"}>{children}</div>
    </>
  );
};
