import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Iuser {
  name: string;
  email: string;
  role: string;
  userId: string;
}
