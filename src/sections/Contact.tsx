import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SectionHeader } from "@/components/SectionHeader";
import { Section } from "@/components/Section";
import emailjs from "@emailjs/browser";
import { AlertCircle, CheckCircle, Send } from "lucide-react";
import type { FormEvent } from "react";
import { useReducer, useState } from "react";
import { HandleFetching } from "@/utils/handleFetching";
import { contactInfo } from "@/constants/contact";
import { motion, type Variants } from "framer-motion";

type FormProps = {
  name: string;
  email: string;
  msg: string;
};

type InitialSubmitStatus = {
  loading?: boolean;
  type: string;
  payload?: string;
};

const initialSubmitStatus: InitialSubmitStatus = {
  loading: false,
  type: HandleFetching.pending,
  payload: "",
};

const reducer = (state: InitialSubmitStatus, action: InitialSubmitStatus) => {
  switch (action.type) {
    case HandleFetching.pending:
      return {
        loading: true,
        type: HandleFetching.pending,
        payload: "",
      };
    case HandleFetching.error:
      return {
        loading: false,
        type: HandleFetching.error,
        payload: "Failed to send message. Please try again later.",
      };
    case HandleFetching.success:
      return {
        loading: false,
        type: HandleFetching.success,
        payload: "Message sent successfully! I'll get back to you soon.",
      };
    default:
      return state;
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

function Contact() {
  const [formData, setFormData] = useState<FormProps>({
    name: "",
    email: "",
    msg: "",
  });
  const [submitStatus, dispatchSubmit] = useReducer<
    InitialSubmitStatus,
    [action: InitialSubmitStatus]
  >(reducer, initialSubmitStatus);

  const handlingSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatchSubmit({ type: HandleFetching.pending });

      const serviceId: string = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId: string = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey: string = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables.",
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        { name: formData.name, email: formData.email, message: formData.msg },
        publicKey,
      );
      dispatchSubmit({ type: HandleFetching.success });

      setFormData({ name: "", email: "", msg: "" });
    } catch (err) {
      dispatchSubmit({ type: HandleFetching.error });
      console.log(err);
    }
  };

  return (
    <Section id="contact">
      <div className="container mx-auto relative overflow-hidden px-6">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <SectionHeader
          isCenter={true}
          spanTitle="get in touch"
          sectionTitle="Let's build"
          spanSectionTitle="something great."
          paragraph="Have a project in mind? I'd love to hear about it. Send me a message or call me and let's discuss how we can work together."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto mt-16"
        >
          {/* Left Column: Form */}
          <motion.div variants={leftVariants}>
            <div className="glass p-8 md:p-10 rounded-[2rem] glow-border shadow-xl relative overflow-hidden group/form">
              {/* Form Spotlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <form action="" className="space-y-6 relative z-10" onSubmit={handlingSubmit}>
                <div className="space-y-2">
                  <Input
                    label="Name"
                    type="text"
                    hint="Your Name"
                    isRequired
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    label="Email"
                    type="email"
                    hint="your.email@example.com"
                    isRequired
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2 group/input">
                  <label
                    htmlFor="msg"
                    className="block text-sm font-medium text-foreground mb-1 group-focus-within/input:text-primary transition-colors"
                  >
                    Message
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <textarea
                    id="msg"
                    rows={6}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full rounded-2xl border border-border/50 bg-background/50 px-5 py-4 outline-none transition-all duration-300
                        focus:border-primary focus:ring-1 focus:ring-primary focus:bg-background shadow-sm hover:border-border
                        disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                    value={formData.msg}
                    onChange={(e) =>
                      setFormData({ ...formData, msg: e.target.value })
                    }
                  />
                </div>

                <Button
                  className="w-full h-14 text-base font-semibold rounded-2xl shadow-[0_0_20px_rgba(32,178,166,0.3)] hover:shadow-[0_0_30px_rgba(32,178,166,0.5)] transition-all duration-300 hover:-translate-y-1 group/btn"
                  size="lg"
                  type="submit"
                  disabled={submitStatus.loading}
                >
                  {submitStatus.loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </span>
                  )}
                </Button>

                {(submitStatus.type === HandleFetching.success ||
                  submitStatus.type === HandleFetching.error) &&
                  submitStatus.payload && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-3
                        p-4 rounded-2xl mt-4 border ${
                          submitStatus.type === HandleFetching.success
                            ? "bg-green-500/10 border-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                            : "bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                        }`}
                    >
                      {submitStatus.type === HandleFetching.success ? (
                        <CheckCircle className="w-5 h-5 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 shrink-0" />
                      )}
                      <p className="text-sm font-medium">{submitStatus.payload}</p>
                    </motion.div>
                  )}
              </form>
            </div>
          </motion.div>

          {/* Right Column: Contact Info */}
          <motion.div variants={rightVariants} className="space-y-8">
            <div className="p-8 md:p-10 glass rounded-[2rem] glow-border shadow-xl">
              <h3 className="text-2xl font-bold mb-8 text-foreground">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.href}
                    target={
                      contact.href.startsWith("mailto:") ||
                      contact.href.startsWith("tel:")
                        ? "_self"
                        : "_blank"
                    }
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 p-4 rounded-2xl hover:bg-background/50 border border-transparent hover:border-border transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex justify-center items-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <contact.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm font-medium mb-1">
                        {contact.label}
                      </div>
                      <div className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {contact.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="glass rounded-[2rem] p-8 glow-border relative overflow-hidden group/avail shadow-lg">
              {/* Animated subtle background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover/avail:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-background"></span>
                  </div>
                  <span className="text-xl font-bold text-foreground">Currently Available</span>
                </div>
                <p className="text-muted-foreground/90 text-base leading-relaxed">
                  I'm currently open to new opportunities and exciting projects.
                  Whether you need a full-time engineer or a freelance consultant,
                  let's talk!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

export default Contact;
