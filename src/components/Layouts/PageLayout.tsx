import { ReactNode } from "react";
import Navbar from "../Navbar";

interface Props {
  children: ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">{children}</div>
    </>
  );
}
