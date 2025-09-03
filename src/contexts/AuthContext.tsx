@@ .. @@
 interface User {
   id: string;
   name: string;
+  full_name: string;
   email: string;
   photoURL?: string;
   notifications: Notification[];
 }

 interface AuthContextType {
   user: User | null;
+  loading: boolean;
   login: (email: string, password: string) => Promise<void>;
   logout: () => void;
 }

 const AuthContext = createContext<AuthContextType | undefined>(undefined);

 export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
+  const [loading, setLoading] = useState(true);
   const [user, setUser] = useState<User | null>({
     id: '1',
     name: 'John Doe',
+    full_name: 'John Doe',
     email: 'john@example.com',
     photoURL: 'https://api.dicebear.com/8.x/initials/svg?seed=John%20Doe',
     notifications: [
       { id: '1', message: 'Welcome to the platform!', read: false, timestamp: new Date() },
       { id: '2', message: 'Your deposit has been confirmed', read: true, timestamp: new Date() }
     ]
   });

+  useEffect(() => {
+    // Simulate loading
+    const timer = setTimeout(() => {
+      setLoading(false);
+    }, 1000);
+    return () => clearTimeout(timer);
+  }, []);
+
   const login = async (email: string, password: string) => {
     // Mock login
     setUser({
       id: '1',
       name: 'John Doe',
+      full_name: 'John Doe',
       email,
       photoURL: 'https://api.dicebear.com/8.x/initials/svg?seed=John%20Doe',
       notifications: []
     });
   };

   const logout = () => {
     setUser(null);
   };

   return (
     <AuthContext.Provider value={{ 
       user, 
+      loading,
       login, 
       logout 
     }}>
       {children}
     </AuthContext.Provider>
   );
 };