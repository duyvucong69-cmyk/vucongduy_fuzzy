// Simple secure authentication helper using obfuscated base64 storage in LocalStorage

const TOKEN_KEY = "fuzzy_session_token";
const USER_KEY = "fuzzy_user_profile";
const BACKEND_URL = "http://localhost:3000";

// Simple encryption (Base64 obfuscation)
function encrypt(str: string): string {
  try {
    return btoa(str);
  } catch (e) {
    return str;
  }
}

function decrypt(str: string): string {
  try {
    return atob(str);
  } catch (e) {
    return str;
  }
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, encrypt(token));
}

export function getToken(): string | null {
  const encToken = localStorage.getItem(TOKEN_KEY);
  if (!encToken) return null;
  const token = decrypt(encToken);
  
  if (isTokenExpired(token)) {
    clearAuth();
    return null;
  }
  return token;
}

export function saveUser(user: any): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): any | null {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    
    const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return true;
    }
    return false;
  } catch (e) {
    return true;
  }
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

// Global fetch helper that automatically appends Bearer Token
export async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  const token = getToken();
  
  // If accessing a protected API and there's no valid token, redirect to login
  if (!token && !endpoint.includes("/api/auth/")) {
    clearAuth();
    window.location.hash = "#/login";
    throw new Error("Session expired. Please log in again.");
  }

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = `${BACKEND_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401 && !endpoint.includes("/api/auth/")) {
      clearAuth();
      window.location.hash = "#/login";
    }
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}
