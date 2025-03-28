import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center bg-white rounded-3xl shadow-lg p-10 space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-purple-700">
          Distributed Video Transcoder
        </h1>
        <p className="text-gray-700 text-lg">
          Upload your videos for fast, cloud-powered transcoding using idle
          machines across the network.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 pt-6">
          <Link
            href="/signup/client"
            className="block bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            I&apos;m a Client
          </Link>
          <Link
            href="/signup/worker"
            className="block bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            I&apos;m a Worker
          </Link>
        </div>

        <p className="text-sm text-gray-500 pt-4">
          Already have an account?&nbsp;
          <Link
            href="/login"
            className="text-purple-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
