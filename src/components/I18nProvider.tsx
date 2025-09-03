import React, { createContext, useContext, ReactNode } from 'react';

interface I18nContextType {
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<string, string> = {
  'dashboard.greeting': 'Welcome back',
  'dashboard.actions.deposit': 'Deposit',
  'dashboard.actions.withdraw': 'Withdraw',
  'dashboard.actions.balance': 'Balance',
  'dashboard.actions.trade': 'Trade',
  'dashboard.markets.crypto': 'Crypto',
  'dashboard.markets.commodities': 'Commodities',
  'dashboard.markets.name': 'Name',
  'dashboard.markets.price': 'Price',
  'dashboard.markets.change': '24h Change',
  'dashboard.carousel.title1': 'Trade with Confidence',
  'dashboard.carousel.subtitle1': 'Advanced tools for professional trading',
  'dashboard.carousel.title2': 'Secure & Fast',
  'dashboard.carousel.subtitle2': 'Your assets are protected with bank-level security',
  'dashboard.carousel.title3': 'Global Markets',
  'dashboard.carousel.subtitle3': 'Access crypto and commodities worldwide',
  'dashboard.announcement': '🚀 New Solar Energy Trading Pairs Now Available! Trade renewable energy futures with zero fees this month. Join the green revolution in trading!'
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <I18nContext.Provider value={{ t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};