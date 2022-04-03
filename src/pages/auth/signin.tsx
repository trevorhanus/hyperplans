import HyperframeLogo from 'components/svg/HyperframeLogo';
import { getCsrfToken } from "next-auth/react"

export interface PageProps {
    csrfToken: string;
}

export default function SignInPage(props: PageProps) {
    return (
        <div className="flex min-h-full">
            <div className="flex flex-col justify-center flex-1 px-4 py-12 lg:justify-start sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="w-full max-w-sm mx-auto lg:w-96">
                    <div>
                        <div className="h-12">
                            <HyperframeLogo fill="#363636" />
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Sign in to HyperPlans
                        </h2>
                    </div>

                    <div className="mt-8">
                        <div>
                            <form
                                action="/api/auth/callback/credentials"
                                method="POST"
                                className="space-y-6"
                            >
                                <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-800 border border-transparent rounded-md shadow-sm bg-hyper-500 hover:bg-hyper-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hyper-500"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative flex-1 hidden w-0 lg:block">
                <img
                    className="absolute inset-0 object-cover w-full h-full"
                    src="/hero.jpeg"
                    alt=""
                />
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
  }
