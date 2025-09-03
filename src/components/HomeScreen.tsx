@@ .. @@
                         <p className="text-xs text-gray-400">{coin.name}</p>
                     </div>
                 </div>
                 <div className="text-center">
                     <p className="font-mono text-sm">${coin.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                 </div>
                 <div className={`text-right font-medium text-sm ${changeColor}`}>
                     {changeSign}{(coin.price_change_percentage_24h || 0).toFixed(2)}%
                 </div>
             </div>
         );
     };
     
     const unreadNotifications = user ? user.notifications.filter(n => !n.read).length : 0;

     return (
         <div className="animate-fade-in pb-4">
              <header className="px-4 pt-6 pb-4 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                     <img
                         src={user?.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${user?.name || 'User'}`}
                         alt="avatar"
                         className="w-10 h-10 rounded-full border-2 border-gray-700"
                     />
                     <div>
                         <p className="text-sm text-gray-400">Welcome back,</p>
                         <h1 className="text-xl font-bold">{user?.name || 'Guest'}</h1>
                     </div>
                 </div>
                 <div className="relative">
                     <Bell className="text-gray-400 w-6 h-6 cursor-pointer" onClick={() => navigate('/profile', { state: { view: 'notifications' } })} />
                     {unreadNotifications > 0 && (
                         <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                             {unreadNotifications}
                         </span>
                     )}
                 </div>
             </header>
+            
+            {/* Navigation to Dashboard */}
+            <div className="px-4 mb-4">
+                <Link 
+                    to="/dashboard" 
+                    className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
+                >
+                    View Full Dashboard
+                </Link>
+            </div>
             
             <div className="px-4 mb-6">
                 <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-lg">
                     {carouselSlides.map((slide, index) => (
                          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlideIndex ? 'opacity-100' : 'opacity-0'}`}>
                             <img src={slide.bg} className="w-full h-full object-cover" alt={slide.title} />
                             <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                                 <h2 className="text-white text-lg font-bold">{slide.title}</h2>
                                 <p className="text-gray-300 text-sm">{slide.subtitle}</p>
                             </div>
                         </div>
                     ))}
                     <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                         {carouselSlides.map((_, index) => (
                             <button key={index} onClick={() => setCurrentSlideIndex(index)} className={`h-1.5 w-4 rounded-full ${index === currentSlideIndex ? 'bg-yellow-400' : 'bg-gray-400/50'}`}></button>
                         ))}
                     </div>
                 </div>
             </div>

             <div className="grid grid-cols-3 gap-4 px-4 mb-6">
                 {actionMenuItems.map((item) => (
                     <div key={item.label} onClick={() => handleActionClick(item.path, item.state)} className="flex flex-col items-center space-y-2 text-center cursor-pointer p-2 rounded-lg hover:bg-gray-900 transition-colors">
                         <div className="p-3 bg-gray-900 rounded-full">
                             <item.icon className="w-6 h-6 text-yellow-400" />
                         </div>
                         <span className="text-xs font-medium text-gray-300">{item.label}</span>
                     </div>
                 ))}
             </div>

             <div className="px-4 space-y-2">
                 <div className="flex justify-between items-center mb-2">
                     <h2 className="text-lg font-bold">Hot Coins</h2>
                     <span className="text-sm text-yellow-400 cursor-pointer hover:underline" onClick={() => navigate('/market')}>
                         More &gt;
                     </span>
                 </div>
                 {loading ? (
                     <div className="space-y-1">
                         {Array.from({ length: 5 }).map((_, i) => (
                             <div key={i} className="h-[68px] bg-gray-950 rounded-lg animate-pulse"></div>
                         ))}
                     </div>
                 ) : (
                     <div className="bg-gray-950 rounded-lg">
                         {cryptoData.map(coin => <MarketRow key={coin.id} coin={coin} />)}
                     </div>
                 )}
             </div>
         </div>
     );
 };