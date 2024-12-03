import Link from "next/link";
import Button from "../components/Button/Button";

export default function Lenceria() {
  return (
    <div>
      <h1>Lenceria</h1>
      <Link href={"/"}>Home</Link>
      <Button color="red" />
    </div>
  );
}

