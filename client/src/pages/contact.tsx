import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
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
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
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

  const contactMutation = useMutation({
    mutationFn: api.contact.submit,
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
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
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-4" data-testid="contact-title">
              Get In Touch
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="contact-subtitle">
              Ready to capture your special moments? Let's discuss your photography needs and create something beautiful together.
            </p>
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
                    <p className="text-sm text-muted-foreground">Available 9 AM - 9 PM</p>
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
              </div>
              
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
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={`${PHOTOGRAPHER_INFO.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-whatsapp"
                  >
                    <Button className="bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition-all duration-200 inline-flex items-center shadow-lg">
                      <SiWhatsapp className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                  <a 
                    href={PHOTOGRAPHER_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-instagram"
                  >
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-200 inline-flex items-center shadow-lg">
                      <SiInstagram className="w-5 h-5 mr-2" />
                      Instagram
                    </Button>
                  </a>
                  <a 
                    href={PHOTOGRAPHER_INFO.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-youtube"
                  >
                    <Button className="bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition-all duration-200 inline-flex items-center shadow-lg">
                      <SiYoutube className="w-5 h-5 mr-2" />
                      YouTube
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                  {/* Honeypot field for spam protection */}
                  <input 
                    type="text" 
                    name="website" 
                    className="hidden" 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name" 
                              {...field} 
                              data-testid="input-name"
                            />
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
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+91 9876543210" 
                              {...field} 
                              data-testid="input-phone"
                            />
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
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            {...field} 
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-event-type">
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="wedding">Wedding</SelectItem>
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
                          <FormLabel>Event Date</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field} 
                              data-testid="input-event-date"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Event city" 
                              {...field} 
                              data-testid="input-city"
                            />
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
                          <FormLabel>Budget Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-budget">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4}
                            placeholder="Tell us about your event, special requirements, or any questions you have..."
                            {...field}
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    We'll get back to you within 24 hours with a personalized quote.
                  </p>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-accent" />
                <span className="font-medium">Satna, Madhya Pradesh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
