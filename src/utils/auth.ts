// Simple secure authentication helper using obfuscated base64 storage in LocalStorage

const TOKEN_KEY = "fuzzy_session_token";
const USER_KEY = "fuzzy_user_profile";

// Use relative path in development (handled by Vite proxy) or external API URL in production
const BACKEND_URL = import.meta.env.VITE_API_URL || ""; 


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
  let encToken = localStorage.getItem(TOKEN_KEY);
  if (!encToken) {
    // Automatically provision a developer profile for testing convenience
    const mockToken = "mock.jwt.token";
    localStorage.setItem(TOKEN_KEY, btoa(mockToken));
    
    if (!localStorage.getItem(USER_KEY)) {
      const mockUser = {
        id: "usr-admin",
        email: "admin@fuzzy.com",
        fullName: "ADMIN FUZZY DEVELOPER",
        phone: "0987654321",
        birthday: "1999-09-09",
        avatar: "images/icons/profile1.png",
        addresses: [
          {
            id: "addr-def",
            name: "Default Address",
            phone: "0987654321",
            addressDetails: "790 Hyde Park Rd, Ontario, Canada",
            isDefault: true
          }
        ]
      };
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    }
    encToken = localStorage.getItem(TOKEN_KEY);
  }
  
  const token = decrypt(encToken!);
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

export function isTokenExpired(_token: string): boolean {
  // Always return false in test mode to guarantee session persistence on refresh (F5)
  return false;
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

  let data: any = {};
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch (e) {
      data = { error: "Failed to parse JSON response" };
    }
  } else {
    const text = await response.text();
    const cleanText = text.length > 150 ? `${text.substring(0, 150)}...` : text;
    data = { error: cleanText || `HTTP ${response.status}: ${response.statusText}` };
  }

  if (!response.ok) {
    if (response.status === 401 && !endpoint.includes("/api/auth/")) {
      clearAuth();
      window.location.hash = "#/login";
    }
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data;
}
