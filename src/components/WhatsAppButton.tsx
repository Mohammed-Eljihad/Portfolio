import { motion } from "framer-motion";
import { contactInfo } from "@/constants/contact";

export function WhatsAppButton() {
  const whatsappUrl = contactInfo.find(info => info.href.includes("wa.me"))?.href || "https://wa.me/212622779176";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-shadow text-white cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        boxShadow: "0 8px 30px rgba(37, 211, 102, 0.4)",
      }}
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5
      }}
      whileHover={{ 
        scale: 1.1, 
        y: -4,
        boxShadow: "0 12px 35px rgba(37, 211, 102, 0.6)"
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contact on WhatsApp"
    >
      {/* Modern WhatsApp SVG icon */}
      <svg
        className="w-7 h-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.115-2.887-6.979C16.48 1.9 14.017.875 11.378.875 5.942.875 1.518 5.296 1.514 10.739c-.001 1.677.443 3.31 1.285 4.757l-.986 3.6 3.693-.969zm11.722-4.947c-.318-.16-1.883-.93-2.175-1.038-.29-.108-.503-.16-.714.162-.21.32-.816 1.037-.999 1.252-.183.216-.367.243-.685.082-.319-.16-1.348-.497-2.567-1.583-.948-.847-1.59-1.893-1.777-2.213-.186-.32-.02-.492.14-.65.143-.143.318-.372.477-.558.16-.186.213-.318.319-.53.106-.213.053-.4-.027-.559-.08-.16-.714-1.725-.979-2.36-.258-.622-.52-.538-.714-.548-.185-.01-.397-.012-.61-.012s-.558.08-.85.4c-.29.32-1.114 1.09-1.114 2.658 0 1.568 1.14 3.082 1.3 3.302.16.22 2.244 3.427 5.437 4.802.76.327 1.353.521 1.815.669.764.243 1.46.21 2.01.127.613-.092 1.884-.77 2.15-1.518.267-.747.267-1.387.188-1.518-.08-.13-.291-.21-.609-.37z" />
      </svg>
    </motion.a>
  );
}
