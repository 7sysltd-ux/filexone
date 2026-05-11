import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      <Header />
      <main className="flex-1 pt-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}