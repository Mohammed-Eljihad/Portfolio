import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SectionHeader } from "@/components/SectionHeader";
import { Section } from "@/components/Section";
import emailjs from "@emailjs/browser";
import { AlertCircle, CheckCircle, Send} from "lucide-react";
import { useReducer, useState } from "react";
import { HandleFetching } from "@/utils/handleFetching";
import { contactInfo } from "@/constants/contact";


type FormProps = {
  name: string;
  email: string;
  msg: string;
}

type InitialSubmitStatus = {
  loading?: boolean;
  type: string ;
  payload?: string;
}

const  initialSubmitStatus: InitialSubmitStatus = {
  loading: false,
  type: HandleFetching.pending,
  payload: "",
}

const reducer = (state: InitialSubmitStatus, action: InitialSubmitStatus) => {
  switch (action.type) {
    case HandleFetching.pending:
      return {
        loading: true,
        type: HandleFetching.pending,
        payload: ""
      }
    case HandleFetching.error:
      return {
        loading: false,
        type: HandleFetching.error,
        payload: "Failed to send message. Please try again later."
      }
    case HandleFetching.success:
      return {
        loading: false,
        type: HandleFetching.success,
        payload: "Message sent successfully! I'll get back to you soon."
      }
    default:
      return state;
  }
}

function Contact() {
  const [formData, setFormData] = useState<FormProps>({ name: "", email: "", msg: "" });
  const [submitStatus, dispatchSubmit] = useReducer<InitialSubmitStatus, [action: InitialSubmitStatus]>(reducer, initialSubmitStatus);

  const handlingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatchSubmit({ type: HandleFetching.pending });

      const serviceId: string = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId: string = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey: string = import.meta.env.VITE_EMAILJS_PUBLIC_KEY; 

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      }

      await emailjs.send(serviceId, templateId, { name: formData.name, email: formData.email, message: formData.msg }, publicKey);
      dispatchSubmit({ type: HandleFetching.success });

      setFormData({ name: "", email: "", msg: "" });
    } catch (err)  {
      dispatchSubmit({ type: HandleFetching.error });
      console.log(err)
    }

    

  }
  return <Section id="contact">
    <div className="container mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div> 

      <SectionHeader
        isCenter={true}
        spanTitle="get in touch"
        sectionTitle="Let's build"
        spanSectionTitle="something great."
        paragraph="Have a project in mind? I'd love to hear about it. Send me a message or call me and let's discuss how we can work together." />
      
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="glass p-8 rounded-3xl border border-primary/30 animate-fade-in animation-delay-300">
          <form action="" className="space-y-6" onSubmit={handlingSubmit}>
            <Input
              label="Name"
              type="text"
              hint="Your Name..."
              isRequired
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

            <Input
              label="Email"
              type="email"
              hint="your@email.com"
              isRequired
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            
            <div className="space-y-2">
            <label
            htmlFor="msg"
            className="block text-sm font-medium text-foreground">
            Message
            <span className="text-red-500 ml-1">*</span>
            </label>

            <textarea
              id="msg"
              rows={5}
                  required
                  placeholder="Your Message..."
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-all
                      focus:border-primary focus:ring-1 focus:ring-primary
                      disabled:opacity-50 disabled:cursor-not-allowed"
              value={formData.msg}
              onChange={(e) => setFormData({ ...formData, msg: e.target.value })} />
            </div>

            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={submitStatus.loading}
            >
              {submitStatus.loading ? "Sending..." : <>Send Message <Send className="w-5 h-5" /></>}
            </Button>

            {submitStatus.type === (HandleFetching.error && HandleFetching.success) && (
              <div
                  className={`flex items-center gap-3
                      p-4 rounded-xl ${
                      submitStatus.type ===  HandleFetching.success
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                >
                  {submitStatus.type ===  HandleFetching.success ? (
                    <CheckCircle className="w-5 h-5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.payload}</p>
                </div>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y2 animate-fade-in animation-delay-400">
          <div className="p-8 glass rounded-3xl">
            <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
            <div >
              {contactInfo.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group">
                  
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex justify-center items-center group-hover:bg-primary/20 transition-colors ">
                      <contact.icon className="w-5 h-5 text-primary"/>
                    </div>
                      <div>
                        <div className="text-muted-foreground text-sm">{contact.label}</div>
                        <div className="font-medium">{contact.value}</div>
                      </div>
                </a>
              ))}
            </div>
          </div>

          {/* Availability card */}
          <div className="glass rounded-3xl p-8 border border-primary/30 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Currently Available</span>
              </div>
              <p className="text-muted-foreground text-sm">
                I'm currently open to new opportunities and exciting projects.
                Whether you need a full-time engineer or a freelance consultant,
                let's talk!
              </p>
            </div>
        </div>
      </div>
    </div>
    </Section>
}

export default Contact;



