import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Calendar } from "lucide-react";
import { SiWhatsapp, SiInstagram, SiYoutube } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { PHOTOGRAPHER_INFO } from "@/lib/constants";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";

export default function Contact() {
  const phoneDigits = (PHOTOGRAPHER_INFO.phone || "").replace(/\D/g, "");
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<InsertContact | null>(null);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      city: "",
      budget: "",
      message: "",
    },
  });

  const generateWhatsAppLink = (data: InsertContact) => {
    const msg =
      "Hello " + PHOTOGRAPHER_INFO.name + "!\n" +
      "I have an inquiry from the website.\n\n" +
      "Name: " + data.name + "\n" +
      "Event: " + data.eventType + "\n" +
      "Date: " + (data.eventDate || "TBD") + "\n" +
      "City: " + (data.city || "TBD") + "\n" +
      "Budget: " + (data.budget || "TBD") + "\n\n" +
      "Could you please share more details?";
    return `${PHOTOGRAPHER_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
  };


  const contactMutation = useMutation({
    mutationFn: api.contact.submit,
    onSuccess: (_resp, variables) => {
      setLastSubmitted(variables);
      setShowSuccess(true);
      toast({
        title: "Message sent successfully!",
        description: "Please check your email and confirm on WhatsApp.",
      });
      form.reset();
      setTimeout(() => {
        const link = generateWhatsAppLink(variables);
        window.open(link, "_blank");
      }, 1500);
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const whatsappMessage = encodeURIComponent(
    "Hi Himanshu, I'm interested in your photography services. Could you please share more details?"
  );

  const contactItems = [
    {
      icon: Phone,
      label: "Phone",
      value: PHOTOGRAPHER_INFO.phone,
      sub: "Available 24 x 7",
      testId: "contact-phone",
      href: `tel:${phoneDigits}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: PHOTOGRAPHER_INFO.email,
      sub: "We'll respond within 24 hours",
      testId: "contact-email",
      href: `mailto:${PHOTOGRAPHER_INFO.email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: PHOTOGRAPHER_INFO.address,
      sub: "Serving across Madhya Pradesh",
      testId: "contact-address",
      href: null as null | string,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon - Sat: 9:00 AM - 9:00 PM",
      sub: "Sunday: By appointment only",
      testId: null as null | string,
      href: null as null | string,
    },
  ];

  const socialLinks = [
    { label: "Call", href: `tel:${phoneDigits}`, icon: Phone, testId: "link-call", external: false },
    { label: "WhatsApp", href: `${PHOTOGRAPHER_INFO.whatsapp}?text=${whatsappMessage}`, icon: SiWhatsapp, testId: "link-whatsapp", external: true },
    { label: "Instagram", href: PHOTOGRAPHER_INFO.instagram, icon: SiInstagram, testId: "link-instagram", external: true },
    { label: "YouTube", href: PHOTOGRAPHER_INFO.youtube, icon: SiYoutube, testId: "link-youtube", external: true },
  ];

  return (
    <div className="pt-16 bg-background min-h-screen">

      {/* -- Hero Banner -- */}
      <section className="relative py-20 overflow-hidden bg-muted grain-overlay">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full opacity-[0.06] blur-[120px]" style={{ background: "var(--gold)" }} />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.07] blur-[100px]" style={{ background: "var(--gold-dim)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              className="inline-block text-xs font-cinzel tracking-[0.3em] uppercase mb-4"
              style={{ color: "var(--gold)", opacity: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.2 }}
            >
              Let's Create Together
            </motion.span>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5 gradient-text-gold font-playfair"
              data-testid="contact-title"
            >
              Get In Touch
            </h1>

            <div className="section-divider mb-6" />

            <p
              className="text-muted-foreground text-xl max-w-2xl mx-auto font-cormorant"
              data-testid="contact-subtitle"
            >
              Ready to capture your most cherished moments? Let's discuss your vision
              and craft something truly beautiful together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* -- Limited Time Offer -- */}
      <section className="py-10 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border shadow-[var(--shadow-gold)]"
            style={{ borderColor: "var(--gold-dim)" }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsl(38,60%,10%), hsl(38,40%,8%), hsl(38,60%,10%))" }} />
            <div className="relative z-10 p-7 sm:p-10 text-center">
              <motion.span
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="inline-block text-black px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest font-cinzel mb-5"
                style={{ background: "var(--gold)" }}
              >
                ** Limited Time Offer **
              </motion.span>

              <h3 className="text-2xl sm:text-3xl font-bold gradient-text-gold font-playfair mb-2">
                Get 10% OFF on Immediate Advance Payment!
              </h3>

              <p className="text-base mb-6 font-cormorant text-lg opacity-90" style={{ color: "var(--gold-light)" }}>
                Pay 20% advance immediately and save 10% on your total booking
              </p>

              <div className="glass-gold rounded-xl p-4 max-w-sm mx-auto">
                <p className="text-sm text-white/80 leading-relaxed">
                  <strong style={{ color: "var(--gold)" }}>Example:</strong> For a Rs.50,000 package
                  <br />
                  Advance (20%): Rs.10,000 &nbsp;|&nbsp; You Save: Rs.5,000
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* -- Main Grid: Info + Form -- */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

            {/* --- LEFT: Contact Info --- */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl font-playfair font-bold gradient-text-gold mb-2"
                data-testid="contact-info-title"
              >
                Let's Connect
              </h2>
              <div className="section-divider mb-8" style={{ margin: "0.5rem 0 2rem 0" }} />

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactItems.map(({ icon: Icon, label, value, sub, testId, href }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 320 }}
                    className="card-gold-border glass rounded-xl p-5 flex items-start gap-4 group"
                  >
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-colors group-hover:opacity-100"
                      style={{ background: "rgba(245,180,60,0.10)", border: "1px solid var(--gold-dim)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <p className="text-xs font-cinzel tracking-widest uppercase mb-1" style={{ color: "var(--gold)", opacity: 0.7 }}>
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="font-semibold text-white hover:opacity-80 transition-opacity block"
                          data-testid={testId ?? undefined}
                          style={{ transition: "color 0.2s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "white")}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-semibold text-white" data-testid={testId ?? undefined}>
                          {value}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* --- Social Buttons --- */}
              <div className="mt-10">
                <p className="text-xs font-cinzel tracking-widest uppercase mb-4" style={{ color: "var(--gold)", opacity: 0.7 }}>
                  Connect With Us
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(({ label, href, icon: Icon, testId, external }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      data-testid={testId}
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold glass-gold transition-all duration-200 shadow-[var(--shadow-gold-sm)] group"
                      style={{ border: "1px solid var(--gold-dim)", color: "var(--gold)" }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "var(--gold)";
                        el.style.color = "black";
                        el.style.borderColor = "var(--gold)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "";
                        el.style.color = "var(--gold)";
                        el.style.borderColor = "var(--gold-dim)";
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* --- RIGHT: Form / Success --- */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                {showSuccess && lastSubmitted ? (
                  /* -- Success -- */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-gold rounded-2xl p-10 text-center shadow-[var(--shadow-gold)]"
                    style={{ border: "1px solid var(--gold-dim)" }}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse"
                      style={{ background: "rgba(245,180,60,0.10)", border: "1px solid var(--gold-dim)" }}
                    >
                      <CheckCircle2 className="w-10 h-10" style={{ color: "var(--gold)" }} />
                    </div>
                    <h3 className="text-3xl font-bold mb-3 font-playfair gradient-text-gold">
                      Application Received!
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      A confirmation email has been sent to{" "}
                      <strong className="text-white">{lastSubmitted.email}</strong>.
                    </p>
                    <div className="glass rounded-xl p-5 mb-8 text-left mt-6">
                      <p className="text-xs font-cinzel tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                        Next Step
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Confirm your details on WhatsApp to get an immediate response.
                        Your message has been pre-filled for you!
                      </p>
                    </div>
                    <a
                      href={generateWhatsAppLink(lastSubmitted)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        size="lg"
                        className="w-full btn-gold h-12 text-base font-semibold font-cinzel tracking-wider animate-glow-pulse"
                      >
                        <SiWhatsapp className="mr-2 h-5 w-5" />
                        Confirm on WhatsApp
                      </Button>
                    </a>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="mt-5 text-xs text-muted-foreground underline transition-colors"
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "")}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* -- Contact Form -- */
                  <div
                    key="form"
                    className="glass rounded-2xl p-7 sm:p-9 shadow-[var(--shadow-gold-sm)]"
                    style={{ border: "1px solid rgba(245,180,60,0.20)" }}
                  >
                    <div className="mb-7">
                      <span className="text-xs font-cinzel tracking-[0.25em] uppercase" style={{ color: "var(--gold)", opacity: 0.7 }}>
                        Inquiry Form
                      </span>
                      <h3 className="text-2xl font-playfair font-bold text-white mt-1 mb-1">
                        Send a Message
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Fill in the details below and we'll get back to you shortly.
                      </p>
                    </div>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                        data-testid="contact-form"
                      >
                        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                        {/* Name + Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-cinzel tracking-wider uppercase" style={{ color: "var(--gold)", opacity: 0.8 }}>
                                  Name *
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="Your full name"
                                      {...field}
                                      className="pl-9 bg-[#141414] text-white placeholder:text-white/30 focus-visible:ring-[var(--gold)]"
                                      style={{ borderColor: "rgba(245,180,60,0.30)" }}
                                      data-testid="input-name"
                                    />
                                    <span className="absolute left-3 top-2.5 text-sm" style={{ color: "var(--gold)", opacity: 0.6 }}>*</span>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-cinzel tracking-wider uppercase" style={{ color: "var(--gold)", opacity: 0.8 }}>
                                  Phone *
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="+91 98765 43210"
                                      {...field}
                                      className="pl-9 bg-[#141414] text-white placeholder:text-white/30 focus-visible:ring-[var(--gold)]"
                                      style={{ borderColor: "rgba(245,180,60,0.30)" }}
                                      data-testid="input-phone"
                                    />
                                    <Phone className="absolute left-3 top-3 h-4 w-4" style={{ color: "var(--gold)", opacity: 0.6 }} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Email */}
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-cinzel tracking-wider uppercase" style={{ color: "var(--gold)", opacity: 0.8 }}>
                                Email *
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    {...field}
                                    className="pl-9 bg-[#141414] text-white placeholder:text-white/30 focus-visible:ring-[var(--gold)]"
                                    style={{ borderColor: "rgba(245,180,60,0.30)" }}
                                    data-testid="input-email"
                                  />
                                  <Mail className="absolute left-3 top-3 h-4 w-4" style={{ color: "var(--gold)", opacity: 0.6 }} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Event Type + Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="eventType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-cinzel tracking-wider uppercase" style={{ color: "var(--gold)", opacity: 0.8 }}>
                                  Event Type *
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} data-testid="select-event-type">
                                  <SelectTrigger className="bg-[#141414] text-white focus:ring-[var(--gold)]" style={{ borderColor: "rgba(245,180,60,0.30)" }}>
                                    <SelectValue placeholder="Select event type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="wedding">Wedding Films</SelectItem>
                                    <SelectItem value="pre-wedding">Pre-Wedding</SelectItem>
                                    <SelectItem value="engagement">Engagement</SelectItem>
                                    <SelectItem value="haldi">Haldi Ceremony</SelectItem>
                                    <SelectItem value="mehndi">Mehndi Ceremony</SelectItem>
                                    <SelectItem value="baby-shower">Baby Shower</SelectItem>
                                    <SelectItem value="maternity">Maternity</SelectItem>
                                    <SelectItem value="newborn">Newborn</SelectItem>
                                    <SelectItem value="family">Family Portrait</SelectItem>
                                    <SelectItem value="corporate">Corporate Event</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="eventDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-cinzel tracking-wider uppercase" style={{ color: "var(--gold)", opacity: 0.8 }}>
                                  Event Date
                                </FormLabel>
                                <FormControl>
                                  <Controller
                                    control={form.control}
                                    name="eventDate"
                                    render={({ field: ctlField }) => (
                                      <div className="relative">
                                        <DatePicker
                                          selected={ctlField.value ? new Date(ctlField.value) : null}
                                          onChange={(d) => {
                                            if (!d) return ctlField.onChange("");
                                            ctlField.onChange(d.toISOString().slice(0, 10));
                                          }}
                                          placeholderText="Select event date"
                                          className="w-full pl-10 pr-4 py-2 text-sm rounded-md text-white bg-[#141414] border border-[rgba(245,180,60,0.30)] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[hsl(38,92%,58%)] transition-all"
                                          dateFormat="dd MMM yyyy"
                                          data-testid="input-event-date"
                                          calendarClassName="datepicker-gold"
                                          wrapperClassName="w-full"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none h-4 w-4" style={{ color: "var(--gold)", opacity: 0.6 }} />
                                      </div>
                                    )}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* City + Budget */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-cinzel tracking-wider uppercase" style={{ color: "var(--gold)", opacity: 0.8 }}>
                                  City
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="Event city"
                                      {...field}
                                      value={field.value || ""}
                                      className="pl-9 bg-[#141414] text-white placeholder:text-white/30 focus-visible:ring-[var(--gold)]"
                                      style={{ borderColor: "rgba(245,180,60,0.30)" }}
                                      data-testid="input-city"
                                    />
                                    <MapPin className="absolute left-3 top-3 h-4 w-4" style={{ color: "var(--gold)", opacity: 0.6 }} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-cinzel tracking-wider uppercase" style={{ color: "var(--gold)", opacity: 0.8 }}>
                                  Budget Range
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value || ""} data-testid="select-budget">
                                  <SelectTrigger className="bg-[#141414] text-white focus:ring-[var(--gold)]" style={{ borderColor: "rgba(245,180,60,0.30)" }}>
                                    <SelectValue placeholder="Select budget range" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="10000-25000">Rs.10,000 - Rs.25,000</SelectItem>
                                    <SelectItem value="25000-50000">Rs.25,000 - Rs.50,000</SelectItem>
                                    <SelectItem value="50000-100000">Rs.50,000 - Rs.1,00,000</SelectItem>
                                    <SelectItem value="100000+">Rs.1,00,000+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Message */}
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-cinzel tracking-wider uppercase" style={{ color: "var(--gold)", opacity: 0.8 }}>
                                Message
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={4}
                                  placeholder="Tell us about your event..."
                                  {...field}
                                  value={field.value || ""}
                                  className="bg-[#141414] text-white placeholder:text-white/30 focus-visible:ring-[var(--gold)] resize-none"
                                  style={{ borderColor: "rgba(245,180,60,0.30)" }}
                                  data-testid="textarea-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Submit */}
                        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                          <Button
                            type="submit"
                            className="w-full btn-gold h-12 text-base font-semibold font-cinzel tracking-widest"
                            disabled={contactMutation.isPending}
                            data-testid="button-submit-contact"
                          >
                            {contactMutation.isPending ? (
                              "Sending..."
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </motion.div>

                        <p className="text-xs text-muted-foreground text-center">
                          By clicking send, you agree to receive messages on WhatsApp and Email.
                        </p>
                      </form>
                    </Form>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- Google Maps -- */}
      <section className="py-16 bg-muted/30 relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.04] blur-[100px]" style={{ background: "var(--gold)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-cinzel tracking-[0.3em] uppercase" style={{ color: "var(--gold)", opacity: 0.7 }}>
              Our Studio
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold gradient-text-gold mt-2 mb-3">
              Find Us on the Map
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Located in the heart of Satna, Madhya Pradesh - easily accessible for
              consultations and creative meetings.
            </p>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-gold)]"
            style={{ border: "1px solid rgba(245,180,60,0.20)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117743.03449669226!2d80.73270109453122!3d24.570344184712048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39823e9b9f18c2df%3A0x13a8ddbf0f14b5a!2sSatna%2C%20Madhya%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1694623729000!5m2!1sen!2sus"
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="google-maps-embed"
            />
            <div className="absolute top-4 left-4 glass-gold rounded-xl px-4 py-2 shadow-[var(--shadow-gold-sm)]" style={{ border: "1px solid var(--gold-dim)" }}>
              <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--gold)" }}>
                <MapPin className="w-4 h-4" />
                <span>Satna, Madhya Pradesh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
