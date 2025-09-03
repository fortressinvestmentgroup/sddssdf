import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import {
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3,
  Bell,
  DollarSign,
  Volume2,
  Gem,
  Shield,
  Droplets,
  Flame,
  Speaker // Added Speaker import
} from "lucide-react";
import { AnimatePresence } from "framer-motion"; // Added AnimatePresence import
import { useI18n } from '../components/I18nProvider';
import { useAuth } from '../contexts/AuthContext';

// Mock crypto data with 2025 prices
const mockCryptoData = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', current_price: 108740.19, price_change_percentage_24h: -0.15 },
  { id: 'ripple', symbol: 'XRP', name: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', current_price: 2.27416, price_change_percentage_24h: -0.05 },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', current_price: 2547.7, price_change_percentage_24h: -0.39 },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png', current_price: 87.56, price_change_percentage_24h: -0.46 },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', current_price: 0.58486, price_change_percentage_24h: -0.12 },
  { id: 'tron', symbol: 'TRX', name: 'TRON', image: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png', current_price: 0.285657, price_change_percentage_24h: 0.00 },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic', image: 'https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png', current_price: 16.6581, price_change_percentage_24h: 0.26 },
  { id: 'eos', symbol: 'EOS', name: 'EOS', image: 'https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png', current_price: 0.7231, price_change_percentage_24h: -1.35 },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png', current_price: 13.4586, price_change_percentage_24h: 0.16 },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash', image: 'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png', current_price: 497.03, price_change_percentage_24h: 0.40 },
  { id: 'iota', symbol: 'IOTA', name: 'IOTA', image: 'https://assets.coingecko.com/coins/images/692/large/IOTA_Swirl.png', current_price: 0.1587, price_change_percentage_24h: 0.00 },
  { id: 'tellor', symbol: 'TRB', name: 'Tellor', image: 'https://assets.coingecko.com/coins/images/9644/large/Blk_icon_current.png', current_price: 36.831, price_change_percentage_24h: 0.34 },
  { id: 'zcash', symbol: 'ZEC', name: 'Zcash', image: 'https://assets.coingecko.com/coins/images/486/large/circle-zcash-color.png', current_price: 39.22, price_change_percentage_24h: 1.81 },
  { id: 'monero', symbol: 'XMR', name: 'Monero', image: 'https://assets.coingecko.com/coins/images/69/large/monero_logo.png', current_price: 319.55, price_change_percentage_24h: 0.96 },
  { id: 'bitcoin-sv', symbol: 'BSV', name: 'Bitcoin SV', image: 'https://assets.coingecko.com/coins/images/6799/large/BSV.png', current_price: 24.35, price_change_percentage_24h: 0.48 },
  { id: 'huobi-token', symbol: 'HT', name: 'Huobi Token', image: 'https://assets.coingecko.com/coins/images/2822/large/huobi-token-logo.png', current_price: 1.7964, price_change_percentage_24h: 1.74 },
];

const commodityData = [
  { symbol: 'XAU', name: 'Gold', current_price: 2485.75, price_change_percentage_24h: 0.85 },
  { symbol: 'XAG', name: 'Silver', current_price: 32.80, price_change_percentage_24h: 1.42 },
  { symbol: 'WTI', name: 'Crude Oil', current_price: 78.90, price_change_percentage_24h: -2.15 },
  { symbol: 'NG', name: 'Natural Gas', current_price: 3.24, price_change_percentage_24h: 5.67 },
];

const carouselImages = [
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=400&fit=crop',
];

const commodityIcons = {
  XAU: <Gem size={20} className="text-yellow-400" />,
  XAG: <Shield size={20} className="text-gray-400" />,
  WTI: <Droplets size={20} className="text-slate-500" />,
  NG: <Flame size={20} className="text-orange-400" />,
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Crypto');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useI18n();
  const { user, loading } = useAuth();

  const actionMenuItems = [
    { icon: ArrowDownLeft, label: t('dashboard.actions.deposit'), color: 'bg-green-500', link: createPageUrl("Profile?action=deposit") },
    { icon: ArrowUpRight, label: t('dashboard.actions.withdraw'), color: 'bg-orange-500', link: createPageUrl("Profile?action=withdraw") },
    { icon: DollarSign, label: t('dashboard.actions.balance'), color: 'bg-blue-500', link: createPageUrl("Portfolio") },
    { icon: TrendingUp, label: t('dashboard.actions.trade'), color: 'bg-purple-500', link: createPageUrl("Trading") },
  ];

  // Carousel auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  const MarketItem = ({ item, isCommodity = false }) => {
    const isPositive = (item.price_change_percentage_24h || 0) >= 0;
    const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
    const changeBgColor = isPositive ? 'rgb(45, 159, 89)' : 'red';
    const displayName = isCommodity ? item.name : `${item.symbol.toUpperCase()}/USDT`;
    const price = item.current_price;
    const priceChange = item.price_change_percentage_24h;
    const icon = isCommodity ? commodityIcons[item.symbol] : null;

    return (
      <Link
        to={createPageUrl(`Trading?symbol=${item.symbol}-USD`)}
        className="grid grid-cols-12 items-center py-3 px-1 border-b border-slate-800 hover:bg-slate-900 transition-colors"
      >
        {/* Name with icon */}
        <div className="col-span-4 flex items-center gap-3">
          {isCommodity && icon ? (
            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
              {icon}
            </div>
          ) : !isCommodity && item.image ? (
            <img src={item.image} alt={item.name} className="w-6 h-6 rounded-full" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">{item.symbol.slice(0, 2).toUpperCase()}</span>
            </div>
          )}
          <span className="font-semibold text-white text-sm">{displayName}</span>
        </div>

        {/* Price */}
        <div className="col-span-4 text-center">
          <span className={`font-semibold text-sm ${changeColor}`}>
            {price !== null ? (price < 1 ? price.toFixed(6) : price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : 'N/A'}
          </span>
        </div>

        {/* 24h Change */}
        <div className="col-span-4 text-right">
          <div
            className="inline-block px-2 py-1 text-white text-xs font-medium rounded"
            style={{ backgroundColor: changeBgColor }}
          >
            {priceChange !== null ? `${isPositive ? '+' : '-'} ${Math.abs(priceChange).toFixed(2)}%` : 'N/A'}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="px-4 py-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">
              {user?.full_name || t('dashboard.greeting')}
            </h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
            <Bell size={20} className="text-gray-400" />
          </button>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Carousel */}
        <div className="relative h-44 rounded-xl overflow-hidden">
          {carouselImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">{t(`dashboard.carousel.title${index + 1}`)}</h3>
                <p className="text-sm text-white/90">
                  {t(`dashboard.carousel.subtitle${index + 1}`)}
                </p>
              </div>
            </div>
          ))}

          {/* Carousel Indicators */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-2.5 h-2.5'
                    : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Announcement Bar - Solar Innovation Message */}
        <div className="bg-black rounded-xl overflow-hidden shadow-lg">
          <style>
            {`
              @keyframes solarMarquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
              .solar-marquee-content {
                animation: solarMarquee 30s linear infinite;
                display: inline-block;
                white-space: nowrap;
                font-weight: 500;
                letter-spacing: 0.025em;
              }
              .announcement-container {
                background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                border: 1px solid rgba(255, 255, 255, 0.1);
              }
            `}
          </style>
          <div className="announcement-container flex items-center p-3 text-white">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full mr-3 flex-shrink-0">
              <Speaker size={16} className="text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="solar-marquee-content">
                <span className="text-white font-medium">
                  {t('dashboard.announcement')}
                </span>
              </div>
            </div>
            <div className="flex items-center ml-3 flex-shrink-0">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300 ml-2">LIVE</span>
            </div>
          </div>
        </div>

        {/* Quick Action Menu */}
        <div className="grid grid-cols-4 gap-3">
          {actionMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex flex-col items-center p-3 bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-2`}>
                <item.icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-medium text-white">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Market Data */}
        <div className="bg-slate-900 rounded-xl p-4 shadow-sm">
          {/* Tab Container */}
          <div className="flex border-b border-slate-700 mb-4">
            <button
              onClick={() => setActiveTab('Crypto')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'Crypto'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400'
              }`}
            >
              {t('dashboard.markets.crypto')}
            </button>
            <button
              onClick={() => setActiveTab('Commodity')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ml-6 ${
                activeTab === 'Commodity'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400'
              }`}
            >
              {t('dashboard.markets.commodities')}
            </button>
          </div>

          {/* Market Header */}
          <div className="grid grid-cols-12 items-center py-2 px-1 border-b border-slate-700 mb-2">
            <p className="col-span-4 text-xs font-medium text-gray-400">{t('dashboard.markets.name')}</p>
            <p className="col-span-4 text-xs font-medium text-gray-400 text-center">{t('dashboard.markets.price')}</p>
            <p className="col-span-4 text-xs font-medium text-gray-400 text-right">{t('dashboard.markets.change')}</p>
          </div>

          {/* Market List */}
          <div className="space-y-1">
            <AnimatePresence>
              {activeTab === 'Crypto' && (
                mockCryptoData.map((coin) => (
                  <MarketItem key={coin.id} item={coin} />
                ))
              )}
              {activeTab === 'Commodity' && (
                commodityData.map((commodity) => (
                  <MarketItem key={commodity.symbol} item={commodity} isCommodity={true} />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}