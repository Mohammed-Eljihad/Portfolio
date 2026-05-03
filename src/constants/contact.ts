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
    value: "+212 6 22 77 91 76",
    href: "https://wa.me/212622779176",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Casablanca, Morocco",
    href: "https://www.google.com/maps/place/Casablanca,+Morocco",
  },
];
