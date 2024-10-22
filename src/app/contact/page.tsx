'use client'

import { useEffect, useId, useState } from 'react'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function TextAreaInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'textarea'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
        id={id}
        rows={4}
        {...props}
        placeholder="Message"
        className="peer block max-h-[300px] min-h-48 w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
        maxLength={200}
      />
    </div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const { subject, message } = formData

    const mailtoLink = `mailto:info@dreamofwhat.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`

    window.location.href = mailtoLink
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <FadeIn className="lg:order-last">
      <form onSubmit={handleSubmit}>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <TextAreaInput
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="mt-10">
          Contact Us
        </Button>
      </form>
    </FadeIn>
  )
}

export default function Contact() {
  useEffect(() => {
    // Setting the page title and description dynamically
    document.title = "Contact Us - DreamofWhat";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact us to discuss your dreams and get in touch for more information.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = "Contact us to discuss your dreams and get in touch for more information.";
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <>
      <PageIntro title="Let’s talk about dreams">
        <p>We can’t wait to hear from you.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
        </div>
      </Container>
    </>
  )
}