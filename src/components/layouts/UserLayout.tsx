import { PropsWithChildren } from "@/types/jsx";
import Navbar from "../Navbar";

type Props = PropsWithChildren<{}>;

export default ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
};
