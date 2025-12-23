import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Clock, Camera, Image, Aperture } from "lucide-react";
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
    const msg = `Hello ${PHOTOGRAPHER_INFO.name} 👋
I have an inquiry from the website.

Name: ${data.name}
Event: ${data.eventType}
Date: ${data.eventDate || "TBD"}
City: ${data.city || "TBD"}
Budget: ${data.budget || "TBD"}

Could you please share more details?`;
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

      // Auto-open WhatsApp after a short delay
      setTimeout(() => {
        const link = generateWhatsAppLink(variables);
        window.open(link, '_blank');
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

  return (
    <div className="pt-16">
      <section className="py-16 bg-muted relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-blue-400" style={{ fontFamily: "'Pacifico', cursive" }} data-testid="contact-title">
              Get In Touch
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="contact-subtitle">
              Ready to capture your special moments? Let's discuss your wedding films needs and create something beautiful together.
            </p>
          </motion.div>

          {/* Limited Time Offer Banner */}
          <motion.div
            className="mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 shadow-2xl border-2 border-blue-400">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                    Limited Time Offer
                  </span>
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2" style={{ fontFamily: "'Pacifico', cursive" }}>
                  Get 10% OFF on Immediate Advance Payment!
                </h3>
                <p className="text-white/90 text-lg mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Pay 20% advance immediately and save 10% on your total booking
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-white text-sm">
                    <strong>Example:</strong> For a ₹50,000 package:<br />
                    Advance (20%): ₹10,000 | Final Price with 10% OFF: ₹45,000
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-playfair font-semibold mb-6" data-testid="contact-info-title">
                Let's Connect
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-lg mr-4">
                    <Phone className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground" data-testid="contact-phone">{PHOTOGRAPHER_INFO.phone}</p>
                    <p className="text-sm text-muted-foreground">Available 24 X 7</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground" data-testid="contact-email">{PHOTOGRAPHER_INFO.email}</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-accent p-3 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground" data-testid="contact-address">{PHOTOGRAPHER_INFO.address}</p>
                    <p className="text-sm text-muted-foreground">Serving across Madhya Pradesh</p>
                  </div>
                </div>
              </div><br />

              {/* Business Hours */}
              <div className="flex items-start">
                <div className="bg-accent p-3 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 9:00 PM</p>
                  <p className="text-sm text-muted-foreground">Sunday: By appointment only</p>
                </div>
              </div>

              {/* Social Media & WhatsApp */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Connect With Us</h3>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, staggerChildren: 0.05 }}
                >
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    href={`tel:${phoneDigits}`}
                    data-testid="link-call"
                    className="inline-flex"
                  >
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-all duration-200 inline-flex items-center shadow-lg">
                      <Phone className="w-5 h-5 mr-2" />
                      Call
                    </Button>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    href={`${PHOTOGRAPHER_INFO.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-whatsapp"
                    className="inline-flex"
                  >
                    <Button className="bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition-all duration-200 inline-flex items-center shadow-lg">
                      <SiWhatsapp className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    href={PHOTOGRAPHER_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-instagram"
                    className="inline-flex"
                  >
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-200 inline-flex items-center shadow-lg">
                      <SiInstagram className="w-5 h-5 mr-2" />
                      Instagram
                    </Button>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    href={PHOTOGRAPHER_INFO.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-youtube"
                    className="inline-flex"
                  >
                    <Button className="bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition-all duration-200 inline-flex items-center shadow-lg">
                      <SiYoutube className="w-5 h-5 mr-2" />
                      YouTube
                    </Button>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form OR Success Message */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {showSuccess && lastSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-green-900/20 border border-green-500/50 rounded-2xl p-8 text-center backdrop-blur-sm"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <SiWhatsapp className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 font-playfair text-white">Application Received!</h3>
                    <p className="text-lg text-gray-300 mb-6">
                      We have sent a confirmation email to <strong>{lastSubmitted.email}</strong>.
                    </p>
                    <div className="bg-white/5 rounded-lg p-6 mb-8 text-left">
                      <p className="font-semibold text-blue-300 mb-2">Next Step:</p>
                      <p className="text-sm text-gray-300">
                        Please confirm your details on WhatsApp to get an immediate response properly.
                        Your message has been pre-filled for you!
                      </p>
                    </div>
                    <a
                      href={generateWhatsAppLink(lastSubmitted)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full"
                    >
                      <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold h-12 text-lg shadow-green-900/50 shadow-lg animate-pulse">
                        <SiWhatsapp className="mr-2 h-6 w-6" />
                        Confirm on WhatsApp
                      </Button>
                    </a>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="mt-6 text-sm text-gray-500 hover:text-gray-300 underline"
                    >
                      Send another response
                    </button>
                  </motion.div>
                ) : (
                  <div key="form" className="bg-card/30 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl">
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold mb-2 text-white">Send a Message</h3>
                      <p className="text-sm text-muted-foreground">Fill in the details below and we'll get back to you shortly.</p>
                    </div>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="contact-form">
                        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Name *</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="Your full name" {...field} className="pl-10 bg-black/40 border-white/10 focus-visible:ring-blue-500" data-testid="input-name" />
                                    <div className="absolute left-3 top-2.5 text-gray-400">
                                      <span role="img" aria-label="user">👤</span>
                                    </div>
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
                                <FormLabel className="text-gray-300">Phone *</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="+91 9876543210" {...field} className="pl-10 bg-black/40 border-white/10 focus-visible:ring-blue-500" data-testid="input-phone" />
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Email *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input type="email" placeholder="your@email.com" {...field} className="pl-10 bg-black/40 border-white/10 focus-visible:ring-blue-500" data-testid="input-email" />
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="eventType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Event Type *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} data-testid="select-event-type">
                                  <SelectTrigger className="bg-black/40 border-white/10 focus:ring-blue-500">
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
                                <FormLabel className="text-gray-300">Event Date</FormLabel>
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
                                            const iso = d.toISOString().slice(0, 10);
                                            ctlField.onChange(iso);
                                          }}
                                          placeholderText="Select event date"
                                          className="w-full pl-10 pr-4 py-2 text-sm bg-black/40 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                          dateFormat="dd MMM yyyy"
                                          data-testid="input-event-date"
                                          calendarClassName="bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
                                          wrapperClassName="w-full"
                                        />
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                          <span role="img" aria-label="calendar">📅</span>
                                        </div>
                                      </div>
                                    )}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">City</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="Event city" {...field} value={field.value || ""} className="pl-10 bg-black/40 border-white/10 focus-visible:ring-blue-500" data-testid="input-city" />
                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
                                <FormLabel className="text-gray-300">Budget Range</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value || ""} data-testid="select-budget">
                                  <SelectTrigger className="bg-black/40 border-white/10 focus:ring-blue-500">
                                    <SelectValue placeholder="Select budget range" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="10000-25000">₹10,000 - ₹25,000</SelectItem>
                                    <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                                    <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                                    <SelectItem value="100000+">₹1,00,000+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={4}
                                  placeholder="Tell us about your event..."
                                  {...field}
                                  value={field.value || ""}
                                  className="bg-black/40 border-white/10 focus-visible:ring-blue-500"
                                  data-testid="textarea-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold h-11 text-lg"
                            disabled={contactMutation.isPending}
                            data-testid="button-submit-contact"
                          >
                            {contactMutation.isPending ? "Sending..." : "Send Message"}
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

      {/* Google Maps Section */}
      <section className="py-16 bg-muted/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Find Us on Map
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Located in the heart of Satna, Madhya Pradesh, we're easily accessible for consultations and meetings.
            </p>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117743.03449669226!2d80.73270109453122!3d24.570344184712048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39823e9b9f18c2df%3A0x13a8ddbf0f14b5a!2sSatna%2C%20Madhya%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1694623729000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              data-testid="google-maps-embed"
            />
            <div className="absolute top-4 left-4 bg-blue-500 text-white backdrop-blur-sm rounded-lg p-3 shadow-xl border-2 border-blue-400">
              <div className="flex items-center text-sm font-semibold">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Satna, Madhya Pradesh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
