import { Menu, Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import cn from 'classnames';
import { useSession } from 'hooks/useSession';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, Fragment } from 'react';

export interface NavHeaderProps {
}

const NavHeader: FC<NavHeaderProps> = () => {
    const router = useRouter();
    const { user } = useSession();

    const isCurrentRoute = (path: string) => {
        return router.pathname.startsWith(path);
    };

    return (
        <Popover className="relative z-10 bg-white border-b border-gray-200">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left side of nav */}
                    <div className="flex">
                        <div className="flex items-center flex-shrink-0">
                            <Link href="/">
                                <a>
                                    <span className="sr-only">
                                        Leslie Cards
                                    </span>
                                    Floor Planner
                                    {/* <img
                                        className="w-auto h-8 sm:h-10"
                                        src="/logo/logo3.svg"
                                        alt="Leslie Cards"
                                    /> */}
                                </a>
                            </Link>
                        </div>
                    </div>

                    {/* User dropdown on desktop */}
                    <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
                        <UserDropdownDesktop />
                    </div>

                    {/* Hamburger menu on mobile */}
                    <div className="flex items-center md:hidden">
                        {user && (
                            <Popover.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leslie-500">
                                <span className="sr-only">Open user menu</span>
                                <div className="px-2 text-sm font-medium text-gray-500">
                                    {user.displayName}
                                </div>
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src={user.picture}
                                    alt=""
                                />
                            </Popover.Button>
                        )}

                        {!user && (
                            <div className="">
                                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-leslie-500">
                                    <span className="sr-only">Open menu</span>
                                    <MenuIcon
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                    />
                                </Popover.Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile popover menu */}
                    <MobilePopoverNav />
                </div>
            </div>
        </Popover>
    );
};

export interface UserDropdownDesktopProps {}

const UserDropdownDesktop: FC<UserDropdownDesktopProps> = (props) => {
    const router = useRouter();
    const { isLoading, error, user } = useSession();

    if (isLoading) {
        return null;
    }

    // if (!user) {
    //     return null;
    // }

    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leslie-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="px-2 text-sm font-medium text-gray-500">
                        {user?.displayName}
                    </div>
                    <img
                        className="w-8 h-8 rounded-full"
                        src={user?.picture}
                        alt=""
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 w-64 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3 border-b">
                        <p className="text-sm leading-5">Signed in as</p>
                        <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                            {user && user.email}
                        </p>
                    </div>

                    <div className="py-1">

                        <Menu.Item>
                            {({ active }) => (
                                <span>
                                    <Link href="/dashboard">
                                        <a
                                            className={`${
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700'
                                            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                        >
                                            Dashboard
                                        </a>
                                    </Link>
                                </span>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <span>
                                    <Link href="/account">
                                        <a
                                            className={`${
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700'
                                            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                        >
                                            Account
                                        </a>
                                    </Link>
                                </span>
                            )}
                        </Menu.Item>
                    </div>

                    <div className="py-1 border-t">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/api/logout"
                                    className={`${
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                    Sign Out
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export interface MobilePopoverNavProps {}

const MobilePopoverNav: FC<MobilePopoverNavProps> = (props) => {
    const router = useRouter();
    const { user } = useSession();

    const isCurrentRoute = (path: string) => {
        return router.pathname.startsWith(path);
    };

    return (
        <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <Popover.Panel
                focus
                className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden"
            >
                <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
                    <div className="px-5 pt-5 pb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <img
                                    className="w-auto h-8 transform scale-125"
                                    src="/logo/logo3.svg"
                                    alt="Workflow"
                                />
                            </div>
                            <div className="-mr-2">
                                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-leslie-500">
                                    <span className="sr-only">Close menu</span>
                                    <XIcon
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                    />
                                </Popover.Button>
                            </div>
                        </div>
                        <div className="mt-6 -mx-5">
                            <nav className="pt-2 pb-3 space-y-1">
                                { user && (
                                    <Popover.Button as="div">
                                        <Link href="/dashboard">
                                            <a
                                                className={cn(
                                                    isCurrentRoute('/dashboard')
                                                        ? 'bg-leslie-50 border-leslie-500 text-leslie-700'
                                                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                                )}
                                            >
                                                Dashboard
                                            </a>
                                        </Link>
                                    </Popover.Button>
                                )}
                                <Popover.Button as="div">
                                    <Link href="/cards">
                                        <a
                                            className={cn(
                                                isCurrentRoute('/cards')
                                                    ? 'bg-leslie-50 border-leslie-500 text-leslie-700'
                                                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                            )}
                                        >
                                            Cards
                                        </a>
                                    </Link>
                                </Popover.Button>
                                { !user && (
                                    <Popover.Button as="div">
                                        <Link href="/wizard">
                                            <a
                                                className={cn(
                                                    isCurrentRoute('/wizard')
                                                        ? 'bg-leslie-50 border-leslie-500 text-leslie-700'
                                                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                                )}
                                            >
                                                Schedule a birthday
                                            </a>
                                        </Link>
                                    </Popover.Button>
                                )}
                            </nav>
                        </div>
                    </div>
                    <div className="py-6">
                        {user && (
                            <>
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={user.picture}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">
                                            {user.displayName}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <Popover.Button as="div">
                                        <Link href="/account">
                                            <a className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                                Account
                                            </a>
                                        </Link>
                                    </Popover.Button>
                                    { user.isAdmin && (
                                        <Popover.Button as="div">
                                            <Link href="/_admin">
                                                <a className="block px-5 py-3 text-base font-medium text-gray-500 border-t border-b hover:text-gray-800 hover:bg-gray-100">
                                                    Admin Dashboard
                                                </a>
                                            </Link>
                                        </Popover.Button>
                                    )}
                                    <Popover.Button as="div">
                                        <Link href="/api/logout">
                                            <a className="block px-5 py-3 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                                Sign Out
                                            </a>
                                        </Link>
                                    </Popover.Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Popover.Panel>
        </Transition>
    );
};

export default NavHeader;
