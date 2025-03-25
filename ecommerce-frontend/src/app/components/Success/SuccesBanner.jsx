import React from "react";
import Link from "next/link";
import ActionButton from "../shared/styles/Button.styled";
import { StyledSuccessBanner } from "./styles/SuccessBanner.styled";

function SuccesBanner() {
  return (
    <StyledSuccessBanner>
      <div>
        <h1 className="text-2xl font-bold mt-4 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>
      </div>

      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        <ActionButton $secondarycolor="white" $primaryColor="black">
          Return to Home
        </ActionButton>
      </Link>
    </StyledSuccessBanner>
  );
}

export default SuccesBanner;
