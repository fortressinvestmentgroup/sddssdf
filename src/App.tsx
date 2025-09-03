@@ .. @@
 import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import { AuthProvider } from './contexts/AuthContext';
+import { I18nProvider } from './components/I18nProvider';
 import HomeScreen from './components/HomeScreen';
+import Dashboard from './components/Dashboard';
 import PlaceholderScreen from './components/PlaceholderScreen';
 import './App.css';

 function App() {
   return (
     <AuthProvider>
-      <Router>
-        <div className="min-h-screen bg-black text-white">
-          <Routes>
-            <Route path="/" element={<HomeScreen />} />
-            <Route path="/trading" element={<PlaceholderScreen title="Trading" />} />
-            <Route path="/trading/:pair" element={<PlaceholderScreen title="Trading Pair" />} />
-            <Route path="/market" element={<PlaceholderScreen title="Market" />} />
-            <Route path="/profile" element={<PlaceholderScreen title="Profile" />} />
-          </Routes>
-        </div>
-      </Router>
+      <I18nProvider>
+        <Router>
+          <div className="min-h-screen bg-black text-white">
+            <Routes>
+              <Route path="/" element={<HomeScreen />} />
+              <Route path="/dashboard" element={<Dashboard />} />
+              <Route path="/trading" element={<PlaceholderScreen title="Trading" />} />
+              <Route path="/trading/:pair" element={<PlaceholderScreen title="Trading Pair" />} />
+              <Route path="/market" element={<PlaceholderScreen title="Market" />} />
+              <Route path="/profile" element={<PlaceholderScreen title="Profile" />} />
+              <Route path="/portfolio" element={<PlaceholderScreen title="Portfolio" />} />
+            </Routes>
+          </div>
+        </Router>
+      </I18nProvider>
     </AuthProvider>
   );
 }