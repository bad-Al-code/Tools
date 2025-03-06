import Link from 'next/link';

interface DashboardLink {
    title: string;
    href: string;
    description: string;
    bgColor: string;
    textColor: string;
    iconColor: string;
    icon: string;
}

const dashboardLinks: DashboardLink[] = [
    {
        title: 'Tasks',
        href: 'dashboard/tasks',
        description: 'View, organize, and manage your daily tasks.',
        bgColor: 'bg-blue-100 hover:bg-blue-200',
        textColor: 'text-blue-800',
        iconColor: 'text-blue-500',
        icon: '📋',
    },
    {
        title: 'Analytics',
        href: 'dashboard/analytics',
        description: 'Gain insights into your performance and trends.',
        bgColor: 'bg-green-100 hover:bg-green-200',
        textColor: 'text-green-800',
        iconColor: 'text-green-500',
        icon: '📊',
    },
    {
        title: 'Settings',
        href: 'dashboard/settings',
        description: 'Customize and tweak your dashboard settings.',
        bgColor: 'bg-purple-100 hover:bg-purple-200',
        textColor: 'text-purple-800',
        iconColor: 'text-purple-500',
        icon: '⚙️',
    },
    {
        title: 'Users',
        href: 'dashboard/users',
        description: 'View and manage your user base.',
        bgColor: 'bg-yellow-100 hover:bg-yellow-200',
        textColor: 'text-yellow-800',
        iconColor: 'text-yellow-500',
        icon: '👥',
    },
];

export default function DashboardHome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">
                        Dashboard
                    </h1>
                    <p className="text-lg text-gray-600 mt-3">
                        Welcome back! Here you can manage your tasks, view
                        analytics, and make adjustments.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dashboardLinks.map(
                        ({
                            title,
                            href,
                            description,
                            bgColor,
                            textColor,
                            iconColor,
                            icon,
                        }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`${bgColor} p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105`}
                            >
                                <div className="flex items-center justify-between">
                                    <h2
                                        className={`text-xl font-semibold ${textColor}`}
                                    >
                                        {title}
                                    </h2>
                                    <span className={`${iconColor} text-2xl`}>
                                        {icon}
                                    </span>
                                </div>
                                <p className="text-gray-700 mt-2">
                                    {description}
                                </p>
                            </Link>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
