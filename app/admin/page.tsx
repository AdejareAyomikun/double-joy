"use client";

import Image from "next/image";
import {
  Plus,
  Users,
  UserCog,
  Megaphone,
  Bot,
  Bell,
  Download,
  Settings,
  Search,
  Rocket,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 sm:gap-2 mb-4">
        <div className="flex relative col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search anything..."
            className="px-10 py-3 border border-gray-300 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button className="bg-blue-500 text-white ml-2 p-2 rounded-2xl">Search</button>
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-1 mt-3 ml-20 flex">
          <button className="mx-2">
            <Download />
          </button>
          <button className="mx-2">
            <Rocket />
          </button>
          <button className="mx-2">
            <Settings />
          </button>
          <Image
            src="/images/profile-pic.jpg"
            alt="Profile Picture"
            width={32}
            height={32}
            className="object-contain rounded-full mx-2 mt-2"
          />
        </div>
      </div>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">School Dashboard</h1>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-2xl font-bold text-gray-800">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Active Orders</h2>
          <p className="text-2xl font-bold text-gray-800">78</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Revenue (This Month)</h2>
          <p className="text-2xl font-bold text-gray-800">₦4,560,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Outstanding Fees</h2>
          <p className="text-2xl font-bold text-red-600">₦850,000</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="my-5">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow grid justify-center">
            <div className="space-y-3 text-sm">
              <Users size={50} className="text-green-600 text-center" />
              230 New Students Enrolled
            </div>
            <div className="mt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                <Plus size={16} /> Add New Student
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow grid justify-center">
            <div className="space-y-3 text-sm grid justify-center">
              <UserCog size={50} className="text-blue-600" />
              230 New Students Enrolled
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                <Users size={16} /> Assign Teacher
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow grid justify-center">
            <div className="space-y-3 text-sm grid justify-center">
              <Megaphone size={50} className="text-purple-600" />
              230 New Students Enrolled
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                <Megaphone size={16} /> Send Announcement
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow grid justify-center">
            <div className="grid justify-center space-y-3 text-sm">
              <Megaphone size={50} className="text-purple-600" />
              230 New Students Enrolled
            </div>
            <div className="space-y-3 text-sm">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                <Megaphone size={16} /> Send Announcement
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Alerts */}
      <div className="bg-white p-6 rounded-xl shadow w-1/2">
        <h2 className="text-lg font-semibold mb-4">Smart Alerts</h2>
        <ul className="space-y-3 text-sm">
          <li className="p-3 bg-yellow-50 text-yellow-700 rounded-lg">
            ⚠️ 20 students at risk of failing
          </li>
          <li className="p-3 bg-red-50 text-red-700 rounded-lg">
            ⏳ 15% fees overdue
          </li>
          <li className="p-3 bg-orange-50 text-orange-700 rounded-lg">
            📉 2 teachers with low performance ratings
          </li>
        </ul>
      </div>

      {/* AI Assistant Widget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div></div>
        <div className="bg-white p-6 rounded-xl shadow max-w-sm lg:max-w-screen-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bot size={18} /> AI Assistant
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 p-4 bg-gray-100 rounded-lg flex">
            <div className="col-span-3 flex items-center">
              <Image
                src="/images/profile-pic.jpg"
                alt="Profile Picture"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="font-medium text-gray-800 text-sm mx-3 mt-1">
                Admin User
              </span>
            </div>

            <div className="col-span-1">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-4 h-4 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder='Ask: "Me Anything"'
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-black transition">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
