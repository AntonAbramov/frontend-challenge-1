import clsx from "clsx";
import { Loader as MantineLoader } from "@mantine/core";

interface LoaderProps {
  absolute?: boolean;
}

export const Loader = ({ absolute = true }: LoaderProps) => {
  return (
    <div className={clsx("z-10 top-0 backdrop-blur-sm left-0 w-full h-full", { absolute: absolute, fixed: !absolute })}>
      <MantineLoader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};
