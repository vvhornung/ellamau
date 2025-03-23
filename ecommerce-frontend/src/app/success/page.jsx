import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md text-center">
      <svg
        className="w-16 h-16 mx-auto text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>

      <h1 className="text-2xl font-bold mt-4 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been processed successfully.
      </p>

      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Return to Home
      </Link>
    </div>
  );
}
