import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

type ContactInfo = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}[];

export const contactInfo: ContactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "eljihad.mohamd18@gmail.com",
    href: "mailto:eljihad.mohamd18@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+212 6 05 00 08 09",
    href: "tel:+212605000809",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Casablanca, Morocco",
    href: "#",
  },
];
